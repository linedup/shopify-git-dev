class ProductPdp extends HTMLElement {
  constructor() {
    super();

    this.selectors = {
      imageZoom: '[data-pdp-image-zoom]',
      imageZoomTrigger: '[data-image-zoom-trigger]'
    };

    this.imageZoom = document.querySelector(this.selectors.imageZoom);
    this.imageZoomTrigger = this.querySelectorAll(this.selectors.imageZoomTrigger);
    this.imageZoomTrigger.forEach (
      (trigger) => trigger.addEventListener('click', this.onImageClick.bind(this))
    );
  }

  onImageClick(evt) {
    this.imageZoom.open(evt.currentTarget.dataset.pos);
  }

}

customElements.define('product-pdp', ProductPdp);