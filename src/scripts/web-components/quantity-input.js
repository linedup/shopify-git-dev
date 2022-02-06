class QuantityInput extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector('[type=number]');
    this.changeEvent = new Event('change', { bubbles: true })

    this.querySelectorAll('[type=button]').forEach(
      (button) => button.addEventListener('click', this.onButtonClick.bind(this))
    );
  }

  onButtonClick(event) {
    event.preventDefault();
    const previousValue = this.input.value;

    event.target.name === 'plus' ? this.input.stepUp() : this.input.stepDown();
    if (previousValue !== this.input.value) this.input.dispatchEvent(this.changeEvent);
  }
}

customElements.define('quantity-input', QuantityInput);