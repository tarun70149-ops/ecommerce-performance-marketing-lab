/**
 * =========================================================
 * DODS E-COMMERCE PERFORMANCE MARKETING LAB
 * Central Data Layer Configuration
 * =========================================================
 *
 * BRAND:
 * DODS
 *
 * NOTE:
 * Internal VERIDO compatibility names are intentionally
 * preserved for the current website architecture.
 * This prevents existing cart, checkout and tracking
 * systems from breaking during the brand migration.
 * =========================================================
 */

(function () {

  "use strict";


  /* =========================================================
     DODS DATA LAYER CONFIGURATION
  ========================================================= */

  window.DODS_DATA = {

    /* =========================================
       WEBSITE INFORMATION
    ========================================= */

    website: {

      brand: "DODS",

      website_type:
        "ecommerce",

      market:
        "India",

      city:
        "Jaipur",

      country:
        "IN"

    },


    /* =========================================
       DEFAULT USER CONTEXT
    ========================================= */

    user: {

      logged_in:
        false,

      user_type:
        "guest"

    },


    /* =========================================
       CURRENT PAGE
    ========================================= */

    page: {

      type:
        "unknown",

      title:
        document.title || "",

      url:
        window.location.href,

      path:
        window.location.pathname,

      referrer:
        document.referrer || ""

    },


    /* =========================================
       MARKETING ATTRIBUTION
    ========================================= */

    marketing: {

      source:
        "",

      medium:
        "",

      campaign:
        "",

      term:
        "",

      content:
        "",

      gclid:
        "",

      fbclid:
        "",

      landing_page:
        window.location.href,


      /* -----------------------------------------
         FIRST TOUCH
      ----------------------------------------- */

      first_touch_source:
        "",

      first_touch_medium:
        "",

      first_touch_campaign:
        "",


      /* -----------------------------------------
         LAST TOUCH
      ----------------------------------------- */

      last_touch_source:
        "",

      last_touch_medium:
        "",

      last_touch_campaign:
        ""

    },


    /* =========================================
       E-COMMERCE CONTEXT
    ========================================= */

    ecommerce: {

      currency:
        "INR",

      cart_value:
        0,

      cart_items:
        0,

      checkout_value:
        0,

      order_value:
        0,

      transaction_id:
        ""

    },


    /* =========================================
       CONSENT
    ========================================= */

    consent: {

      analytics:
        true,

      advertising:
        true,

      functionality:
        true

    }

  };


  /* =========================================================
     BACKWARD COMPATIBILITY
  =========================================================
     
     Existing website files may still use:

     window.VERIDO_DATA

     We keep it working so that changing the brand
     does NOT break existing JavaScript.
  ========================================================= */

  window.VERIDO_DATA =
    window.DODS_DATA;


  /* =========================================================
     UTM / CLICK ID CAPTURE
  ========================================================= */

  (function captureMarketingData() {

    const params =
      new URLSearchParams(
        window.location.search
      );


    const marketing =
      window.DODS_DATA.marketing;


    /* -----------------------------------------
       UTM SOURCE
    ----------------------------------------- */

    marketing.source =
      params.get("utm_source") || "";


    /* -----------------------------------------
       UTM MEDIUM
    ----------------------------------------- */

    marketing.medium =
      params.get("utm_medium") || "";


    /* -----------------------------------------
       UTM CAMPAIGN
    ----------------------------------------- */

    marketing.campaign =
      params.get("utm_campaign") || "";


    /* -----------------------------------------
       UTM TERM
    ----------------------------------------- */

    marketing.term =
      params.get("utm_term") || "";


    /* -----------------------------------------
       UTM CONTENT
    ----------------------------------------- */

    marketing.content =
      params.get("utm_content") || "";


    /* -----------------------------------------
       GOOGLE CLICK ID
    ----------------------------------------- */

    marketing.gclid =
      params.get("gclid") || "";


    /* -----------------------------------------
       META CLICK ID
    ----------------------------------------- */

    marketing.fbclid =
      params.get("fbclid") || "";


    /* =====================================================
       SAVE FIRST-TOUCH ATTRIBUTION
    ===================================================== */

    const firstTouch =
      localStorage.getItem(
        "verido_first_touch"
      );


    if (!firstTouch) {

      const firstTouchData = {

        source:
          marketing.source,

        medium:
          marketing.medium,

        campaign:
          marketing.campaign,

        term:
          marketing.term,

        content:
          marketing.content,

        gclid:
          marketing.gclid,

        fbclid:
          marketing.fbclid,

        landing_page:
          window.location.href,

        timestamp:
          new Date().toISOString()

      };


      localStorage.setItem(

        "verido_first_touch",

        JSON.stringify(
          firstTouchData
        )

      );

    }


    /* =====================================================
       SAVE LAST-TOUCH ATTRIBUTION
    ===================================================== */

    const lastTouchData = {

      source:
        marketing.source,

      medium:
        marketing.medium,

      campaign:
        marketing.campaign,

      term:
        marketing.term,

      content:
        marketing.content,

      gclid:
        marketing.gclid,

      fbclid:
        marketing.fbclid,

      landing_page:
        window.location.href,

      timestamp:
        new Date().toISOString()

    };


    localStorage.setItem(

      "verido_last_touch",

      JSON.stringify(
        lastTouchData
      )

    );


  })();


  /* =========================================================
     LOAD SAVED ATTRIBUTION
  ========================================================= */

  (function loadAttribution() {

    const marketing =
      window.DODS_DATA.marketing;


    /* =====================================================
       LOAD FIRST-TOUCH
    ===================================================== */

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


    /* =====================================================
       LOAD LAST-TOUCH
    ===================================================== */

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


  /* =========================================================
     GLOBAL DATA LAYER
  ========================================================= */

  window.dataLayer =
    window.dataLayer || [];


  /* =========================================================
     INITIAL DODS DATA EVENT
  ========================================================= */

  window.dataLayer.push({

    event:
      "dods_data_initialized",

    dods:
      window.DODS_DATA

  });


  /* =========================================================
     LEGACY EVENT
  =========================================================
     
     Existing GTM / analytics setup may still listen for:

     verido_data_initialized

     So we keep it temporarily.
  ========================================================= */

  window.dataLayer.push({

    event:
      "verido_data_initialized",

    verido:
      window.DODS_DATA

  });


  /* =========================================================
     DEBUG
  ========================================================= */

  console.log(
    "✅ DODS data layer configuration loaded."
  );


  console.log(
    "🏷️ Brand:",
    window.DODS_DATA.website.brand
  );


  console.log(
    "📊 DODS DATA:",
    window.DODS_DATA
  );


})();
