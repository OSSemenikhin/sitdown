import {arrowDownSvg} from '../layouts/assets.js';

const selectRegionOpt = {
  element: "region__select",
  current: 1,
  icon: arrowDownSvg,
  items: [
    { name: "Москва" },
    { name: "Казань" },
    { name: "Уфа" },
    { name: "Пермь" },
  ],
  classToAdd: {
    header: ["header-region-select__header"],
    current: ["header-region-select__current"],
    icon: ["header-region-select__icon"],
    list: ["header-region-select__list"],
    item: ["header-region-select__item"],
    option: ["header-categories__option"],
  },
}

const selectCategoryOpt = {
  element: "categories__select",
  placeholder: "Категория",
  icon: arrowDownSvg,
  items: [
    { name: "Диваны" },
    { name: "Кресла" },
    { name: "Пуфы" },
    { name: "Кровати" },
    { name: "Тумбы" },
    { name: "Комоды" },
    { name: "Стулья" },
    { name: "Столы" },
    { name: "Аксессуары" },
    // { name: "Стулья" },
    // { name: "Столы" },
  ],
  classToAdd: {
    header: ["header-categories__header"],
    current: ["header-categories__current"],
    icon: ["header-categories__icon"],
    list: ["header-categories__list"],
    item: ["header-categories__item"],
    option: ["header-categories__option"],
  },
}

export {selectRegionOpt, selectCategoryOpt}