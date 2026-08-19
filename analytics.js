/**
 * VERIDO E-COMMERCE PERFORMANCE MARKETING LAB
 * GA4 Analytics Layer
 *
 * Purpose:
 * - Prepare GA4 event structure
 * - Keep analytics logic centralized
 * - Work with GTM / dataLayer
 * - Avoid sending PII
 */

(function () {

  "use strict";


  /* =========================================
     DATA LAYER
  ========================================= */

  window.dataLayer =
    window.dataLayer || [];


  /* =========================================
     ANALYTICS CONFIG
  ========================================= */

  const config =
    window.VERIDO_CONFIG || {};


  const tracking =
    config.tracking || {};


  /* =========================================
     CORE ANALYTICS EVENT
  ========================================= */

  function track(
    eventName,
    parameters = {}
  ) {

    window.dataLayer.push({

      event:
        eventName,

      ...parameters

    });


    console.log(
      "[VERIDO GA4]",
      eventName,
      parameters
    );

  }


  /* =========================================
     PAGE VIEW
  ========================================= */

  function pageView() {

    track(
      "ga4_page_view",
      {

        page_title:
          document.title,

        page_location:
          window.location.href,

        page_path:
          window.location.pathname

      }
    );

  }


  /* =========================================
     VIEW ITEM
  ========================================= */

  function viewItem(product) {

    if (!product) return;


    track(
      "view_item",
      {

        ecommerce: {

          currency:
            product.currency || "INR",

          value:
            Number(
              product.price || 0
            ),

          items: [{

            item_id:
              product.id || "",

            item_name:
              product.name || "",

            item_category:
              product.category || "",

            item_brand:
              product.brand || "VERIDO",

            price:
              Number(
                product.price || 0
              ),

            quantity: 1

          }]

        }

      }
    );

  }


  /* =========================================
     SELECT ITEM
  ========================================= */

  function selectItem(product) {

    if (!product) return;


    track(
      "select_item",
      {

        ecommerce: {

          item_list_name:
            product.listName ||
            "Product List",

          items: [{

            item_id:
              product.id || "",

            item_name:
              product.name || "",

            item_category:
              product.category || "",

            item_brand:
              product.brand || "VERIDO",

            price:
              Number(
                product.price || 0
              )

          }]

        }

      }
    );

  }


  /* =========================================
     ADD TO CART
  ========================================= */

  function addToCart(
    product,
    quantity = 1
  ) {

    if (!product) return;


    track(
      "add_to_cart",
      {

        ecommerce: {

          currency:
            product.currency || "INR",

          value:
            Number(
              product.price || 0
            ) *
            Number(quantity),

          items: [{

            item_id:
              product.id || "",

            item_name:
              product.name || "",

            item_category:
              product.category || "",

            item_brand:
              product.brand || "VERIDO",

            price:
              Number(
                product.price || 0
              ),

            quantity:
              Number(quantity)

          }]

        }

      }
    );

  }


  /* =========================================
     REMOVE FROM CART
  ========================================= */

  function removeFromCart(
    product,
    quantity = 1
  ) {

    if (!product) return;


    track(
      "remove_from_cart",
      {

        ecommerce: {

          currency:
            product.currency || "INR",

          value:
            Number(
              product.price || 0
            ) *
            Number(quantity),

          items: [{

            item_id:
              product.id || "",

            item_name:
              product.name || "",

            item_category:
              product.category || "",

            item_brand:
              product.brand || "VERIDO",

            price:
              Number(
                product.price || 0
              ),

            quantity:
              Number(quantity)

          }]

        }

      }
    );

  }


  /* =========================================
     VIEW CART
  ========================================= */

  function viewCart(
    items = []
  ) {

    const value =
      items.reduce(
        function (
          total,
          item
        ) {

          return total +
            (
              Number(
                item.price || 0
              ) *
              Number(
                item.quantity || 1
              )
            );

        },
        0
      );


    track(
      "view_cart",
      {

        ecommerce: {

          currency:
            "INR",

          value:
            value,

          items:
            items

        }

      }
    );

  }


  /* =========================================
     BEGIN CHECKOUT
  ========================================= */

  function beginCheckout(
    items = []
  ) {

    const value =
      items.reduce(
        function (
          total,
          item
        ) {

          return total +
            (
              Number(
                item.price || 0
              ) *
              Number(
                item.quantity || 1
              )
            );

        },
        0
      );


    track(
      "begin_checkout",
      {

        ecommerce: {

          currency:
            "INR",

          value:
            value,

          items:
            items

        }

      }
    );

  }


  /* =========================================
     ADD SHIPPING INFO
  ========================================= */

  function addShippingInfo(
    items = [],
    shippingTier = "standard"
  ) {

    track(
      "add_shipping_info",
      {

        ecommerce: {

          currency:
            "INR",

          shipping_tier:
            shippingTier,

          items:
            items

        }

      }
    );

  }


  /* =========================================
     ADD PAYMENT INFO
  ========================================= */

  function addPaymentInfo(
    items = [],
    paymentType = "unknown"
  ) {

    track(
      "add_payment_info",
      {

        ecommerce: {

          currency:
            "INR",

          payment_type:
            paymentType,

          items:
            items

        }

      }
    );

  }


  /* =========================================
     PURCHASE
  ========================================= */

  function purchase(
    transactionId,
    value,
    items = [],
    options = {}
  ) {

    if (!transactionId) {

      console.warn(
        "Purchase event requires transaction_id."
      );

      return;

    }


    track(
      "purchase",
      {

        ecommerce: {

          transaction_id:
            transactionId,

          value:
            Number(value || 0),

          currency:
            options.currency || "INR",

          tax:
            Number(
              options.tax || 0
            ),

          shipping:
            Number(
              options.shipping || 0
            ),

          coupon:
            options.coupon || "",

          items:
            items

        }

      }
    );

  }


  /* =========================================
     CUSTOM BUSINESS EVENTS
  ========================================= */

  function lead(
    source = "website"
  ) {

    track(
      "generate_lead",
      {

        lead_source:
          source

      }
    );

  }


  function phoneClick(
    location = "website"
  ) {

    track(
      "phone_click",
      {

        click_location:
          location

      }
    );

  }


  function whatsappClick(
    location = "website"
  ) {

    track(
      "whatsapp_click",
      {

        click_location:
          location

      }
    );

  }


  function contactSubmit(
    formName = "contact_form"
  ) {

    track(
      "contact_form_submit",
      {

        form_name:
          formName

      }
    );

  }


  /* =========================================
     SEARCH
  ========================================= */

  function search(
    searchTerm
  ) {

    if (!searchTerm) return;


    track(
      "search",
      {

        search_term:
          searchTerm

      }
    );

  }


  /* =========================================
     EXPOSE API
  ========================================= */

  window.VERIDO_ANALYTICS = {

    track:

      track,

    pageView:

      pageView,

    viewItem:

      viewItem,

    selectItem:

      selectItem,

    addToCart:

      addToCart,

    removeFromCart:

      removeFromCart,

    viewCart:

      viewCart,

    beginCheckout:

      beginCheckout,

    addShippingInfo:

      addShippingInfo,

    addPaymentInfo:

      addPaymentInfo,

    purchase:

      purchase,

    lead:

      lead,

    phoneClick:

      phoneClick,

    whatsappClick:

      whatsappClick,

    contactSubmit:

      contactSubmit,

    search:

      search

  };


  /* =========================================
     DEBUG
  ========================================= */

  window.veridoAnalyticsDebug =
    function () {

      console.log(
        "=============================="
      );

      console.log(
        "VERIDO ANALYTICS DEBUG"
      );

      console.log(
        "GA4 Measurement ID:",
        tracking.ga4MeasurementId || "Not configured"
      );

      console.log(
        "GTM Container ID:",
        tracking.gtmContainerId || "Not configured"
      );

      console.log(
        "DataLayer:",
        window.dataLayer
      );

      console.log(
        "Analytics API:",
        window.VERIDO_ANALYTICS
      );

      console.log(
        "=============================="
      );

    };


  /* =========================================
     READY
  ========================================= */

  console.log(
    "✅ VERIDO analytics.js loaded successfully."
  );


})();
