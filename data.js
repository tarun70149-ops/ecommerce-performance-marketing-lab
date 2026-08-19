/**
 * VERIDO E-COMMERCE PERFORMANCE MARKETING LAB
 * Central Data Layer Configuration
 */

window.VERIDO_DATA = {

  /* =========================================
     WEBSITE INFORMATION
  ========================================= */

  website: {
    brand: "VERIDO",
    website_type: "ecommerce",
    market: "India",
    city: "Jaipur",
    country: "IN"
  },


  /* =========================================
     DEFAULT USER CONTEXT
  ========================================= */

  user: {
    logged_in: false,
    user_type: "guest"
  },


  /* =========================================
     CURRENT PAGE
  ========================================= */

  page: {

    type: "unknown",

    title: document.title || "",

    url: window.location.href,

    path: window.location.pathname,

    referrer: document.referrer || ""
  },


  /* =========================================
     MARKETING ATTRIBUTION
  ========================================= */

  marketing: {

    source: "",
    medium: "",
    campaign: "",
    term: "",
    content: "",

    gclid: "",
    fbclid: "",

    landing_page: window.location.href,

    first_touch_source: "",
    first_touch_medium: "",
    first_touch_campaign: "",

    last_touch_source: "",
    last_touch_medium: "",
    last_touch_campaign: ""
  },


  /* =========================================
     E-COMMERCE CONTEXT
  ========================================= */

  ecommerce: {

    currency: "INR",

    cart_value: 0,

    cart_items: 0,

    checkout_value: 0,

    order_value: 0,

    transaction_id: ""
  },


  /* =========================================
     CONSENT
  ========================================= */

  consent: {

    analytics: true,

    advertising: true,

    functionality: true
  }

};


/* =========================================
   UTM / CLICK ID CAPTURE
========================================= */

(function captureMarketingData() {

  const params =
    new URLSearchParams(window.location.search);

  const marketing =
    window.VERIDO_DATA.marketing;


  marketing.source =
    params.get("utm_source") || "";

  marketing.medium =
    params.get("utm_medium") || "";

  marketing.campaign =
    params.get("utm_campaign") || "";

  marketing.term =
    params.get("utm_term") || "";

  marketing.content =
    params.get("utm_content") || "";

  marketing.gclid =
    params.get("gclid") || "";

  marketing.fbclid =
    params.get("fbclid") || "";


  /* -----------------------------------------
     Save first-touch attribution
  ----------------------------------------- */

  const firstTouch =
    localStorage.getItem(
      "verido_first_touch"
    );

  if (!firstTouch) {

    const firstTouchData = {

      source: marketing.source,

      medium: marketing.medium,

      campaign: marketing.campaign,

      term: marketing.term,

      content: marketing.content,

      gclid: marketing.gclid,

      fbclid: marketing.fbclid,

      landing_page:
        window.location.href,

      timestamp:
        new Date().toISOString()

    };


    localStorage.setItem(

      "verido_first_touch",

      JSON.stringify(firstTouchData)

    );

  }


  /* -----------------------------------------
     Save last-touch attribution
  ----------------------------------------- */

  const lastTouchData = {

    source: marketing.source,

    medium: marketing.medium,

    campaign: marketing.campaign,

    term: marketing.term,

    content: marketing.content,

    gclid: marketing.gclid,

    fbclid: marketing.fbclid,

    landing_page:
      window.location.href,

    timestamp:
      new Date().toISOString()

  };


  localStorage.setItem(

    "verido_last_touch",

    JSON.stringify(lastTouchData)

  );


})();


/* =========================================
   LOAD SAVED ATTRIBUTION
========================================= */

(function loadAttribution() {

  const marketing =
    window.VERIDO_DATA.marketing;


  try {

    const firstTouch =
      JSON.parse(
        localStorage.getItem(
          "verido_first_touch"
        )
      );

    if (firstTouch) {

      marketing.first_touch_source =
        firstTouch.source || "";

      marketing.first_touch_medium =
        firstTouch.medium || "";

      marketing.first_touch_campaign =
        firstTouch.campaign || "";

    }


  } catch (error) {

    console.warn(
      "Could not load first-touch attribution."
    );

  }


  try {

    const lastTouch =
      JSON.parse(
        localStorage.getItem(
          "verido_last_touch"
        )
      );

    if (lastTouch) {

      marketing.last_touch_source =
        lastTouch.source || "";

      marketing.last_touch_medium =
        lastTouch.medium || "";

      marketing.last_touch_campaign =
        lastTouch.campaign || "";

    }


  } catch (error) {

    console.warn(
      "Could not load last-touch attribution."
    );

  }

})();


/* =========================================
   PUSH INITIAL DATA TO DATA LAYER
========================================= */

window.dataLayer =
  window.dataLayer || [];


window.dataLayer.push({

  event: "verido_data_initialized",

  verido: window.VERIDO_DATA

});


/* =========================================
   DEBUG
========================================= */

console.log(
  "✅ VERIDO data layer configuration loaded."
);

console.log(
  "VERIDO DATA:",
  window.VERIDO_DATA
);
