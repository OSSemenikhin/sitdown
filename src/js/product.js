import { addHeaderScripts } from './header/addHeaderScripts.js';
import { ModalGoody } from './plugins/modalGoody.js';
import { addListenersToForm } from './layouts/validateForm.js';

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname == '/product.html') {

    if (document.querySelector(".product-hero-slider")) {
      if (window.screen.width < 768 || window.screen.width >= 1024 && window.screen.width < 1300) {
        const productSliderHero = new Swiper(".product-hero-slider", {
          freeMode: true,
          slidesPerView: 'auto',
          spaceBetween: 23,
        });
      }
    }

    if (document.querySelector(".product-similar-slider")) {
      const productSliderSimilar = new Swiper(".product-similar-slider", {
        slidesPerView: 2,
        spaceBetween: 12,
        navigation: {
          prevEl: ".product-similar-slider-buttons--prev",
          nextEl: ".product-similar-slider-buttons--next",
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1300: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        },
      });
    }

    if (document.querySelector(".modal-footer-slider")) {
      if (window.screen.width < 1300) {
        const productSliderFooter = new Swiper(".modal-footer-slider", {
          // slidesPerView: 'auto',
          slidesPerView: 2,
          spaceBetween: 30,
          navigation: {
            prevEl: ".modal-footer-slider-buttons--prev",
            nextEl: ".modal-footer-slider-buttons--next",
          },
        });
      }
    }

    const buttons = document.querySelectorAll('.product-hero-slider__button');
    const mainButton = document.querySelector('.product-hero-photo__button');

    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const image = button.innerHTML;
        button.innerHTML = mainButton.innerHTML;
        mainButton.innerHTML = image;
      });
    });

    const modalForm = document.querySelector('.modal-form');
    const modalresponse = document.querySelector('.modal-response');


    // FORM validate
    const sendForm = document.querySelector('.modal-form__form');
    addListenersToForm({
      sendForm: sendForm,
      nameInput: sendForm.querySelector('[placeholder="Как вас зовут?"]'),
      phoneInput: sendForm.querySelector('[placeholder="Ваш телефон"]'),
      checkInput: sendForm.querySelector('.modal-form__checkbox--hidden'),
      messageName: document.querySelector('.modal-form__error--name'),
      messagePhone: document.querySelector('.modal-form__error--phone'),
      messageCheck: document.querySelector('.modal-form__error--check'),
      errClassName: 'modal-form__error--hidden',
      submit() {
        modalForm.classList.add('_hidden');
        modalresponse.classList.remove('_hidden');
      }
    });

    const modalHeader = document.querySelector('.modal-header');
    const slides = document.querySelectorAll('.modal-footer-slider__button');

    slides.forEach(button => {
      button.addEventListener('click', (e) => {
        const image = button.innerHTML;
        button.innerHTML = modalHeader.innerHTML;
        modalHeader.innerHTML = image;
      });
    });

    const modal = new ModalGoody({
      isOpen: (modal) => {
        modalHeader.innerHTML = mainButton.innerHTML;
        for (let i = 0; i < slides.length; i++) {
          slides[i].innerHTML = buttons[i].innerHTML;
        }
      },
      isClose: (modal) => {
        modalForm.classList.remove('_hidden');
        modalresponse.classList.add('_hidden');
      },
    });
  }
});
