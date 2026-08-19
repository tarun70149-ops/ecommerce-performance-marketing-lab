/**
 * VERIDO E-COMMERCE PERFORMANCE MARKETING LAB
 * ---------------------------------------------
 * Purpose:
 * 1. Common website interactions
 * 2. GA4 / GTM dataLayer event hooks
 * 3. E-commerce event structure
 * 4. CTA / product / cart / checkout tracking hooks
 * 5. Form tracking
 * 6. UTM capture
 * 7. Local cart support
 *
 * This file is designed for practical
 * Google Ads + GA4 + GTM experimentation.
 */

(function () {
  "use strict";

  /* =========================================================
     1. GLOBAL DATA LAYER
  ========================================================= */

  window.dataLayer = window.dataLayer || [];

  function pushEvent(eventName, data = {}) {
    window.dataLayer.push({
      event: eventName,
      ...data
    });

    console.log("[VERIDO TRACKING]", eventName, data);
  }


  /* =========================================================
     2. UTM PARAMETER CAPTURE
  ========================================================= */

  function captureUTMParameters() {

    const params = new URLSearchParams(window.location.search);

    const utmData = {
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      utm_term: params.get("utm_term"),
      utm_content: params.get("utm_content")
    };

    const hasUTM = Object.values(utmData).some(value => value);

    if (hasUTM) {

      localStorage.setItem(
        "verido_utm",
        JSON.stringify(utmData)
      );

      pushEvent("utm_capture", utmData);
    }
  }

  captureUTMParameters();


  /* =========================================================
     3. PAGE VIEW
  ========================================================= */

  pushEvent("page_view_custom", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname
  });


  /* =========================================================
     4. CTA CLICK TRACKING
  ========================================================= */

  document.addEventListener("click", function (event) {

    const element = event.target.closest(
      "[data-track], [data-cta], .cta, .btn, button"
    );

    if (!element) return;

    const label =
      element.dataset.track ||
      element.dataset.cta ||
      element.innerText ||
      element.getAttribute("aria-label") ||
      "unknown";

    pushEvent("cta_click", {
      cta_text: label.trim(),
      cta_url: element.href || "",
      page_location: window.location.href
    });

  });


  /* =========================================================
     5. PRODUCT VIEW
  ========================================================= */

  const productElement =
    document.querySelector("[data-product-id]");

  if (productElement) {

    const product = {
      item_id: productElement.dataset.productId || "",
      item_name: productElement.dataset.productName || "",
      price: Number(productElement.dataset.price || 0),
      currency: productElement.dataset.currency || "INR"
    };

    pushEvent("view_item", {
      ecommerce: {
        currency: product.currency,
        value: product.price,
        items: [product]
      }
    });
  }


  /* =========================================================
     6. ADD TO CART
  ========================================================= */

  document.addEventListener("click", function (event) {

    const button = event.target.closest(
      "[data-add-to-cart], .add-to-cart, [data-action='add-to-cart']"
    );

    if (!button) return;

    const product = {
      item_id:
        button.dataset.productId ||
        button.closest("[data-product-id]")?.dataset.productId ||
        "",

      item_name:
        button.dataset.productName ||
        button.closest("[data-product-name]")?.dataset.productName ||
        "",

      price: Number(
        button.dataset.price ||
        button.closest("[data-price]")?.dataset.price ||
        0
      ),

      quantity: Number(button.dataset.quantity || 1)
    };

    pushEvent("add_to_cart", {
      ecommerce: {
        currency: "INR",
        value: product.price * product.quantity,
        items: [product]
      }
    });

  });


  /* =========================================================
     7. VIEW CART
  ========================================================= */

  document.addEventListener("click", function (event) {

    const cartButton = event.target.closest(
      "[data-view-cart], .view-cart, a[href*='cart']"
    );

    if (!cartButton) return;

    pushEvent("view_cart", {
      page_location: window.location.href
    });

  });


  /* =========================================================
     8. BEGIN CHECKOUT
  ========================================================= */

  document.addEventListener("click", function (event) {

    const checkoutButton = event.target.closest(
      "[data-checkout], .checkout, a[href*='checkout']"
    );

    if (!checkoutButton) return;

    pushEvent("begin_checkout", {
      page_location: window.location.href
    });

  });


  /* =========================================================
     9. PURCHASE
  ========================================================= */

  window.veridoPurchase = function (orderData = {}) {

    pushEvent("purchase", {

      ecommerce: {

        transaction_id:
          orderData.transaction_id ||
          "ORDER-" + Date.now(),

        value:
          Number(orderData.value || 0),

        currency:
          orderData.currency || "INR",

        tax:
          Number(orderData.tax || 0),

        shipping:
          Number(orderData.shipping || 0),

        items:
          orderData.items || []
      }

    });

  };


  /* =========================================================
     10. LEAD / CONTACT FORM TRACKING
  ========================================================= */

  document.addEventListener("submit", function (event) {

    const form = event.target;

    pushEvent("form_submit", {

      form_id: form.id || "",

      form_name:
        form.getAttribute("name") || "",

      form_action:
        form.action || "",

      page_location:
        window.location.href
    });

  });


  /* =========================================================
     11. SEARCH TRACKING
  ========================================================= */

  document.addEventListener("submit", function (event) {

    const form = event.target;

    const searchInput =
      form.querySelector(
        "input[type='search'], input[name='q'], input[name='search']"
      );

    if (!searchInput) return;

    const searchTerm = searchInput.value.trim();

    if (!searchTerm) return;

    pushEvent("search", {
      search_term: searchTerm
    });

  });


  /* =========================================================
     12. WHATSAPP CLICK
  ========================================================= */

  document.addEventListener("click", function (event) {

    const link = event.target.closest(
      "a[href*='wa.me'], a[href*='whatsapp']"
    );

    if (!link) return;

    pushEvent("whatsapp_click", {

      link_url: link.href,

      page_location:
        window.location.href
    });

  });


  /* =========================================================
     13. PHONE CLICK
  ========================================================= */

  document.addEventListener("click", function (event) {

    const link = event.target.closest(
      "a[href^='tel:']"
    );

    if (!link) return;

    pushEvent("phone_click", {

      phone_number:
        link.href.replace("tel:", ""),

      page_location:
        window.location.href
    });

  });


  /* =========================================================
     14. EMAIL CLICK
  ========================================================= */

  document.addEventListener("click", function (event) {

    const link = event.target.closest(
      "a[href^='mailto:']"
    );

    if (!link) return;

    pushEvent("email_click", {

      email:
        link.href.replace("mailto:", ""),

      page_location:
        window.location.href
    });

  });


  /* =========================================================
     15. SCROLL DEPTH
  ========================================================= */

  const scrollMarks = {
    25: false,
    50: false,
    75: false,
    90: false
  };

  window.addEventListener("scroll", function () {

    const scrollTop =
      window.scrollY;

    const pageHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    if (pageHeight <= 0) return;

    const percentage =
      Math.round(
        (scrollTop / pageHeight) * 100
      );

    Object.keys(scrollMarks).forEach(function (mark) {

      const threshold = Number(mark);

      if (
        percentage >= threshold &&
        !scrollMarks[threshold]
      ) {

        scrollMarks[threshold] = true;

        pushEvent("scroll_depth", {
          scroll_percentage: threshold
        });

      }

    });

  });


  /* =========================================================
     16. OUTBOUND CLICK TRACKING
  ========================================================= */

  document.addEventListener("click", function (event) {

    const link =
      event.target.closest("a[href]");

    if (!link) return;

    try {

      const url =
        new URL(link.href);

      if (
        url.hostname &&
        url.hostname !== window.location.hostname
      ) {

        pushEvent("outbound_click", {

          link_url: link.href,

          link_text:
            link.innerText.trim(),

          page_location:
            window.location.href
        });

      }

    } catch (error) {
      // Ignore invalid URLs
    }

  });


  /* =========================================================
     17. PRODUCT SELECT
  ========================================================= */

  document.addEventListener("click", function (event) {

    const productLink = event.target.closest(
      "[data-product-id], .product-card a"
    );

    if (!productLink) return;

    const container =
      productLink.closest(
        "[data-product-id], .product-card"
      );

    if (!container) return;

    pushEvent("select_item", {

      ecommerce: {

        items: [{

          item_id:
            container.dataset.productId || "",

          item_name:
            container.dataset.productName || "",

          price:
            Number(container.dataset.price || 0)

        }]

      }

    });

  });


  /* =========================================================
     18. LOCAL STORAGE CART
  ========================================================= */

  window.veridoCart = {

    get: function () {

      try {

        return JSON.parse(
          localStorage.getItem("verido_cart")
        ) || [];

      } catch (error) {

        return [];

      }

    },


    save: function (cart) {

      localStorage.setItem(
        "verido_cart",
        JSON.stringify(cart)
      );

    },


    clear: function () {

      localStorage.removeItem(
        "verido_cart"
      );

    }

  };


  /* =========================================================
     19. DEBUG MODE
  ========================================================= */

  window.veridoDebug = function () {

    console.log(
      "=============================="
    );

    console.log(
      "VERIDO PERFORMANCE MARKETING LAB"
    );

    console.log(
      "Current URL:",
      window.location.href
    );

    console.log(
      "UTM Data:",
      localStorage.getItem("verido_utm")
    );

    console.log(
      "Cart:",
      window.veridoCart.get()
    );

    console.log(
      "DataLayer:",
      window.dataLayer
    );

    console.log(
      "=============================="
    );

  };


  /* =========================================================
     20. READY MESSAGE
  ========================================================= */

  console.log(
    "✅ VERIDO script.js loaded successfully."
  );

})();
