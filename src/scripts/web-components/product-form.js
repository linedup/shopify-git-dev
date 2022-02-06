class ProductForm extends HTMLElement {
  constructor() {
    super();
    this.form = this.querySelector('form');
    this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
    this.cartDrawer = document.querySelector('cart-drawer');

    // Select the variant for the Back In Stock app
    const myButton = document.getElementById('BIS_trigger');
    if (myButton) {
      myButton.addEventListener('click', this.onClickBisTrigger.bind(this));
    }
  }

  onClickBisTrigger() {
    const variantId = this.form.elements['id'].value;
    if (BIS) {
      BIS.popup.form.selectVariant(variantId);
    }
  }

  onSubmitHandler(evt) {
    evt.preventDefault();

    this.cartDrawer.setActiveElement(document.activeElement);
    
    const submitButton = this.querySelector('[type="submit"]');

    submitButton.setAttribute('disabled', true);
    submitButton.classList.add('loading');

    const body = JSON.stringify({
      ...JSON.parse(serializeForm(this.form)),
      sections: this.cartDrawer.getSectionsToRender().map((section) => section.id),
      sections_url: window.location.pathname
    });

    fetch(`${routes.cart_add_url}`, { ...fetchConfig('javascript'), body })
      .then((response) => response.json())
      .then((parsedState) => {        
        this.cartDrawer.renderContents(parsedState);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        submitButton.classList.remove('loading');
        submitButton.classList.add('success');
        setTimeout(function() { 
          submitButton.classList.remove('success');
          submitButton.removeAttribute('disabled'); 
        }, 2000);
      });
  }
}

customElements.define('product-form', ProductForm);

class ProductFormPlp extends ProductForm {

  productCardSubmit(productCard) {

    this.cartDrawer.setActiveElement(document.activeElement);

    const body = JSON.stringify({
      ...JSON.parse(serializeForm(this.form)),
      sections: this.cartDrawer.getSectionsToRender().map((section) => section.id),
      sections_url: window.location.pathname
    });

    fetch(`${routes.cart_add_url}`, { ...fetchConfig('javascript'), body })
      .then((response) => response.json())
      .then((parsedState) => {        
        this.cartDrawer.renderContents(parsedState);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        productCard.enableVariants();
      });
  }
}

customElements.define('product-form-plp', ProductFormPlp);