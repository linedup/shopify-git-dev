import * as gliders from '../glideConfig';

class ModalContentTrigger extends HTMLElement {
  constructor() {
    super();

    this.selectors = {
      trigger: '[data-trigger]',
      contentId: 'MainContent'
    };

    this.modal = document.getElementById(this.dataset.modalId);
    this.triggers = this.querySelectorAll(this.selectors.trigger);
    this.triggers.forEach (
      (trigger) => trigger.addEventListener('click', this.onClickHandler.bind(this))
    );
    this.contentId = (this.dataset.contentId != null) ? this.dataset.contentId : this.selectors.contentId;
  }

  onClickHandler(evt) {
    evt.preventDefault();
    this.modal.openModal();

    // Comparison flag
    const newContentToLoad = this.dataset.contentUrl + '#' + this.dataset.contentId;

    if (this.modal.getLastContentLoaded() != newContentToLoad) {

      this.modal.querySelector('[data-modal-content]').innerHTML = '';
      this.modal.showLoadingSpinner();

      fetch(this.dataset.contentUrl)
        .then((response) => response.text())
        .then((parsedState) => {     
          this.renderContents(parsedState);
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          this.modal.hideLoadingSpinner();
          this.modal.setLastContentLoaded(newContentToLoad);
      });

    }
  }

  renderContents(parsedState) {
    this.modal.querySelector('[data-modal-content]').innerHTML = this.getSectionInnerHTML(parsedState, '#' + this.contentId);
    gliders.init();
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }
}

customElements.define('modal-content-trigger', ModalContentTrigger);