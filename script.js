"use strict";

const topbar = document.querySelector(".topbar");
const topbarLogo = document.querySelector(".topbar__logo");
const slider = document.querySelector(".slider__images");
const sliderImages = document.querySelectorAll(".slider__images__image");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const dotsContainer = document.querySelector(".slider__container__dots");
const counters = document.querySelectorAll(".records__container__counter");
const containers = document.querySelectorAll(".records__container");
const mastiffTitle = document.querySelector(".mastiff__title");
const mastiffSubtitle = document.querySelector(".mastiff__subtitle");
const mastiffSection = document.querySelector(".mastiff");
const characters = document.querySelectorAll(".characters__character");
const characterBgs = document.querySelectorAll(
  ".characters__character__background"
);
const characterSubtitles = document.querySelectorAll(
  ".characters__character__text--subtitle"
);
const characterTitles = document.querySelectorAll(
  ".characters__character__text--title"
);

////////////////////////////////////////
// New Slider //////////////////////////
////////////////////////////////////////

// Current active slide
let counter = 1;
const time = 3000;
let timer;

// Initial size of the image
let size = sliderImages[0].clientWidth;

// Update size after resizing window
const fixSize = function () {
  // If window size changes, will get the new window size
  if (size != sliderImages[0].clientWidth) {
    size = sliderImages[0].clientWidth;
    changeImage();
    resetTimer();
  }
};

const checkSize = function () {
  const timer = setInterval(fixSize, 1000);
};

// Move the image by width of first image
const changeImage = function () {
  slider.style.transform = `translateX(${-size * counter}px)`;
};

// Reseting timer
const resetTimer = function () {
  clearInterval(timer);
  startTimer();
};

// Moving slides smoothly
const transitImage = function () {
  slider.style.transition = `transform 0.4s ease-out`;
};

// Initial slide position
changeImage();

const nextImage = function () {
  // Prevents from fast clicking Next button
  if (counter >= sliderImages.length - 1) return;
  counter++;
  transitImage();
  changeImage();
  activeDot();
  resetTimer();
};

const prevImage = function () {
  // Prevents from fast clicking Prev button
  if (counter <= 0) return;
  counter--;
  transitImage();
  changeImage();
  activeDot();
  resetTimer();
};

slider.addEventListener("transitionend", () => {
  if (sliderImages[counter].id === "last-image") {
    slider.style.transition = `none`;
    counter = sliderImages.length - 2;
    changeImage();
    activeDot();
  }
  if (sliderImages[counter].id === "first-image") {
    slider.style.transition = `none`;
    counter = sliderImages.length - counter;
    changeImage();
    activeDot();
  }
});

// Buttons funcionality
nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);

// Creating Dots
const createDots = function () {
  // Deleting hard-coded Dots
  dotsContainer.innerHTML = "";
  // Making a new array without first and last copy images
  const uniqueSliderImages = [...sliderImages].slice(1, -1);
  uniqueSliderImages.forEach((e) => {
    dotsContainer.insertAdjacentHTML(
      "afterbegin",
      '<div class="slider__container__dots__dot"></div>'
    );
  });
};

createDots();

// Saving new created dots into a variable
const dots = document.querySelectorAll(".slider__container__dots__dot");

// Active dot
const activeDot = function () {
  // Making an Array of dots
  const dotsArray = [...dots];
  dotsArray.forEach((e, i) => {
    e.classList.remove("active");
    if (i + 1 === counter) {
      e.classList.add("active");
    }
  });
};
activeDot();

// Selecting dots by mouse
dots.forEach((e, i) => {
  e.addEventListener("click", () => {
    counter = i + 1;
    changeImage();
    transitImage();
    activeDot();
    resetTimer();
  });
});

// Setting a Timer for auto-slide
const startTimer = function () {
  timer = setInterval(nextImage, time);
};

// Checks size every 1 second
checkSize();
startTimer();

////////////////////////////////////////
// Old Slider //////////////////////////
////////////////////////////////////////

/* 
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
*/

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

////////////////////////////////////////
// Text Animation //////////////////////
////////////////////////////////////////

let textIndex = 1;
let titleMastiff = "Mastiff";
let textMastiff = `Auto-Loading shotgun with wide spread.
  The M1901 Mastiff Combat Shotgun is a Pilot anti-personnel energy semi-automatic shotgun manufactured by Lastimosa Armory.`;

function writeText() {
  let controller = true;
  mastiffTitle.innerText = titleMastiff.slice(0, textIndex);
  mastiffSubtitle.innerText = textMastiff.slice(0, textIndex);

  textIndex++;

  if (textIndex <= textMastiff.length && controller) {
    setTimeout(writeText, 30);
  } else {
    controller = false;
  }
}

window.addEventListener("scroll", showText);
let showTextComplete = false;
const mastiffSectionTop = mastiffSection.getBoundingClientRect().top;

function showText() {
  if (window.scrollY + 250 > mastiffSectionTop && !showTextComplete) {
    writeText();
    showTextComplete = true;
  }
}

////////////////////////////////////////
// Top Bar Effect //////////////////////
////////////////////////////////////////

window.addEventListener("scroll", topbarEffect);

function topbarEffect() {
  if (window.scrollY > topbar.offsetHeight + 10) {
    topbar.classList.add("active");
    topbarLogo.classList.remove("glitch");
  } else {
    topbar.classList.remove("active");
    topbarLogo.classList.add("glitch");
  }
}

////////////////////////////////////////
// Character's Click Effect ////////////
////////////////////////////////////////

characters.forEach((character, idx) => {
  character.addEventListener("click", () => {
    [...characterBgs].forEach((e, i) => {
      if (i !== idx) e.classList.remove("active");
    });
    [...characterSubtitles].forEach((e, i) => {
      if (i !== idx) e.classList.remove("active");
    });
    [...characterTitles].forEach((e, i) => {
      if (i !== idx) e.classList.remove("active");
    });

    characterBgs[idx].classList.toggle("active");
    characterSubtitles[idx].classList.toggle("active");
    characterTitles[idx].classList.toggle("active");
  });
});
