"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var windowClose = document.querySelector(".card__window-close");
  var window = document.querySelector(".card__window");
  var imgButton = document.querySelector(".card__main-img");
  imgButton.addEventListener('click', function () {
    window.classList.add('card__window-active');
    document.querySelector("body").classList.add('card__no-scroll');
  });
  windowClose.addEventListener("click", function () {
    window.classList.remove('card__window-active');
    document.querySelector("body").classList.remove('card__no-scroll');
  });
  document.addEventListener("click", function (a) {
    var target = a.target;
    if (!target.closest(".card__section-left")) {
      document.querySelectorAll(".card__window").forEach(function (al) {
        al.classList.remove("card__window-active");
      });
      document.querySelectorAll("body").forEach(function (al) {
        al.classList.remove("card__no-scroll");
      });
    }
  });
  var windowFormClose = document.querySelector(".card__window-close-form");
  var windowForm = document.querySelector(".card__window-form");
  var windowFormOpen = document.querySelectorAll(".card__button-buy");
  windowFormOpen.forEach(function (el) {
    el.addEventListener('click', function () {
      windowForm.classList.add('card__window-active');
      document.querySelector("body").classList.add('card__no-scroll');
    });
  });
  windowFormClose.addEventListener("click", function () {
    windowForm.classList.remove('card__window-active');
    document.querySelector("body").classList.remove('card__no-scroll');
  });
  var checkBox = document.querySelector(".check");
  var buttonForm = document.querySelector(".card__button-send");
  checkBox.addEventListener('click', function () {
    if (!buttonForm.disabled) {
      buttonForm.disabled = true;
    } else {
      buttonForm.disabled = false;
    }
  });
  var selector = document.querySelector("input[type='tel']");
  var im = new Inputmask("+7 (999) 999-99-99");
  im.mask(selector);
  new JustValidate('.card__form-container', {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 30,
        "function": function _function(name, value) {
          return /^[А-Яа-я]+$/.test(value);
        }
      },
      tel: {
        required: true,
        "function": function _function(name, value) {
          var phone = selector.inputmask.unmaskedvalue();
          return Number(phone) && phone.length === 10;
        }
      }
    },
    messages: {
      name: {
        "function": 'Недопустимый формат',
        required: 'Как вас зовут?',
        minLength: 'Введите 2 и более символов',
        maxLength: 'Запрещено вводить более 30 символов'
      },
      tel: {
        "function": 'Недопустимый формат',
        required: 'Укажите ваш телефон'
      }
    }
  });
  var element = document.querySelector('#selectCustom');
  var choices = new Choices(element, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    position: 'bottom'
  });
  var elementRe = document.querySelector('#selectCustomRegion');
  var choicesRe = new Choices(elementRe, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    position: 'bottom'
  });
  var productsSlider = new Swiper(".products__slider", {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 32,
    navigation: {
      nextEl: ".swiper-btn-next-products",
      prevEl: ".swiper-btn-prev-products"
    },
    breakpoints: {
      320: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 16
      },
      540: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 32
      },
      951: {
        slidesPerGroup: 3,
        slidesPerView: 3
      },
      1111: {
        slidesPerGroup: 4,
        slidesPerView: 4
      }
    }
  });
  var swiper = new Swiper(".card__swiper_2", {
    slidesPerView: "auto",
    freeMode: true,
    watchSlidesProgress: true
  });
  var swiper2 = new Swiper(".card__swiper_1", {
    spaceBetween: 10,
    thumbs: {
      swiper: swiper
    }
  });
  var swiperwindow = new Swiper(".card__swiper_2-window", {
    slidesPerView: "auto",
    freeMode: true,
    watchSlidesProgress: true
  });
  var swiper2window = new Swiper(".card__swiper_1-window", {
    spaceBetween: 10,
    thumbs: {
      swiper: swiperwindow
    }
  });
  var choicesCard = document.querySelector('.header__form .choices');
  choicesCard.style.zIndex = "0";
});