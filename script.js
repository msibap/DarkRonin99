"use strict";

const mainBackground = document.querySelector(".background");
const slider = document.querySelector(".background__slider");
const counters = document.querySelectorAll(".records__container__counter");
const containers = document.querySelectorAll(".records__container");

const images = [
  " url(images/img-1.webp)",
  " url(images/img-2.webp)",
  " url(images/img-3.webp)",
  " url(images/img-4.webp)",
  " url(images/img-5.webp)",
  " url(images/img-6.webp)",
  " url(images/img-7.webp)",
];
// "linear-gradient(to bottom right, var(--bgcolor-primary), var(--bgcolor-secondary)), url(images/img-7.png)",

const time = 5000;

let index = 0;
let timer;

createSliderDot();

const dots = document.querySelectorAll(".background__slider__dot");

changeImage();

dots.forEach((circle, idx) => {
  circle.addEventListener("click", () => {
    index = idx;
    changeImage();
    clearInterval(timer);
    startTimer();
  });
});

function changeImage() {
  mainBackground.style.backgroundImage = images[index];
  activeDot();
  index++;
  if (index >= images.length) {
    index = 0;
  }
}

function createSliderDot() {
  images.forEach(() => {
    const dot = document.createElement("div");
    dot.classList.add("background__slider__dot");
    slider.appendChild(dot);
  });
}

function activeDot() {
  dots.forEach((circle, idx) => {
    if (idx == index) {
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });
}

function startTimer() {
  timer = setInterval(changeImage, time);
}

startTimer();

////////////////////////////////////////
// Number Increment Animation //////////
////////////////////////////////////////

counters.forEach((counter) => {
  window.addEventListener("scroll", showUp);
  counter.innerText = "0";
  let controller = true;

  function updateCounter() {
    const target = Number(counter.getAttribute("data-target"));
    const c = Number(counter.innerText);

    const increment = target / 50;

    if (c < target) {
      counter.innerHTML = `${Math.ceil(c + increment)}`;
      setTimeout(updateCounter, 65);
    } else {
      counter.innerText = target;
    }
  }

  function showUp() {
    containers.forEach((container) => {
      const containerTop = container.getBoundingClientRect().top;
      if (window.scrollY > containerTop) {
        container.classList.add("active");
      } else {
        container.classList.remove("active");
      }
    });

    const counterTop = counter.getBoundingClientRect().top;
    if (window.scrollY + 80 > counterTop && controller == true) {
      updateCounter();
      controller = false;
    }
  }
});
