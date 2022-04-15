const addPanel = (filtersDisplay) => {
  // category && colors radio
  const desktopFilterCategory = document.querySelectorAll('.catalog-panel-category__input');
  const desktopFilterColors = document.querySelectorAll('.catalog-panel-color__input');
  [
    desktopFilterCategory,
    desktopFilterColors
  ].forEach(elements => {
    elements.forEach(element => {
      if (window.screen.width >= 1300) {
        if (element.checked) filtersDisplay.choseDesktop(element);
      }
      element.addEventListener('click', (e) => {
        if (element.checked) filtersDisplay.choseDesktop(element);
        else filtersDisplay.restartAppliedItemDesktop(e);
      });
    });
  });

  // sales radio

  const desktopFilterSale = document.querySelectorAll('.catalog-panel-discount__input');
  desktopFilterSale.forEach(element => {
    if (window.screen.width >= 1300) {
      if (element.checked) filtersDisplay.choseDesktop(element);
    }
    element.addEventListener('click', (e) => filtersDisplay.choseDesktop(element));
  });


  // price inputs
  // Slider

  const checkVisible = () => {
    const priceDisplayItem = document.getElementById("display_price");
    if (priceDisplayItem.classList.contains("catalog-filters-applied__item--hidden")) {
      priceDisplayItem.classList.remove("catalog-filters-applied__item--hidden");
      priceDisplayItem.classList.add("catalog-filters-applied__item--yellow");
    }
  }

  const sliderReset = (valurFrom = 0, valueTo = 150000) => {
    const slider = $("#slider-range").slider({
      range: true,
      min: 2000,
      max: 150000,
      values: [valurFrom, valueTo],
      slide: function (event, ui) {
        $("#amount_from").val(ui.values[0]);
        $("#amount_to").val(ui.values[1]);
        checkVisible();
        const priceDisplay = document.getElementById("display_price_count");
        priceDisplay.innerHTML = "До " + ui.values[1];
      }
    });
    $("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));
    const sliderUiItems = document.querySelectorAll('.ui-state-default');
    sliderUiItems.forEach(item => {
      item.addEventListener('mousedown', () => item.parentElement.children[0].classList.add('active'));
      document.addEventListener('mouseup', () => item.parentElement.children[0].classList.remove('active'));
      document.addEventListener('keyup', (e) => {
        if (
          sliderUiItems[0] == document.activeElement ||
          sliderUiItems[1] == document.activeElement
        ) {
          item.parentElement.children[0].classList.add('focused');
          if (sliderUiItems[0] == document.activeElement) {
            sliderUiItems[0].classList.add('focused');
            sliderUiItems[1].classList.remove('focused');
          } else if (sliderUiItems[1] == document.activeElement) {
            sliderUiItems[1].classList.add('focused');
            sliderUiItems[0].classList.remove('focused');
          }
        } else {
          item.parentElement.children[0].classList.remove('focused');
          item.classList.remove('focused');
        }
      });
    });
    return slider;
  };
  sliderReset();

  let panelPriceInputTo;
  let panelPriceInputFrom;
  const getInputs = () => {
    if (window.screen.width >= 1300) {
      panelPriceInputTo = document.getElementById('amount_to');
      panelPriceInputFrom = document.getElementById('amount_from');
    } else {
      panelPriceInputTo = document.querySelector('.catalog-filters__input--to');
      panelPriceInputFrom = document.querySelector('.catalog-filters__input--from');
    }
  }

  const panelPriceInputActionTo = () => {
    checkVisible();
    getInputs();
    const itemFilterPrice = document.getElementById('display_price');
    const displayFilterPrice = itemFilterPrice.querySelector('.catalog-filters-applied__value');
    const fromValue = panelPriceInputFrom.value > '' ? panelPriceInputFrom.value : 2000;
    if (panelPriceInputTo.value > 0 &&
      panelPriceInputTo.value > Number(fromValue) &&
      Number(panelPriceInputTo.value) < 150000
    ) {

      displayFilterPrice.textContent = `До ${panelPriceInputTo.value}`;
      if (window.screen.width >= 1300) {
        sliderReset(fromValue, panelPriceInputTo.value);
      }
    } else if (
      panelPriceInputTo.value > 0 &&
      panelPriceInputTo.value <= Number(fromValue) &&
      Number(panelPriceInputTo.value) < 150000
    ) {
      if (window.screen.width >= 1300) {
        sliderReset(fromValue, Number(fromValue) + 1);
      }
      displayFilterPrice.textContent = `До ${Number(fromValue) + 1}`;
      panelPriceInputTo.value = Number(fromValue) + 1;
    } else {
      if (window.screen.width >= 1300) {
        sliderReset(fromValue, 150000);
      }
      panelPriceInputTo.value = '150000';
      displayFilterPrice.textContent = `До 150 000`;
    }
  }
  function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  const panelPriceInputActionFrom = () => {
    checkVisible();
    getInputs();
    const fromValue = panelPriceInputTo.value > '' ? panelPriceInputTo.value : 150000;
    if (panelPriceInputFrom.value > 0 &&
      panelPriceInputFrom.value < Number(fromValue) &&
      Number(panelPriceInputFrom.value) > 2000
    ) {
      if (window.screen.width >= 1300) {
        sliderReset(panelPriceInputFrom.value, fromValue);
      }
    } else if (
      panelPriceInputFrom.value > 0 &&
      panelPriceInputFrom.value >= Number(fromValue)
    ) {
      if (window.screen.width >= 1300) {
        sliderReset(Number(fromValue) - 1, fromValue);
      }
      panelPriceInputFrom.value = Number(fromValue) - 1;
    } else {
      if (window.screen.width >= 1300) {
        sliderReset(2000, fromValue);
      }
      panelPriceInputFrom.value = '2000';
    }
  }
  const fromFilter = debounce(() => panelPriceInputActionFrom());
  const toFilter = debounce(() => panelPriceInputActionTo());
  if (window.screen.width >= 1300) {
    document.getElementById('amount_to').addEventListener('input', toFilter);
    document.getElementById('amount_from').addEventListener('input', fromFilter);
  }



  // more buttons
  const categoryMore = document.getElementById('panel_category_more');
  categoryMore.addEventListener('click', (e) => moreButtonAction(categoryMore, 'catalog-panel-category__item--hidden', e));
  const colorMore = document.getElementById('panel_color_more');
  colorMore.addEventListener('click', (e) => moreButtonAction(colorMore, 'catalog-panel-color__item--hidden', e));

  const categoryCurtail = document.getElementById('panel_category_curtail');
  categoryCurtail.addEventListener('click', (e) => curtailButtonAction(categoryMore, 'catalog-panel-category__item', 9, e));

  const colorCurtail = document.getElementById('panel_color_curtail');
  colorCurtail.addEventListener('click', (e) => curtailButtonAction(colorMore, 'catalog-panel-color__item', 9, e));

  const moreButtonAction = (button, className, e) => {
    e.preventDefault();
    const hiddenItems = document.querySelectorAll(`.${className}`);
    hiddenItems.forEach(item => {
      item.classList.remove(className);
    });
    button.parentElement.classList.add(className);
    button.classList.add(className);
  }
  const curtailButtonAction = (button, className, count, e) => {
    e.preventDefault();
    const items = document.querySelectorAll(`.${className}`);
    for (let i = 0; i < items.length; i++) {
      if (i >= count) items[i].classList.add(`${className}--hidden`);
    }
    button.parentElement.classList.remove(`${className}--hidden`);
    button.classList.remove(`${className}--hidden`);
  }
  return {
    toFilterPrice: {
      fromFilter: () => panelPriceInputActionFrom(),
      toFilter: () => panelPriceInputActionTo(),
    },
    slider: {
      sliderReset: () => sliderReset(),
    }
  }
}

export { addPanel }