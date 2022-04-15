const $$ = {
  choozzie: {
    generateId() {
      const symbols =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let id = "_";
      while (id.length < 7) {
        const random = symbols[Math.floor(Math.random() * symbols.length)];
        id += random;
      }
      if (document.querySelector(`#${id}`)) choozzie.generateId();
      return id;
    },
    create(options) {
      /*
        OPTIONS
          options = {
            element: '',*
            current: num,*                                   --* current || placeholder
            placeholder: '',*                                --* current || placeholder
            icon: 'svg',*
            dataSet: { data: '', value: '', },
            items: [
              {
                name: '',
                dataSet: { data: '', value: '' },
                onClick: function,
              },
            ],
            classToAdd: {
              header: '',
              current: '',
              icon: '',
              list: '',
              item: '',
            },*
          }

        ATTR
        ${optionsDataSet} - for options.items.dataSet
        data-choozzie_value=${item.name}_${options.element} - for add options.items.onClick to addEventListener
        data-choozzie_target=${options.element} <> data-choozzie_current="${options.element}" - push data from target to current

        METh

      */
      let activeDescendant = null;
      if (!options.hasOwnProperty('collapse')) options.collapse = true;

      const createItem = (opt, ind, item, hidden = false) => {
        if (item.checked) activeDescendant = `aria-activedescendant=${options.element}_${ind + 1}`;
        const optionsDataSet = options.dataSet
          ? `data-${options.dataSet.data} = ${options.dataSet.value}`
          : "";
        const itemDataSet = item.dataSet
          ? `data-${item.dataSet.data} = ${item.dataSet.value}`
          : "";
        const classNameItem = options.classToAdd.item
          ? options.classToAdd.item + " "
          : "";
        const classNameOption = options.classToAdd.option
          ? options.classToAdd.option + " "
          : "";
        // if (hidden) classNameOption = classNameOption + " choozzie__option--hidden";
        const choozzieItemClass = hidden
          ? "choozzie__item choozzie__item--hidden"
          : "choozzie__item";

        // class="${choozzieItemClass}${classNameItem}"

        if (opt.checkBox) {
          const radioClassNameHidden = opt.radioClassNameHidden
            ? opt.radioClassNameHidden + " "
            : "";
          const radioClassName = opt.radioClassName
            ? opt.radioClassName + " "
            : "";
          return /*html*/ `
                            <li
                              id=${opt.element}_${ind + 1}
                              class="${classNameItem}${hidden ? "choozzie__item choozzie__item--hidden" : "choozzie__item"}"
                            >
                              <label
                                ${item.id ? 'id=' + item.id : ''}
                                class="${classNameOption}choozzie__option"
                                ${optionsDataSet}
                                ${itemDataSet}
                                data-choozzie_target=${opt.element}
                                data-choozzie_value=${item.secondName ? item.secondName : item.name}_${opt.element}
                                role="option"
                                tabindex="-1"
                                ${item.checked ? 'aria-selected="true"' : ''}
                              >
                                <input
                                  class="${radioClassNameHidden}choozzie__checkbox--hidden choozzie-no-close"
                                  type="checkbox"
                                  name=${opt.element}
                                  ${item.checked ? 'checked="true"' : ''}
                                >
                                <span class="${radioClassName}choozzie__checkbox"></span>
                                <span class="choozzie__name">
                                  ${item.name}
                                </span>
                              </label>
                            </li>`;
        } else if (opt.radio) {
          const radioClassNameHidden = opt.radioClassNameHidden
            ? opt.radioClassNameHidden + " "
            : "";
          const radioClassName = opt.radioClassName
            ? opt.radioClassName + " "
            : "";
          return /*html*/ `
                          <li
                            id=${opt.element}_${ind + 1}
                            class="${classNameItem}${hidden ? "choozzie__item choozzie__item--hidden" : "choozzie__item"}"
                          >
                            <label
                              ${item.id ? 'id=' + item.id : ''}
                              class="${classNameOption}choozzie__option"
                              ${optionsDataSet}
                              ${itemDataSet}
                              data-choozzie_target=${opt.element}
                              data-choozzie_value=${item.secondName ? item.secondName : item.name}_${opt.element}
                              role="option"
                              tabindex="-1"
                              ${item.checked ? 'aria-selected="true"' : ''}
                            >
                              <input
                                class="${radioClassNameHidden}choozzie__checkbox--hidden choozzie-no-close"
                                type="radio"
                                name=${opt.element}
                                ${item.checked ? 'checked="true"' : ''}
                              >
                              <span class="${radioClassName}choozzie__checkbox"></span>
                              <span class="choozzie__name">
                                ${item.name}
                              </span>
                            </label>
                          </li>`;
        } else if (item.input) {
          const classNameInput = item.classNameInput
            ? item.classNameInput + " "
            : "";
          const classNameInputName = item.classNameInputName
            ? item.classNameInputName + " "
            : "";
          return /*html*/ `<li
                              id=${opt.element}_${ind + 1}
                              class="${classNameItem}${hidden ? "choozzie__item choozzie__item--hidden" : "choozzie__item"}"
                            >
                              <label
                                ${item.id ? 'id=' + item.id : ''}
                                class="${classNameOption}choozzie__option"
                                ${optionsDataSet}
                                ${itemDataSet}
                                data-choozzie_target=${opt.element}
                                data-choozzie_value=${item.secondName ? item.secondName : item.name}_${opt.element}
                                role="option"
                                tabindex="-1"
                              >
                                <span class="${classNameInputName}choozzie__name">
                                  ${item.name}
                                </span>
                                <input
                                  class="${classNameInput}choozzie__input choozzie-no-close"
                                  type="text"
                                  placeholder=${item.placeholder}
                                >
                              </label>
                            </li>`;


        } else {
          hidden = opt.input
            ? opt.input.filterItemsOnInput ? true : false
            : hidden;
          return /*html*/ `
                            <li
                              id=${opt.element}_${ind + 1}
                              class="${classNameItem}${hidden ? "choozzie__item choozzie__item--hidden" : "choozzie__item"}"
                            >
                              <button
                                ${item.id ? 'id=' + item.id : ''}
                                class="${classNameOption}choozzie__option"
                                ${optionsDataSet}
                                ${itemDataSet}
                                data-choozzie_target=${opt.element}
                                data-choozzie_value=${item.secondName ? item.secondName : item.name}_${opt.element}
                                role="option"
                                tabindex="-1"
                              >
                                ${item.name}
                              </button>
                            </li>
                          `;
        }
      };

      const createMoreButton = () => {
        const listItemClass = options.maxItemsVisible.moreButtonListItemClassName
          ? options.maxItemsVisible.moreButtonListItemClassName + " "
          : "";
        const buttonClass = options.maxItemsVisible.moreButtonClassName
          ? options.maxItemsVisible.moreButtonClassName + " "
          : "";
        const text = options.maxItemsVisible.moreButtonText
          ? options.maxItemsVisible.moreButtonText
          : "more";
        const countDisp = options.maxItemsVisible.moreButtonCount
          ? " " + options.maxItemsVisible.countHidden
          : "";
        return /*html*/`
          <li id="${options.element}_more" class="${listItemClass}choozzie__item">
            <button id="${options.element}_more-button" class="${buttonClass}choozzie__more-button choozzie-no-close">
              ${text}${countDisp}
            </button>
          </li>
        `;
      }

      const createCurtailButton = () => {
        const listItemClass = options.maxItemsVisible.curtailListItemClassName
          ? options.maxItemsVisible.curtailListItemClassName + " "
          : "";
        const buttonClass = options.maxItemsVisible.moreButtonClassName
          ? options.maxItemsVisible.moreButtonClassName + " "
          : "";
        const text = options.maxItemsVisible.curtailButtonText
          ? options.maxItemsVisible.curtailButtonText
          : "more";
        return /*html*/`
          <li id="${options.element}_curtail" class="${listItemClass}choozzie__item choozzie__item--hidden">
            <button id="${options.element}_curtail-button" class="${buttonClass}choozzie__curtail-button choozzie__curtail-button--hidden choozzie-no-close">
              ${text}
            </button>
          </li>
        `;
      }

      const createItems = () => {
        let items = "";
        for (let i = 0; i < options.items.length; i++) {
          if (options.maxItemsVisible && i >= options.maxItemsVisible.max) {
            if (i == options.maxItemsVisible.max) {
              options.maxItemsVisible.countHidden = options.items.length - options.maxItemsVisible.max;
              items += createMoreButton();
              items += createItem(options, i, options.items[i], true);
            } else if (i === options.items.length - 1) {
              items += createItem(options, i, options.items[i], true);
              items += createCurtailButton();
            } else {
              items += createItem(options, i, options.items[i], true);
            }
          } else {
            items += createItem(options, i, options.items[i]);
          }
        }
        return items;
      };

      const classNameHeader = options.classToAdd.header
        ? options.classToAdd.header
        : "";
      const classNameCurrent = options.classToAdd.current
        ? options.classToAdd.current
        : "";
      const classNameIcon = options.classToAdd.icon
        ? options.classToAdd.icon
        : "";
      const classNameList = options.classToAdd.list
        ? options.classToAdd.list
        : "";
      const placeholder = options.current
        ? options.items[options.current - 1].name
        : options.placeholder;
      const setActiveDescendant = options.current
        ? `aria-activedescendant=${options.element}_${options.current}`
        : "";
      // if (options.checkedItem) activeDescendant = `aria-activedescendant=${options.element}_${options.checkedItem}`;

      const wrapper = document.getElementById(options.element);
      wrapper.classList.add("choozzie");
      if (options.dataSet) {
        wrapper.setAttribute(
          `data-${options.dataSet.data}`,
          `${options.dataSet.value}`
        );
      }
      const items = createItems(options);

      if (options.input) {
        wrapper.innerHTML = /*html*/ `
          <input class="${classNameHeader} choozzie__input choozzie-no-close"
                  id="${options.element}_input"
                  aria-haspopup="listbox"
                  aria-labelledby="${options.element}_input"
                  placeholder="${options.input.placeholder}"
                  type="text"
                  >
                    <span class="choozzie__aria-label"
                          id="${options.element}_aria-label"
                        >
                        Введите текст
                    </span>
          </button>
          <ul class="${classNameList} choozzie__list"
              id="${options.element}_list"
              role="listbox"
              tabindex="-1"
              aria-labelledby="ariaLabel"
              ${activeDescendant != null
                ? activeDescendant
                : setActiveDescendant}
              >${items}</ul>
        `;
      } else {
        wrapper.innerHTML = /*html*/ `
          <button class="${classNameHeader} choozzie__button"
                  id="${options.element}_button"
                  aria-haspopup="listbox"
                  aria-labelledby="${options.element}_button"
                  >
                  <span class="${classNameCurrent} choozzie__current"
                  data-choozzie_current="${options.element}"
                          >
                          ${placeholder}
                    </span>
                    <span class="${classNameIcon} choozzie__icon" aria-hidden="true">
                    ${options.icon}
                    </span>
                    <span class="choozzie__aria-label"
                          id="${options.element}_aria-label"
                        >
                        Нажмите на стрелку, чтобы выбрать элемент
                    </span>
          </button>
          <ul class="${classNameList} choozzie__list"
              id="${options.element}_list"
              role="listbox"
              tabindex="-1"
              aria-labelledby="ariaLabel"
              ${activeDescendant != null
                ? activeDescendant
                : setActiveDescendant}
              >${items}</ul>
        `;
      }

      const list = document.getElementById(`${options.element}_list`);
      const listPt = Number(getComputedStyle(list).paddingTop.slice(0, 3));
      const listPb = Number(getComputedStyle(list).paddingBottom.slice(0, 3));
      const listPaddingTopBottom = listPt + listPb;
      const listHeight = list.clientHeight - listPaddingTopBottom;
      const itemsNodes = list.childNodes;
      const itemsArr = Array.from(list.childNodes);
      let col = 1;
      let row = 1;
      let height = 0;
      for (let i = 0; i < itemsNodes.length; i++) {
        height = height + itemsNodes[i].clientHeight;
        if (height > listHeight) {
          col++;
          row = 1;
          height = itemsNodes[i].clientHeight;
        }
        itemsNodes[i].choozzieCol = col;
        itemsNodes[i].choozzieRow = row;
        row++;
      }
      const choozzie = {
        opt: options,
        button: options.input
          ? wrapper.querySelector(`#${options.element}_input`)
          : wrapper.querySelector(`#${options.element}_button`),
        list: list,
        itemsHTML: wrapper.querySelectorAll('.choozzie__option'),

        state: {
          open: false,
          activeDescendant: options.current
            ? `${options.element}_${options.current}`
            : activeDescendant,
          itemNodes: itemsNodes,
          itemArr: itemsArr,
          col: col,
        },

        chooseCurrent(element, event) {
          choozzie.opt.items.map((item) => {
            if (choozzie.opt.input) {
              if (element.dataset.choozzie_value.includes(item.secondName)) item.onClick(element, item, event);
            } else {
              if (element.textContent.trim() === item.name) {
                if (item.onClick) item.onClick(element, item, event);
              }
            }
          });
          const checkSelected = wrapper.querySelector('[aria-selected="true"]');
          if (checkSelected) checkSelected.removeAttribute("aria-selected");
          element.setAttribute("aria-selected", "true");
          const current = wrapper.querySelector(`[data-choozzie_current=${element.dataset.choozzie_target}]`);
          if (!choozzie.opt.holdPlaceholder) current.textContent = element.textContent.trim();
          choozzie.list.setAttribute(`aria-activedescendant`, element.parentElement.id);
        },

        reset(element) {
          if (choozzie.opt.radio) {
            const currentLabel = wrapper.querySelector('[aria-selected="true"]');
            currentLabel.removeAttribute('aria-selected');
            currentLabel.children[0].checked = false;
          }
          if (choozzie.opt.checkBox) {
            const currentLabel = wrapper.querySelectorAll('.choozzie__checkbox--hidden');
            currentLabel.forEach(checkbox => {
              checkbox.checked = false;
              if (checkbox.parentElement.hasAttribute('aria-selected')) {
                checkbox.parentElement.removeAttribute('aria-selected');
              }
            });
          }
          const current = document.querySelector(`[data-choozzie_current=${element}]`);
          current.textContent = options.placeholder;
          choozzie.state.activeDescendant = options.current
            ? `${options.element}_${options.current}`
            : null;
        },

        onClick(event) {
          if (event.target.dataset.choozzie_target) {
            choozzie.chooseCurrent(event.target, event);
            if (choozzie.opt.collapse) {
              choozzie.close();
            }
            choozzie.state.activeDescendant = event.target.parentElement.id;
          }
          else if (event.target !== choozzie.button &&
            !event.target.classList.contains('choozzie-no-close')) {
            choozzie.close();
          }
        },

        open() {
          // if (destroyed) return console.log('Choozzie is destroyed...');
          choozzie.list.classList.add("open");
          choozzie.button.classList.add("open");
          choozzie.button.setAttribute("aria-expanded", "true");
          choozzie.state.open = true;
          document.addEventListener("click", choozzie.onClick);
        },

        close() {
          if (choozzie.opt.onClose) choozzie.opt.onClose();
          choozzie.defocusItem();
          choozzie.list.classList.remove("open");
          choozzie.button.classList.remove("open");
          choozzie.button.removeAttribute("aria-expanded");
          document.removeEventListener("click", choozzie.onClick);
          choozzie.state.open = false;
        },

        focusItem(element) {
          choozzie.defocusItem();
          if (element) element.classList.add("focused");
        },

        defocusItem() {
          document
            .querySelectorAll(".focused")
            .forEach((element) => element.classList.remove("focused"));
        },

        choseFirstItem() {
          const firstItem = wrapper.querySelector(
            `#${choozzie.list.children[0].id}`
          );
          choozzie.focusItem(firstItem);
          choozzie.chooseCurrent(firstItem.children[0]);
          choozzie.state.activeDescendant = firstItem.id;
        },

        choseLastItem() {
          const items = wrapper.querySelectorAll(".choozzie__item");
          choozzie.focusItem(items[items.length - 1]);
          choozzie.chooseCurrent(items[items.length - 1].children[0]);
          choozzie.state.activeDescendant = items[items.length - 1].id;
        },

        choseNewCurrent(element) {
          choozzie.focusItem(element);
          if (element.children[0]) choozzie.chooseCurrent(element.children[0]);
          choozzie.state.activeDescendant = element.id;
        },

        checkDescendantAndOpen() {
          if (choozzie.state.activeDescendant === null) choozzie.choseFirstItem();
          else
            choozzie.focusItem(
              document.getElementById(choozzie.state.activeDescendant)
            );
          choozzie.open();
        },

        checkLastFocusedItem() {
          if (choozzie.state.activeDescendant)
            choozzie.focusItem(
              document.getElementById(choozzie.state.activeDescendant)
            );
          else choozzie.choseFirstItem();
        },

        _onKeyNextCurrent(current, t = 0) {
          const newCurrent = t == 0 ? current.nextElementSibling : current.previousElementSibling;
          if (newCurrent) {
            if (!newCurrent.classList.contains('choozzie__item--hidden')) return newCurrent;
            else choozzie._onKeyNextCurrent(newCurrent);
          } else {
            return false;
          }
        },

        _onKeyUpOrDown(type) {
          let newCurrent = document.getElementById(choozzie.state.activeDescendant);
          const checkAndCose = () => {
            let checkNewCurrent = type == "ArrowDown"
              ? choozzie._onKeyNextCurrent(newCurrent)
              : choozzie._onKeyNextCurrent(newCurrent, 1);
            if (checkNewCurrent) {
              choozzie.choseNewCurrent(checkNewCurrent);
              return true;
            } else return false;
          }
          if (wrapper.querySelector(".focused")) {
            const chose = checkAndCose();
            if (!chose) {
              if (newCurrent.classList.contains('choozzie__item--one')) choozzie.choseNewCurrent(newCurrent);
              else type == "ArrowDown"
                ? choozzie.choseFirstItem()
                : choozzie.choseLastItem();
            }
          } else {
            if (newCurrent.classList.contains('choozzie__item--hidden')) {
              const current = choozzie._onKeyNextCurrent(newCurrent);
              choozzie.choseNewCurrent(current);
            } else choozzie.choseNewCurrent(newCurrent);
          }
        },

        onKey(event) {
          const focused = wrapper.querySelector(".focused");
          switch (event.key) {
            case "Home":
              if (!choozzie.state.open) break;
              else choozzie.choseFirstItem();
              break;
            case "End":
              if (!choozzie.state.open) break;
              else choozzie.choseLastItem();
              break;
            case "Escape":
              choozzie.close();
              break;
            case "Tab":
              if (choozzie.state.open) choozzie.close();
              break;
            case "Enter":
              if (!choozzie.state.open) {
                choozzie.open();
                if (choozzie.state.activeDescendant !== null)
                  choozzie.focusItem(
                    document.getElementById(choozzie.state.activeDescendant)
                  );
              } else if (choozzie.state.open) {
                event.preventDefault();
                choozzie.close();
              }
              break;
            case "ArrowDown":
            case "ArrowUp":
              event.preventDefault();
              if (!choozzie.opt.input) {
                if (!choozzie.state.open) choozzie.checkDescendantAndOpen();
                else if (choozzie.state.open && !focused) choozzie.checkLastFocusedItem();
                else choozzie._onKeyUpOrDown(event.key);
              } else {
                if (choozzie.state.open) {
                  choozzie._onKeyUpOrDown(event.key);
                }
              }
              break;
            case "ArrowRight":
              event.preventDefault();
              if (choozzie.state.open && !focused) choozzie.checkLastFocusedItem();
              else if (choozzie.state.open && focused) {
                let itemToFocus = -1;
                for (const item of choozzie.state.itemArr) {
                  if (
                    item.choozzieCol === focused.choozzieCol + 1 &&
                    item.choozzieRow === focused.choozzieRow
                  ) {
                    itemToFocus = choozzie.state.itemNodes[choozzie.state.itemArr.indexOf(item)];
                  }
                }
                if (itemToFocus !== -1) choozzie.choseNewCurrent(itemToFocus);
                else {
                  if (focused.choozzieCol === choozzie.state.col) {
                    for (const item of choozzie.state.itemArr) {
                      if (
                        item.choozzieCol === 1 &&
                        item.choozzieRow === focused.choozzieRow
                      ) {
                        itemToFocus = choozzie.state.itemNodes[choozzie.state.itemArr.indexOf(item)];
                        choozzie.choseNewCurrent(itemToFocus);
                      }
                    }
                  } else choozzie.choseLastItem();
                }
              }
              break;
            case "ArrowLeft":
              event.preventDefault();
              if (choozzie.state.open && !focused)
                choozzie.checkLastFocusedItem();
              else if (choozzie.state.open && focused) {
                let itemToFocus = -1;
                for (const item of choozzie.state.itemArr) {
                  if (
                    item.choozzieCol === focused.choozzieCol - 1 &&
                    item.choozzieRow === focused.choozzieRow
                  ) {
                    itemToFocus = choozzie.state.itemNodes[choozzie.state.itemArr.indexOf(item)];
                  }
                }
                if (itemToFocus !== -1) choozzie.choseNewCurrent(itemToFocus);
                else if (focused.choozzieCol === 1) {
                  for (const item of choozzie.state.itemArr) {
                    if (
                      item.choozzieCol === choozzie.state.col &&
                      item.choozzieRow === focused.choozzieRow
                    ) {
                      itemToFocus = choozzie.state.itemNodes[choozzie.state.itemArr.indexOf(item)];
                      choozzie.choseNewCurrent(itemToFocus);
                    }
                    if (itemToFocus !== -1) choozzie.choseNewCurrent(itemToFocus);
                    else choozzie.choseLastItem();
                  }
                }
              }
              break;
          }
        },
        showMore() {
          wrapper.querySelectorAll('.choozzie__item--hidden').forEach(element => {
            element.classList.remove('choozzie__item--hidden');
          });
          wrapper.querySelector(`#${options.element}_more`).classList.add('choozzie__item--hidden');
        },
        curtail() {
          const limit = choozzie.opt.maxItemsVisible.max;
          const items = wrapper.querySelectorAll('.choozzie__item');
          for (let i = 0; i < items.length; i++) {
            if (i >= limit) items[i].classList.add('choozzie__item--hidden');
          }
          wrapper.querySelector(`#${options.element}_more`).classList.remove('choozzie__item--hidden');
        },

        _filterRemoveClasses(item) {
          [
            'one',
            'first',
            'last'
          ].forEach(c => {
            if (choozzie.opt.classToAdd &&
              choozzie.opt.classToAdd.item[0] &&
              item.classList.contains(`${choozzie.opt.classToAdd.item[0]}--${c}`)
            ) {
              item.classList.remove(`${choozzie.opt.classToAdd.item[0]}--${c}`);
            }
            if (item.classList.contains(`choozzie__item--${c}`)) {
              item.classList.remove(`choozzie__item--${c}`);
            }
            if (item.classList.contains('focused')) {
              item.classList.remove('focused');
            }
          });
        },

        _filterAddClasses(items) {
          choozzie.list.setAttribute(`aria-activedescendant`, `${choozzie.opt.element}_1`);
          choozzie.state.activeDescendant = `${choozzie.opt.element}_1`;
          if (items.length == 1) {
            if (choozzie.opt.classToAdd && choozzie.opt.classToAdd.item) {
              items[0].classList.add(`${choozzie.opt.classToAdd.item[0]}--one`);
            }
            items[0].classList.add('choozzie__item--one');
          }
          if (items.length > 1) {
            if (choozzie.opt.classToAdd && choozzie.opt.classToAdd.item) {
              items[0].classList.add(`${choozzie.opt.classToAdd.item[0]}--first`);
              items[items.length - 1].classList.add(`${choozzie.opt.classToAdd.item[0]}--last`);
            }
            items[0].classList.add('choozzie__item--first');
            items[items.length - 1].classList.add('choozzie__item--last');
          }
        },

        filterItemsOnInput(event) {
          const replaceSymb = /[\!\?\.\,\-\s+]/g;
          let value = choozzie.deleteHtmlTags(event.target.value).trim().toLowerCase().replace(replaceSymb, '');
          if (value.length >= 3) {
            if (choozzie.opt.input.removeError) choozzie.opt.input.removeError();
            choozzie.itemsHTML.forEach(item => {
              item.parentElement.classList.add('choozzie__item--hidden');
              choozzie._filterRemoveClasses(item.parentElement);
              const itemText = item.textContent.toLowerCase().replace(replaceSymb, '').trim();
              const check = itemText.indexOf(value);
              if (check > -1) {
                item.parentElement.classList.remove('choozzie__item--hidden');
              }
            });

            const items = wrapper.querySelectorAll('.choozzie__item');
            const itemsVisible = [];
            items.forEach(item => {
              if (!item.classList.contains('choozzie__item--hidden')) itemsVisible.push(item);
            });
            choozzie._filterAddClasses(itemsVisible);
            if (itemsVisible.length > 0) choozzie.open();
            else if (choozzie.opt.input.error) choozzie.opt.input.error();
            itemsVisible.forEach(item => item.classList.add('choozzie__transition'));
          } else {
            choozzie.close();
            if (choozzie.opt.input.removeError) choozzie.opt.input.removeError();
          }
        },

        deleteHtmlTags(value) {
          return value.replace(/<\/?[a-zA-Z]+>/gi, '');
        }
      };

      options.items.forEach((item) => {
        if (item.onClick) {
          const element = document.querySelector(
            `[data-choozzie_value=${item.secondName ? item.secondName : item.name}_${options.element}]`
          );
        }
      });

      if (!options.input) {
        choozzie.button.addEventListener("click", choozzie.open);

        choozzie.button.addEventListener("keydown", (e) => {
          choozzie.onKey(e);
        });
        choozzie.list.addEventListener("keydown", choozzie.onKey);

        if (wrapper.querySelector(`#${options.element}_more-button`)) {
          wrapper.querySelector(`#${options.element}_more-button`).addEventListener('click', choozzie.showMore);
          wrapper.querySelector(`#${options.element}_curtail-button`).addEventListener('click', choozzie.curtail);
        }
      } else {
        choozzie.button.addEventListener("input", choozzie.filterItemsOnInput);
        choozzie.button.addEventListener("keydown", e => {
          if (e.key == "ArrowDown" ||
            e.key == "ArrowUp"
          ) {
            choozzie.onKey(e);
          }
        });
        choozzie.button.addEventListener("click", choozzie.filterItemsOnInput);
      }
      return choozzie;
    },
  }
};
export { $$ };
