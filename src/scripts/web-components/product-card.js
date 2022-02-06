class ProductCard extends HTMLElement {
  constructor() {
    super();

    this.selectors = {
      isMobile: '[data-is-mobile]',
      productForm: '[data-product-form]',
      rolloverTrigger: '[data-rollover-trigger]',
      rollover: '[data-rollover]',
      colourSwatch: '[data-colour-swatch]',
      selectedColourSwatch: '[data-selected-colour-swatch]',
      quickBuyVariant: '[data-quickbuy-variant]',
      disabled: '[data-disabled]',
      imageSpinner1: '[data-image-spinner-1]',
      imageSpinner2: '[data-image-spinner-2]',
      basketSpinner: '[data-basket-spinner]',
      link: '[data-link]',
      mobileShowSizeTrigger: '[data-mobile-show-size-trigger]',
      image1: 'ajax-product-card-image-1',
      image2: 'ajax-product-card-image-2'
    };

    this.currentVariant = null;
    this.initialiseVariants();

    this.rolloverTrigger = this.querySelector(this.selectors.rolloverTrigger);
    this.rollover = this.querySelector(this.selectors.rollover);
    this.mobileShowSizeTrigger = this.querySelector(this.selectors.mobileShowSizeTrigger);

    this.colourSwatches = this.querySelectorAll(this.selectors.colourSwatch);
    this.colourSwatches.forEach (
      (colourSwatch) => colourSwatch.addEventListener('click', this.onColourSwatchClick.bind(this))
    );

    this.setEventHandlers();
  }

  setEventHandlers() {
    this.rolloverTrigger.addEventListener('mouseenter', this.onMouseEnter.bind(this));
    this.rolloverTrigger.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    //this.mobileShowSizeTrigger.addEventListener('click', this.onMobileClick.bind(this));
    //this.onMouseEnter();   
  }

  initialiseVariants() {
    let quickBuyVariants = this.querySelectorAll(this.selectors.quickBuyVariant);
    quickBuyVariants.forEach (
      (quickBuyVariant) => quickBuyVariant.addEventListener('click', this.onQuickBuyVariantClick.bind(this))
    );
  }

  disableVariants() {
    let quickBuyVariants = this.querySelectorAll(this.selectors.quickBuyVariant);
    for (let i=0; i<quickBuyVariants.length; i++) {
      quickBuyVariants[i].setAttribute('data-disabled', 'true');
    }   
  }

  enableVariants() {
    let quickBuyVariants = this.querySelectorAll(this.selectors.quickBuyVariant);
    for (let i=0; i<quickBuyVariants.length; i++) {
      quickBuyVariants[i].setAttribute('data-disabled', '');
    }
    const basketSpinner = this.querySelector(this.selectors.basketSpinner);
    basketSpinner.classList.add('hidden');    
  }

  updateLinks(productHandle) {
    let links = this.querySelectorAll(this.selectors.link);
    for (let i=0; i<links.length; i++) {
      let linkHref = links[i].href;
      let collectionPos = linkHref.indexOf('collection');
      if (collectionPos > 0) {
        let productPos = linkHref.indexOf('products');
        let result = linkHref.substring(collectionPos, productPos);
        links[i].href = '/' + result + 'products/' + productHandle;
      } else {
        links[i].href = '/products/' + productHandle;
      }
    }     
  }

  // Product cards do not use radio buttons like the PDP, as it was causing too many ID clashes
  // This is in fact a far simpler work-around
  onQuickBuyVariantClick(evt) {
    if (evt.target.dataset.disabled == 'true') return;

    this.disableVariants();
    this.setSelectedVariant(evt);
    this.updateOptions();
    this.updateMasterId();

    if (this.currentVariant) {
      const basketSpinner = this.querySelector(this.selectors.basketSpinner);
      basketSpinner.classList.remove('hidden');
      this.updateVariantInput();
      const myForm = this.querySelector(this.selectors.productForm);
      myForm.productCardSubmit(this); // Variants are reenabled by this web component
    } else {
      this.enableVariants();
    }
  }

  setSelectedVariant(evt) {
    const fieldset = evt.target.closest('fieldset');
    let quickBuyVariants = fieldset.querySelectorAll(this.selectors.quickBuyVariant);
    // Clear the selected property of all the variants, then set the current target
    for (let i=0; i<quickBuyVariants.length; i++) {
      quickBuyVariants[i].setAttribute('data-selected', '');
      quickBuyVariants[i].classList.remove('bg-sand');
    }
    evt.target.setAttribute('data-selected', 'true');
    evt.target.classList.add('bg-sand');
  }

  updateOptions() {
    this.options = [];
    const fieldsets = Array.from(this.querySelectorAll('fieldset'));
    for (let i=0; i<fieldsets.length; i++) {
      let variants = fieldsets[i].querySelectorAll(this.selectors.quickBuyVariant);
      for (let a=0; a<variants.length; a++) {
        if (variants[a].dataset.selected == 'true') {
          this.options.push(variants[a].dataset.value);
        }
      }
    }
    console.log(this.options);
  }

  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options.map((option, index) => {
        return this.options[index] === option;
      }).includes(false);
    });
  }

  clearVariantInput() {
    const myForm = this.querySelector(this.selectors.productForm).querySelector('form');
    const input = myForm.querySelector('input[name="id"]');
    input.value = '';
  }

  updateVariantInput() {
    const myForm = this.querySelector(this.selectors.productForm).querySelector('form');
    const input = myForm.querySelector('input[name="id"]');
    input.value = this.currentVariant.id;
  }

  getVariantData() {
    this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }

  startImageLoaderAnimations() {
    const imageSpinner1 = this.querySelector(this.selectors.imageSpinner1);
    const imageSpinner2 = this.querySelector(this.selectors.imageSpinner2);
    if (imageSpinner1 != null) imageSpinner1.classList.remove('hidden');
    if (imageSpinner2 != null) imageSpinner2.classList.remove('hidden');
  }

  endImageLoaderAnimations() {
    const imageSpinner1 = this.querySelector(this.selectors.imageSpinner1);
    const imageSpinner2 = this.querySelector(this.selectors.imageSpinner2);
    if (imageSpinner1 != null) imageSpinner1.classList.add('hidden');
    if (imageSpinner2 != null) imageSpinner2.classList.add('hidden');
  }

  onMobileClick() {
    this.rollover.classList.remove('product-card-quick-buy-inactive');
    this.rollover.classList.add('product-card-quick-buy-mobile-active');
    let hideOnMobile = this.querySelectorAll('[data-hide-on-mobile-click]');
    for (let i=0; i<hideOnMobile.length; i++) {
      hideOnMobile[i].classList.add('hidden');
    }
  }

  onMouseEnter() {
    // Do not run this on mobile - use the isMobile element to check css position, as set by media-query
    const isMobileElement = this.querySelector(this.selectors.isMobile);
    const style = getComputedStyle(isMobileElement);
    if (style.position != 'absolute') {
      this.rollover.classList.remove('product-card-quick-buy-inactive');
      this.rollover.classList.add('product-card-quick-buy-active');
    }
  }

  onMouseLeave() {
    // Do not run this on mobile - use the isMobile element to check css position, as set by media-query
    const isMobileElement = this.querySelector(this.selectors.isMobile);
    const style = getComputedStyle(isMobileElement);
    if (style.position != 'absolute') {
      this.rollover.classList.add('product-card-quick-buy-inactive');
      this.rollover.classList.remove('product-card-quick-buy-active');
    }
  }

  onColourSwatchClick(evt) {
    let currentColourIndex = 0;
    for (let i=0; i<this.colourSwatches.length; i++) {
      if (!this.colourSwatches[i].querySelector(this.selectors.selectedColourSwatch).classList.contains('hidden')) {
        currentColourIndex = i;
      }
    }
    for (let i=0; i<this.colourSwatches.length; i++) {
      if (this.colourSwatches[i] != evt.target) {
        this.colourSwatches[i].querySelector(this.selectors.selectedColourSwatch).classList.add('hidden');
      } else {
        // Set the arrow selection
        newColourIndex = i;
        this.colourSwatches[i].querySelector(this.selectors.selectedColourSwatch).classList.remove('hidden');
      }
    }
    // Only swap products if this is a new colour selection
    if (newColourIndex != currentColourIndex) {
      this.swapProduct(evt.target.dataset.handle);
    }
  }

  swapProduct(productHandle) {

    // Reset & disable Buy now button, set loading animations
    this.disableVariants();
    this.startImageLoaderAnimations();

    // Fetching 2 different (but the same sections) for the pricing could probably be done better :-)
    fetch('/products/' + productHandle + '?sections=ajax-product-card-image-1,ajax-product-card-image-2,ajax-product-card-price-1,ajax-product-card-price-2,ajax-product-card-variants')
      .then((response) => response.json())
      .then((parsedState) => {
        this.renderContents(parsedState);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        // Reinitialise the variants
        this.variantData = null;
        this.quickBuyVariants = null;
        this.clearVariantInput();
        this.initialiseVariants();
        this.enableVariants()
        this.updateLinks(productHandle);
        this.endImageLoaderAnimations();
      });

  }

  renderContents(parsedState) {
    this.getSectionsToRender().forEach((section => {
      let element = this.querySelector('[data-' + section.id + ']');
      // By checking the element, we can handle the inclusion of video instead of image 2
      if (element != null) {
        element.innerHTML = this.getSectionInnerHTML(parsedState[section.id], section.selector);
      }
    }));
  }

  getSectionsToRender() {
    return [
      {
        id: 'ajax-product-card-image-1',
        selector: '#ajax-product-card-image-1',
      },
      {
        id: 'ajax-product-card-image-2',
        selector: '#ajax-product-card-image-2',
      },
      {
        id: 'ajax-product-card-price-1',
        selector: '#ajax-product-card-price-1',
      },
      {
        id: 'ajax-product-card-price-2',
        selector: '#ajax-product-card-price-2',
      },
      {
        id: 'ajax-product-card-variants',
        selector: '#ajax-product-card-variants',
      }
    ];
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }

}

customElements.define('product-card', ProductCard);


class ProductCard2 extends ProductCard {

  setEventHandlers() {
    this.rolloverTrigger.addEventListener('mouseenter', this.onMouseEnter.bind(this));
    this.rolloverTrigger.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    //this.onMouseEnter();   
  }

  onMouseEnter() {
    // Do not run this on mobile - currently no conditional required as handled by css
    this.rollover.classList.remove('product-card-2-quick-buy-inactive');
    this.rollover.classList.add('product-card-2-quick-buy-active');
  }

  onMouseLeave() {
    // Do not run this on mobile - currently no conditional required as handled by css
    this.rollover.classList.add('product-card-2-quick-buy-inactive');
    this.rollover.classList.remove('product-card-2-quick-buy-active');
  }

  renderContents(parsedState) {
    this.getSectionsToRender().forEach((section => {
      if (section.id == 'ajax-product-card-image-1') {
        let element = this.querySelector('[data-ajax-product-card-image-1]');
        element.innerHTML = this.getSectionInnerHTML(parsedState[section.id], section.selector);
        element = this.querySelector('[data-ajax-product-card-image-2]');
        element.innerHTML = this.getSectionInnerHTML(parsedState[section.id], section.selector);
      } else if (section.id != 'ajax-product-card-image-2') {
        let element = this.querySelector('[data-' + section.id + ']');
        if (element != null) {
          element.innerHTML = this.getSectionInnerHTML(parsedState[section.id], section.selector);
        }
        // Also update the price element that is outside of the product card
        if (section.id == 'ajax-product-card-price-1') {
          let element = document.getElementById(this.dataset.sectionId + '-' + this.dataset.index + '-medium-feature-price');
          if (element != null) {
            element.innerHTML = this.getSectionInnerHTML(parsedState[section.id], section.selector);
          }
        }
      }
    }));
  }

}

customElements.define('product-card-2', ProductCard2);