document.addEventListener('DOMContentLoaded', (event) => {

  // const body = document.body;
  // const scrollUp = 'scroll-up';
  // const scrollDown = 'scroll-down';
  // let lastScroll = 0;
  
  // window.addEventListener('scroll', () => {
  //   const currentScroll = window.pageYOffset;
  //   if (currentScroll < 160) return; // Height of the top header
  //   if (currentScroll <= 0) {
  //     body.classList.remove(scrollUp);
  //     return;
  //   } 
  //   if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
  //     // down
  //     body.classList.remove(scrollUp);
  //     body.classList.add(scrollDown);
  //   } else if (
  //     currentScroll < lastScroll &&
  //     body.classList.contains(scrollDown)
  //   ) {
  //     // up
  //     body.classList.remove(scrollDown);
  //     body.classList.add(scrollUp);
  //   }
  //   lastScroll = currentScroll;
  // });

  displayLocationSpecificMessages();

});

// Mobile nav
// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
});

function displayLocationSpecificMessages() {
  const cookieCountry = getCookie('_shopify_country');
  const showToUK = document.querySelectorAll('[data-localization-UK]');
  const showToEurope = document.querySelectorAll('[data-localization-EU]');
  const showToUSA = document.querySelectorAll('[data-localization-USA]');
  const uk = ["United+Kingdom"];
  const europe = ["Albania", "Andorra", "Armenia", "Austria", "Belarus", "Belgium", "Bosnia+And+Herzegovina", "Bosnia And Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech+Republic", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Georgia", "Germany", "Greece", "Hungary", "Iceland", "Italy", "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "Norway", "Poland", "Portugal", "Reunion", "Romania", "San+Marino", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "United+Kingdom", "Vatican+City", "Vatican City"];

  if (cookieCountry !== undefined && cookieCountry !== '') {
    if (cookieCountry == uk) {
      // Show UK message
      for (let i=0; i<showToUK.length; i++) {
        showToUK[i].classList.remove('hidden');
      }
      for (let i=0; i<showToEurope.length; i++) {
        showToEurope[i].classList.add('hidden');
      }
      for (let i=0; i<showToUSA.length; i++) {
        showToUSA[i].classList.add('hidden');
      }
      return;
    }
    for (let i=0; i<europe.length; i++) {
      if (cookieCountry == europe[i]) {
        // Show Europe message
        for (let i=0; i<showToUK.length; i++) {
          showToUK[i].classList.add('hidden');
        }
        for (let i=0; i<showToEurope.length; i++) {
          showToEurope[i].classList.remove('hidden');
        }
        for (let i=0; i<showToUSA.length; i++) {
          showToUSA[i].classList.add('hidden');
        }
        return;
      }
    }
    // If still here - show USA message
    for (let i=0; i<showToUK.length; i++) {
      showToUK[i].classList.add('hidden');
    }
    for (let i=0; i<showToEurope.length; i++) {
      showToEurope[i].classList.add('hidden');
    }
    for (let i=0; i<showToUSA.length; i++) {
      showToUSA[i].classList.remove('hidden');
    }
  }
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
















function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
    )
  );
}

const trapFocusHandlers = {};

function trapFocus(container, elementToFocus = container) {
  var elements = getFocusableElements(container);
  var first = elements[0];
  var last = elements[elements.length - 1];

  removeTrapFocus();

  trapFocusHandlers.focusin = (event) => {
    if (
      event.target !== container &&
      event.target !== last &&
      event.target !== first
    )
      return;

    document.addEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.focusout = function() {
    document.removeEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.keydown = function(event) {
    if (event.code.toUpperCase() !== 'TAB') return; // If not TAB key
    // On the last focusable element and tab forward, focus the first element.
    if (event.target === last && !event.shiftKey) {
      event.preventDefault();
      first.focus();
    }

    //  On the first focusable element and tab backward, focus the last element.
    if (
      (event.target === container || event.target === first) &&
      event.shiftKey
    ) {
      event.preventDefault();
      last.focus();
    }
  };

  document.addEventListener('focusout', trapFocusHandlers.focusout);
  document.addEventListener('focusin', trapFocusHandlers.focusin);

  elementToFocus.focus();
}

function removeTrapFocus(elementToFocus = null) {
  document.removeEventListener('focusin', trapFocusHandlers.focusin);
  document.removeEventListener('focusout', trapFocusHandlers.focusout);
  document.removeEventListener('keydown', trapFocusHandlers.keydown);

  if (elementToFocus) elementToFocus.focus();
}

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

const serializeForm = form => {
  const obj = {};
  const formData = new FormData(form);
  for (const key of formData.keys()) {
    obj[key] = formData.get(key);
  }
  return JSON.stringify(obj);
};

function fetchConfig(type = 'json') {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': `application/${type}` }
  };
}

/*
 * Shopify Common JS
 *
 */
if ((typeof window.Shopify) == 'undefined') {
  window.Shopify = {};
}

Shopify.bind = function(fn, scope) {
  return function() {
    return fn.apply(scope, arguments);
  }
};

Shopify.setSelectorByValue = function(selector, value) {
  for (var i = 0, count = selector.options.length; i < count; i++) {
    var option = selector.options[i];
    if (value == option.value || value == option.innerHTML) {
      selector.selectedIndex = i;
      return i;
    }
  }
};

Shopify.addListener = function(target, eventName, callback) {
  target.addEventListener ? target.addEventListener(eventName, callback, false) : target.attachEvent('on'+eventName, callback);
};

Shopify.formatMoney = function(t, r) {

  function e(t, r) {
    return void 0 === t ? r : t;
  }

  function a(t, r, a, o) {
    if (r = e(r, 2), a = e(a, ","), o = e(o, "."), isNaN(t) || null == t) return 0;
    t = (t / 100).toFixed(r);
    var n = t.split(".");
    return n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + a) + (n[1] ? o + n[1] : "");
  }

  "string" == typeof t && (t = t.replace(".", ""));
  var o = "",
      n = /\{\{\s*(\w+)\s*\}\}/,
      i = r || window.moneyFormat;

  switch (i.match(n)[1]) {
    case "amount":
      o = a(t, 2);
      break;

    case "amount_no_decimals":
      o = a(t, 0);
      break;

    case "amount_with_comma_separator":
      o = a(t, 2, ".", ",");
      break;

    case "amount_with_space_separator":
      o = a(t, 2, " ", ",");
      break;

    case "amount_with_period_and_space_separator":
      o = a(t, 2, " ", ".");
      break;

    case "amount_no_decimals_with_comma_separator":
      o = a(t, 0, ".", ",");
      break;

    case "amount_no_decimals_with_space_separator":
      o = a(t, 0, " ", "");
      break;

    case "amount_with_apostrophe_separator":
      o = a(t, 2, "'", ".");
      break;

    case "amount_with_decimal_separator":
      o = a(t, 2, ".", ".");
  }

  return i.replace(n, o);
}