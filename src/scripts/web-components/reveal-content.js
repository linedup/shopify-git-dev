class RevealContent extends HTMLElement {
  constructor() {
    super();

    this.selectors = {
      reveal: '[data-reveal]',
      revealTrigger: '[data-reveal-trigger]',
      revealContent: '[data-reveal-content]',
      hideOnReveal: '[data-hide-on-reveal]'
    };

    this.revealTriggers = this.querySelectorAll(this.selectors.revealTrigger);
    this.revealTriggers.forEach(trigger => {
      trigger.addEventListener('click', this.onClickRevealHandler.bind(this));
    })
  }

  onClickRevealHandler(evt) {
    const revealContainer = evt.currentTarget.closest(this.selectors.reveal);
    const revealTrigger = revealContainer.querySelector(this.selectors.revealTrigger);
    const revealContent = revealContainer.querySelector(this.selectors.revealContent); 
    if (!revealTrigger.classList.contains('active')) {
      // Check whether to hide the trigger
      if (revealTrigger.dataset.hideOnReveal == 'true') {
        revealTrigger.classList.add('hidden');
      } else {
        revealTrigger.classList.add('active');
      }
      revealContent.classList.remove('hidden');
    } else {
      revealTrigger.classList.remove('active');
      revealContent.classList.add('hidden');
    }
  }

}

customElements.define('reveal-content', RevealContent);