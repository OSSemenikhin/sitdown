export class ModalGoody {
  constructor(options) {
    let defaultOptions = {
      isOpen: () => { },
      isClose: () => { },
    }
    this.options = Object.assign(defaultOptions, options);
    this.modal = document.querySelector('.modal');
    this.fixBlocks = document.querySelectorAll('.fix-block');
    this.speed = false;
    this.animation = false;
    this.isOpen = false;
    this.modalContainer = false;
    this.previosActiveElement = false;
    this.typeInfo = false;
    this.selectEl = false;
    this.focusElements = [
      'a[href]',
      'input',
      'button',
      'select',
      'textarea',
      '[tabindex]',
    ];
    this.events()
  }
  events() {
    if (this.modal) {
      document.addEventListener('click', function (e) {
        const clickedElement = e.target.closest('[data-goody-path]');
        if (clickedElement) {
          let target = clickedElement.dataset.goodyPath;
          let animation = clickedElement.dataset.goodyAnimation;
          let speed = clickedElement.dataset.goodySpeedIn;
          let speedOut = clickedElement.dataset.goodySpeedOut;
          let typeInfo = clickedElement.dataset.modalType;
          let select = clickedElement.dataset.modalSelect;
          this.animation = animation ?? 'fade';
          this.speed = speed ? parseInt(speed) : 300;
          this.speedOut = speedOut ? parseInt(speedOut) : 100;
          this.modalContainer = document.querySelector(`[data-goody-target="${target}"]`);
          this.typeInfo = typeInfo ?? false;
          this.select = select === "true" ? true : false;
          if (this.modalContainer) this.open();
          return;
        }
        if (e.target.closest('.modal__close')) {
          this.close();
          return;
        }
        if (!e.target.classList.contains('modal__container') &&
          !e.target.closest('.modal__container') &&
          this.isOpen
        ) {
          this.close();
        }
      }.bind(this));

      window.addEventListener('keydown', function (e) {
        if (e.keyCode == 27 && this.isOpen) this.close();
        if (e.keyCode == 9) {
          this.focusCatch(e);
          return;
        }
      }.bind(this));
    }
  }

  open(selector) {
    this.previosActiveElement = document.activeElement;
    this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);
    this.modal.classList.add('modal--open');
    this.disableScroll();

    this.modalContainer.classList.add('modal--open');
    this.modalContainer.classList.add(`modal__animation--${this.animation}`);

    this.isOpen = true;
    this.focusTrap();

    setTimeout(() => {
      this.options.isOpen(this);
      this.modalContainer.classList.add('modal__animate--open');
    }, this.speed);
  }
  close() {
    if (this.modalContainer) {
      this.modalContainer.classList.remove('modal__animate--open');
      setTimeout(() => {
        this.modalContainer.classList.remove(`modal__animation--${this.animation}`);
        this.modal.classList.remove('modal--open');
        this.modalContainer.classList.remove('modal--open');
        this.enableScroll();
        this.isOpen = false;
        this.focusTrap();
        this.options.isClose(this);
      }, this.speedOut);
    }
  }

  focusCatch(e) {
    if (this.isOpen) {
      const focusable = this.modalContainer.querySelectorAll(this.focusElements);
      const focusArray = Array.prototype.slice.call(focusable);
      const focusedIndex = focusArray.indexOf(document.activeElement);

      if (e.shiftKey && focusedIndex === 0) {
        focusArray[focusArray.length - 1].focus();
        e.preventDefault();
      }
      if (!e.shiftKey && focusedIndex === (focusArray.length - 1)) {
        focusArray[0].focus();
        e.preventDefault();
      }
    }
  }

  focusTrap() {
    const focusable = this.modalContainer.querySelectorAll(this.focusElements);
    if (this.isOpen) {
      if (focusable) {
        setTimeout(() => {
          focusable[0].focus();
        }, 100);
      }
    } else {
      this.previosActiveElement.focus();
    }
  }
  disableScroll() {
    let pagePosition = window.scrollY;
    this.lockPadding();
    document.body.classList.add('disable-scroll');
    document.body.dataset.goodyPosition = pagePosition;
    document.body.style.top = -pagePosition + 'px';
  }

  enableScroll() {
    let pagePosition = parseInt(document.body.dataset.goodyPosition, 10);
    this.unlockPadding();
    document.body.style.top = 'auto';
    document.body.classList.remove('disable-scroll');
    window.scroll({ top: pagePosition, left: 0 });
    document.body.removeAttribute('data-goody-position');
  }

  lockPadding() {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    this.fixBlocks.forEach(el => el.style.paddingRight = paddingOffset);
    document.body.style.paddingRight = paddingOffset;
  }

  unlockPadding() {
    this.fixBlocks.forEach(el => el.style.paddingRight = '0px');
    document.body.style.paddingRight = '0px';
  }
}
