'use strict'
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;


if (slides.length > 0) {
    slides[currentIndex].classList.add('active');
}

setInterval(() => {
    slides[currentIndex].classList.remove('active');

    currentIndex = (currentIndex + 1) % slides.length;

    slides[currentIndex].classList.add('active');
}, 7000);
});