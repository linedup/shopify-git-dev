class VariantSelects extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
  }

  onVariantChange() {
    this.updateOptions();
    this.updateMasterId();
    this.toggleAddButton(true, '', false);

    if (!this.currentVariant) {
      this.toggleAddButton(true, '', true);
      this.toggleAvailable(false);
    } else {
      this.updateURL();
      this.updateVariantInput();
      this.updatePrice();
      // Set the selected size text
      const selectedSizeText = document.querySelector('[data-selected-size]');
      if (selectedSizeText) selectedSizeText.innerHTML = (this.currentVariant.available) ? 'Selected size:&nbsp;&nbsp;' + this.options[0] : 'Out of stock';
      this.toggleAddButton(false, '', true);
      this.toggleAvailable(!this.currentVariant.available);
    }
  }

  updatePrice() {
    const price = this.currentVariant['price'];
    const comparePrice = this.currentVariant['compare_at_price'];
    const formattedPrice = Shopify.formatMoney(price, window.moneyFormat);
    const pricesElements = document.querySelectorAll('[data-pdp-price]');
    const comparePricesElements = document.querySelectorAll('[data-pdp-compare-at-price]');
    for (let i=0; i<pricesElements.length; i++) {   
      pricesElements[i].innerHTML = formattedPrice;
      if (comparePrice > price) {
        let formattedComparePrice = Shopify.formatMoney(comparePrice, window.moneyFormat);
        comparePricesElements[i].innerHTML = formattedComparePrice;
        comparePricesElements[i].classList.remove('hidden');
      } else {
        comparePricesElements[i].classList.add('hidden');
      }
    }
  }

  updateOptions() {
    this.options = Array.from(this.querySelectorAll('select'), (select) => select.value);
  }

  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options.map((option, index) => {
        return this.options[index] === option;
      }).includes(false);
    });
  }

  updateURL() {
    if (!this.currentVariant) return;
    // Only update the URL on the PDP
    if (window.location.href.indexOf('products') > -1) {
      window.history.replaceState({ }, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
    }
  }

  updateVariantInput() {
    const productForms = document.querySelectorAll(`#product-form-${this.dataset.productId}`);
    productForms.forEach((productForm) => {
      const input = productForm.querySelector('input[name="id"]');
      input.value = this.currentVariant.id;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  toggleAddButton(disable = true, text, modifyClass = true) {
    const addButton = document.getElementById(`product-form-${this.dataset.productId}`)?.querySelector('[name="add"]');

    if (!addButton) return;

    if (disable) {
      addButton.setAttribute('disabled', true);
      addButton.classList.add('cursor-default');
      addButton.classList.remove('cursor-pointer');
      if (text) addButton.querySelector('[data-btn-text]').textContent = text;
    } else {
      addButton.removeAttribute('disabled');
      addButton.classList.remove('cursor-default');
      addButton.classList.add('cursor-pointer');
      addButton.querySelector('[data-btn-text]').textContent = window.variantStrings.addToCart;
      //addButton.textContent = window.variantStrings.addToCart;
    }

    if (!modifyClass) return;
  }

  toggleAvailable(isUnavailable) {
    const addButton = document.getElementById(`product-form-${this.dataset.productId}`)?.querySelector('[name="add"]');
    const BISTriggerButton = document.getElementById('BIS_trigger');
    if (!addButton || !BISTriggerButton) return;
    if (isUnavailable) {
      addButton.classList.add('hidden');
      BISTriggerButton.classList.remove('hidden');
    } else {
      addButton.classList.remove('hidden');
      BISTriggerButton.classList.add('hidden');
    }
  }

  getVariantData() {
    this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }
}

customElements.define('variant-selects', VariantSelects);

class VariantRadios extends VariantSelects {
  constructor() {
    super();
  }

  updateOptions() {
    const fieldsets = Array.from(this.querySelectorAll('fieldset'));
    this.options = fieldsets.map((fieldset) => {
      return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked).value;
    });
  }
}

customElements.define('variant-radios', VariantRadios);