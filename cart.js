/**
 * ============================================================
 * VERIDO E-COMMERCE PERFORMANCE MARKETING LAB
 * CART ENGINE
 * ============================================================
 *
 * Responsibilities:
 *
 * 1. Add products to cart
 * 2. Store cart in localStorage
 * 3. Increase quantity for duplicate products
 * 4. Maintain cart count
 * 5. Remove / update cart data
 * 6. GA4 ecommerce events
 * 7. Support shop.html
 * 8. Support cart.html
 *
 * Storage:
 * verido_cart
 *
 * ============================================================
 */

(function () {

  "use strict";


  /* ============================================================
     DATA LAYER
  ============================================================ */

  window.dataLayer =
    window.dataLayer || [];


  /* ============================================================
     CONSTANTS
  ============================================================ */

  const CART_KEY =
    "verido_cart";


  /* ============================================================
     EVENT HELPER
  ============================================================ */

  function pushEvent(
    eventName,
    parameters = {}
  ) {

    window.dataLayer.push({

      event:
        eventName,

      ...parameters

    });


    console.log(
      "[VERIDO CART]",
      eventName,
      parameters
    );

  }


  /* ============================================================
     GET CART
  ============================================================ */

  function getCart() {

    try {

      const storedCart =
        localStorage.getItem(
          CART_KEY
        );


      if (!storedCart) {

        return [];

      }


      const parsedCart =
        JSON.parse(
          storedCart
        );


      if (
        !Array.isArray(
          parsedCart
        )
      ) {

        return [];

      }


      return parsedCart;

    }

    catch (error) {

      console.error(
        "VERIDO cart read error:",
        error
      );


      return [];

    }

  }


  /* ============================================================
     SAVE CART
  ============================================================ */

  function saveCart(cart) {

    try {

      localStorage.setItem(

        CART_KEY,

        JSON.stringify(cart)

      );


      updateCartCount();


      window.dispatchEvent(
        new CustomEvent(
          "veridoCartUpdated",
          {
            detail: {
              cart: cart
            }
          }
        )
      );


      return true;

    }

    catch (error) {

      console.error(
        "VERIDO cart save error:",
        error
      );


      return false;

    }

  }


  /* ============================================================
     GET TOTAL QUANTITY
  ============================================================ */

  function getCartQuantity(
    cart = getCart()
  ) {

    return cart.reduce(

      function (
        total,
        item
      ) {

        return total +
          Number(
            item.quantity || 1
          );

      },

      0

    );

  }


  /* ============================================================
     UPDATE CART COUNT
  ============================================================ */

  function updateCartCount() {

    const cart =
      getCart();


    const quantity =
      getCartQuantity(
        cart
      );


    const counters =
      document.querySelectorAll(
        "#cartCount, [data-cart-count]"
      );


    counters.forEach(

      function (element) {

        element.textContent =
          quantity;

      }

    );


    return quantity;

  }


  /* ============================================================
     FIND PRODUCT
  ============================================================ */

  function findProduct(
    productId,
    cart = getCart()
  ) {

    return cart.find(

      function (item) {

        return String(
          item.id
        ) ===
        String(
          productId
        );

      }

    );

  }


  /* ============================================================
     GET PRODUCT INFORMATION FROM SHOP CARD
  ============================================================ */

  function getProductDetailsFromCard(
    productId
  ) {

    const card =
      document.querySelector(

        `.product-card[data-id="${productId}"]`

      );


    if (!card) {

      return {};

    }


    const imageElement =
      card.querySelector(
        ".product-image img"
      );


    return {

      id:
        card.dataset.id ||
        productId,

      name:
        card.dataset.name ||
        "",

      category:
        card.dataset.category ||
        "",

      price:
        Number(
          card.dataset.price ||
          0
        ),

      image:
        imageElement
          ? imageElement.src
          : ""

    };

  }


  /* ============================================================
     CONVERT CART TO GA4 ITEMS
  ============================================================ */

  function convertCartToGA4Items(
    cart
  ) {

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
            Number(
              item.price || 0
            ),

          quantity:
            Number(
              item.quantity || 1
            )

        };

      }

    );

  }


  /* ============================================================
     ADD TO CART
  ============================================================ */

  window.addToCart =
    function (
      productId,
      productName,
      price
    ) {


      console.log(
        "================================"
      );


      console.log(
        "VERIDO ADD TO CART"
      );


      console.log(
        "Product ID:",
        productId
      );


      console.log(
        "Product Name:",
        productName
      );


      console.log(
        "Price:",
        price
      );


      console.log(
        "================================"
      );


      /* --------------------------------------------------------
         READ CURRENT CART
      -------------------------------------------------------- */

      const cart =
        getCart();


      /* --------------------------------------------------------
         GET PRODUCT CARD DATA
      -------------------------------------------------------- */

      const cardData =
        getProductDetailsFromCard(
          productId
        );


      /* --------------------------------------------------------
         CREATE CLEAN PRODUCT OBJECT
      -------------------------------------------------------- */

      const product = {

        id:
          String(
            productId
          ),

        name:
          productName ||
          cardData.name ||
          "VERIDO Product",

        category:
          cardData.category ||
          "",

        price:
          Number(
            price ||
            cardData.price ||
            0
          ),

        image:
          cardData.image ||
          "",

        quantity:
          1

      };


      /* --------------------------------------------------------
         CHECK IF PRODUCT ALREADY EXISTS
      -------------------------------------------------------- */

      const existingProduct =
        cart.find(

          function (item) {

            return String(
              item.id
            ) ===
            String(
              product.id
            );

          }

        );


      /* ========================================================
         EXISTING PRODUCT
      ======================================================== */

      if (existingProduct) {


        existingProduct.quantity =
          Number(
            existingProduct.quantity || 1
          ) + 1;


        /*
         * Keep latest product information
         * without destroying existing quantity.
         */

        existingProduct.name =
          product.name;


        existingProduct.category =
          product.category;


        existingProduct.price =
          product.price;


        if (
          product.image
        ) {

          existingProduct.image =
            product.image;

        }


        saveCart(
          cart
        );


        /* ------------------------------------------------------
           GA4 ADD TO CART
        ------------------------------------------------------ */

        pushEvent(

          "add_to_cart",

          {

            ecommerce: {

              currency:
                "INR",

              value:
                product.price,

              items: [

                {

                  item_id:
                    product.id,

                  item_name:
                    product.name,

                  item_category:
                    product.category,

                  price:
                    product.price,

                  quantity:
                    1

                }

              ]

            }

          }

        );


        showCartMessage(

          product.name +
          " quantity increased."

        );


        return;

      }


      /* ========================================================
         NEW PRODUCT
      ======================================================== */

      cart.push(
        product
      );


      /* --------------------------------------------------------
         SAVE
      -------------------------------------------------------- */

      saveCart(
        cart
      );


      /* --------------------------------------------------------
         GA4
      -------------------------------------------------------- */

      pushEvent(

        "add_to_cart",

        {

          ecommerce: {

            currency:
              "INR",

            value:
              product.price,

            items: [

              {

                item_id:
                  product.id,

                item_name:
                  product.name,

                item_category:
                  product.category,

                price:
                  product.price,

                quantity:
                  1

              }

            ]

          }

        }

      );


      /* --------------------------------------------------------
         SUCCESS MESSAGE
      -------------------------------------------------------- */

      showCartMessage(

        product.name +
        " added to cart."

      );


    };


  /* ============================================================
     CART MESSAGE
  ============================================================ */

  function showCartMessage(
    message
  ) {

    /*
     * Keep existing alert-style behaviour
     * so current QA flow remains familiar.
     */

    alert(
      message
    );

  }


  /* ============================================================
     REMOVE PRODUCT
  ============================================================ */

  window.removeFromCart =
    function (
      productId
    ) {

      const cart =
        getCart();


      const product =
        findProduct(
          productId,
          cart
        );


      if (!product) {

        return;

      }


      const updatedCart =
        cart.filter(

          function (item) {

            return String(
              item.id
            ) !==
            String(
              productId
            );

          }

        );


      saveCart(
        updatedCart
      );


      /* ------------------------------------------------------
         GA4 REMOVE FROM CART
      ------------------------------------------------------ */

      pushEvent(

        "remove_from_cart",

        {

          ecommerce: {

            currency:
              "INR",

            value:
              Number(
                product.price || 0
              ) *
              Number(
                product.quantity || 1
              ),

            items: [

              {

                item_id:
                  product.id,

                item_name:
                  product.name,

                item_category:
                  product.category ||
                  "",

                price:
                  Number(
                    product.price || 0
                  ),

                quantity:
                  Number(
                    product.quantity || 1
                  )

              }

            ]

          }

        }

      );


    };


  /* ============================================================
     UPDATE PRODUCT QUANTITY
  ============================================================ */

  window.updateCartQuantity =
    function (
      productId,
      quantity
    ) {

      const cart =
        getCart();


      const product =
        findProduct(
          productId,
          cart
        );


      if (!product) {

        return;

      }


      let newQuantity =
        Number(
          quantity
        );


      if (
        !Number.isFinite(
          newQuantity
        )
      ) {

        return;

      }


      newQuantity =
        Math.floor(
          newQuantity
        );


      /* ------------------------------------------------------
         QUANTITY 0 = REMOVE
      ------------------------------------------------------ */

      if (
        newQuantity <= 0
      ) {

        window.removeFromCart(
          productId
        );


        return;

      }


      /* ------------------------------------------------------
         MAXIMUM SAFETY LIMIT
      ------------------------------------------------------ */

      if (
        newQuantity > 99
      ) {

        newQuantity =
          99;

      }


      product.quantity =
        newQuantity;


      saveCart(
        cart
      );


    };


  /* ============================================================
     CLEAR CART
  ============================================================ */

  window.clearVeridoCart =
    function () {

      const cart =
        getCart();


      if (
        cart.length === 0
      ) {

        return;

      }


      localStorage.removeItem(
        CART_KEY
      );


      updateCartCount();


      window.dispatchEvent(
        new CustomEvent(
          "veridoCartUpdated",
          {
            detail: {
              cart: []
            }
          }
        )
      );


      pushEvent(

        "clear_cart",

        {

          previous_cart_items:
            cart.length,

          previous_cart_quantity:
            getCartQuantity(
              cart
            )

        }

      );


    };


  /* ============================================================
     GET CART PUBLIC API
  ============================================================ */

  window.getVeridoCart =
    function () {

      return getCart();

    };


  /* ============================================================
     GET CART COUNT PUBLIC API
  ============================================================ */

  window.getVeridoCartCount =
    function () {

      return getCartQuantity();

    };


  /* ============================================================
     CHECK CART
  ============================================================ */

  window.veridoCartDebug =
    function () {

      const cart =
        getCart();


      console.log(
        "=========================================="
      );


      console.log(
        "VERIDO CART DEBUG"
      );


      console.log(
        "Unique Products:",
        cart.length
      );


      console.log(
        "Total Quantity:",
        getCartQuantity(
          cart
        )
      );


      console.table(
        cart
      );


      console.log(
        "localStorage:",
        localStorage.getItem(
          CART_KEY
        )
      );


      console.log(
        "=========================================="
      );


      return cart;

    };


  /* ============================================================
     INITIALIZE
  ============================================================ */

  function initializeCart() {

    updateCartCount();


    console.log(
      "✅ VERIDO cart.js loaded successfully."
    );


    console.log(
      "Cart:",
      getCart()
    );

  }


  /* ============================================================
     DOM READY
  ============================================================ */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initializeCart
    );

  }

  else {

    initializeCart();

  }


  /* ============================================================
     CART STORAGE SYNC
  ============================================================ */

  window.addEventListener(

    "storage",

    function (event) {

      if (
        event.key ===
        CART_KEY
      ) {

        updateCartCount();

      }

    }

  );


})();
