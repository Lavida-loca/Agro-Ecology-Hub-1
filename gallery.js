const images = document.querySelectorAll(".photo-grid img");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const caption = document.getElementById("lightbox-caption");

let currentIndex = 0;
let scale = 1;

/* OPEN LIGHTBOX */
images.forEach((img, index) => {
    img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
        caption.textContent = img.alt;
        currentIndex = index;
        scale = 1;
        lightboxImg.style.transform = "scale(1)";
    });
});

/* CLOSE */
document.querySelector(".close").onclick = () => {
    lightbox.style.display = "none";
};

/* NEXT / PREV BUTTONS */
document.querySelector(".prev-slide").onclick = showPrev;
document.querySelector(".next-slide").onclick = showNext;

function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlide();
}

function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlide();
}

function updateSlide() {
    lightboxImg.src = images[currentIndex].src;
    caption.textContent = images[currentIndex].alt;
    scale = 1;
    lightboxImg.style.transform = "scale(1)";
}

/* ===================== */
/* KEYBOARD NAVIGATION */
/* ===================== */

document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "Escape") lightbox.style.display = "none";
    }
});

/* ===================== */
/* MOUSE SCROLL ZOOM */
/* ===================== */

lightboxImg.addEventListener("wheel", (e) => {
    e.preventDefault();

    if (e.deltaY < 0) {
        scale += 0.1;
    } else {
        scale -= 0.1;
    }

    scale = Math.min(Math.max(1, scale), 3);
    lightboxImg.style.transform = `scale(${scale})`;
});

/* ===================== */
/* TOUCH SWIPE SUPPORT */
/* ===================== */

let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;

    if (swipeDistance > 50) {
        showPrev();
    } else if (swipeDistance < -50) {
        showNext();
    }
}