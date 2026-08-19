/**
 * VERIDO E-COMMERCE PERFORMANCE MARKETING LAB
 * Checkout Tracking + Order Completion Engine
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

      const cart =
        JSON.parse(
          localStorage.getItem(
            "verido_cart"
          )
        );

      return Array.isArray(cart)
        ? cart
        : [];

    } catch (error) {

      console.error(
        "[VERIDO CHECKOUT] Cart read error:",
        error
      );

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

      if (!cart.length) {

        console.warn(
          "[VERIDO] Cannot begin checkout: cart is empty."
        );

        return;

      }

      const value =
        calculateCartValue(cart);

      const items =
        convertToGA4Items(cart);


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

    };


  /* =========================================
     ADD SHIPPING INFO
  ========================================= */

  window.veridoAddShippingInfo =
    function (
      shippingTier = "standard"
    ) {

      const cart =
        getCart();

      if (!cart.length) return;


      const value =
        calculateCartValue(cart);

      const items =
        convertToGA4Items(cart);


      pushEvent(
        "add_shipping_info",
        {

          ecommerce: {

            currency:
              "INR",

            value:
              value,

            shipping_tier:
              shippingTier,

            items:
              items

          }

        }
      );

    };


  /* =========================================
     ADD PAYMENT INFO
  ========================================= */

  window.veridoAddPaymentInfo =
    function (
      paymentType = "unknown"
    ) {

      const cart =
        getCart();

      if (!cart.length) return;


      const value =
        calculateCartValue(cart);

      const items =
        convertToGA4Items(cart);


      pushEvent(
        "add_payment_info",
        {

          ecommerce: {

            currency:
              "INR",

            value:
              value,

            payment_type:
              paymentType,

            items:
              items

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


      /* -----------------------------------------
         EMPTY CART CHECK
      ----------------------------------------- */

      if (!cart.length) {

        console.warn(
          "[VERIDO] Purchase blocked: cart is empty."
        );

        return false;

      }


      /* -----------------------------------------
         CALCULATE ORDER
      ----------------------------------------- */

      const cartValue =
        calculateCartValue(cart);


      const value =
        Number(
          orderData.value ||
          cartValue
        );


      const items =
        orderData.items ||
        convertToGA4Items(cart);


      /* -----------------------------------------
         TRANSACTION ID
      ----------------------------------------- */

      const transactionId =
        orderData.transaction_id ||
        "VERIDO-" +
        Date.now();


      /* -----------------------------------------
         SHIPPING
      ----------------------------------------- */

      const shipping =
        Number(
          orderData.shipping || 0
        );


      /* -----------------------------------------
         TAX
      ----------------------------------------- */

      const tax =
        Number(
          orderData.tax || 0
        );


      /* -----------------------------------------
         COUPON
      ----------------------------------------- */

      const coupon =
        orderData.coupon || "";


      /* -----------------------------------------
         PURCHASE EVENT
      ----------------------------------------- */

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
              tax,

            shipping:
              shipping,

            coupon:
              coupon,

            items:
              items

          }

        }
      );


      /* -----------------------------------------
         SAVE LAST ORDER
      ----------------------------------------- */

      const order = {

        transaction_id:
          transactionId,

        value:
          value,

        currency:
          orderData.currency ||
          "INR",

        tax:
          tax,

        shipping:
          shipping,

        coupon:
          coupon,

        items:
          items,

        timestamp:
          new Date().toISOString()

      };


      localStorage.setItem(

        "verido_last_order",

        JSON.stringify(order)

      );


      /* -----------------------------------------
         CLEAR CART
      ----------------------------------------- */

      localStorage.removeItem(
        "verido_cart"
      );


      console.log(
        "✅ VERIDO cart cleared after purchase."
      );


      /* -----------------------------------------
         SAVE PURCHASE COMPLETION FLAG
      ----------------------------------------- */

      sessionStorage.setItem(
        "verido_purchase_completed",
        "true"
      );


      /* -----------------------------------------
         REDIRECT TO THANK YOU
      ----------------------------------------- */

      setTimeout(
        function () {

          window.location.href =
            "thank-you.html";

        },
        300
      );


      return true;

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


      /*
       * Prevent duplicate purchase clicks
       */

      if (
        sessionStorage.getItem(
          "verido_purchase_completed"
        ) === "true"
      ) {

        console.warn(
          "[VERIDO] Purchase already completed."
        );

        return;

      }


      const cart =
        getCart();


      if (!cart.length) {

        alert(
          "Your cart is empty."
        );

        return;

      }


      const cartValue =
        calculateCartValue(cart);


      const orderValue =
        Number(
          button.dataset.orderValue ||
          cartValue
        );


      const transactionId =
        button.dataset.transactionId ||
        "VERIDO-" +
        Date.now();


      const shipping =
        Number(
          button.dataset.shipping ||
          0
        );


      const tax =
        Number(
          button.dataset.tax ||
          0
        );


      const coupon =
        button.dataset.coupon ||
        "";


      window.veridoPurchase({

        transaction_id:
          transactionId,

        value:
          orderValue,

        currency:
          "INR",

        shipping:
          shipping,

        tax:
          tax,

        coupon:
          coupon

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
        "================================"
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
        "Last Order:",
        localStorage.getItem(
          "verido_last_order"
        )
      );

      console.log(
        "Purchase Completed:",
        sessionStorage.getItem(
          "verido_purchase_completed"
        )
      );

      console.log(
        "DataLayer:",
        window.dataLayer
      );

      console.log(
        "================================"
      );

    };


  /* =========================================
     READY
  ========================================= */

  console.log(
    "✅ VERIDO checkout.js loaded successfully."
  );

})();
