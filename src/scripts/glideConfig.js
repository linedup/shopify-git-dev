/* The image zoom glide config and class instantiation is within the Image Zoom web component */
  
import Glide from '@glidejs/glide';
  
const breakPoints = {991: {perView: 3,gap: 20},767: {perView: 1,gap: 10}};
const optionsRegular = { 
  type: 'carousel',
  animationDuration: 600,
  animationTimingFunc: 'ease-in-out',
  gap: 40,
  startAt: 0,
  perView: 4,
  breakpoints: breakPoints
};


const breakPointsThree = {991: {perView: 2,gap: 20, peek:{before: 0,after: 100}},767: {perView: 1,gap: 10,peek:{before: 0,after: 60}}};
const optionsRegularThree = { 
  type: 'carousel',
  animationDuration: 600,
  animationTimingFunc: 'ease-in-out',
  gap: 40,
  startAt: 0,
  perView: 3,
  breakpoints: breakPointsThree
};


const breakPointsPdpMobile = {767: {perView: 1,gap: 0}};
const optionsPdpMobile = { 
  type: 'carousel',
  animationDuration: 600,
  animationTimingFunc: 'ease-in-out',
  gap: 0,
  startAt: 0,
  perView: 4,
  breakpoints: breakPointsPdpMobile
};


const optionsProductGuidesMobile = { 
  type: 'carousel',
  animationDuration: 600,
  animationTimingFunc: 'ease-in-out',
  gap:10,
  startAt: 0,
  perView: 1,
  peek: {
    before: 0,
    after: 70
  },
};


const breakPointsPeek = {1220: { peek: {before: 0,after: 220}},991: { peek: {before: 0,after: 180}},767: {peek: {before: 0,after: 0}}};
const optionsPeek = { 
  type: 'carousel',
  animationDuration: 600,
  animationTimingFunc: 'ease-in-out',
  gap: 0,
  startAt: 0,
  perView: 1,
  peek: {
    before: 0,
    after: 438
  },
  breakpoints: breakPointsPeek
};


const breakPointsMobilePeek = {991: {perView: 3,gap: 20,peek: {before: 0,after: 0}},767: {perView: 1,gap: 10,peek: {before: 0,after: 150}}};
const optionsMobilePeek = { 
  type: 'carousel',
  animationDuration: 600,
  animationTimingFunc: 'ease-in-out',
  gap: 40,
  startAt: 0,
  perView: 4,
  breakpoints: breakPointsMobilePeek,
};


const breakPointsMobileImageCarouselPeek = {1440: {perView: 1,gap: 0,peek: {before: 0,after: 300}},991: {perView: 1,gap: 0,peek: {before: 0,after: 200}},767: {perView: 1,gap: 0,peek: {before: 0,after: 100}}};
const optionsMobileImageCarouselPeek = { 
  type: 'carousel',
  animationDuration: 600,
  animationTimingFunc: 'ease-in-out',
  gap: 0,
  startAt: 0,
  perView: 1,
  peek: {before: 0,after: 500},
  breakpoints: breakPointsMobileImageCarouselPeek,
};


export function init() {

  /* Build.before event used to prevent FOUC */
  
  const carouselsRegular = document.querySelectorAll('.glide-regular');
  if (carouselsRegular.length > 0) {
    Object.values(carouselsRegular).map(carousel => {
      // Check there are slides before the slider is instaniated or the page will freeze
      let slides = carousel.querySelectorAll('.glide__slide');
      if (slides.length > 0) {
        const glide = new Glide(carousel, optionsRegular);
        glide.on(['build.before'], function() {
          const gliders = document.querySelectorAll('.glide-regular')
          gliders.forEach((glider) => {
            glider.classList.add('visible')
          })
        });
        glide.mount();
      }
    });
  }

  const carouselsRegularThree = document.querySelectorAll('.glide-regularThree');
  if (carouselsRegularThree.length > 0) {
    Object.values(carouselsRegularThree).map(carousel => {
      // Check there are slides before the slider is instaniated or the page will freeze
      let slides = carousel.querySelectorAll('.glide__slide');
      if (slides.length > 0) {
        const glide = new Glide(carousel, optionsRegularThree);
        glide.on(['build.before'], function() {
          const gliders = document.querySelectorAll('.glide-regularThree')
          gliders.forEach((glider) => {
            glider.classList.add('visible')
          })
        });
        glide.mount();
      }
    });
  }

  const carouselsPdpMobile = document.querySelectorAll('.glide-pdp-mobile');
  if (carouselsPdpMobile.length > 0) {
    Object.values(carouselsPdpMobile).map(carousel => {
      // Check there are slides before the slider is instaniated or the page will freeze
      let slides = carousel.querySelectorAll('.glide__slide');
      if (slides.length > 0) {
        const glide = new Glide(carousel, optionsPdpMobile);
        glide.on(['build.before'], function() {
          const gliders = document.querySelectorAll('.glide-pdp-mobile')
          gliders.forEach((glider) => {
            glider.classList.add('visible')
          })
        });
        glide.mount();
      }
    });
  }

  const carouselsPeek = document.querySelectorAll('.glide-peek');
  if (carouselsPeek.length > 0) {
    Object.values(carouselsPeek).map(carousel => {
      // Check there are slides before the slider is instaniated or the page will freeze
      let slides = carousel.querySelectorAll('.glide__slide');
      if (slides.length > 0) {
        const glide = new Glide(carousel, optionsPeek);
        glide.on(['build.before'], function() {
          const gliders = document.querySelectorAll('.glide-peek')
          gliders.forEach((glider) => {
            glider.classList.add('visible')
          })
        });
        glide.mount();
      }
    });
  }

  const carouselsMobilePeek = document.querySelectorAll('.glide-mobilePeek');
  if (carouselsMobilePeek.length > 0) {
    Object.values(carouselsMobilePeek).map(carousel => {
      // Check there are slides before the slider is instaniated or the page will freeze
      let slides = carousel.querySelectorAll('.glide__slide');
      if (slides.length > 0) {
        const glide = new Glide(carousel, optionsMobilePeek);
        glide.on(['build.before'], function() {
          const gliders = document.querySelectorAll('.glide-mobilePeek')
          gliders.forEach((glider) => {
            glider.classList.add('visible')
          })
        });
        glide.mount();
      }
    });
  }

  const carouselsMobileImagePeek = document.querySelectorAll('.glide-mobileImageCarouselPeek');
  if (carouselsMobileImagePeek.length > 0) {
    Object.values(carouselsMobileImagePeek).map(carousel => {
      // Check there are slides before the slider is instaniated or the page will freeze
      let slides = carousel.querySelectorAll('.glide__slide');
      if (slides.length > 0) {  
        const glide = new Glide(carousel, optionsMobileImageCarouselPeek);    
        glide.on(['build.before'], function() {
          const gliders = document.querySelectorAll('.glide-mobileImageCarouselPeek')
          gliders.forEach((glider) => {
            glider.classList.add('visible')
          })
        });
        glide.mount();
      }
    });
  }


  const carouselsProductGuidesMobile = document.querySelectorAll('.glide-mobileProductGuidesMobile');
  if (carouselsProductGuidesMobile.length > 0) {
    Object.values(carouselsProductGuidesMobile).map(carousel => {
      // Check there are slides before the slider is instaniated or the page will freeze
      let slides = carousel.querySelectorAll('.glide__slide');
      if (slides.length > 0) {  
        const glide = new Glide(carousel, optionsProductGuidesMobile);    
        glide.on(['build.before'], function() {
          const gliders = document.querySelectorAll('.glide-mobileProductGuidesMobile')
          gliders.forEach((glider) => {
            glider.classList.add('visible')
          })
        });
        glide.mount();
      }
    });
  }

}

export function initNosto() {

  /* NOSTO sliders - differentiated as they get instaniated via the callback */
  const carouselsNostoMobilePeek = document.querySelectorAll('.glide-nosto-mobilePeek');
  if (carouselsNostoMobilePeek.length > 0) {
    Object.values(carouselsNostoMobilePeek).map(carousel => {
      // Check there are slides before the slider is instaniated or the page will freeze
      let slides = carousel.querySelectorAll('.glide__slide');
      if (slides.length > 0) {
        new Glide(carousel, optionsMobilePeek).mount();
      }
    });
  }

}