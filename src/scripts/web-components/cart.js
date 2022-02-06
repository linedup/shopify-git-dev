class CartRemoveButton extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', (event) => {
      event.preventDefault();
      this.closest('cart-items').updateQuantity(this.dataset.index, 0);
    });
  }
}

customElements.define('cart-remove-button', CartRemoveButton);

class CartItems extends HTMLElement {
  constructor() {
    super();

    //this.lineItemStatusElement = document.getElementById('shopping-cart-line-item-status');

    this.currentItemCount = Array.from(this.querySelectorAll('[name="updates[]"]'))
      .reduce((total, quantityInput) => total + parseInt(quantityInput.value), 0);

    this.debouncedOnChange = debounce((event) => {
      this.onChange(event);
    }, 300);

    this.addEventListener('change', this.debouncedOnChange.bind(this));

  }

  onChange(event) {
    this.updateQuantity(event.target.dataset.index, event.target.value, document.activeElement.getAttribute('name'));
  }

  getSectionsToRender() {
    return [
      {
        id: 'ajax-cart-items',
        section: document.getElementById('ajax-cart-items').dataset.id,
        selector: '#ajax-cart-items',
      },
      {
        id: 'basket-cart-items',
        section: (document.getElementById('basket-cart-items') != null) ? document.getElementById('basket-cart-items').dataset.id : null,
        selector: '#basket-cart-items',
      },
      {
        id: 'ajax-cart-footer',
        section: document.getElementById('ajax-cart-footer').dataset.id,
        selector: '#ajax-cart-footer',
      },
      {
        id: 'cart-icon-desktop',
        section: document.getElementById('cart-icon-desktop').dataset.id,
        selector: '#cart-icon',
      },
      {
        id: 'cart-icon-mobile',
        section: document.getElementById('cart-icon-mobile').dataset.id,
        selector: '#cart-icon',
      }
    ];
  }

  updateQuantity(line, quantity, name) {
    this.enableLoading(line);

    const body = JSON.stringify({
      line,
      quantity,
      sections: this.getSectionsToRender().map((section) => section.section),
      sections_url: window.location.pathname
    });

    fetch(`${routes.cart_change_url}`, {...fetchConfig(), ...{ body }})
      .then((response) => {
        return response.text();
      })
      .then((state) => {
        const parsedState = JSON.parse(state);
        this.classList.toggle('is-empty', parsedState.item_count === 0);
        document.getElementById('cart-drawer')?.classList.toggle('is-empty', parsedState.item_count === 0);

        this.getSectionsToRender().forEach((section => {
          if (section.section != null) {
            const elementToReplace = document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);
            elementToReplace.innerHTML = this.getSectionInnerHTML(parsedState.sections[section.section], section.selector);
          }
        }));
       
        //this.updateLiveRegions(line, parsedState.item_count);
        //document.getElementById(`CartItem-${line}`)?.querySelector(`[name="${name}"]`)?.focus();
        
        // Handle the items count and sub-total if on the basket page (it is not possible to use the section rendering api for these additional elements)
        const basketItemCount = document.getElementById('basket-item-count');
        if (basketItemCount != null) {
          if (parsedState.item_count > 1) {
            basketItemCount.innerHTML = parsedState.item_count + ' items';
          } else if (parsedState.item_count == 0) {
            basketItemCount.innerHTML = parsedState.item_count + ' item';
          } else {
            basketItemCount.innerHTML = '0 items';
          }
        }
        const basketSubTotal = document.getElementById('basket-sub-total');
        if (basketSubTotal != null) {
          basketSubTotal.innerHTML = Shopify.formatMoney(parsedState.items_subtotal_price, window.moneyFormat);
        }

        this.disableLoading();
      }).catch((err) => {
        console.log(err);
        //this.querySelectorAll('.loading-overlay').forEach((overlay) => overlay.classList.add('hidden'));
        //document.getElementById('cart-errors').textContent = window.cartStrings.error;
        //this.disableLoading();
      });
  }

  updateLiveRegions(line, itemCount) {
    if (this.currentItemCount === itemCount) {
      document.getElementById(`Line-item-error-${line}`)
        .querySelector('.cart-item__error-text')
        .innerHTML = window.cartStrings.quantityError.replace(
          '[quantity]',
          document.getElementById(`Quantity-${line}`).value
        );
    }

    this.currentItemCount = itemCount;
    //this.lineItemStatusElement.setAttribute('aria-hidden', true);

    const cartStatus = document.getElementById('cart-live-region-text');
    cartStatus.setAttribute('aria-hidden', false);

    setTimeout(() => {
      cartStatus.setAttribute('aria-hidden', true);
    }, 1000);
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }

  enableLoading(line) {
    document.getElementById('ajax-cart-items').classList.add('cart__items--disabled');
    this.querySelectorAll('.loading-overlay')[line - 1].classList.remove('hidden');
    this.querySelectorAll('.loading-overlay')[line - 1].classList.add('flex');
    document.activeElement.blur();
    //this.lineItemStatusElement.setAttribute('aria-hidden', false);
  }

  disableLoading() {
    document.getElementById('ajax-cart-items').classList.remove('cart__items--disabled');
  }
}

customElements.define('cart-items', CartItems);