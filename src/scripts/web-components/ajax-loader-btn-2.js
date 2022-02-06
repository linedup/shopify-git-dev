class AjaxLoaderBtn2 extends HTMLElement {
  constructor() {
    super();
    this.id = this.getAttribute('section-id');
    this.page = 2; // Start pagination on page 2
    this.paginateBy = this.getAttribute('paginateBy');
    this.paginateNextUrl = this.getAttribute('paginateNextUrl');
    this.total = this.getAttribute('total');
    this.loaderBtn = this.querySelector('button');
    this.loaderBtn.addEventListener('click', this.onButtonClick.bind(this));

    // Replace &page= with &ignore=
    // We need the querystrings for the filters, so we cannot simply ignore them
    // We add the page number in this component
    this.paginateNextUrl = this.paginateNextUrl.replace('page=', 'ignore=');

  }

  onButtonClick(event) {
    // Prevent button being clicked more than once
    this.loaderBtn.disabled = true;
    this.loaderBtn.querySelector('[data-animate]').classList.remove('hidden');

    // console.log(this.paginateNextUrl + '&page=' + this.page + '&sections=ajax-paginated-products-' +  this.paginateBy);

    fetch(this.paginateNextUrl + '&page=' + this.page + '&sections=ajax-paginated-products-' +  this.paginateBy)
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
      document.querySelector('[data-' + section.id + '-' + this.id + ']').insertAdjacentHTML('beforeend', this.getSectionInnerHTML(parsedState[section.id + '-' + this.paginateBy], section.selector));
    }));
  }

  getSectionsToRender() {
    return [
      {
        id: 'ajax-paginated-products',
        selector: '#ajax-paginated-products',
      }
    ];
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }

}

customElements.define('ajax-loader-btn-2', AjaxLoaderBtn2);