/**
 * =========================================================
 * DODS E-COMMERCE CART ENGINE
 * 100 PRODUCTS / 15 CATEGORIES
 * =========================================================
 */

(function () {

  "use strict";

  const CART_KEY = "verido_cart";

  window.dataLayer = window.dataLayer || [];


  /* =========================================================
     PRODUCT CATALOG
  ========================================================= */

  const CATALOG = {

    "T-Shirts": [
      ["Essential Oversized Tee", 899, 1199],
      ["Heavyweight Boxy Tee", 999, 1399],
      ["Classic Crew Neck Tee", 799, 1099],
      ["Premium Relaxed Tee", 949, 1299],
      ["Everyday Graphic Tee", 849, 1199],
      ["Essential Polo Tee", 1099, 1499],
      ["Drop Shoulder Tee", 999, 1399]
    ],

    "Shirts": [
      ["Premium Cotton Shirt", 1299, 1699],
      ["Relaxed Oxford Shirt", 1399, 1899],
      ["Linen Blend Resort Shirt", 1499, 1999],
      ["Classic Check Shirt", 1199, 1599],
      ["Everyday Overshirt", 1599, 2199],
      ["Minimal Camp Collar Shirt", 1399, 1899],
      ["Premium Striped Shirt", 1299, 1799]
    ],

    "Hoodies & Sweatshirts": [
      ["Minimal Everyday Hoodie", 1499, 1999],
      ["Heavyweight Essential Hoodie", 1799, 2399],
      ["Classic Pullover Hoodie", 1599, 2199],
      ["Relaxed Zip Hoodie", 1699, 2299],
      ["Everyday Crew Sweatshirt", 1399, 1899],
      ["Minimal Half-Zip Sweatshirt", 1799, 2499],
      ["Essential Fleece Sweatshirt", 1499, 1999]
    ],

    "Jeans": [
      ["Classic Straight Jeans", 1799, 2499],
      ["Relaxed Fit Denim", 1899, 2599],
      ["Slim Everyday Jeans", 1699, 2399],
      ["Washed Blue Jeans", 1799, 2499],
      ["Dark Indigo Jeans", 1899, 2599],
      ["Vintage Straight Denim", 1999, 2799],
      ["Relaxed Black Jeans", 1799, 2499]
    ],

    "Trousers": [
      ["Everyday Relaxed Trousers", 1499, 1999],
      ["Classic Tailored Trousers", 1699, 2299],
      ["Wide Leg Casual Trousers", 1599, 2199],
      ["Minimal Pleated Trousers", 1799, 2499],
      ["Smart Everyday Pants", 1499, 1999],
      ["Cotton Comfort Trousers", 1399, 1899],
      ["Modern Cargo Trousers", 1599, 2199]
    ],

    "Joggers": [
      ["Essential Daily Joggers", 1199, 1599],
      ["Relaxed Fleece Joggers", 1299, 1799],
      ["Minimal Cargo Joggers", 1399, 1899],
      ["Performance Joggers", 1499, 1999],
      ["Everyday Tapered Joggers", 1199, 1699],
      ["Heavyweight Lounge Joggers", 1399, 1899],
      ["Essential Training Joggers", 1299, 1799]
    ],

    "Sneakers": [
      ["Premium Everyday Sneakers", 2499, 3499],
      ["Urban Running Sneakers", 2999, 3999],
      ["Classic Court Sneakers", 2299, 3199],
      ["Minimal Street Sneakers", 2599, 3599],
      ["Retro Daily Sneakers", 2799, 3799],
      ["Lightweight Knit Sneakers", 2899, 3999],
      ["Essential White Sneakers", 2399, 3299]
    ],

    "Sandals & Slides": [
      ["Everyday Comfort Slides", 699, 999],
      ["Minimal Street Slides", 799, 1099],
      ["Cushion Recovery Slides", 999, 1399],
      ["Classic Casual Sandals", 1099, 1499],
      ["Urban Cross Strap Sandals", 1199, 1599],
      ["Weekend Travel Slides", 899, 1299],
      ["Classic Pool Slides", 749, 999]
    ],

    "Caps & Hats": [
      ["Classic Everyday Cap", 599, 799],
      ["Washed Cotton Cap", 699, 899],
      ["Minimal Logo Cap", 649, 899],
      ["Performance Running Cap", 799, 1099],
      ["Structured Premium Cap", 749, 999],
      ["Relaxed Dad Cap", 599, 799]
    ],

    "Bags & Backpacks": [
      ["Classic Everyday Backpack", 1799, 2399],
      ["Minimal Laptop Backpack", 1999, 2699],
      ["Urban Daypack", 1699, 2299],
      ["Compact Travel Backpack", 2199, 2999],
      ["Everyday Sling Bag", 999, 1399],
      ["Minimal Crossbody Bag", 1099, 1499],
      ["Weekend Duffle Bag", 1999, 2699]
    ],

    "Wallets": [
      ["Minimal Leather Wallet", 999, 1299],
      ["Classic Bifold Wallet", 899, 1199],
      ["Slim Card Wallet", 699, 999],
      ["Premium Zip Wallet", 1199, 1599],
      ["Everyday Leather Cardholder", 799, 1099],
      ["Minimal Travel Wallet", 1099, 1499]
    ],

    "Belts": [
      ["Classic Leather Belt", 899, 1199],
      ["Minimal Everyday Belt", 799, 1099],
      ["Premium Reversible Belt", 1199, 1599],
      ["Casual Canvas Belt", 699, 999],
      ["Textured Leather Belt", 999, 1399],
      ["Smart Casual Belt", 899, 1199]
    ],

    "Sunglasses": [
      ["Classic Black Sunglasses", 899, 1299],
      ["Minimal Square Sunglasses", 999, 1399],
      ["Everyday Round Sunglasses", 899, 1299],
      ["Retro Frame Sunglasses", 1099, 1499],
      ["Urban Shield Sunglasses", 1199, 1599],
      ["Premium Metal Sunglasses", 1399, 1899]
    ],

    "Watches": [
      ["Minimal Everyday Watch", 1999, 2799],
      ["Classic Leather Strap Watch", 2299, 3199],
      ["Urban Steel Watch", 2499, 3499],
      ["Minimal Mesh Watch", 2199, 2999],
      ["Classic Black Dial Watch", 2399, 3299],
      ["Premium Everyday Chronograph", 2999, 3999]
    ],

    "Accessories": [
      ["Everyday Key Organizer", 499, 699],
      ["Minimal Card Holder", 599, 799],
      ["Premium Travel Pouch", 799, 1099],
      ["Everyday Tech Organizer", 899, 1299],
      ["Minimal Utility Pouch", 699, 999],
      ["Classic Metal Keychain", 399, 599],
      ["Essential Travel Organizer", 999, 1399]
    ]

  };


  /* =========================================================
     IMAGE LIBRARY
  ========================================================= */

  const IMAGES = [

    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85",

    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=85",

    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85",

    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",

    "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=85",

    "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=700&q=85",

    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",

    "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=700&q=85",

    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85",

    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85"

  ];


  /* =========================================================
     GENERATE PRODUCT MASTER
  ========================================================= */

  const PRODUCTS = {};

  let productNumber = 1;
  let imageNumber = 0;


  Object.keys(CATALOG).forEach(function (category) {

    CATALOG[category].forEach(function (product) {

      const id =
        "VER-" +
        String(productNumber).padStart(3, "0");


      PRODUCTS[id] = {

        id: id,

        name: product[0],

        category: category,

        price: product[1],

        oldPrice: product[2],

        image:
          IMAGES[
            imageNumber % IMAGES.length
          ]

      };


      productNumber++;

      imageNumber++;

    });

  });


  /* =========================================================
     PRODUCT COUNT CHECK
  ========================================================= */

  console.log(
    "DODS PRODUCT MASTER:",
    Object.keys(PRODUCTS).length,
    "products"
  );


  /* =========================================================
     GET CART
  ========================================================= */

  function getCart() {

    try {

      const cart =
        JSON.parse(
          localStorage.getItem(CART_KEY)
        );

      return Array.isArray(cart)
        ? cart
        : [];

    }

    catch (error) {

      console.warn(
        "DODS: Cart read error",
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
     TOTAL QUANTITY
  ========================================================= */

  function getTotalQuantity(cart) {

    return cart.reduce(

      function (total, item) {

        return total +
          Number(item.quantity || 1);

      },

      0

    );

  }


  /* =========================================================
     CART COUNT
  ========================================================= */

  function updateCartCount() {

    const count =
      getTotalQuantity(
        getCart()
      );


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

  }


  /* =========================================================
     ADD TO CART
  ========================================================= */

  function addToCart(

    productId,
    productName,
    price

  ) {

    const id =
      String(productId);


    const masterProduct =
      PRODUCTS[id];


    const finalProduct = {

      id: id,

      name:
        masterProduct
          ? masterProduct.name
          : productName,

      category:
        masterProduct
          ? masterProduct.category
          : "Product",

      price:
        masterProduct
          ? masterProduct.price
          : Number(price || 0),

      image:
        masterProduct
          ? masterProduct.image
          : ""

    };


    if (!id) {

      console.error(
        "DODS: Product ID missing."
      );

      return;

    }


    const cart =
      getCart();


    const existing =
      cart.find(

        function (item) {

          return String(item.id) ===
            id;

        }

      );


    if (existing) {

      existing.quantity =
        Math.min(

          99,

          Number(
            existing.quantity || 1
          ) + 1

        );

      existing.name =
        finalProduct.name;

      existing.category =
        finalProduct.category;

      existing.price =
        finalProduct.price;

      existing.image =
        finalProduct.image;

    }

    else {

      cart.push({

        id:
          finalProduct.id,

        name:
          finalProduct.name,

        category:
          finalProduct.category,

        price:
          finalProduct.price,

        quantity:
          1,

        image:
          finalProduct.image

      });

    }


    saveCart(cart);


    /* =====================================================
       GA4
    ===================================================== */

    window.dataLayer.push({

      event: "add_to_cart",

      ecommerce: {

        currency: "INR",

        value:
          finalProduct.price,

        items: [

          {

            item_id:
              finalProduct.id,

            item_name:
              finalProduct.name,

            item_category:
              finalProduct.category,

            price:
              finalProduct.price,

            quantity:
              1

          }

        ]

      }

    });


    console.log(
      "✅ DODS: Added to cart",
      finalProduct
    );

  }


  /* =========================================================
     REMOVE FROM CART
  ========================================================= */

  function removeFromCart(productId) {

    const cart =
      getCart();


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


    window.dataLayer.push({

      event:
        "remove_from_cart",

      ecommerce: {

        items: [

          {

            item_id:
              String(productId)

          }

        ]

      }

    });

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


    if (!product) return;


    const newQuantity =
      Number(quantity);


    if (

      !Number.isFinite(newQuantity) ||

      newQuantity <= 0

    ) {

      removeFromCart(
        productId
      );

      return;

    }


    product.quantity =
      Math.min(

        99,

        Math.floor(
          newQuantity
        )

      );


    saveCart(cart);

  }


  /* =========================================================
     CLEAR CART
  ========================================================= */

  function clearCart() {

    localStorage.removeItem(
      CART_KEY
    );


    localStorage.removeItem(
      "verido_coupon"
    );


    updateCartCount();


    window.dataLayer.push({

      event:
        "clear_cart"

    });


    console.log(
      "🧹 DODS CART CLEARED"
    );


    if (

      window.location.pathname
        .toLowerCase()
        .includes("cart")

    ) {

      window.location.reload();

    }

  }


  /* =========================================================
     GLOBAL FUNCTIONS
  ========================================================= */

  window.addToCart =
    addToCart;


  window.removeFromCart =
    removeFromCart;


  window.updateCartQuantity =
    updateQuantity;


  window.clearVeridoCart =
    clearCart;


  /* =========================================================
     DODS CART API
  ========================================================= */

  window.DODS_CART = {

    get:
      getCart,

    add:
      addToCart,

    remove:
      removeFromCart,

    update:
      updateQuantity,

    clear:
      clearCart,

    count:
      function () {

        return getTotalQuantity(
          getCart()
        );

      },

    product:
      function (id) {

        return PRODUCTS[
          String(id)
        ] || null;

      },

    products:
      PRODUCTS

  };


  /* =========================================================
     OLD API — BACKWARD COMPATIBILITY
  ========================================================= */

  window.VERIDO_CART = {

    get:
      getCart,

    add:
      addToCart,

    remove:
      removeFromCart,

    update:
      updateQuantity,

    clear:
      clearCart,

    count:
      function () {

        return getTotalQuantity(
          getCart()
        );

      },

    product:
      function (id) {

        return PRODUCTS[
          String(id)
        ] || null;

      },

    products:
      PRODUCTS

  };


  /* =========================================================
     CLEAR CART BUTTON
  ========================================================= */

  document.addEventListener(

    "click",

    function (event) {

      const button =
        event.target.closest(
          "#clearCartBtn"
        );


      if (!button) return;


      event.preventDefault();


      clearCart();

    }

  );


  /* =========================================================
     INITIALIZATION
  ========================================================= */

  updateCartCount();


  console.log(
    "===================================="
  );

  console.log(
    "✅ DODS CART ENGINE READY"
  );

  console.log(
    "📦 Products:",
    Object.keys(PRODUCTS).length
  );

  console.log(
    "🗂️ Categories:",
    Object.keys(CATALOG).length
  );

  console.log(
    "===================================="
  );


})();
