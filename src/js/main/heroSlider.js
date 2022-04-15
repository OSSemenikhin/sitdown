export const addHeroSlider = (ariaButtonsSwiperMessage) => {
  // Animation
  const animation = () => {
    const circles = document.querySelectorAll('.animation');
    value = stepLength;

    const update = (circles) => {
      value += stepLength;
      const offset = +(-progressLength - progressLength * value / progressLength).toFixed(2);
      circles.forEach(circle => circle.setAttribute('stroke-dashoffset', offset));
      if (value >= progressLength - 17.4) {
        slideChange();
        clearInterval(start);
      }
    }

    const start = setInterval(() => update(circles), stepTime);
    swiper.stopAnimation =  () => clearInterval(start);
  }

  const swiper = new Swiper(".hero-slider", {
    autoplayDisabbled: false,
    animation: () => animation(),
    speed: 300,
    pagination: {
      el: ".hero-slider-pagination__wrapper",
      clickable: true,
    },
    a11y: ariaButtonsSwiperMessage,
  });

  swiper.on('sliderFirstMove', () => cancelAnim());

  swiper.on('slideChange', function () {
    const activeCircles = document.querySelectorAll(`[data-index="${swiper.activeIndex}"]`);
    bulletsCrc.forEach(bullet => {
      if (bullet.classList.contains('active')) bullet.classList.remove('active');
      if (bullet.classList.contains('animation')) bullet.classList.remove('animation');
    });
    activeCircles.forEach(circle => circle.classList.add('active'));
    if (!swiper.params.autoplayDisabbled) {
      activeCircles.forEach(circle => circle.classList.add('animation'));
    }
  });

  // Add animated elements
  const bullets = document.querySelectorAll('.swiper-pagination-bullet');
  bullets.forEach(bullet => bullet.classList.add('hero-slider-pagination__bullet'));
  const bulletsR = (bullets[0].offsetWidth - 4) / 2;
  let ind = -1;
  bullets.forEach(bullet => {
    ind++;
    // Cancel animation when click on bullet
    bullet.addEventListener('click', () => cancelAnim());
    bullet.innerHTML = /*html*/`
        <svg
          class="hero-slider-pagination__icon"
          width="${bullet.offsetWidth + 2}"
          eight="${bullet.offsetHeight + 2}"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(${bulletsR + 2},${bulletsR + 2})">
            <circle r="${bulletsR}" class="hero-slider-pagination__base"/>
            <circle
              data-id="crc"
              data-index="${ind}"
              r="${bulletsR}"
              class="hero-slider-pagination__progress hero-slider-pagination__progress--front"
              transform="rotate(5)"
            />
          </g>
        </svg>
      `;
  });
  // style="stroke-dashoffset: ${Math.PI * 2 * bulletsR}; stroke-dasharray: ${Math.PI * 2 * bulletsR + 1.5}"
  const bulletsCrc = document.querySelectorAll('[data-id="crc"]');
  const correctRadius = bulletsR + 3;
  const progressLength = +(Math.PI * 2 * correctRadius).toFixed(2);
  const progressLengthFront = +(Math.PI * 2 * correctRadius + 1.5).toFixed(2);
  const stepLength = progressLength / 1000;
  const fullTime = 5000;
  const stepTime = fullTime / 1000;
  let value = 0;

  bulletsCrc.forEach(circle => {
    if (!circle.classList.contains('hero-slider-pagination__progress--back')) {
      circle.setAttribute('stroke-dasharray', progressLengthFront);
    } else {
      circle.setAttribute('stroke-dasharray', progressLength);
    }
  });

  // Animation start
  if (!swiper.params.autoplayDisabbled) {
    const first = document.querySelectorAll(`[data-index="0"]`);
    first.forEach(circle => {
      circle.classList.add('active');
      circle.classList.add('animation');
    });
  }
  swiper.params.animation();

  // Change slide
  const slideChange = () => {
    const check = document.querySelector(`[data-index="${swiper.activeIndex + 1}"]`);
    if (check) swiper.slideTo((swiper.activeIndex + 1));
    else swiper.slideTo(0);
    swiper.stopAnimation();
    swiper.params.animation();
  }

  //  Cancel animation function
  const cancelAnim = () => {
    swiper.stopAnimation();
    swiper.params.autoplayDisabbled = true;
    bulletsCrc.forEach(bullet => {
      if (bullet.classList.contains('animation')) bullet.classList.remove('animation');
      bullet.removeAttribute('style');
      bullet.removeAttribute('stroke-dashoffset');
      bullet.removeEventListener('click', () => cancelAnim());
    });
  }
}