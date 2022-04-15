import { filtersDisplay } from './catalog/filtersDisplay.js';
import { addPanel } from './catalog/leftPanel.js';

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname == '/catalog.html') {

    // PANEL
    const panel = addPanel(filtersDisplay);

    // FILTERS
    filtersDisplay.start({
      priceInputs: panel.toFilterPrice,
      slider: panel.slider,
    });

    // TABS
    let buttonsCount = 3;
    let visibleElements = 6;
    if (window.screen.width >= 1024) {
      buttonsCount = 2;
      visibleElements = 9;
    }
    const tabsButtonsWrapper = document.querySelector(".catalog-buttons");
    for (let i = 0; i < buttonsCount; i++) {
      const button = document.createElement('button');
      button.textContent = i + 1;
      button.classList.add("catalog-buttons__button");
      button.classList.add("button-nofilled");
      if (i == 0) button.classList.add("active");
      button.setAttribute('data-path', `page_${i + 1}`);
      tabsButtonsWrapper.append(button);
    }

    const items = document.querySelectorAll(".catalog__item");
    let page = 1;
    let itemCount = 1;
    items.forEach(item => {
      if (itemCount > visibleElements) {
        itemCount = 1;
        page++;
      }
      item.setAttribute('data-target', `page_${page}`);
      itemCount++;
    });
    for (let i = 0; i < visibleElements; i++) {
      items[i].classList.remove("catalog__item--hidden");
    }
    const tabsButtons = document.querySelectorAll(".catalog-buttons__button");
    tabsButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        items.forEach((item) => {
          if (
            !item.classList.contains("catalog__item--hidden") &&
            item.dataset.target !== e.target.dataset.path
          ) {
            item.classList.add("catalog__item--hidden");
          }
          if (
            item.dataset.target === e.target.dataset.path &&
            item.classList.contains("catalog__item--hidden")
          ) {
            item.classList.remove("catalog__item--hidden");
          }
        });
        tabsButtons.forEach((button) => {
          if (button.classList.contains("active"))
            button.classList.remove("active");
          e.target.classList.add("active");
        });
      });
    });
  }
});
