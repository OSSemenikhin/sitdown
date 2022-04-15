import { addHeaderScripts } from './header/addHeaderScripts.js';
import { $$ } from './plugins/choozzie.js';

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname == '/contacts.html') {
    const baloon_1 = {
      city: 'Москва',
      name: 'SitDownPlsна Солянке',
      address: 'м. Китай-город ул. Солянка, д.24',
      tel: '+7 (495) 885-45-47',
      time: 'с 10:00 до 21:00',
      description: 'шоурум, пункт отгрузки, пункт выдачи, пункт обмена-возврата, сервисный центр',
      selectMenuName: 'moscow_1',
    }

    const baloon_2 = {
      city: 'Москва',
      name: 'SitDownPls на Покровке',
      address: 'м. Курская, ул. Покровка, д.14',
      tel: '+7 (495) 885-45-47',
      time: 'с 10:00 до 21:00',
      description: 'шоурум, пункт отгрузки, пункт выдачи, пункт обмена-возврата, сервисный центр',
      selectMenuName: 'moscow_2',
    }

    const baloonContent = (props) => {
      return /*html*/`
        <div class="contacts-map-popup">
          <h2 class="contacts-map-popup__title">${props.name}</h2>
          <p class="contacts-map-popup__address">${props.address}</p>
          <div class="contacts-map-popup-tel">
            <a class="contacts-map-popup-tel__link" href="#">
              <svg class="contacts-map-popup-tel__icon" aria-hidden="true">
                <use xlink:href="img/svg/sprite.svg#phone"></use>
              </svg>
              <span class="contacts-map-popup-tel__tel">${props.tel}</span>
            </a>
          </div>
          <div class="contacts-map-popup-hours">
            <p class="contacts-map-popup-hours__time"><span class="contacts-map-popup-hours__title">Часы работы: </span> ${props.time}</p>
          </div>
          <div class="contacts-map-popup-description">
            <p class="contacts-map-popup-description__text"><span class="contacts-map-popup-hours__title">Что здесь: </span> ${props.description}</p>
          </div>
        </div>
        `;
    }

    ymaps.ready(init);
    function init() {
      // Создание карты.
      var map = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [55.755, 37.63700],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 14,
        controls: [],
      });

      const icon = {
        iconLayout: 'default#image',
        // iconImageHref: '../img/Vector.svg',
        iconImageHref: '../img/placemark.svg',
        iconImageSize: [32, 21],
        // balloonPane: 'outerBalloon',
      }

      var placemark_1 = new ymaps.Placemark([55.7509, 37.6419], {
        balloonContent: baloonContent(baloon_1),
      }, icon);
      var placemark_2 = new ymaps.Placemark([55.76215, 37.653], {
        balloonContent: baloonContent(baloon_2),
      }, icon);
      map.geoObjects.add(placemark_1);
      map.geoObjects.add(placemark_2);
      baloon_1.placemark = () => placemark_1.balloon.open();
      baloon_2.placemark = () => placemark_2.balloon.open();
      baloon_1.setCenter = () => map.setCenter([55.76, 37.64, 14]);
      baloon_2.setCenter = () => map.setCenter([55.77, 37.645, 14]);

    }

    if (document.getElementById("search_select")) {
      const selectMenuItem = (props) => {
        return /*html*/`
            <p class="contacts-search__name">${props.city}, ${props.name}</p>
            <p class="contacts-search__address">${props.address}</p>
          `;
      }

      const searchSelectOpt = {
        element: "search_select",
        holdPlaceholder: true,
        input: {
          placeholder: 'Поиск магазина',
          filterItemsOnInput: true,
          errorEl: document.getElementById('map_error'),
          error() {
            if (this.errorEl.classList.contains('contacts-map-error--hidden')) {
              this.errorEl.classList.remove('contacts-map-error--hidden');
            }
          },
          removeError() {
            if (!this.errorEl.classList.contains('contacts-map-error--hidden')) {
              this.errorEl.classList.add('contacts-map-error--hidden');
            }
          },
        },
        items: [],
        classToAdd: {
          header: ["contacts-search__input"],
          current: ["contacts-search__current"],
          icon: ["contacts-search__icon"],
          list: ["contacts-search__list"],
          item: ["contacts-search__item"],
          option: ["contacts-search__option"],
        },
      };

      [
        baloon_1,
        baloon_2,
      ].forEach(baloon => {
        searchSelectOpt.items.push({
          name: selectMenuItem(baloon),
          secondName: baloon.selectMenuName,
          onClick() {
            baloon.placemark();
            baloon.setCenter();
          }
        });
      });
      const searchSelect = $$.choozzie.create(searchSelectOpt);
    }
  }
});