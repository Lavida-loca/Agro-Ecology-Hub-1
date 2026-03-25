let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");

let index = 0;

function showSlide(n){

if(n >= slides.length){index = 0}
if(n < 0){index = slides.length-1}

slides.forEach(slide => slide.style.display="none");
dots.forEach(dot => dot.classList.remove("active"));

slides[index].style.display="block";
dots[index].classList.add("active");

}

document.querySelector(".next").onclick = () =>{
index++;
showSlide(index);
};

document.querySelector(".prev").onclick = () =>{
index--;
showSlide(index);
};

dots.forEach((dot,i)=>{
dot.onclick = ()=>{
index=i;
showSlide(index);
};
});

function autoSlide(){
index++;
showSlide(index);
}

setInterval(autoSlide,5000);

showSlide(index);

const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});
