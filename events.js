/**
 * VERIDO E-COMMERCE PERFORMANCE MARKETING LAB
 * Central Event System
 *
 * Purpose:
 * - Keep custom business events centralized
 * - Provide reusable tracking functions
 * - Push clean events into dataLayer
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
     CORE EVENT FUNCTION
  ========================================= */

  function pushEvent(
    eventName,
    parameters = {}
  ) {

    window.dataLayer.push({

      event: eventName,

      ...parameters

    });


    console.log(
      "[VERIDO EVENT]",
      eventName,
      parameters
    );

  }


  /* =========================================
     PAGE EVENTS
  ========================================= */

  window.VERIDO_EVENTS = {


    pageView: function () {

      pushEvent(
        "verido_page_view",
        {

          page_title:
            document.title,

          page_path:
            window.location.pathname,

          page_location:
            window.location.href

        }
      );

    },


    /* =======================================
       PRODUCT EVENTS
    ======================================= */


    viewItem: function (product) {

      if (!product) return;


      pushEvent(
        "view_item",
        {

          ecommerce: {

            currency:
              product.currency || "INR",

            value:
              Number(product.price || 0),

            items: [{

              item_id:
                product.id || "",

              item_name:
                product.name || "",

              item_category:
                product.category || "",

              price:
                Number(product.price || 0),

              quantity: 1

            }]

          }

        }
      );

    },


    selectItem: function (product) {

      if (!product) return;


      pushEvent(
        "select_item",
        {

          ecommerce: {

            item_list_name:
              product.listName || "Product List",

            items: [{

              item_id:
                product.id || "",

              item_name:
                product.name || "",

              item_category:
                product.category || "",

              price:
                Number(product.price || 0)

            }]

          }

        }
      );

    },


    addToCart: function (
      product,
      quantity = 1
    ) {

      if (!product) return;


      pushEvent(
        "add_to_cart",
        {

          ecommerce: {

            currency:
              product.currency || "INR",

            value:
              Number(product.price || 0) *
              Number(quantity),

            items: [{

              item_id:
                product.id || "",

              item_name:
                product.name || "",

              item_category:
                product.category || "",

              price:
                Number(product.price || 0),

              quantity:
                Number(quantity)

            }]

          }

        }
      );

    },


    removeFromCart: function (
      product,
      quantity = 1
    ) {

      if (!product) return;


      pushEvent(
        "remove_from_cart",
        {

          ecommerce: {

            currency:
              product.currency || "INR",

            value:
              Number(product.price || 0) *
              Number(quantity),

            items: [{

              item_id:
                product.id || "",

              item_name:
                product.name || "",

              item_category:
                product.category || "",

              price:
                Number(product.price || 0),

              quantity:
                Number(quantity)

            }]

          }

        }
      );

    },


    /* =======================================
       CART EVENTS
    ======================================= */


    viewCart: function (
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
                Number(item.price || 0) *
                Number(item.quantity || 1)
              );

          },
          0
        );


      pushEvent(
        "view_cart",
        {

          ecommerce: {

            currency: "INR",

            value:

              value,

            items:

              items

          }

        }
      );

    },


    /* =======================================
       CHECKOUT EVENTS
    ======================================= */


    beginCheckout: function (
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
                Number(item.price || 0) *
                Number(item.quantity || 1)
              );

          },
          0
        );


      pushEvent(
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

    },


    addShippingInfo: function (
      items = [],
      shippingTier = "standard"
    ) {

      pushEvent(
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

    },


    addPaymentInfo: function (
      items = [],
      paymentType = "unknown"
    ) {

      pushEvent(
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

    },


    /* =======================================
       PURCHASE
    ======================================= */


    purchase: function (
      transactionId,
      value,
      items = [],
      options = {}
    ) {

      pushEvent(
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

    },


    /* =======================================
       LEAD / CONTACT
    ======================================= */


    contactFormSubmit: function (
      formName = "contact_form",
      reason = "unknown"
    ) {

      pushEvent(
        "contact_form_submit",
        {

          form_name:
            formName,

          contact_reason:
            reason

        }
      );

    },


    /* =======================================
       PHONE
    ======================================= */


    phoneClick: function (
      location = "website"
    ) {

      pushEvent(
        "phone_click",
        {

          click_location:
            location

        }
      );

    },


    /* =======================================
       WHATSAPP
    ======================================= */


    whatsappClick: function (
      location = "website"
    ) {

      pushEvent(
        "whatsapp_click",
        {

          click_location:
            location

        }
      );

    },


    /* =======================================
       EMAIL
    ======================================= */


    emailClick: function (
      location = "website"
    ) {

      pushEvent(
        "email_click",
        {

          click_location:
            location

        }
      );

    },


    /* =======================================
       SEARCH
    ======================================= */


    search: function (
      searchTerm
    ) {

      if (!searchTerm) return;


      pushEvent(
        "search",
        {

          search_term:
            searchTerm

        }
      );

    },


    /* =======================================
       CTA
    ======================================= */


    ctaClick: function (
      ctaName,
      destination = ""
    ) {

      pushEvent(
        "cta_click",
        {

          cta_name:
            ctaName,

          destination:
            destination

        }
      );

    },


    /* =======================================
       SCROLL
    ======================================= */


    scrollDepth: function (
      percentage
    ) {

      pushEvent(
        "scroll_depth",
        {

          scroll_percentage:
            Number(percentage)

        }
      );

    },


    /* =======================================
       OUTBOUND CLICK
    ======================================= */


    outboundClick: function (
      url,
      linkText = ""
    ) {

      pushEvent(
        "outbound_click",
        {

          link_url:
            url,

          link_text:
            linkText

        }
      );

    }

  };


  /* =========================================
     PAGE VIEW
  ========================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      function () {

        VERIDO_EVENTS.pageView();

      }
    );

  } else {

    VERIDO_EVENTS.pageView();

  }


  /* =========================================
     GLOBAL CLICK LISTENER
  ========================================= */

  document.addEventListener(
    "click",
    function (event) {

      const element =
        event.target.closest(
          "[data-verido-event]"
        );


      if (!element) return;


      const eventName =
        element.getAttribute(
          "data-verido-event"
        );


      const eventLocation =
        element.getAttribute(
          "data-event-location"
        ) ||
        "website";


      switch (eventName) {

        case "phone_click":

          VERIDO_EVENTS.phoneClick(
            eventLocation
          );

          break;


        case "whatsapp_click":

          VERIDO_EVENTS.whatsappClick(
            eventLocation
          );

          break;


        case "email_click":

          VERIDO_EVENTS.emailClick(
            eventLocation
          );

          break;


        case "cta_click":

          VERIDO_EVENTS.ctaClick(

            element.getAttribute(
              "data-cta-name"
            ) || "unknown",

            element.href || ""

          );

          break;

      }

    }
  );


  /* =========================================
     DEBUG
  ========================================= */

  window.veridoEventsDebug =
    function () {

      console.log(
        "=============================="
      );

      console.log(
        "VERIDO EVENT SYSTEM"
      );

      console.log(
        "Available Events:",
        VERIDO_EVENTS
      );

      console.log(
        "DataLayer:",
        window.dataLayer
      );

      console.log(
        "=============================="
      );

    };


  console.log(
    "✅ VERIDO events.js loaded successfully."
  );

})();
