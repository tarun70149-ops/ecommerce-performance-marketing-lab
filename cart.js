/**
 * =========================================================
 * VERIDO E-COMMERCE PERFORMANCE MARKETING LAB
 * CART ENGINE — FINAL VERSION
 * =========================================================
 */

(function () {

  "use strict";


  /* =========================================================
     CONFIG
  ========================================================= */

  const CART_KEY = "verido_cart";


  /* =========================================================
     DATA LAYER
  ========================================================= */

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


  /* =========================================================
     PRODUCT IMAGE MAP
  ========================================================= */

  const productImages = {

    "VER-001":
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85",

    "VER-002":
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85",

    "VER-003":
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=700&q=85",

    "VER-004":
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85"

  };


  /* =========================================================
     PRODUCT CATEGORY MAP
  ========================================================= */

  const productCategories = {

    "VER-001": "Apparel",

    "VER-002": "Apparel",

    "VER-003": "Accessories",

    "VER-004": "Footwear"

  };


  /* =========================================================
     GET CART
  ========================================================= */

  function getCart() {

    try {

      const storedCart =
        localStorage.getItem(
          CART_KEY
        );


      if (!storedCart) {

        return [];

      }


      const cart =
        JSON.parse(storedCart);


      if (!Array.isArray(cart)) {

        return [];

      }


      return cart;

    }

    catch (error) {

      console.error(
        "VERIDO cart read error:",
        error
      );

      return [];

    }

  }


  /* =========================================================
     SAVE CART
  ========================================================= */

  function saveCart(cart) {

    localStorage.setItem(

      CART_KEY,

      JSON.stringify(cart)

    );


    updateCartCount();

  }


  /* =========================================================
     FORMAT MONEY
  ========================================================= */

  function money(value) {

    return "₹" +
      Number(value || 0)
        .toLocaleString("en-IN");

  }


  /* =========================================================
     NORMALIZE PRODUCT
  ========================================================= */

  function normalizeProduct(

    productId,

    productName,

    price,

    category = "",

    image = ""

  ) {

    return {

      id:
        String(productId || ""),

      name:
        String(productName || "VERIDO Product"),

      category:
        category ||
        productCategories[
          String(productId || "")
        ] ||
        "Product",

      price:
        Number(price || 0),

      image:
        image ||
        productImages[
          String(productId || "")
        ] ||
        ""

    };

  }


  /* =========================================================
     GET CART VALUE
  ========================================================= */

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


  /* =========================================================
     GET TOTAL QUANTITY
  ========================================================= */

  function getCartQuantity(cart) {

    return cart.reduce(

      function (total, item) {

        return total +

          Number(
            item.quantity || 1
          );

      },

      0

    );

  }


  /* =========================================================
     GA4 ITEMS
  ========================================================= */

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


  /* =========================================================
     UPDATE CART COUNT
  ========================================================= */

  function updateCartCount() {

    const cart =
      getCart();


    const count =
      getCartQuantity(cart);


    /*
     * Support both:
     *
     * #cartCount
     *
     * [data-cart-count]
     */

    document
      .querySelectorAll(
        "#cartCount, [data-cart-count]"
      )
      .forEach(

        function (element) {

          element.textContent =
            count;

        }

      );


    return count;

  }


  /* =========================================================
     ADD PRODUCT TO CART
     =========================================================
     
     SUPPORTS BOTH FORMATS:
     
     1.
     addToCart(
       "VER-001",
       "Essential Oversized Tee",
       899
     );
     
     2.
     addToCart({
       id: "VER-001",
       name: "Essential Oversized Tee",
       price: 899
     });
     
  ========================================================= */

  function addToCart(

    productOrId,

    productName,

    price,

    category = "",

    image = ""

  ) {


    let product;


    /* ---------------------------------------------------------
       OBJECT FORMAT
    --------------------------------------------------------- */

    if (

      typeof productOrId ===
      "object"

    ) {

      product =
        normalizeProduct(

          productOrId.id,

          productOrId.name,

          productOrId.price,

          productOrId.category,

          productOrId.image

        );

    }


    /* ---------------------------------------------------------
       OLD STRING FORMAT
    --------------------------------------------------------- */

    else {

      product =
        normalizeProduct(

          productOrId,

          productName,

          price,

          category,

          image

        );

    }


    /* ---------------------------------------------------------
       VALIDATION
    --------------------------------------------------------- */

    if (!product.id) {

      console.error(
        "VERIDO: Product ID missing."
      );

      return;

    }


    if (

      !Number.isFinite(
        product.price
      )

    ) {

      console.error(
        "VERIDO: Invalid product price."
      );

      return;

    }


    /* =========================================================
       GET CURRENT CART
    ========================================================= */

    const cart =
      getCart();


    /* =========================================================
       CHECK IF PRODUCT ALREADY EXISTS
    ========================================================= */

    const existingProduct =
      cart.find(

        function (item) {

          return String(item.id) ===
            String(product.id);

        }

      );


    /* =========================================================
       EXISTING PRODUCT
       → INCREASE QUANTITY
    ========================================================= */

    if (existingProduct) {

      existingProduct.quantity =
        Number(
          existingProduct.quantity || 1
        ) + 1;


      /*
       * Keep latest product data
       */

      existingProduct.name =
        product.name;

      existingProduct.price =
        product.price;

      existingProduct.category =
        product.category;

      existingProduct.image =
        product.image;

    }


    /* =========================================================
       NEW PRODUCT
       → PUSH NEW ITEM
    ========================================================= */

    else {

      cart.push({

        id:
          product.id,

        name:
          product.name,

        category:
          product.category,

        price:
          product.price,

        quantity:
          1,

        image:
          product.image

      });

    }


    /* =========================================================
       SAVE
    ========================================================= */

    saveCart(cart);


    /* =========================================================
       GA4 ADD TO CART
    ========================================================= */

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


    /* =========================================================
       UPDATE CART COUNT
    ========================================================= */

    updateCartCount();


    /* =========================================================
       CONSOLE DEBUG
    ========================================================= */

    console.log(
      "✅ Added to VERIDO cart:",
      product
    );


    console.log(
      "🛒 Current cart:",
      getCart()
    );


    console.log(
      "🛒 Total quantity:",
      getCartQuantity(
        getCart()
      )
    );


    /*
     * IMPORTANT:
     * No alert here.
     *
     * This keeps the shopping experience clean.
     */

  }


  /* =========================================================
     REMOVE PRODUCT
  ========================================================= */

  function removeFromCart(productId) {

    const cart =
      getCart();


    const product =
      cart.find(

        function (item) {

          return String(item.id) ===
            String(productId);

        }

      );


    if (!product) {

      return;

    }


    const updatedCart =
      cart.filter(

        function (item) {

          return String(item.id) !==
            String(productId);

        }

      );


    saveCart(
      updatedCart
    );


    pushEvent(

      "remove_from_cart",

      {

        ecommerce: {

          currency:
            "INR",

          value:
            Number(product.price || 0) *
            Number(product.quantity || 1),

          items: [

            {

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

            }

          ]

        }

      }

    );


    console.log(
      "🗑️ Removed from cart:",
      product
    );

  }


  /* =========================================================
     UPDATE QUANTITY
  ========================================================= */

  function updateQuantity(

    productId,

    quantity

  ) {

    const cart =
      getCart();


    const product =
      cart.find(

        function (item) {

          return String(item.id) ===
            String(productId);

        }

      );


    if (!product) {

      return;

    }


    let newQuantity =
      Number(quantity);


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


    if (
      newQuantity <= 0
    ) {

      removeFromCart(
        productId
      );

      return;

    }


    /*
     * Maximum quantity = 99
     */

    newQuantity =
      Math.min(
        99,
        newQuantity
      );


    product.quantity =
      newQuantity;


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


    console.log(
      "🔢 Quantity updated:",
      product.id,
      product.quantity
    );

  }


  /* =========================================================
     CLEAR CART
  ========================================================= */

  function clearCart() {

    const cart =
      getCart();


    if (!cart.length) {

      return;

    }


    const previousValue =
      getCartValue(cart);


    localStorage.removeItem(
      CART_KEY
    );


    localStorage.removeItem(
      "verido_coupon"
    );


    pushEvent(

      "clear_cart",

      {

        previous_cart_items:
          cart.length,

        previous_cart_quantity:
          getCartQuantity(cart),

        previous_cart_value:
          previousValue

      }

    );


    updateCartCount();


    console.log(
      "🧹 VERIDO cart cleared."
    );

  }


  /* =========================================================
     VIEW CART
  ========================================================= */

  function viewCart() {

    const cart =
      getCart();


    pushEvent(

      "view_cart",

      {

        ecommerce: {

          currency:
            "INR",

          value:
            getCartValue(cart),

          items:
            getGA4Items(cart)

        }

      }

    );

  }


  /* =========================================================
     EXPOSE GLOBAL API
  ========================================================= */

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
      viewCart,

    items:
      function () {

        return getGA4Items(
          getCart()
        );

      }

  };


  /* =========================================================
     GLOBAL addToCart()
     
     This is VERY IMPORTANT because shop.html
     currently calls:
     
     addToCart(
       'VER-001',
       'Essential Oversized Tee',
       899
     );
     
  ========================================================= */

  window.addToCart =
    addToCart;


  /* =========================================================
     GLOBAL REMOVE
  ========================================================= */

  window.removeFromCart =
    removeFromCart;


  /* =========================================================
     GLOBAL UPDATE QUANTITY
  ========================================================= */

  window.updateCartQuantity =
    updateQuantity;


  /* =========================================================
     GLOBAL CLEAR
  ========================================================= */

  window.clearVeridoCart =
    clearCart;


  /* =========================================================
     GLOBAL DEBUG
  ========================================================= */

  window.veridoCartDebug =
    function () {

      const cart =
        getCart();


      console.log(
        "================================"
      );


      console.log(
        "VERIDO CART DEBUG"
      );


      console.log(
        "Cart:",
        cart
      );


      console.log(
        "Unique Products:",
        cart.length
      );


      console.log(
        "Total Quantity:",
        getCartQuantity(cart)
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
        "================================"
      );

    };


  /* =========================================================
     INITIAL CART COUNT
  ========================================================= */

  updateCartCount();


  /* =========================================================
     INITIAL LOG
  ========================================================= */

  console.log(
    "✅ VERIDO FINAL cart.js loaded successfully."
  );


})();
