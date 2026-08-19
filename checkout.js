/**
 * VERIDO E-COMMERCE PERFORMANCE MARKETING LAB
 * Checkout Tracking Engine
 */

(function () {

  "use strict";


  /* =========================================
     DATA LAYER
  ========================================= */

  window.dataLayer =
    window.dataLayer || [];


  function pushEvent(eventName, data = {}) {

    window.dataLayer.push({

      event: eventName,

      ...data

    });

    console.log(
      "[VERIDO CHECKOUT]",
      eventName,
      data
    );

  }


  /* =========================================
     GET CART
  ========================================= */

  function getCart() {

    try {

      return JSON.parse(
        localStorage.getItem(
          "verido_cart"
        )
      ) || [];

    } catch (error) {

      return [];

    }

  }


  /* =========================================
     CALCULATE CART VALUE
  ========================================= */

  function calculateCartValue(cart) {

    return cart.reduce(
      function (total, item) {

        const price =
          Number(item.price || 0);

        const quantity =
          Number(item.quantity || 1);

        return total +
          (price * quantity);

      },
      0
    );

  }


  /* =========================================
     CONVERT CART TO GA4 ITEMS
  ========================================= */

  function convertToGA4Items(cart) {

    return cart.map(
      function (item) {

        return {

          item_id:
            item.id || "",

          item_name:
            item.name || "",

          item_category:
            item.category || "",

          price:
            Number(item.price || 0),

          quantity:
            Number(item.quantity || 1)

        };

      }
    );

  }


  /* =========================================
     BEGIN CHECKOUT
  ========================================= */

  window.veridoBeginCheckout =
    function () {

      const cart =
        getCart();

      const value =
        calculateCartValue(cart);

      const items =
        convertToGA4Items(cart);


      pushEvent(
        "begin_checkout",
        {

          ecommerce: {

            currency: "INR",

            value: value,

            items: items

          }

        }
      );

    };


  /* =========================================
     ADD SHIPPING INFO
  ========================================= */

  window.veridoAddShippingInfo =
    function (shippingTier = "standard") {

      const cart =
        getCart();

      const value =
        calculateCartValue(cart);

      const items =
        convertToGA4Items(cart);


      pushEvent(
        "add_shipping_info",
        {

          ecommerce: {

            currency: "INR",

            value: value,

            shipping_tier:
              shippingTier,

            items: items

          }

        }
      );

    };


  /* =========================================
     ADD PAYMENT INFO
  ========================================= */

  window.veridoAddPaymentInfo =
    function (paymentType = "unknown") {

      const cart =
        getCart();

      const value =
        calculateCartValue(cart);

      const items =
        convertToGA4Items(cart);


      pushEvent(
        "add_payment_info",
        {

          ecommerce: {

            currency: "INR",

            value: value,

            payment_type:
              paymentType,

            items: items

          }

        }
      );

    };


  /* =========================================
     PURCHASE
  ========================================= */

  window.veridoPurchase =
    function (orderData = {}) {

      const cart =
        getCart();

      const value =
        Number(
          orderData.value ||
          calculateCartValue(cart)
        );


      const items =
        orderData.items ||
        convertToGA4Items(cart);


      const transactionId =
        orderData.transaction_id ||
        "VERIDO-" +
        Date.now();


      pushEvent(
        "purchase",
        {

          ecommerce: {

            transaction_id:
              transactionId,

            value:
              value,

            currency:
              orderData.currency ||
              "INR",

            tax:
              Number(
                orderData.tax || 0
              ),

            shipping:
              Number(
                orderData.shipping || 0
              ),

            coupon:
              orderData.coupon || "",

            items:
              items

          }

        }
      );


      /* -----------------------------------------
         SAVE ORDER INFORMATION
      ----------------------------------------- */

      localStorage.setItem(

        "verido_last_order",

        JSON.stringify({

          transaction_id:
            transactionId,

          value:
            value,

          currency:
            orderData.currency ||
            "INR",

          items:
            items,

          timestamp:
            new Date().toISOString()

        })

      );

    };


  /* =========================================
     CHECKOUT BUTTON
  ========================================= */

  document.addEventListener(
    "click",
    function (event) {

      const button =
        event.target.closest(
          "[data-checkout]"
        );


      if (!button) return;


      window.veridoBeginCheckout();

    }
  );


  /* =========================================
     SHIPPING BUTTON
  ========================================= */

  document.addEventListener(
    "click",
    function (event) {

      const button =
        event.target.closest(
          "[data-add-shipping]"
        );


      if (!button) return;


      const shippingTier =
        button.dataset.shippingTier ||
        "standard";


      window.veridoAddShippingInfo(
        shippingTier
      );

    }
  );


  /* =========================================
     PAYMENT BUTTON
  ========================================= */

  document.addEventListener(
    "click",
    function (event) {

      const button =
        event.target.closest(
          "[data-add-payment]"
        );


      if (!button) return;


      const paymentType =
        button.dataset.paymentType ||
        "unknown";


      window.veridoAddPaymentInfo(
        paymentType
      );

    }
  );


  /* =========================================
     PURCHASE BUTTON
  ========================================= */

  document.addEventListener(
    "click",
    function (event) {

      const button =
        event.target.closest(
          "[data-purchase]"
        );


      if (!button) return;


      const orderValue =
        Number(
          button.dataset.orderValue ||
          0
        );


      window.veridoPurchase({

        transaction_id:
          button.dataset.transactionId ||
          "",

        value:
          orderValue,

        currency:
          "INR"

      });

    }
  );


  /* =========================================
     CHECKOUT PAGE DETECTION
  ========================================= */

  if (
    window.location.pathname
      .toLowerCase()
      .includes("checkout")
  ) {

    pushEvent(
      "checkout_page_view",
      {

        page_type:
          "checkout"

      }
    );

  }


  /* =========================================
     DEBUG FUNCTION
  ========================================= */

  window.veridoCheckoutDebug =
    function () {

      const cart =
        getCart();

      console.log(
        "=============================="
      );

      console.log(
        "VERIDO CHECKOUT DEBUG"
      );

      console.log(
        "Cart:",
        cart
      );

      console.log(
        "Cart Value:",
        calculateCartValue(cart)
      );

      console.log(
        "GA4 Items:",
        convertToGA4Items(cart)
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
     READY
  ========================================= */

  console.log(
    "✅ VERIDO checkout.js loaded successfully."
  );


})();
