"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var tabBtns = document.querySelectorAll(".filter__button");
  tabBtns.forEach(function (tabs) {
    tabs.addEventListener('click', function (event) {
      var path = event.currentTarget.dataset.path;
      document.querySelectorAll('.filter__li').forEach(function (tabcont) {
        tabcont.classList.remove('filter__card-active');
      });
      document.querySelectorAll("[data-target=\"".concat(path, "\"]")).forEach(function (card) {
        card.classList.add('filter__card-active');
      });
      tabBtns.forEach(function (el) {
        el.classList.remove('is-active');
      });
      this.classList.add('is-active');
    });
  });
  document.querySelectorAll(".filter__item-button").forEach(function (item) {
    item.addEventListener("click", function () {
      var dropdown = this.parentElement.querySelector(".filter__dropdown");
      var rotate = this.parentElement.querySelector(".filter__button-icon");
      var buttomDrop = this.parentElement.querySelector(".filter__item-button");
      document.querySelectorAll(".filter__item-button").forEach(function (el) {
        if (el != buttomDrop) {
          el.classList.remove("active-button");
        }
      });
      document.querySelectorAll(".filter__button-icon").forEach(function (el) {
        if (el != rotate) {
          el.classList.remove("filter__button-icon-rotate");
        }
      });
      document.querySelectorAll(".filter__dropdown").forEach(function (el) {
        if (el != dropdown) {
          el.classList.remove("filter__dropdown-active");
        }
      });
      dropdown.classList.toggle("filter__dropdown-active");
      rotate.classList.toggle("filter__button-icon-rotate");
      buttomDrop.classList.toggle("active-button");
    });
  });
  document.addEventListener("click", function (e) {
    var target = e.target;
    if (!target.closest(".filter__list-drop")) {
      document.querySelectorAll(".filter__dropdown").forEach(function (el) {
        el.classList.remove("filter__dropdown-active");
      });
      document.querySelectorAll(".filter__item-button").forEach(function (el) {
        el.classList.remove("active-button");
      });
      document.querySelectorAll(".filter__button-icon").forEach(function (el) {
        el.classList.remove("filter__button-icon-rotate");
      });
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
  var rangeSlider = document.getElementById('range-slider');
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
  var input0 = document.getElementById('input0');
  var input1 = document.getElementById('input1');
  var inputs = [input0, input1];
  rangeSlider.noUiSlider.on('update', function (values, handle) {
    inputs[handle].value = Math.round(values[handle]);
  });
  var setRangeSlider = function setRangeSlider(i, value) {
    var arr = [null, null];
    arr[i] = value;
    rangeSlider.noUiSlider.set(arr);
  };
  inputs.forEach(function (el, index) {
    el.addEventListener('change', function (e) {
      setRangeSlider(index, e.currentTarget.value);
    });
  });
});