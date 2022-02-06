class AjaxLoaderBtn extends HTMLElement {
  constructor() {
    super();
    this.id = this.getAttribute('section-id');
    this.offset = this.getAttribute('offset');
    this.collection = this.getAttribute('collection');
    this.loaderBtn = this.querySelector('button');
    this.loaderBtn.addEventListener('click', this.onButtonClick.bind(this));
  }

  onButtonClick(event) {
    event.preventDefault();

    // Prevent button being clicked more than once
    //this.enableLoading(line);
    // To do: This changes the width of the button
    // To do: Get Section Id's for the sections to load
    this.loaderBtn.innerHTML = 'Loading...';

    fetch('/collections/' + this.collection + '?sections=ajax-collection-products-offset-' + this.offset)
      .then((response) => response.json())
      .then((parsedState) => {        
        this.renderContents(parsedState);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        //submitButton.classList.remove('loading');
        //submitButton.removeAttribute('disabled');
        // This needs to also take into account the spacing
        this.classList.add('hidden');
      });


  }

  renderContents(parsedState) {
    this.getSectionsToRender().forEach((section => {
      document.getElementById(section.id + '-' + this.id).innerHTML = this.getSectionInnerHTML(parsedState[section.id + '-offset-' + this.offset], section.selector);
    }));
  }

  getSectionsToRender() {
    return [
      {
        id: 'ajax-collection-products',
        selector: '#ajax-collection-products',
      }
    ];
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }

}

customElements.define('ajax-loader-btn', AjaxLoaderBtn);