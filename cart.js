/**
 * VERIDO E-COMMERCE PERFORMANCE MARKETING LAB
 * Cart Engine
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
      "[VERIDO CART]",
      eventName,
      data
    );

  }


  /* =========================================
     CART STORAGE
  ========================================= */

  const CART_KEY =
    "verido_cart";


  function getCart() {

    try {

      return JSON.parse(
        localStorage.getItem(CART_KEY)
      ) || [];

    } catch (error) {

      return [];

    }

  }


  function saveCart(cart) {

    localStorage.setItem(
      CART_KEY,
      JSON.stringify(cart)
    );

  }


  /* =========================================
     CART VALUE
  ========================================= */

  function getCartValue(cart) {

    return cart.reduce(
      function (total, item) {

        return total +
          (
            Number(item.price || 0) *
            Number(item.quantity || 1)
          );

      },
      0
    );

  }


  /* =========================================
     GA4 ITEMS
  ========================================= */

  function getGA4Items(cart) {

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
     ADD PRODUCT
  ========================================= */

  function addToCart(product, quantity = 1) {

    if (!product) return;


    const cart =
      getCart();


    const existing =
      cart.find(
        item =>
          item.id === product.id
      );


    if (existing) {

      existing.quantity +=
        Number(quantity);

    } else {

      cart.push({

        id:
          product.id,

        name:
          product.name,

        category:
          product.category || "",

        price:
          Number(product.price || 0),

        quantity:
          Number(quantity)

      });

    }


    saveCart(cart);


    pushEvent(
      "add_to_cart",
      {

        ecommerce: {

          currency: "INR",

          value:
            Number(product.price || 0) *
            Number(quantity),

          items: [{

            item_id:
              product.id,

            item_name:
              product.name,

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


    updateCartCount();

  }


  /* =========================================
     REMOVE PRODUCT
  ========================================= */

  function removeFromCart(productId) {

    const cart =
      getCart();


    const product =
      cart.find(
        item =>
          item.id === productId
      );


    if (!product) return;


    const updatedCart =
      cart.filter(
        item =>
          item.id !== productId
      );


    saveCart(updatedCart);


    pushEvent(
      "remove_from_cart",
      {

        ecommerce: {

          currency: "INR",

          value:
            Number(product.price || 0) *
            Number(product.quantity || 1),

          items: [{

            item_id:
              product.id,

            item_name:
              product.name,

            item_category:
              product.category || "",

            price:
              Number(product.price || 0),

            quantity:
              Number(product.quantity || 1)

          }]

        }

      }
    );


    updateCartCount();

  }


  /* =========================================
     UPDATE QUANTITY
  ========================================= */

  function updateQuantity(
    productId,
    quantity
  ) {

    const cart =
      getCart();


    const product =
      cart.find(
        item =>
          item.id === productId
      );


    if (!product) return;


    quantity =
      Number(quantity);


    if (quantity <= 0) {

      removeFromCart(productId);

      return;

    }


    product.quantity =
      quantity;


    saveCart(cart);


    pushEvent(
      "cart_quantity_update",
      {

        item_id:
          product.id,

        quantity:
          product.quantity

      }
    );


    updateCartCount();

  }


  /* =========================================
     CLEAR CART
  ========================================= */

  function clearCart() {

    const cart =
      getCart();


    if (!cart.length) return;


    saveCart([]);


    pushEvent(
      "clear_cart",
      {

        previous_cart_items:
          cart.length,

        previous_cart_value:
          getCartValue(cart)

      }
    );


    updateCartCount();

  }


  /* =========================================
     VIEW CART
  ========================================= */

  function viewCart() {

    const cart =
      getCart();


    pushEvent(
      "view_cart",
      {

        ecommerce: {

          currency: "INR",

          value:
            getCartValue(cart),

          items:
            getGA4Items(cart)

        }

      }
    );

  }


  /* =========================================
     CART COUNT
  ========================================= */

  function updateCartCount() {

    const cart =
      getCart();


    const count =
      cart.reduce(
        function (total, item) {

          return total +
            Number(
              item.quantity || 1
            );

        },
        0
      );


    document
      .querySelectorAll(
        "[data-cart-count]"
      )
      .forEach(
        function (element) {

          element.textContent =
            count;

        }
      );


    return count;

  }


  /* =========================================
     EXPOSE CART API
  ========================================= */

  window.VERIDO_CART = {

    get:
      getCart,

    add:
      addToCart,

    remove:
      removeFromCart,

    updateQuantity:
      updateQuantity,

    clear:
      clearCart,

    value:
      function () {

        return getCartValue(
          getCart()
        );

      },

    count:
      updateCartCount,

    view:
      viewCart

  };


  /* =========================================
     ADD TO CART BUTTON
  ========================================= */

  document.addEventListener(
    "click",
    function (event) {

      const button =
        event.target.closest(
          "[data-add-to-cart]"
        );


      if (!button) return;


      const product = {

        id:
          button.dataset.productId,

        name:
          button.dataset.productName,

        category:
          button.dataset.category || "",

        price:
          Number(
            button.dataset.price || 0
          )

      };


      const quantity =
        Number(
          button.dataset.quantity || 1
        );


      addToCart(
        product,
        quantity
      );

    }
  );


  /* =========================================
     REMOVE BUTTON
  ========================================= */

  document.addEventListener(
    "click",
    function (event) {

      const button =
        event.target.closest(
          "[data-remove-from-cart]"
        );


      if (!button) return;


      const productId =
        button.dataset.productId;


      removeFromCart(
        productId
      );

    }
  );


  /* =========================================
     QUANTITY UPDATE
  ========================================= */

  document.addEventListener(
    "change",
    function (event) {

      const input =
        event.target.closest(
          "[data-cart-quantity]"
        );


      if (!input) return;


      const productId =
        input.dataset.productId;


      const quantity =
        Number(
          input.value
        );


      updateQuantity(
        productId,
        quantity
      );

    }
  );


  /* =========================================
     CLEAR CART BUTTON
  ========================================= */

  document.addEventListener(
    "click",
    function (event) {

      const button =
        event.target.closest(
          "[data-clear-cart]"
        );


      if (!button) return;


      clearCart();

    }
  );


  /* =========================================
     CART PAGE VIEW
  ========================================= */

  if (
    window.location.pathname
      .toLowerCase()
      .includes("cart")
  ) {

    viewCart();

  }


  /* =========================================
     INITIAL CART COUNT
  ========================================= */

  updateCartCount();


  /* =========================================
     DEBUG
  ========================================= */

  window.veridoCartDebug =
    function () {

      const cart =
        getCart();


      console.log(
        "=============================="
      );

      console.log(
        "VERIDO CART DEBUG"
      );

      console.log(
        "Cart:",
        cart
      );

      console.log(
        "Items:",
        cart.length
      );

      console.log(
        "Quantity:",
        cart.reduce(
          (total, item) =>
            total +
            Number(item.quantity || 1),
          0
        )
      );

      console.log(
        "Cart Value:",
        getCartValue(cart)
      );

      console.log(
        "GA4 Items:",
        getGA4Items(cart)
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
    "✅ VERIDO cart.js loaded successfully."
  );

})();
