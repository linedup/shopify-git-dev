class BlogFiltersForm extends HTMLElement {
  constructor() {
    super();
    this.filterData = [];
    this.onActiveFilterClick = this.onActiveFilterClick.bind(this);

    this.debouncedOnSubmit = debounce((event) => {
      this.onSubmitHandler(event);
    }, 500);

    this.querySelector('form').addEventListener('input', this.debouncedOnSubmit.bind(this));
    window.addEventListener('popstate', this.onHistoryChange.bind(this));

    // Use the Show Products button to close the modal
    this.menuDrawer = document.getElementById(this.dataset.drawerId);
    this.closeBtn = this.querySelector('[data-close-modal]');
    if (this.menuDrawer && this.closeBtn) {
      this.closeBtn.addEventListener('click', this.onClickClose.bind(this));
    }

    // Set the details to close the other details if clicked
    this.allDetails = this.querySelectorAll('details');
    this.allDetails.forEach(deet => {
      deet.addEventListener('toggle', this.toggleOpenOneDetailOnly.bind(this))
    })
  }

  toggleOpenOneDetailOnly(e) {
    const myDetail = e.target;
    const myDetailTitle = myDetail.querySelector(['[data-filter-title]']);
    if (myDetail.open) {
      myDetail.classList.add('active');
      if (myDetailTitle) {
        myDetailTitle.classList.add('link');
      }
      this.allDetails.forEach(deet => {
        if (deet != myDetail) {
          deet.open = false;
          deet.classList.remove('active');
        }
      });
    } else {
      myDetail.classList.remove('active');
      if (myDetailTitle) myDetailTitle.classList.remove('link');
    }
  }

  onClickClose() {
    this.menuDrawer.closeDrawer();
  }

  onSubmitHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target.closest('form'));
    let searchParams = new URLSearchParams(formData).toString();

    if (searchParams.length > 0) {
      searchParams = searchParams.replaceAll('&tagged=', '+');
      searchParams = searchParams.replaceAll('tagged=', '');
      searchParams = 'tagged/' + searchParams;
    }

    this.renderPage(searchParams, event);
  }

  onActiveFilterClick(event) {
    event.preventDefault();
    this.toggleActiveFacets();
    this.renderPage(new URL(event.currentTarget.href).searchParams.toString());
  }

  onHistoryChange(event) {
    const searchParams = event.state?.searchParams || '';
    this.renderPage(searchParams, null, false);
  }

  toggleActiveFacets(disable = true) {
    document.querySelectorAll('.js-facet-remove').forEach((element) => {
      element.classList.toggle('disabled', disable);
    });
  }

  renderPage(searchParams, event, updateURLHash = true) {
    const sections = this.getSections();
    document.getElementById('ArticleGrid').querySelector('.articles').classList.add('loading');

    let myURL =  window.location.pathname;
    const taggedPos = myURL.indexOf('/tagged');
    if (taggedPos > 0) {
      myURL = myURL.substring(0, taggedPos);
    }
    myURL = myURL + '/' + searchParams;

    sections.forEach((section) => {
      const url = `${myURL}?section_id=${section.section}`;
      const filterDataUrl = element => element.url === url;

      this.filterData.some(filterDataUrl) ?
        this.renderSectionFromCache(filterDataUrl, event) :
        this.renderSectionFromFetch(url, event);
    });

    if (updateURLHash) this.updateURLHash(searchParams);
  }

  renderSectionFromFetch(url, event) {
    fetch(url)
      .then(response => response.text())
      .then((responseText) => {
        const html = responseText;
        this.filterData = [...this.filterData, { html, url }];
        this.renderFilters(html, event);
        this.renderArticleGrid(html);
      });
  }

  renderSectionFromCache(filterDataUrl, event) {
    const html = this.filterData.find(filterDataUrl).html;
    this.renderFilters(html, event);
    this.renderArticleGrid(html);
  }

  renderArticleGrid(html) {
    document.getElementById('ArticleGrid').innerHTML = new DOMParser().parseFromString(html, 'text/html').getElementById('ArticleGrid').innerHTML;
  }

  renderFilters(html, event) {
    const parsedHTML = new DOMParser().parseFromString(html, 'text/html');

    const facetDetailsElements =
      parsedHTML.querySelectorAll('#ArticleFiltersForm .js-filter, #ArticleFiltersFormMobile .js-filter');
    const matchesIndex = (element) => element.dataset.index === event?.target.closest('.js-filter')?.dataset.index
    const facetsToRender = Array.from(facetDetailsElements).filter(element => !matchesIndex(element));
    const countsToRender = Array.from(facetDetailsElements).find(matchesIndex);

    facetsToRender.forEach((element) => {
      document.querySelector(`.js-filter[data-index="${element.dataset.index}"]`).innerHTML = element.innerHTML;
    });

    this.renderActiveFacets(parsedHTML);
    //this.renderAdditionalElements(parsedHTML);

    //if (countsToRender) this.renderCounts(countsToRender, event.target.closest('.js-filter'));
  }

  renderActiveFacets(html) {
    const activeFacetElementSelectors = ['.active-facets-mobile', '.active-facets-desktop'];

    activeFacetElementSelectors.forEach((selector) => {
      const activeFacetsElement = html.querySelector(selector);
      if (!activeFacetsElement) return;
      document.querySelector(selector).innerHTML = activeFacetsElement.innerHTML;
    })

    this.toggleActiveFacets(false);
  }

  renderAdditionalElements(html) {
    const mobileElementSelectors = ['.mobile-facets__open', '.mobile-facets__count', '.sorting'];

    mobileElementSelectors.forEach((selector) => {
      if (!html.querySelector(selector)) return;
      document.querySelector(selector).innerHTML = html.querySelector(selector).innerHTML;
    });

    //document.getElementById('ArticleFiltersFormMobile').closest('menu-drawer').bindEvents();
  }

  updateURLHash(searchParams) {
    let myURL =  window.location.pathname;
    const taggedPos = myURL.indexOf('/tagged');
    if (taggedPos > 0) {
      myURL = myURL.substring(0, taggedPos);
    }
    history.pushState({ searchParams }, '', `${myURL}${searchParams && '/'.concat(searchParams)}`);
  }

  getSections() {
    return [
      {
        id: 'main-blog-grid',
        section: document.getElementById('main-blog-grid').dataset.id,
      }
    ]
  }
}

customElements.define('blog-filters-form', BlogFiltersForm);

class BlogFacetRemove extends HTMLElement {
  constructor() {
    super();
    this.querySelector('a').addEventListener('click', (event) => {
      event.preventDefault();
      const form = this.closest('blog-filters-form') || document.querySelector('blog-filters-form');
      form.onActiveFilterClick(event);
    });
  }
}

customElements.define('blog-facet-remove', BlogFacetRemove);