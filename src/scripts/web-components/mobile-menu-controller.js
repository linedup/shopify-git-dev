class MobileMenuController extends HTMLElement {
  constructor() {
    super();

    const selectors = {
      subNavTrigger: '[data-mobile-sub-nav-trigger]',
      backTrigger: '[data-mobile-sub-nav-back]',
      subNav: '[data-mobile-sub-nav]'
    };

    this.mobileMenu = document.getElementById('mobile-menu-container');
    this.subNavs = this.querySelectorAll(selectors.subNav);
    this.subNavTriggers = this.querySelectorAll(selectors.subNavTrigger);
    this.subNavTriggers.forEach(trigger => {
      trigger.addEventListener('click', this.onClickSubNavTriggerHandler.bind(this));
    })
    this.backTriggers = this.querySelectorAll(selectors.backTrigger);
    this.backTriggers.forEach(trigger => {
      trigger.addEventListener('click', this.onClickBackHandler.bind(this));
    })
  }

  reset() {
    this.mobileMenu.classList.remove('mobile-sub-nav-open');
    this.subNavs.forEach(subNav => {
      subNav.classList.add('hidden');
    })
  }

  onClickSubNavTriggerHandler(evt) {
    evt.preventDefault();
    this.mobileMenu.classList.add('mobile-sub-nav-open');
    let subNav = document.getElementById('mobile-sub-nav-' + evt.currentTarget.dataset.index);
    subNav.classList.remove('hidden');
  }

  onClickBackHandler(evt) {
    evt.preventDefault();
    this.mobileMenu.classList.remove('mobile-sub-nav-open');
    let subNav = document.getElementById('mobile-sub-nav-' + evt.currentTarget.dataset.index);
    subNav.classList.add('hidden');
  }

}

customElements.define('mobile-menu-controller', MobileMenuController);