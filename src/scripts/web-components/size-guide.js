class SizeGuidePage extends HTMLElement {
  constructor() {
    super();

    this.selectors = {
      btnMen: '[data-btn-men]',
      btnWomen: '[data-btn-women]',
      guidesMen: '[data-size-guide-men]',
      guidesWomen: '[data-size-guide-women]'
    };

    this.btnMen = this.querySelector(this.selectors.btnMen);
    this.btnWomen = this.querySelector(this.selectors.btnWomen);
    this.guidesMen = this.querySelectorAll(this.selectors.guidesMen);
    this.guidesWomen = this.querySelectorAll(this.selectors.guidesWomen);
    this.btnMen.addEventListener('click', this.onClickMen.bind(this));
    this.btnWomen.addEventListener('click', this.onClickWomen.bind(this));
  }

  onClickMen() {
    this.btnMen.classList.remove('button-size-guide-inactive');
    this.btnMen.classList.add('button-size-guide-active');
    this.btnWomen.classList.remove('button-size-guide-active');
    this.btnWomen.classList.add('button-size-guide-inactive');
    for (let i=0;i<this.guidesMen.length;i++) {
      this.guidesMen[i].classList.remove('hidden');
    }
    for (let i=0;i<this.guidesWomen.length;i++) {
      this.guidesWomen[i].classList.add('hidden');
    }
  }

  onClickWomen() {
    this.btnMen.classList.remove('button-size-guide-active');
    this.btnMen.classList.add('button-size-guide-inactive');
    this.btnWomen.classList.remove('button-size-guide-inactive');
    this.btnWomen.classList.add('button-size-guide-active');
    for (let i=0;i<this.guidesMen.length;i++) {
      this.guidesMen[i].classList.add('hidden');
    }
    for (let i=0;i<this.guidesWomen.length;i++) {
      this.guidesWomen[i].classList.remove('hidden');
    }
  }

}

customElements.define('size-guide-page', SizeGuidePage);


class SizeGuide extends HTMLElement {
  constructor() {
    super();

    this.selectors = {
      btnCm: '[data-btn-cm]',
      btnInch: '[data-btn-inch]',
      sizesCm: '[data-sizes-cm]',
      sizesInch: '[data-sizes-inch]'
    };

    this.btnCm = this.querySelector(this.selectors.btnCm);
    this.btnInch = this.querySelector(this.selectors.btnInch);
    this.sizesCm = this.querySelectorAll(this.selectors.sizesCm);
    this.sizesInch = this.querySelectorAll(this.selectors.sizesInch);
    this.btnCm.addEventListener('click', this.onClickCm.bind(this));
    this.btnInch.addEventListener('click', this.onClickInch.bind(this));
  }

  onClickCm() {
    this.btnCm.classList.remove('button-size-guide-inactive');
    this.btnCm.classList.add('button-size-guide-active');
    this.btnInch.classList.remove('button-size-guide-active');
    this.btnInch.classList.add('button-size-guide-inactive');
    for (let i=0;i<this.sizesCm.length;i++) {
      this.sizesCm[i].classList.remove('hidden');
      this.sizesInch[i].classList.add('hidden');
    }
  }

  onClickInch(evt) {
    this.btnCm.classList.remove('button-size-guide-active');
    this.btnCm.classList.add('button-size-guide-inactive');
    this.btnInch.classList.remove('button-size-guide-inactive');
    this.btnInch.classList.add('button-size-guide-active');
    for (let i=0;i<this.sizesCm.length;i++) {
      this.sizesCm[i].classList.add('hidden');
      this.sizesInch[i].classList.remove('hidden');
    }
  }

}

customElements.define('size-guide', SizeGuide);