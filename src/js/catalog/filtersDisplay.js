import { $$ } from '../plugins/choozzie.js';
import {
  selectFilterCategoryOpt,
  selectFilterPriceOpt,
  selectFilterColorOpt,
  selectFilterSaleOpt,
} from './filterSelect.js';

const filtersDisplay = {
  classNameList: "catalog-filters__list",
  classNameListApplied: "catalog-filters-applied",
  classNameItemApplied: "catalog-filters-applied__item",
  classNameItemAppliedHidden: "catalog-filters-applied__item--hidden",
  list: document.querySelector(".catalog-filters__list"),
  buttons: document.querySelectorAll(".catalog-filters-applied-close"),

  chose(element, item) {
    const target = document.querySelector(`[data-target=${element.dataset.path}]`);

    if (element.dataset.path != 'category' && element.dataset.path != 'color') {
      target.querySelector(".catalog-filters-applied__value").textContent = item.displayName
        ? item.displayName : item.name;

      if (item.mod) {
        filtersDisplay.removeMod(target.classList);
        target.classList.add(`${filtersDisplay.classNameItemApplied}--${item.mod}`);
      }

    } else {
      const list = document.getElementById(`sublist_${element.dataset.path}`);
      const value = item.displayName ? item.displayName : item.name;
      const li = document.createElement('li');
      li.classList.add(`${filtersDisplay.classNameItemApplied}--${item.mod}`);
      li.classList.add('catalog-filters-applied__item');
      li.setAttribute('data-value-display', value);
      li.setAttribute('data-target', element.dataset.path);
      li.innerHTML = /*html*/`
            <button class="catalog-filters-applied-close"
                    data-path_close=${element.dataset.path}
            >
                    <svg class="catalog-filters-applied-close__icon"
                          aria-hidden="true"
                    >
                      <use xlink:href="img/svg/sprite.svg#close"></use>
                    </svg>
            </button>
            <span class="catalog-filters-applied__value">${value}</span>
          `;
      li.querySelector('.catalog-filters-applied-close').addEventListener('click', filtersDisplay.restartCheckbox);
      list.append(li);
      if (list.parentElement.classList.contains('_hidden')) list.parentElement.classList.remove('_hidden');
    }
  },
  choseDesktop(element) {
    if (element.parentElement.dataset.path == 'category' || element.parentElement.dataset.path == 'color') {
      const list = document.getElementById(`sublist_${element.parentElement.dataset.path}`);
      const value = element.parentElement.dataset.valueDisplayPath;
      const li = document.createElement('li');
      li.classList.add(`${filtersDisplay.classNameItemApplied}--${element.dataset.mod}`);
      li.classList.add('catalog-filters-applied__item');
      li.setAttribute('data-value-display', value);
      li.setAttribute('data-target', element.parentElement.dataset.path);
      li.innerHTML = /*html*/`
              <button class="catalog-filters-applied-close"
                      data-path_close=${element.parentElement.dataset.path}
                    >
                      <svg class="catalog-filters-applied-close__icon"
                            aria-hidden="true">
                            <use xlink:href="img/svg/sprite.svg#close"></use></svg>
              </button>
              <span class="catalog-filters-applied__value">${value}</span>
            `;
      li.querySelector('.catalog-filters-applied-close').addEventListener('click', filtersDisplay.restartCheckboxDesktop);
      list.append(li);
      if (list.parentElement.classList.contains('_hidden')) list.parentElement.classList.remove('_hidden');
    } else {
      const target = document.querySelector(`[data-target=${element.name}]`);
      if (element.dataset.name) {
        target.querySelector(".catalog-filters-applied__value").textContent = element.dataset.name;
      } else {
        target.querySelector(".catalog-filters-applied__value").textContent = element.parentNode.textContent;
      }
      filtersDisplay.removeMod(target.classList);
      target.classList.add(`${filtersDisplay.classNameItemApplied}--${element.dataset.mod}`);
    }
  },
  removeMod(itemClassList) {
    itemClassList.forEach((item) => {
      if (item !== filtersDisplay.classNameItemAppliedMarginRight) {
        if (item.indexOf("--") > 0) itemClassList.remove(item);
      }
    });
  },
  restartAppliedItemDesktop(e) {
    const list = document.getElementById(`sublist_${e.target.parentElement.dataset.path}`);
    const item = list.querySelector(`[data-value-display=${e.target.parentElement.dataset.valueDisplayPath}]`);
    list.removeChild(item);
    if (list.childNodes.length == 0) list.parentElement.classList.add('_hidden');
  },
  restartCheckboxDesktop(e) {
    const parent = e.target.parentElement;
    const itemPath = parent.dataset.valueDisplay;
    const list = document.getElementById(`sublist_${parent.dataset.target}`);
    const checkboxLabel = document.querySelectorAll(`[data-value-display-path=${itemPath}]`);
    checkboxLabel.forEach(item => item.children[0].checked = false);
    parent.querySelector('.catalog-filters-applied-close').removeEventListener('click', filtersDisplay.restartCheckbox);
    if (parent.parentNode) parent.parentNode.removeChild(parent);
    if (list.childNodes.length == 0) list.parentElement.classList.add('_hidden');
  },
  restartAppliedItem(e) {
    const list = document.getElementById(`sublist_${e.target.dataset.path}`);
    const item = list.querySelector(`[data-value-display=${e.target.dataset.valueDisplayPath}]`);
    list.removeChild(item);
    if (list.childNodes.length == 0) list.parentElement.classList.add('_hidden');
  },
  restartCheckbox(e) {
    const parent = e.target.parentElement;
    const itemPath = parent.dataset.valueDisplay;
    const list = document.getElementById(`sublist_${parent.dataset.target}`);
    const checkboxLabel = document.querySelector(`[data-value-display-path=${itemPath}]`);
    checkboxLabel.children[0].checked = false;
    parent.querySelector('.catalog-filters-applied-close').removeEventListener('click', filtersDisplay.restartCheckbox);
    if (parent.parentNode) parent.parentNode.removeChild(parent);
    if (list.childNodes.length == 0) list.parentElement.classList.add('_hidden');
  },

  start(props) {
    const opts = [
      selectFilterCategoryOpt,
      selectFilterSaleOpt,
      selectFilterColorOpt,
    ].forEach((opt) => {
      opt.items.forEach((i) => {
        i.onClick = (element, item, event) => {
          if (element.dataset.path != 'category' && element.dataset.path != 'color') {
            filtersDisplay.chose(element, item);
          } else {
            if (event.target.children[0].checked) {
              filtersDisplay.restartAppliedItem(event);
            } else {
              filtersDisplay.chose(element, item);
            }
          }
        };
      });
    });

    selectFilterPriceOpt.onClose = () => {
      props.priceInputs.fromFilter();
      props.priceInputs.toFilter();
    };
    // selectFilterPriceOpt.items[0].onClose = () => props.filters.fromFilter();
    // selectFilterPriceOpt.items[1].onClose = () => props.filters.toFilter();

    const selectFilterCategory = $$.choozzie.create(selectFilterCategoryOpt);
    const selectFilterPrice = $$.choozzie.create(selectFilterPriceOpt);
    const selectFilterColor = $$.choozzie.create(selectFilterColorOpt);
    const selectFilterSale = $$.choozzie.create(selectFilterSaleOpt);

    const selectsArr = [
      selectFilterCategory,
      selectFilterPrice,
      selectFilterSale,
      selectFilterColor,
    ];

    filtersDisplay.buttons.forEach((item) => {
      item.addEventListener("click", (e) => {
        const targetPath = e.target.dataset.path_close;
        selectsArr.forEach((item) => {
          if (item.opt.dataSet.value === targetPath) {
            if (targetPath != 'category' && targetPath != "color") {
              if (window.screen.width <= 1300) item.reset(item.opt.element);
              else {
                document.querySelectorAll(`[name=${targetPath}]`).forEach(radio => {
                  radio.checked = false;
                });
              }
              const parent = e.target.parentNode;
              filtersDisplay.removeMod(parent.classList);
              parent.classList.add(`${filtersDisplay.classNameItemApplied}--hidden`);
              // parent.children[0].textContent = item.opt.placeholder;
              if (targetPath === "price") {
                props.slider.sliderReset();
                document.getElementById('amount_from').value = '';
                document.getElementById('amount_to').value = '';
              }
            } else {
              filtersDisplay.restartCheckbox(e);
            }
          }
        });
      });
    });

    // category && colors
    if (window.screen.width < 1300) {
      const filterInputs = document.querySelectorAll('.catalog-filters__radio-input--hidden');
      filterInputs.forEach(element => {
        if (element.checked) {
          let item = null;
          if (element.parentElement.dataset.path == 'category') {
            selectFilterCategoryOpt.items.map(i => {
              if (i.name == element.parentElement.dataset.valueDisplayPath) item = i;
            });
          }
          if (element.parentElement.dataset.path == 'color') {
            selectFilterColorOpt.items.map(i => {
              if (i.name == element.parentElement.dataset.valueDisplayPath) item = i;
            });
          }
          if (element.parentElement.dataset.path == 'price') {
            selectFilterSaleOpt.items.map(i => {
              if (i.name == element.parentElement.dataset.valueDisplayPath) item = i;
            });
          }
          if (item) filtersDisplay.chose(element.parentElement, item);
        }
      });
    }
  }
}



export { filtersDisplay }