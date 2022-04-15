export const addBurger = () => {
  const menuOpenButton = document.getElementById("burger");
  const menuCloseButton = document.getElementById("burger__close");
  const menuNav = document.getElementById("nav-menu__mobile");

  const burger = {
    buttonOpen: menuOpenButton,
    buttonClose: menuCloseButton,
    elements: [menuNav, menuOpenButton, menuCloseButton],
    open() {
      this.elements.forEach((el) => el.classList.add("open"));
    },
    close() {
      this.elements.forEach((el) => el.classList.add("temporaryClose"));
      const closeMenu = () => {
        this.elements.forEach((el) => el.classList.remove("open"));
        this.elements.forEach((el) => el.classList.remove("temporaryClose"));
      };
      setTimeout(closeMenu, 300);
    },
  }
  document.addEventListener("click", (e) => {
    if (e.target == burger.buttonOpen) {
      burger.open();
    } else if (e.target == burger.buttonClose) {
      burger.close();
    } else if (
      e.target != burger.buttonOpen &&
      e.target != burger.buttonClose &&
      menuNav.classList.contains("open")
    ) {
      burger.close();
    }
  });
}