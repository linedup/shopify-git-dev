class MegaNav extends HTMLElement {
  constructor() {
    super();

    this.selectors = {
      megaNavTrigger: '[data-mega-nav-trigger]',
      megaNavChild: '[data-mega-nav-child]',
      animate: '[data-animate]',
    };

    this.overlay = document.getElementById('overlay');
    this.mobileNavTriggers = document.getElementById('header-navigation-mobile-triggers');
    this.megaNavTriggers = this.querySelectorAll(this.selectors.megaNavTrigger);
    this.megaNavTriggers.forEach(trigger => {
      trigger.addEventListener('mouseenter', this.onMouseEnterMegaNavHandler.bind(this));
      trigger.addEventListener('mouseleave', this.onMouseLeaveMegaNavHandler.bind(this));
    })
  }

  onMouseEnterMegaNavHandler(evt) {
    const megaNavChild = evt.currentTarget.querySelector(this.selectors.megaNavChild);
    const animationElements = megaNavChild.querySelectorAll(this.selectors.animate);
    for (let i=0;i<animationElements.length;i++) {
      animationElements[i].classList.add('active');
    }
    megaNavChild.classList.remove('h-0');
    megaNavChild.classList.remove('opacity-0');
    this.mobileNavTriggers.classList.add('hidden');
    this.overlay.classList.remove('hidden');
  }

  onMouseLeaveMegaNavHandler(evt) {
    const megaNavChild = evt.currentTarget.querySelector(this.selectors.megaNavChild);
    const animationElements = megaNavChild.querySelectorAll(this.selectors.animate);
    for (let i=0;i<animationElements.length;i++) {
      animationElements[i].classList.remove('active');
    }
    megaNavChild.classList.add('h-0');
    megaNavChild.classList.add('opacity-0');
    this.mobileNavTriggers.classList.remove('hidden');
    this.overlay.classList.add('hidden');
  }

}

customElements.define('mega-nav', MegaNav); 
