class ModalSizeGuideTrigger extends HTMLElement {
  constructor() {
    super();

    this.selectors = {
      trigger: '[data-trigger]',
      contentId1: 'MainContent',
      contentId2: 'MainContent'
    };

    this.modal = document.getElementById(this.dataset.modalId);
    this.trigger = this.querySelector(this.selectors.trigger);
    this.trigger.addEventListener('click', this.onClickHandler.bind(this));
    this.contentId1 = (this.dataset.contentId1 != null) ? this.dataset.contentId1 : this.selectors.contentId1;
    this.contentId2 = (this.dataset.contentId1.indexOf('women') > -1) ? 'womens-how-to-measure' : 'mens-how-to-measure';
    this.newContentToLoad = null;
  }

  onClickHandler(evt) {

    evt.preventDefault();
    this.modal.openModal();

    // Comparison flag
    this.newContentToLoad = '/pages/size-guide#' + this.contentId1;

    if (this.modal.getLastContentLoaded() != this.newContentToLoad) {

      this.modal.querySelector('[data-modal-content]').innerHTML = '';
      this.modal.showLoadingSpinner();
      this.fetchContent1();

    }
  }

  fetchContent1() {
    console.log('/pages/size-guide#' + this.contentId1);
    fetch('/pages/size-guide#' + this.contentId1)
      .then((response) => response.text())
      .then((parsedState) => {    
        this.renderContents(parsedState, this.contentId1);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        this.fetchContent2();
    });
  }

  fetchContent2() {
    console.log('/pages/how-to-measure#' + this.contentId2);
    fetch('/pages/how-to-measure#' + this.contentId2)
      .then((response) => response.text())
      .then((parsedState) => {     
        this.renderContents(parsedState, this.contentId2);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        // If loading the women's content it will have a hidden class applied, which must now be removed
        const womenElements = this.modal.querySelectorAll('[data-size-guide-women]');
        for (let i=0; i<womenElements.length; i++) {
          womenElements[i].classList.remove('hidden');
        }
        this.modal.hideLoadingSpinner();
        this.modal.setLastContentLoaded(this.newContentToLoad);
    });
  }

  renderContents(parsedState, contentId) {
    this.modal.querySelector('[data-modal-content]').insertAdjacentHTML('beforeend', this.getSectionOuterHTML(parsedState, '#' + contentId));
  }

  getSectionOuterHTML(html, selector) {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).outerHTML;
  }
}

customElements.define('modal-size-guide-trigger', ModalSizeGuideTrigger);