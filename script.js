document.addEventListener("DOMContentLoaded", function () {

let code = "";
const correct = "0000";

// Единый флаг: пароль уже был введён или нет
let pinPassed = false;

// Что открывать после пароля: 'gos' или 'qr'
let pendingAction = null;

const btnGos = document.getElementById("brt-gos");
const btnQr  = document.getElementById("btn-qr-footer");
const pinPanel  = document.getElementById("pinPanel");
const loader    = document.getElementById("loader");
const nextWindow = document.getElementById("next-window");
const arrow     = document.getElementById("arrow1");
const del       = document.getElementById("del");
const qrScreen  = document.getElementById("qr-screen");


// ---------- ОТКРЫТИЕ ОКОН ----------
function openGos(){
  nextWindow.classList.add("show");
}

function closeGos(){
  nextWindow.classList.remove("show");
}

function openQR(){
  qrScreen.classList.add("show");
  startCamera();
}

function closeQR(){
  qrScreen.classList.remove("show");
  stopCamera();
}


// ---------- КНОПКА ГОСУСЛУГ ----------
btnGos.onclick = () => {
  if(!pinPassed){
    pendingAction = 'gos';
    pinPanel.classList.add("show");
  } else {
    openGos();
  }
};


// ---------- КНОПКА KASPI QR ----------
btnQr.onclick = () => {
  if(!pinPassed){
    pendingAction = 'qr';
    pinPanel.classList.add("show");
  } else {
    openQR();
  }
};


// ---------- ВВОД PIN ----------
window.press = function(num){

  if(code.length >= 4) return;

  code += num;
  updateDots();
  del.style.visibility = "visible";

  if(code.length === 4){
    setTimeout(()=>{
      if(code === correct){

        loader.classList.add("show");

        setTimeout(()=>{
          loader.classList.remove("show");
          pinPanel.classList.remove("show");

          setTimeout(()=>{
            pinPassed = true;

            if(pendingAction === 'gos'){
              openGos();
            } else if(pendingAction === 'qr'){
              openQR();
            }
            pendingAction = null;

          }, 300);

        }, 400);

      } else {
        code = "";
        updateDots();
        del.style.visibility = "hidden";
      }
    }, 200);
  }

};


// ---------- УДАЛЕНИЕ ----------
window.removeDigit = function(){
  code = code.slice(0, -1);
  updateDots();
  if(code.length === 0) del.style.visibility = "hidden";
};


// ---------- ТОЧКИ ----------
function updateDots(){
  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i < code.length);
  });
}


// ---------- СТРЕЛКА (закрыть Госуслуги) ----------
arrow.onclick = () => closeGos();


// ---------- SWIPE (закрыть Госуслуги) ----------
let startX = 0;
nextWindow.addEventListener("touchstart", e => { startX = e.touches[0].clientX; });
nextWindow.addEventListener("touchend", e => {
  if(e.changedTouches[0].clientX - startX > 120) closeGos();
});


// ---------- КАМЕРА ----------
let cameraStream = null;

window.startCamera = async function(){
  const video = document.getElementById("qr-video");
  if(cameraStream) return; // уже запущена
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { exact: "environment" } },
      audio: false
    });
    cameraStream = stream;
    video.srcObject = stream;
  } catch(e) {
    // Если нет задней камеры — пробуем любую
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      cameraStream = stream;
      video.srcObject = stream;
    } catch(err) {
      console.warn("Камера недоступна:", err);
    }
  }
};

window.stopCamera = function(){
  const video = document.getElementById("qr-video");
  if(cameraStream){
    cameraStream.getTracks().forEach(t => t.stop());
    cameraStream = null;
    video.srcObject = null;
  }
};


// ---------- ЗАКРЫТИЕ QR ----------
document.getElementById("qr-close-btn").addEventListener("click", closeQR);

// Фонарик (если поддерживается)
document.getElementById("qr-torch-btn").addEventListener("click", async () => {
  if(!cameraStream) return;
  const track = cameraStream.getVideoTracks()[0];
  if(!track) return;
  try {
    const cap = track.getCapabilities();
    if(cap.torch){
      const settings = track.getSettings();
      await track.applyConstraints({ advanced: [{ torch: !settings.torch }] });
    }
  } catch(e) {}
});

});


// ---------- GOC TABS (из оригинального script.js) ----------
const btn1Wind = document.getElementById("btn1-wind")
const btn2Wind = document.getElementById("btn2-wind")
const section1Wind = document.getElementById("section1-wind")
const section2Wind = document.getElementById("section2-wind")

btn2Wind.addEventListener('click', () => {
  section1Wind.style.display = 'none'
  section2Wind.style.display = 'block'
  btn2Wind.style.background = 'white'
  btn1Wind.style.background = '#ebebeb'
  btn2Wind.style.zIndex = '1'
  btn1Wind.style.zIndex = '0'
})

btn1Wind.addEventListener('click', () => {
  section1Wind.style.display = 'block'
  section2Wind.style.display = 'none'
  btn1Wind.style.background = 'white'
  btn2Wind.style.background = '#ebebeb'
  btn1Wind.style.zIndex = '1'
  btn2Wind.style.zIndex = '0'
})
