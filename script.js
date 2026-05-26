document.addEventListener("DOMContentLoaded", function () {

let code = "";
const correct = "0000";

// Единый флаг: пароль уже был введён или нет
let pinPassed = false;

// Что открывать после пароля: 'gos' или 'qr'
let pendingAction = null;

const btnGos = document.getElementById("brt-gos");
const btnBank = document.getElementById("btn-moy-bank");
const btnQr  = document.getElementById("btn-qr-footer");
const pinPanel  = document.getElementById("pinPanel");
const loader    = document.getElementById("loader");
const nextWindow = document.getElementById("next-window");
const bankWindow = document.getElementById("moy-bank-window");
const arrow     = document.getElementById("arrow1");
const arrowBank = document.getElementById("arrow-bank");
const del       = document.getElementById("del");
const qrScreen  = document.getElementById("qr-screen");


// ---------- ОТКРЫТИЕ ОКОН ----------
function openGos(){
  nextWindow.classList.add("show");
}

function closeGos(){
  nextWindow.classList.remove("show");
}

function openBank(){
  bankWindow.classList.add("show");
}

function closeBank(){
  bankWindow.classList.remove("show");
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


// ---------- КНОПКА МОЙ БАНК ----------
btnBank.onclick = () => {
  if(!pinPassed){
    pendingAction = 'bank';
    pinPanel.classList.add("show");
  } else {
    openBank();
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
            } else if(pendingAction === 'bank'){
              openBank();
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

// ---------- СТРЕЛКА (закрыть Мой Банк) ----------
arrowBank.onclick = () => closeBank();

// ---------- SWIPE (закрыть Госуслуги) ----------
let startX = 0;
nextWindow.addEventListener("touchstart", e => { startX = e.touches[0].clientX; });
nextWindow.addEventListener("touchend", e => {
  if(e.changedTouches[0].clientX - startX > 120) closeGos();
});

// ---------- SWIPE (закрыть Мой Банк) ----------
let startXBank = 0;
bankWindow.addEventListener("touchstart", e => { startXBank = e.touches[0].clientX; });
bankWindow.addEventListener("touchend", e => {
  if(e.changedTouches[0].clientX - startXBank > 120) closeBank();
});


// ---------- КАМЕРА ----------
let cameraStream = null;

window.startCamera = async function(){
  const video = document.getElementById("qr-video");
  if(cameraStream) return;
  try {
    // ideal вместо exact — работает и на телефоне (задняя) и на компьютере (любая)
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" } },
      audio: false
    });
    cameraStream = stream;
    video.srcObject = stream;
  } catch(err) {
    console.warn("Камера недоступна:", err);
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


// ======== НАВИГАЦИЯ ВКЛАДОК ========
document.addEventListener('DOMContentLoaded', function () {

  const pages = {
    messages: document.getElementById('page-messages'),
    services:  document.getElementById('page-services'),
  };

  const tabs = {
    home:     document.getElementById('btn-home'),
    messages: document.getElementById('btn-messages'),
    services: document.getElementById('btn-services'),
  };

  const allTabBtns = document.querySelectorAll('.footer .a p');

  function setActiveTab(name) {
    allTabBtns.forEach(p => p.style.color = '');
    Object.values(pages).forEach(p => p && p.classList.remove('page-open'));

    if (name === 'home') {
      if (tabs.home) tabs.home.querySelector('p').style.color = 'red';
    } else if (name === 'messages') {
      if (tabs.messages) tabs.messages.querySelector('p').style.color = 'red';
      if (pages.messages) pages.messages.classList.add('page-open');
    } else if (name === 'services') {
      if (tabs.services) tabs.services.querySelector('p').style.color = 'red';
      if (pages.services) pages.services.classList.add('page-open');
    }
  }

  if (tabs.home) tabs.home.querySelector('p').style.color = 'red';

  if (tabs.home)     tabs.home.addEventListener('click',     () => setActiveTab('home'));
  if (tabs.messages) tabs.messages.addEventListener('click', () => setActiveTab('messages'));
  if (tabs.services) tabs.services.addEventListener('click', () => setActiveTab('services'));

});


// ======== ЧАТ KASPI GOLD ========
document.addEventListener('DOMContentLoaded', function () {

  const chatScreen   = document.getElementById('chat-kaspi-gold');
  const chatMessages = document.getElementById('chat-messages');
  const chatBackBtn  = document.getElementById('chat-back-btn');

  // Первый элемент в списке сообщений — Kaspi Gold
  const kaspiGoldItem = document.querySelector('#page-messages .msg-item');

  function openChat() {
    chatScreen.classList.add('chat-open');
    // Прокрутить вниз (к последнему сообщению)
    requestAnimationFrame(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }

  function closeChat() {
    chatScreen.classList.remove('chat-open');
  }

  if (kaspiGoldItem) {
    kaspiGoldItem.addEventListener('click', openChat);
  }

  if (chatBackBtn) {
    chatBackBtn.addEventListener('click', closeChat);
  }

  // Свайп вправо — закрыть чат
  let chatStartX = 0;
  if (chatScreen) {
    chatScreen.addEventListener('touchstart', e => {
      chatStartX = e.touches[0].clientX;
    }, { passive: true });
    chatScreen.addEventListener('touchend', e => {
      if (e.changedTouches[0].clientX - chatStartX > 80) closeChat();
    }, { passive: true });
  }

});
