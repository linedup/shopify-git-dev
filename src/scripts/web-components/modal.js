class Modal extends HTMLElement {
  constructor() {
    super(); 
    this.modal = document.getElementById(this.id).getElementsByClassName('modal')[0];
    this.closeBtn = this.querySelector('button');
    this.closeBtn.addEventListener('click', this.onClickCloseHandler.bind(this));
    this.overlay = document.getElementById('modal-overlay');
    this.lastContentLoaded = null; // Flag to prevent unnecessary fetch reloads
    this.loaderSpinner = this.querySelector('[data-loader-spinner]');
  }
  
  openModal() {
    this.modal.classList.remove('invisible');
    this.modal.classList.add('opacity-100');
    this.overlay.classList.remove('hidden');
    // Look for instances of gliders and reveal
    const gliders = this.getElementsByClassName('glide');
    for (let i=0;i<gliders.length;i++) {
      gliders[i].classList.remove('hidden');
    }
  }

  onClickCloseHandler() {
    // Look for instances of gliders and hide (as these were getting left on the screen)
    const gliders = this.getElementsByClassName('glide');
    for (let i=0;i<gliders.length;i++) {
      gliders[i].classList.add('hidden');
    }
    this.modal.classList.add('invisible');
    this.modal.classList.remove('opacity-100');
    this.overlay.classList.add('hidden');
  }

  showLoadingSpinner() {
    this.loaderSpinner.classList.remove('hidden');
  }

  hideLoadingSpinner() {
    this.loaderSpinner.classList.add('hidden');
  }

  getLastContentLoaded() {
    return this.lastContentLoaded;
  }

  setLastContentLoaded(contentLoaded) {
    this.lastContentLoaded = contentLoaded;
  }
}

customElements.define('modal-pop-up', Modal);