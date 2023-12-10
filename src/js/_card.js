document.addEventListener('DOMContentLoaded', function() {
  const windowClose = document.querySelector(".card__window-close");
  const window = document.querySelector(".card__window");
  const imgButton = document.querySelector(".card__main-img");

  imgButton.addEventListener('click', () => {
    window.classList.add('card__window-active');
    document.querySelector("body").classList.add('card__no-scroll')
  })

  windowClose.addEventListener("click", () => {
    window.classList.remove('card__window-active');
    document.querySelector("body").classList.remove('card__no-scroll')
  })

  document.addEventListener("click", function(a) {
    let target = a.target;
    if (!target.closest(".card__section-left")) {
      document.querySelectorAll(".card__window").forEach(al => {
          al.classList.remove("card__window-active");
      })
      document.querySelectorAll("body").forEach(al => {
        al.classList.remove("card__no-scroll");
      });
    }
  })

  const windowFormClose = document.querySelector(".card__window-close-form");
  const windowForm = document.querySelector(".card__window-form");
  const windowFormOpen = document.querySelectorAll(".card__button-buy");

  windowFormOpen.forEach((el) => {
    el.addEventListener('click', () => {
      windowForm.classList.add('card__window-active');
      document.querySelector("body").classList.add('card__no-scroll')
    })
  })
  windowFormClose.addEventListener("click", () => {
    windowForm.classList.remove('card__window-active');
    document.querySelector("body").classList.remove('card__no-scroll')
  })

  const checkBox = document.querySelector(".check")
  const buttonForm = document.querySelector(".card__button-send")

  checkBox.addEventListener('click', () => {
    if (!buttonForm.disabled) {
      buttonForm.disabled = true;
    }else {
      buttonForm.disabled = false;
    }
  })

  var selector = document.querySelector("input[type='tel']");
    var im = new Inputmask("+7 (999) 999-99-99");
    im.mask(selector);

    new JustValidate('.card__form-container', {
      rules: {
        name: {
          required: true,
          minLength: 2,
          maxLength: 30,
          function: (name, value) => {
            return /^[А-Яа-я]+$/.test(value)
          },
        },
        tel: {
          required: true,
          function: (name, value) => {
            const phone = selector.inputmask.unmaskedvalue()
            return Number(phone) && phone.length === 10
          }
        },
      },
      messages: {
        name: {
          function: 'Недопустимый формат',
          required: 'Как вас зовут?',
          minLength: 'Введите 2 и более символов',
          maxLength: 'Запрещено вводить более 30 символов'
        },
        tel: {
          function: 'Недопустимый формат',
          required: 'Укажите ваш телефон'
        },
      },
    });

  const element = document.querySelector('#selectCustom');
    const choices = new Choices(element, {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
        position: 'bottom',
    });

    const elementRe = document.querySelector('#selectCustomRegion');
    const choicesRe = new Choices(elementRe, {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
        position: 'bottom',
    });

  let productsSlider = new Swiper(".products__slider", {
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
        spaceBetween: 16,
      },
      540: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 32,
      },
      951: {
        slidesPerGroup: 3,
        slidesPerView: 3,
      },
      1111: {
        slidesPerGroup: 4,
        slidesPerView: 4,
      }
   }
  });


  let swiper = new Swiper(".card__swiper_2", {
    slidesPerView: "auto",
    freeMode: true,
    watchSlidesProgress: true,
  });
  let swiper2 = new Swiper(".card__swiper_1", {
    spaceBetween: 10,
    thumbs: {
      swiper: swiper,
    },
  });

  let swiperwindow = new Swiper(".card__swiper_2-window", {
    slidesPerView: "auto",
    freeMode: true,
    watchSlidesProgress: true,
  });
  let swiper2window = new Swiper(".card__swiper_1-window", {
    spaceBetween: 10,
    thumbs: {
      swiper: swiperwindow,
    },
  });

  const choicesCard = document.querySelector('.header__form .choices')
  choicesCard.style.zIndex = "0";
})
