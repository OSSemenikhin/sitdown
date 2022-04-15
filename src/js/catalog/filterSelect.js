import { arrowDownSvg } from '../layouts/assets.js';

const classToAdd = {
  header: "catalog-filters__header",
  current: "catalog-filters__current",
  icon: "catalog-filters__icon",
  list: "catalog-filters__select",
  option: "catalog-filters__option catalog-filters__checkbox",
};

const hiddenCheckBox = 'catalog-filters__checkbox--hidden';
const visibleCheckBox = 'catalog-filters__checkbox--visible';

const selectFilterCategoryOpt = {
  element: "filter_category",
  placeholder: "Категория",
  holdPlaceholder: true,
  icon: arrowDownSvg,
  classToAdd: classToAdd,
  dataSet: { data: "path", value: "category" },
  checkBox: true,
  // checkedItem: 1,
  radioClassNameHidden: 'catalog-filters__radio-input catalog-filters__radio-input--hidden',
  radioClassName: 'catalog-filters__radio-input catalog-filters__radio-input--visible',
  collapse: false,
  maxItemsVisible: {
    max: 9,
    moreButtonListItemClassName: "",
    curtailListItemClassName: "",
    moreButtonClassName: "catalog-filters__more",
    moreButtonText: "+ ещё",
    moreButtonCount: true,
    curtailButtonClassName: "catalog-filters__more",
    curtailButtonText: "свернуть",
  },
  items: [
    { name: "Диваны", checked: true },
    { name: "Кресла" },
    { name: "Пуфы" },
    { name: "Кровати" },
    { name: "Тумбы" },
    { name: "Комоды" },
    { name: "Стулья" },
    { name: "Столы" },
    { name: "Аксессуары" },

    { name: "Диваны1" },
    { name: "Кресла1" },
    { name: "Пуфы1" },
    { name: "Кровати1" },
    { name: "Тумбы1" },
    { name: "Комоды1" },
    { name: "Стулья1" },
    { name: "Столы1" },
    { name: "Аксессуары1" },
    { name: "Стулья1" },
    { name: "Столы1" },
    { name: "Аксессуары1" },
  ],
};
selectFilterCategoryOpt.items.forEach(item => {
  item.dataSet = { data: "value-display-path", value: item.name };
  item.mod = "green";
});

const selectFilterPriceOpt = {
  element: "filter_price",
  placeholder: "Цена",
  icon: arrowDownSvg,
  classToAdd: {
    header: "catalog-filters__header catalog-filters__header--price",
    current: "catalog-filters__current catalog-filters__current--price",
    icon: "catalog-filters__icon catalog-filters__icon--price",
    list: "catalog-filters__select catalog-filters__select--price",
    option: "catalog-filters__option catalog-filters__option--price",
  },
  dataSet: { data: "path", value: "price" },
  collapse: false,
  holdPlaceholder: true,
  items: [
    {
      input: true,
      id: 'amount_from_mobile',
      classNameInput: 'catalog-filters__input catalog-filters__input--from',
      name: "от",
      classNameInputName: 'catalog-filters__input-name catalog-filters__input-name--from',
      placeholder: '2000',
    },
    {
      input: true,
      id: 'amount_to_mobile',
      classNameInput: 'catalog-filters__input catalog-filters__input--to',
      name: "до",
      classNameInputName: 'catalog-filters__input-name catalog-filters__input-name--to',
      placeholder: '150&#160;000',
    },
  ],
};
selectFilterPriceOpt.items.forEach(item => {
  item.dataSet = { data: "path", value: "price" };
  item.mod = "yellow";
});

const selectFilterSaleOpt = {
  element: "filter_sale",
  placeholder: "Скидка",
  icon: arrowDownSvg,
  classToAdd: classToAdd,
  dataSet: { data: "path", value: "sale" },
  radio: true,
  radioClassNameHidden: 'catalog-filters__radio-input catalog-filters__radio-input--hidden',
  radioClassName: 'catalog-filters__radio-input catalog-filters__radio-input--visible',
  collapse: false,
  holdPlaceholder: true,
  items: [
    {
      name: "> 5000",
      secondName: 'bigSale',
      displayName: 'от 5000',
    },
    {
      name: "< 5000",
      secondName: 'smallSale',
      displayName: 'до 5000',
    },
    {
      name: "Не важно",
      secondName: 'notImportant',
      displayName: 'Без скидки',
      checked: true,
    },
  ],
};
selectFilterSaleOpt.items.forEach(item => {
  item.dataSet = { data: "path", value: "sale" };
  item.mod = "violet";
});

const selectFilterColorOpt = {
  element: "filter_color",
  placeholder: "Цвет",
  icon: arrowDownSvg,
  classToAdd: classToAdd,
  dataSet: { data: "path", value: "color" },
  checkBox: true,
  checkedItem: 7,
  radioClassNameHidden: 'catalog-filters__radio-input catalog-filters__radio-input--category catalog-filters__radio-input--hidden',
  radioClassName: 'catalog-filters__radio-input catalog-filters__radio-input--visible',
  collapse: false,
  holdPlaceholder: true,
  maxItemsVisible: {
    max: 9,
    moreButtonListItemClassName: "",
    curtailListItemClassName: "",
    moreButtonClassName: "catalog-filters__more",
    moreButtonText: "+ ещё",
    moreButtonCount: true,
    curtailButtonClassName: "catalog-filters__more",
    curtailButtonText: "свернуть",
  },
  items: [
    { name: "Коричневый" },
    { name: "Черный" },
    { name: "Бежевый" },
    { name: "Серый" },
    { name: "Белый" },
    { name: "Синий" },
    { name: "Оранжевый", checked: true },
    { name: "Желтый" },
    { name: "Зеленый" },

    { name: "Бежевый1" },
    { name: "Серый1" },
    { name: "Белый1" },
    { name: "Синий1" },
    { name: "Оранжевый1" },
    { name: "Желтый1" },
    { name: "Зеленый1" },
  ],
};
selectFilterColorOpt.items.forEach(item => {
  item.dataSet = { data: "value-display-path", value: item.name };
  item.mod = "gray";
});

[
  selectFilterCategoryOpt,
  selectFilterPriceOpt,
  selectFilterColorOpt,
  selectFilterSaleOpt,
].forEach(opt => {
  opt.radioClassNameHidden += ` ${hiddenCheckBox}`;
  opt.radioClassName += ` ${visibleCheckBox}`;
});

export {
  selectFilterCategoryOpt,
  selectFilterPriceOpt,
  selectFilterColorOpt,
  selectFilterSaleOpt,
}