/**
 * VERIDO E-COMMERCE PERFORMANCE MARKETING LAB
 * Thank You / Purchase Confirmation Tracking
 */

(function () {

  "use strict";


  /* =========================================
     DATA LAYER
  ========================================= */

  window.dataLayer =
    window.dataLayer || [];


  function pushEvent(
    eventName,
    data = {}
  ) {

    window.dataLayer.push({

      event:
        eventName,

      ...data

    });


    console.log(
      "[VERIDO THANK YOU]",
      eventName,
      data
    );

  }


  /* =========================================
     GET LAST ORDER
  ========================================= */

  function getLastOrder() {

    try {

      return JSON.parse(
        localStorage.getItem(
          "verido_last_order"
        )
      ) || null;

    } catch (error) {

      return null;

    }

  }


  /* =========================================
     CHECK PURCHASE STATUS
  ========================================= */

  function hasPurchaseBeenTracked(
    transactionId
  ) {

    if (!transactionId) {
      return false;
    }


    const key =
      "verido_purchase_tracked_" +
      transactionId;


    return (
      localStorage.getItem(key) ===
      "true"
    );

  }


  /* =========================================
     MARK PURCHASE AS TRACKED
  ========================================= */

  function markPurchaseTracked(
    transactionId
  ) {

    if (!transactionId) {
      return;
    }


    const key =
      "verido_purchase_tracked_" +
      transactionId;


    localStorage.setItem(
      key,
      "true"
    );

  }


  /* =========================================
     PURCHASE EVENT
  ========================================= */

  function trackPurchase() {

    const order =
      getLastOrder();


    if (!order) {

      console.warn(
        "No previous VERIDO order found."
      );

      return;

    }


    const transactionId =
      order.transaction_id;


    /*
     * Prevent duplicate purchase events
     */

    if (
      hasPurchaseBeenTracked(
        transactionId
      )
    ) {

      console.log(
        "Purchase already tracked:",
        transactionId
      );

      return;

    }


    const items =
      order.items || [];


    pushEvent(
      "purchase",
      {

        ecommerce: {

          transaction_id:
            transactionId,

          value:
            Number(
              order.value || 0
            ),

          currency:
            order.currency ||
            "INR",

          tax:
            Number(
              order.tax || 0
            ),

          shipping:
            Number(
              order.shipping || 0
            ),

          coupon:
            order.coupon || "",

          items:
            items

        }

      }
    );


    /*
     * Mark this transaction
     * as tracked.
     */

    markPurchaseTracked(
      transactionId
    );


    /*
     * Clear cart after
     * successful purchase.
     */

    localStorage.removeItem(
      "verido_cart"
    );


    console.log(
      "✅ Purchase tracked:",
      transactionId
    );

  }


  /* =========================================
     THANK YOU PAGE VIEW
  ========================================= */

  function trackThankYouPageView() {

    pushEvent(
      "thank_you_page_view",
      {

        page_type:
          "purchase_confirmation",

        page_location:
          window.location.href

      }
    );

  }


  /* =========================================
     ORDER SUMMARY
  ========================================= */

  function displayOrderSummary() {

    const order =
      getLastOrder();


    if (!order) {
      return;
    }


    const orderIdElement =
      document.querySelector(
        "[data-order-id]"
      );


    const orderValueElement =
      document.querySelector(
        "[data-order-value]"
      );


    if (
      orderIdElement &&
      order.transaction_id
    ) {

      orderIdElement.textContent =
        order.transaction_id;

    }


    if (
      orderValueElement
    ) {

      orderValueElement.textContent =
        "₹" +
        Number(
          order.value || 0
        ).toLocaleString(
          "en-IN"
        );

    }

  }


  /* =========================================
     CONTINUE SHOPPING
  ========================================= */

  document.addEventListener(
    "click",
    function (event) {

      const button =
        event.target.closest(
          "[data-continue-shopping]"
        );


      if (!button) {
        return;
      }


      pushEvent(
        "post_purchase_shop_click",
        {

          destination:
            button.href || ""

        }
      );

    }
  );


  /* =========================================
     SUPPORT CLICK
  ========================================= */

  document.addEventListener(
    "click",
    function (event) {

      const button =
        event.target.closest(
          "[data-order-support]"
        );


      if (!button) {
        return;
      }


      pushEvent(
        "post_purchase_support_click",
        {

          destination:
            button.href || ""

        }
      );

    }
  );


  /* =========================================
     PAGE INITIALIZATION
  ========================================= */

  function initialize() {

    /*
     * Only execute purchase logic
     * on the Thank You page.
     */

    const path =
      window.location.pathname
        .toLowerCase();


    if (
      !path.includes(
        "thank-you"
      ) &&
      !path.includes(
        "thankyou"
      )
    ) {

      return;

    }


    trackThankYouPageView();

    displayOrderSummary();

    trackPurchase();

  }


  /* =========================================
     DEBUG FUNCTION
  ========================================= */

  window.veridoThankYouDebug =
    function () {

      console.log(
        "=============================="
      );

      console.log(
        "VERIDO THANK YOU DEBUG"
      );

      console.log(
        "Last Order:",
        getLastOrder()
      );

      console.log(
        "DataLayer:",
        window.dataLayer
      );

      console.log(
        "=============================="
      );

    };


  /* =========================================
     START
  ========================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initialize
    );

  } else {

    initialize();

  }


  console.log(
    "✅ VERIDO thank-you.js loaded successfully."
  );

})();
