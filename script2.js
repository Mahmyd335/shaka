const btn1Gos = document.getElementById("btn1-gos")
const btn2Gos = document.getElementById("btn2-gos")
const sectionGos = document.getElementById("section-gos")

btn2Gos.addEventListener('click', () => {
  sectionGos.style.display = 'block'
  btn2Gos.style.background = 'white'
  btn1Gos.style.background = '#ebebeb'
  btn2Gos.style.zIndex = '1'
  btn1Gos.style.zIndex = '0'
})

btn1Gos.addEventListener('click', () => {
  sectionGos.style.display = 'none'
  btn1Gos.style.background = 'white'
  btn2Gos.style.background = '#ebebeb'
  btn1Gos.style.zIndex = '1'
  btn2Gos.style.zIndex = '0'
})  


const footerBtn1Gos = document.getElementById("footerBtn1-gos");
const windGos = document.getElementById("window-gos");
const closeBtnGos = document.getElementById("closeBtnGos");

footerBtn1Gos.addEventListener("click", () => {
  windGos.style.display = "flex";

  windGos.classList.remove("active");
  void windGos.offsetWidth;
  windGos.classList.add("active");
});

closeBtnGos.addEventListener("click", () => {
  windGos.classList.remove("active");

  setTimeout(() => {
    windGos.style.display = "none";
  }, 500);
});


const text4Gos = document.querySelector(".text4-gos");

function getRandomDigit() {
  return Math.floor(Math.random() * 10);
}

function getRandomNumberString(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += getRandomDigit();
  }
  return result;
}

footerBtn1Gos.addEventListener("click", () => {
  const length = text4Gos.textContent.length;
  text4Gos.textContent = getRandomNumberString(length);
});


const footerBtn2Gos = document.getElementById("footerBtn2-gos");

footerBtn2Gos.addEventListener("click", async () => {
  if (navigator.share && navigator.canShare) {
    try {
      const response = await fetch("090124552135-20251219143643327.pdf");
      const blob = await response.blob();
      const file = new File([blob], "example.pdf", {
        type: "application/pdf"
      });

      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Поделиться PDF",
          files: [file]
        });
      } else {
        alert("Ваш браузер не поддерживает отправку файлов");
      }
    } catch (err) {
      console.error("Ошибка при шаринге PDF:", err);
    }
  } else {
    alert("Ваш браузер не поддерживает Web Share API");
  }
});


const footerBtn3Gos = document.getElementById("footerBtn3-gos");

const shareTextGos =
`Мұрат Мирас Манасұлы
040124552135
24.01.2004
16.10.2020
17.10.2030`;

footerBtn3Gos.addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Поделиться текстом',
        text: shareTextGos
      });
    } catch (err) {
      console.error('Ошибка при попытке поделиться:', err);
    }
  } else {
    alert('Ваш браузер не поддерживает Web Share API');
  }
});


const zoomAreaGos = document.querySelector('.con-section-gos');

let scaleGos = 1;
let startDistanceGos = 0;
let originXGos = 0;
let originYGos = 0;

zoomAreaGos.addEventListener('touchstart', e => {
  if (e.touches.length === 2) {
    startDistanceGos = getDistance(e.touches[0], e.touches[1]);

    const rect = zoomAreaGos.getBoundingClientRect();
    originXGos = ((e.touches[0].clientX + e.touches[1].clientX) / 2) - rect.left;
    originYGos = ((e.touches[0].clientY + e.touches[1].clientY) / 2) - rect.top;
  }
}, { passive: false });

zoomAreaGos.addEventListener('touchmove', e => {
  if (e.touches.length === 2) {
    e.preventDefault();

    const newDistance = getDistance(e.touches[0], e.touches[1]);
    scaleGos *= newDistance / startDistanceGos;
    scaleGos = Math.min(Math.max(scaleGos, 1), 5);

    zoomAreaGos.style.transformOrigin = `${originXGos}px ${originYGos}px`;
    zoomAreaGos.style.transform = `scale(${scaleGos})`;

    startDistanceGos = newDistance;
  }
}, { passive: false });

function getDistance(t1, t2) {
  return Math.hypot(
    t2.clientX - t1.clientX,
    t2.clientY - t1.clientY
  );
}














document.getElementById("btn-gos").addEventListener("click", function(){

	let loader = document.getElementById("loader-screen");
	let bar = document.querySelector(".loader-bar");
	let pre = document.getElementById("pre-section");
	let page = document.querySelector(".con-gos");

	/* СБРОС СОСТОЯНИЯ */

	bar.style.width = "0%";
	loader.classList.remove("show");
	page.classList.remove("show");
	pre.style.display = "none";


	/* выезжает белый экран */

	setTimeout(()=>{
		loader.classList.add("show");
	},50);


	/* запуск загрузки */

	setTimeout(()=>{
		bar.style.width = "100%";
	},400);


	/* показывается pre-section */

	setTimeout(()=>{
		pre.style.display = "block";
	},900);


	/* открывается основная страница */

	setTimeout(()=>{
		page.classList.add("show");
	},1500);

});


document.getElementById("x-gos").addEventListener("click", function(){

	let loader = document.getElementById("loader-screen");
	let pre = document.getElementById("pre-section");
	let page = document.querySelector(".con-gos");

	/* закрываем основную страницу */

	page.classList.remove("show");

	/* сразу убираем лишние секции */

	loader.classList.remove("show");
	pre.style.display = "none";

});











const saveBtn = document.getElementById("saveBtn")
const inputs = document.querySelectorAll(".block-text2-gos")

const upload1 = document.getElementById("imgUpload1")
const upload2 = document.getElementById("imgUpload2")

const img1 = document.getElementById("docImg1")
const img2 = document.getElementById("docImg2")

// изображения
upload1.addEventListener("change", function(){

const file = this.files[0]

if(file){

const reader = new FileReader()

reader.onload = function(e){
img1.src = e.target.result
localStorage.setItem("docImg1", e.target.result)
}

reader.readAsDataURL(file)

}

})

upload2.addEventListener("change", function(){

const file = this.files[0]

if(file){

const reader = new FileReader()

reader.onload = function(e){
img2.src = e.target.result
localStorage.setItem("docImg2", e.target.result)
}

reader.readAsDataURL(file)

}

})


// кнопка сохранить
saveBtn.addEventListener("click", function(){

inputs.forEach((input, index)=>{

localStorage.setItem("input"+index, input.value)

input.readOnly = true

})

localStorage.setItem("locked", "true")

saveBtn.style.display = "none"

})


// загрузка данных после обновления
window.addEventListener("load", ()=>{

const savedImg1 = localStorage.getItem("docImg1")
const savedImg2 = localStorage.getItem("docImg2")

if(savedImg1) img1.src = savedImg1
if(savedImg2) img2.src = savedImg2


inputs.forEach((input, index)=>{

const savedText = localStorage.getItem("input"+index)

if(savedText){
input.value = savedText
}

})


if(localStorage.getItem("locked") === "true"){

inputs.forEach(input=>{
input.readOnly = true
})

saveBtn.style.display = "none"

}

})






const input = document.getElementById("panelInput")

// загрузка текста
const savedText = localStorage.getItem("panelText")
const isLocked = localStorage.getItem("panelLocked")

if(savedText){
    input.value = savedText
}

// если уже сохраняли кнопкой
if(isLocked === "true"){
    input.disabled = true
    saveBtn.style.display = "none"
}

// автосохранение при вводе
input.addEventListener("input", () => {
    localStorage.setItem("panelText", input.value)
})

// кнопка сохранить
saveBtn.addEventListener("click", () => {
    localStorage.setItem("panelLocked", "true")
    input.disabled = true
    saveBtn.style.display = "none"
})



