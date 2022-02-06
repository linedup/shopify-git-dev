class AjaxLoaderBtn3 extends HTMLElement {
  constructor() {
    super();
    this.id = this.getAttribute('section-id');
    this.page = 2; // Start pagination on page 2
    this.paginateBy = this.getAttribute('paginateBy');
    this.paginateNextUrl = this.getAttribute('paginateNextUrl');
    this.total = this.getAttribute('total');
    this.loaderBtn = this.querySelector('button');
    this.loaderBtn.addEventListener('click', this.onButtonClick.bind(this));
  }

  onButtonClick(event) {
    // Prevent button being clicked more than once
    this.loaderBtn.disabled = true;
    this.loaderBtn.querySelector('[data-animate]').classList.remove('hidden');

    // console.log(this.paginateNextUrl + '&sections=ajax-paginated-articles-' +  this.paginateBy + '&page=' + this.page);

    fetch(this.paginateNextUrl + '&sections=ajax-paginated-articles-' +  this.paginateBy + '&page=' + this.page)
      .then((response) => response.json())
      .then((parsedState) => {        
        this.renderContents(parsedState);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        const remainingItems = (this.total - (this.page * this.paginateBy));
        if (remainingItems > 0) {
          if (remainingItems > this.paginateBy) {
            this.loaderBtn.querySelector('[data-label]').innerHTML = 'View next ' + this.paginateBy + '/' + remainingItems;
          } else {
            this.loaderBtn.querySelector('[data-label]').innerHTML = 'View next ' + remainingItems + '/' + remainingItems;
          }
          this.loaderBtn.querySelector('[data-animate]').classList.add('hidden');
          this.loaderBtn.disabled = false;
        } else {
          this.loaderBtn.classList.add('hidden');
        }
        this.page++;
      });
  }

  renderContents(parsedState) {
    this.getSectionsToRender().forEach((section => {
      // Keep adding to the same container
      console.log('[data-' + section.id + '-' + this.id + ']');
      document.querySelector('[data-' + section.id + '-' + this.id + ']').insertAdjacentHTML('beforeend', this.getSectionInnerHTML(parsedState[section.id + '-' + this.paginateBy], section.selector));
      // document.getElementById(section.id + '-' + this.id).classList.add('pb-14', 'lg:pb-18'); // Add bottom margin classes
    }));
  }

  getSectionsToRender() {
    return [
      {
        id: 'ajax-paginated-articles',
        selector: '#ajax-paginated-articles',
      }
    ];
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }

}

customElements.define('ajax-loader-btn-3', AjaxLoaderBtn3);