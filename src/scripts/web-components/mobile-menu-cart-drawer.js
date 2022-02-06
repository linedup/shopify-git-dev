class MenuDrawer extends HTMLElement {
  constructor() {
    super();
    this.otherMenu = null;
    this.isOpen = false;
    this.drawer = document.getElementById(this.id).getElementsByClassName('menu-drawer')[0];
    this.overlay = document.getElementById('overlay');
    this.closeBtn = this.querySelector('button');
    if (this.closeBtn != null) {
      this.closeBtn.addEventListener('click', this.onClickCloseHandler.bind(this));
    }
  }
  
  openDrawer() {
    if (!this.isOpen) {
      if (this.drawer.classList.contains('left')) {
        this.drawer.classList.add('drawer-open-left');
      } else if (this.drawer.classList.contains('right')){
        this.drawer.classList.add('drawer-open-right');
      }
      this.drawer.classList.remove('invisible');
      this.overlay.classList.remove('hidden');
      this.overlay.classList.add('z-50'); // This sets the overlay to cover the main mega-nav
      this.isOpen = true;
    }
  }

  closeDrawer() {
    if (this.isOpen) {
      if (this.drawer.classList.contains('left')) {
        this.drawer.classList.remove('drawer-open-left');
      } else if (this.drawer.classList.contains('right')) {
        this.drawer.classList.remove('drawer-open-right');
      }
      this.drawer.classList.add('invisible');
      this.isOpen = false;
      // Do not unlock header or hide overlay, if the other menu is still open 
      if (!this.otherMenu.isOpen) {
        document.getElementById('header').classList.remove('locked');
        this.overlay.classList.add('hidden');
        this.overlay.classList.remove('z-50');
      }
    }
  }

  onClickCloseHandler() {
    this.closeDrawer();
  }
}

class MobileMenuDrawer extends MenuDrawer {
  constructor() {
    super();
    this.mobileMenuController = document.getElementById('mobile-menu-controller');
    this.otherMenu = document.getElementById('cart-drawer');
  }

  openDrawer() {
    document.getElementById('header').classList.add('locked');
    super.openDrawer();
  }

  closeDrawer() {
    this.mobileMenuController.reset();
    super.closeDrawer();
  }
}

customElements.define('mobile-menu-drawer', MobileMenuDrawer);




class CartDrawer extends MenuDrawer {
  constructor() {
    super();
    this.cartItems = this.querySelector('cart-items');
    this.otherMenu = document.getElementById('mobile-menu-drawer');

    // The trigger button needs to toggle when the drawer opens, so it is obvious how to close the basket
    this.mobileCartTrigger = document.getElementById('mobile-cart-trigger');
  }

  openDrawer() {
    document.getElementById('header').classList.add('locked');
    super.openDrawer();
    this.mobileCartTrigger.toggleCloseIcon(this.isOpen);
  }

  closeDrawer() {
    // As the mini cart can also be closed by an internal close button - make sure the trigger icon in the nav is also set to closed
    document.getElementById('mobile-cart-trigger').toggleCloseIcon(false);
    super.closeDrawer();
    this.mobileCartTrigger.toggleCloseIcon(this.isOpen);
  }

  renderContents(parsedState) {
    this.getSectionsToRender().forEach((section => {
      // Additional check here to step over the basket page items (if not on that page)
      if (section.section != null) {
        document.getElementById(section.id).innerHTML = this.getSectionInnerHTML(parsedState.sections[section.id], section.selector);
      }
    }));
    // Remove the is-empty class from the cart drawer - ideally check the cart is populated first (not yet done)
    // Making an assumption that the cart must have an item in it if this method is called
    document.getElementById('cart-drawer').classList.remove('is-empty');
    this.openDrawer();
  }

  getSectionsToRender() {
    return this.cartItems.getSectionsToRender();
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }

  setActiveElement(element) {
    this.activeElement = element;
  }

}

customElements.define('cart-drawer', CartDrawer);