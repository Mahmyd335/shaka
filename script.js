document.addEventListener("DOMContentLoaded", function () {

let code = "";
const correct = "0000";

let firstOpen = true;

const btn = document.getElementById("brt-gos");
const pinPanel = document.getElementById("pinPanel");
const loader = document.getElementById("loader");
const nextWindow = document.getElementById("next-window");
const arrow = document.getElementById("arrow1");
const del = document.getElementById("del");


// ---------- ОТКРЫТИЕ ----------
function openWindow(){
  nextWindow.classList.add("show");
}


// ---------- ЗАКРЫТИЕ ----------
function closeWindow(){
  nextWindow.classList.remove("show");
}


// ---------- КНОПКА ГОСУСЛУГ ----------
btn.onclick = () => {

  if(firstOpen){
    pinPanel.classList.add("show");
  }else{
    openWindow();
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

            openWindow();
            firstOpen = false;

          },300);

        },400);

      }else{

        code = "";
        updateDots();
        del.style.visibility = "hidden";

      }

    },200);

  }

};


// ---------- УДАЛЕНИЕ ----------
window.removeDigit = function(){

  code = code.slice(0,-1);

  updateDots();

  if(code.length === 0){
    del.style.visibility = "hidden";
  }

};


// ---------- ТОЧКИ ----------
function updateDots(){

  const dots = document.querySelectorAll(".dot");

  dots.forEach((d,i)=>{

    if(i < code.length){
      d.classList.add("active");
    }else{
      d.classList.remove("active");
    }

  });

}


// ---------- СТРЕЛКА ----------
arrow.onclick = () => {
  closeWindow();
};


// ---------- SWIPE ----------
let startX = 0;

nextWindow.addEventListener("touchstart", (e)=>{
  startX = e.touches[0].clientX;
});

nextWindow.addEventListener("touchend", (e)=>{

  let endX = e.changedTouches[0].clientX;

  if(endX - startX > 120){
    closeWindow();
  }

});

});


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





