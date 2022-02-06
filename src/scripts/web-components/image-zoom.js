import Glide from '@glidejs/glide';

class ImageZoom extends HTMLElement {
  constructor() {
    super();

    this.selectors = {
      container: '[data-zoom-container]',
      closeBtn: '[data-close-btn]',
      glideCarousel: '[data-pdp-image-zoom-glide]'
    };

    this.container = document.querySelector(this.selectors.container);
    this.closeBtn = document.querySelector(this.selectors.closeBtn);
    this.closeBtn.addEventListener('click', this.onClickCloseHandler.bind(this));

  }
  
  open(pos) {

    // Using the go method causing an animated slide to the next slide
    // this.imageZoomGlider.go('=' + pos);
    // Creating a new instance with the startAt position works better

    const optionsFullScreen = { 
      type: 'carousel',
      animationDuration: 600,
      animationTimingFunc: 'ease-in-out',
      gap: 0,
      startAt: pos,
      perView: 1,
    };

    const glideCarousel = this.querySelector(this.selectors.glideCarousel);
    this.imageZoomGlider = new Glide(glideCarousel, optionsFullScreen).mount();

    // Initial attempts to use hidden and block, resulted in the images having heights and widths of 0
    // So we got it working with the invisible property instead
    this.container.classList.remove('invisible');
  }

  onClickCloseHandler() {
    this.imageZoomGlider.destroy()
    this.container.classList.add('invisible');
  }

}

customElements.define('image-zoom', ImageZoom);