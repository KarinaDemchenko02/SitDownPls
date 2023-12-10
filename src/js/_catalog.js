document.addEventListener('DOMContentLoaded', function() {
  const tabBtns = document.querySelectorAll(".filter__button")
  tabBtns.forEach(function(tabs) {
    tabs.addEventListener('click', function(event) {
      const path = event.currentTarget.dataset.path
      document.querySelectorAll('.filter__li').forEach(function(tabcont) {
        tabcont.classList.remove('filter__card-active')
      })
      document.querySelectorAll(`[data-target="${path}"]`).forEach(function(card) {
        card.classList.add('filter__card-active')
      })
      tabBtns.forEach(function(el) {
        el.classList.remove('is-active')
      })
      this.classList.add('is-active')
    })
  })

  document.querySelectorAll(".filter__item-button").forEach(item => {
    item.addEventListener("click", function() {
      let dropdown = this.parentElement.querySelector(".filter__dropdown");
      let rotate = this.parentElement.querySelector(".filter__button-icon");
      let buttomDrop = this.parentElement.querySelector(".filter__item-button")

      document.querySelectorAll(".filter__item-button").forEach(el => {
        if (el != buttomDrop) {
           el.classList.remove("active-button");
         }
       });

      document.querySelectorAll(".filter__button-icon").forEach(el => {
       if (el != rotate) {
          el.classList.remove("filter__button-icon-rotate");
        }
      });

      document.querySelectorAll(".filter__dropdown").forEach(el => {
        if (el != dropdown) {
          el.classList.remove("filter__dropdown-active");
        }
      })
      dropdown.classList.toggle("filter__dropdown-active");
      rotate.classList.toggle("filter__button-icon-rotate")
      buttomDrop.classList.toggle("active-button")
    })
  })

  document.addEventListener("click", function(e) {
    let target = e.target;
    if (!target.closest(".filter__list-drop")) {
      document.querySelectorAll(".filter__dropdown").forEach(el => {
          el.classList.remove("filter__dropdown-active");
      })
      document.querySelectorAll(".filter__item-button").forEach(el => {
        el.classList.remove("active-button");
      });
      document.querySelectorAll(".filter__button-icon").forEach(el => {
          el.classList.remove("filter__button-icon-rotate");
      });
    }
  })

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

    const rangeSlider = document.getElementById('range-slider');

    if (rangeSlider) {
      noUiSlider.create(rangeSlider, {
        start: [2000, 150000],
        connect: true,
        step: 1,
        range: {
            'min': [2000],
            'max': [150000]
        }
      });
    }

    const input0 = document.getElementById('input0');
    const input1 = document.getElementById('input1');
    const inputs = [input0, input1];

    rangeSlider.noUiSlider.on('update', function(values, handle) {
      inputs[handle].value = Math.round(values[handle]);
    });

    const setRangeSlider = (i, value) => {
      let arr = [null, null];
      arr[i] = value;

      rangeSlider.noUiSlider.set(arr);
    }

    inputs.forEach((el, index) => {
      el.addEventListener('change', (e) => {
        setRangeSlider(index, e.currentTarget.value);
      })
    })
})
