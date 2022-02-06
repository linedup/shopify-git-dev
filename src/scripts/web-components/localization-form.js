class LocalizationForm extends HTMLElement {
  constructor() {
    super();

    this.selectors = {
      currencySwitcher: '[data-currency-switcher]'
    };

    const currencySwitcher = this.querySelector(this.selectors.currencySwitcher);
    currencySwitcher.addEventListener('change', this.onCurrencyChange.bind(this));
  }

  onCurrencyChange() {
    const form = this.querySelector('form');
    //this.elements.input.value = event.currentTarget.dataset.value;
    if (form) form.submit();
  }

}

customElements.define('localization-form', LocalizationForm);