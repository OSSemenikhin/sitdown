import { addHeaderScripts } from './header/addHeaderScripts.js';
import { addHeroSlider } from './main/heroSlider.js';
import { addListenersToForm } from './layouts/validateForm.js';

document.addEventListener("DOMContentLoaded", () => {
  // HEADER
  addHeaderScripts();

  if (window.location.pathname == '/') {
    // SWIPERS
    const ariaButtonsSwiperMessage = {
      prevSlideMessage: "Предыдущий слайд",
      nextSlideMessage: "Следующий слайд",
      paginationBulletMessage: "Перейти к слайду {{index}}",
    };

    if (document.querySelector(".hero-slider")) {
      addHeroSlider(ariaButtonsSwiperMessage);
    }

    if (document.querySelector(".special-slider")) {
      const specialOffersSlider = new Swiper(".special-slider", {
        navigation: {
          prevEl: ".special-slider-buttons-prev",
          nextEl: ".special-slider-buttons-next",
        },
        a11y: ariaButtonsSwiperMessage,
        breakpoints: {
          512: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 33,
          },
          1300: {
            slidesPerView: "auto",
            spaceBetween: 33,
          },
        },
      });
    }
    if (document.querySelector(".useful-slider")) {
      const usefulSlider = new Swiper(".useful-slider", {
        navigation: {
          prevEl: ".useful-slider-buttons-prev",
          nextEl: ".useful-slider-buttons-next",
        },
        a11y: ariaButtonsSwiperMessage,
        breakpoints: {
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 30,
          },
          1300: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 30,
          },
        },
      });
    }


    // TOOLTIP
    const tooltipFeedbackButton = document.getElementById("feedback_tooltip_button");
    const tooltipFeedbackText = document.getElementById("feedback_tooltip_text");

    // EVENTLISTENER CLICK
    document.addEventListener("click", (e) => {
      // TOOLTIP FEEDBACK
      if (tooltipFeedbackButton) {
        if (e.target == tooltipFeedbackButton) {
          tooltipFeedbackText.classList.toggle("open");
        } else {
          if (tooltipFeedbackText.classList.contains("open")) {
            tooltipFeedbackText.classList.remove("open");
          }
        }
      }
    });

    // FORM
    const sendForm = document.querySelector('.feedback-form');
    addListenersToForm({
      sendForm: sendForm,

      nameInput: sendForm.querySelector('[placeholder="Как вас зовут?"]'),
      messageName: document.querySelector('.feedback-form__error--name'),

      phoneInput: sendForm.querySelector('[placeholder="Ваш телефон"]'),
      messagePhone: document.querySelector('.feedback-form__error--phone'),

      emailInput: sendForm.querySelector('[placeholder="Ваш e-mail"]'),
      messageEmail: document.querySelector('.feedback-form__error--email'),

      checkInput: sendForm.querySelector('.feedback-form__checkbox--hidden'),
      messageCheck: document.querySelector('.feedback-form__error--check'),

      errClassName: 'feedback-form__error--hidden',

      submit() {
        console.log('submited');
      }
    });
  }
});

