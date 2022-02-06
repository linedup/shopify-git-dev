class SearchTrigger extends HTMLElement {
  constructor() {
    super();

    this.selectors = {
      openIcon: '[data-icon-open]',
      closeIcon: '[data-icon-close]'
    };

    this.searchFormMobile = document.getElementById('search-form-mobile');
    this.btn = this.querySelector('button');
    this.btn.addEventListener('click', this.onClickHandler.bind(this));
  }

  onClickHandler(evt) {
    evt.preventDefault();
    const openIcon = this.querySelector(this.selectors.openIcon);
    const closeIcon = this.querySelector(this.selectors.closeIcon);
    if (this.searchFormMobile.classList.contains('hidden')) {
      this.searchFormMobile.classList.remove('hidden');
      this.toggleCloseIcon(true);
      document.getElementById('header').classList.add('locked');
    } else {
      this.searchFormMobile.classList.add('hidden');
      this.toggleCloseIcon(false); 
      document.getElementById('header').classList.remove('locked');  
    }
  }

  toggleCloseIcon(isOpen) {
    const openIcon = this.querySelector(this.selectors.openIcon);
    const closeIcon = this.querySelector(this.selectors.closeIcon);
    if (isOpen) {
      if (typeof(openIcon) != 'undefined') openIcon.classList.add('hidden');
      if (typeof(closeIcon) != 'undefined') closeIcon.classList.remove('hidden');
    } else {
      if (typeof(openIcon) != 'undefined') openIcon.classList.remove('hidden');
      if (typeof(closeIcon) != 'undefined') closeIcon.classList.add('hidden');     
    }    
  }
}

customElements.define('search-trigger', SearchTrigger);