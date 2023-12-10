"use strict";

document.addEventListener('DOMContentLoaded', function () {
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
  var buttonBurger = document.querySelector(".header__burger-open");
  var menu = document.querySelector(".header__down-nav");
  var menuClose = document.querySelector(".header__li-burger-close");
  buttonBurger.addEventListener('click', function () {
    menu.classList.add("is-active");
  });
  menuClose.addEventListener('click', function () {
    menu.classList.remove("is-active");
  });
  var highButton = document.querySelector(".high__button");
  var highCard = document.querySelectorAll(".high__no-active");
  highButton.addEventListener('click', function () {
    highCard.forEach(function (card) {
      card.classList.add("active");
    });
    highButton.style.display = 'none';
  });
  var checkBox = document.querySelector(".check");
  var buttonForm = document.querySelector(".form__button-send");
  checkBox.addEventListener('click', function () {
    if (!buttonForm.disabled) {
      buttonForm.disabled = true;
    } else {
      buttonForm.disabled = false;
    }
  });
  var heroSlide = new Swiper(".hero__slider", {
    slidesPerView: 1,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });
  var useful__slider = new Swiper(".useful__slider", {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 32,
    navigation: {
      nextEl: ".swiper-btn-next",
      prevEl: ".swiper-btn-prev"
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 12
      },
      583: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 32
      },
      951: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 32
      },
      1255: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 32
      }
    }
  });
  var offersSlider = new Swiper(".offers__slider", {
    slidesPerGroup: 3,
    slidesPerView: "auto",
    spaceBetween: 0,
    navigation: {
      nextEl: ".swiper-btn-next",
      prevEl: ".swiper-btn-prev"
    },
    breakpoints: {
      0: {
        slidesPerGroup: 1,
        slidesPerView: 1,
        spaceBetween: 12
      },
      583: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 32
      },
      951: {
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 32
      },
      1255: {
        slidesPerGroup: 3,
        slidesPerView: "auto",
        spaceBetween: 0
      }
    }
  });
  var selector = document.querySelector("input[type='tel']");
  var im = new Inputmask("+7 (999) 999-99-99");
  im.mask(selector);
  new JustValidate('.form__container', {
    colorWrong: "#D11616",
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
      },
      mail: {
        required: true,
        email: true
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
      },
      mail: {
        "function": 'Недопустимый формат',
        required: 'Укажите ваш e-mail'
      }
    },
    submitHandler: function submitHandler(thisForm) {
      var formData = new FormData(thisForm);
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Отправлено');
          }
        }
      };
      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);
      thisForm.reset();
    }
  });
  tippy(".form__tooltip", {
    content: 'Реплицированные с зарубежных источников, исследования формируют глобальную сеть.'
  });
});