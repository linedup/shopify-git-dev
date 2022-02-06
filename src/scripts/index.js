import './web-components/localization-form';
import './web-components/mega-nav';
import './web-components/mobile-menu-controller';
import './web-components/modal';
import './web-components/modal-content-trigger';
import './web-components/modal-size-guide-trigger';
import './web-components/cart';
import './web-components/mobile-menu-cart-drawer';
import './web-components/drawer-trigger';
import './web-components/search-trigger';
import './web-components/reveal-content';
import './web-components/product-pdp';
import './web-components/product-form';
import './web-components/variants';
import './web-components/quantity-input';
import './web-components/ajax-loader-btn';
import './web-components/ajax-loader-btn-2';
import './web-components/ajax-loader-btn-3';
import './web-components/blog-filters-form';
import './web-components/collection-filters-form';
import './web-components/product-card';
import './web-components/video-embedded-player';
import './web-components/size-guide';
import './web-components/image-zoom';

import 'lazysizes';

import * as gliders from './glideConfig';

document.addEventListener('DOMContentLoaded', (event) => {

  gliders.init();

  nostojs(function(api) {
    api.listen('postrender', function(event) {
      gliders.initNosto();
    });
  });

});