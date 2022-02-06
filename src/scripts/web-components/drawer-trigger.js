class DrawerTrigger extends HTMLElement {
  constructor() {
    super();

    this.selectors = {
      openIcon: '[data-icon-open]',
      closeIcon: '[data-icon-close]'
    };

    this.menuDrawer = document.getElementById(this.dataset.drawerId);
    this.btn = this.querySelector('button');
    this.btn.addEventListener('click', this.onClickHandler.bind(this));
  }

  onClickHandler(evt) {
    evt.preventDefault();
    if (!this.menuDrawer.isOpen) {
      this.menuDrawer.openDrawer();
      this.toggleCloseIcon(true);
    } else {
      this.menuDrawer.closeDrawer();
      this.toggleCloseIcon(false); 
    }
  }

  toggleCloseIcon(isOpen) {
    const openIcon = this.querySelector(this.selectors.openIcon);
    const closeIcon = this.querySelector(this.selectors.closeIcon);
    if (openIcon != null && closeIcon != null) {
      if (isOpen) {
        openIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
      } else {
        openIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }     
    }    
  }
}

customElements.define('drawer-trigger', DrawerTrigger);