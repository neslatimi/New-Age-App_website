window.onscroll = () => {
  const nav = document.querySelector('nav');
  const top = document.body.scrollTop || document.documentElement.scrollTop;
  if (top !== 0) {
    nav.classList.add('scrolled-nav');
  } else {
    nav.classList.remove('scrolled-nav');
  }
};

// header button mouse event--over and leave

$(document).ready(() => {
  $('.header-btn').mouseover(() => {
    setTimeout(() => {
      $('.header-btn')
        .css({ 'background-color': ' #fdcc52', 'border-color': ' #ffd344' });
    }, 300);
  });
  $('.header-btn').mouseleave(() => {
    setTimeout(() => {
      $('.header-btn')
        .css({ 'background-color': 'transparent', 'border-color': '#ffffff' });
    }, 300);
  });
});

// fill testimonial
const testImonial = {
  data: [],
  init() {
    this.findData();
  },
  findData() {
    $.getJSON('http://46.101.237.11/json/users.json', (result) => {
      this.data = result;
      this.make5Random(this.data);
    });
  },
  showAll(array) {
    for (let i = 0; i < array.length; i += 1) {
      $(`#testim-content div:nth-child(${i + 1}) img`).attr('src', array[i].picture);
      $(`#testim-content div:nth-child(${i + 1}) .h4`).text(`${array[i].name.first} ${array[i].name.last}`);
      $(`#testim-content div:nth-child(${i + 1}) p`).html(`${array[i].greeting}`);
    }
  },
  make5Random(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 5) {
      // Pick a random index
      const index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter -= 1;

      // And swap the last element with it
      const temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    this.showAll(array);
  },

};
testImonial.init();

// //////////ez a sablon
const testim = document.getElementById('testim');
const testimDots = Array.prototype.slice.call(document.getElementById('testim-dots').children);
const testimContent = Array.prototype.slice.call(document.getElementById('testim-content').children);
const testimLeftArrow = document.getElementById('left-arrow');
const testimRightArrow = document.getElementById('right-arrow');
const testimSpeed = 4500;
let currentSlide = 0;
let currentActive = 0;
let testimTimer;
let touchStartPos;
let touchEndPos;
let touchPosDiff;
const ignoreTouch = 30;
window.onload = function () {
  // Testim Script
  function playSlide(slide) {
    for (let k = 0; k < testimDots.length; k++) {
      testimContent[k].classList.remove('active');
      testimContent[k].classList.remove('inactive');
      testimDots[k].classList.remove('active');
    }
    if (slide < 0) {
      slide = currentSlide = testimContent.length - 1;
    }
    if (slide > testimContent.length - 1) {
      slide = currentSlide = 0;
    }
    if (currentActive != currentSlide) {
      testimContent[currentActive].classList.add('inactive');
    }
    testimContent[slide].classList.add('active');
    testimDots[slide].classList.add('active');
    currentActive = currentSlide;
    clearTimeout(testimTimer);
    testimTimer = setTimeout(() => {
      playSlide(currentSlide += 1);
    }, testimSpeed);
  }
  testimLeftArrow.addEventListener('click', () => {
    playSlide(currentSlide -= 1);
  });
  testimRightArrow.addEventListener('click', () => {
    playSlide(currentSlide += 1);
  });
  for (let l = 0; l < testimDots.length; l++) {
    testimDots[l].addEventListener('click', function () {
      playSlide(currentSlide = testimDots.indexOf(this));
    });
  }
  playSlide(currentSlide);
  // keyboard shortcuts
  document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
      case 37:
        testimLeftArrow.click();
        break;
      case 39:
        testimRightArrow.click();
        break;
      case 39:
        testimRightArrow.click();
        break;
      default:
        break;
    }
  });
  testim.addEventListener('touchstart', (e) => {
    touchStartPos = e.changedTouches[0].clientX;
  });
  testim.addEventListener('touchend', (e) => {
    touchEndPos = e.changedTouches[0].clientX;
    touchPosDiff = touchStartPos - touchEndPos;
    if (touchPosDiff > 0 + ignoreTouch) {
      testimLeftArrow.click();
    } else if (touchPosDiff < 0 - ignoreTouch) {
      testimRightArrow.click();
    } else {

    }
  });
};
