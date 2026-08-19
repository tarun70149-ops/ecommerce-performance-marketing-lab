/**
 * =========================================================
 * VERIDO CART ENGINE — FINAL FIX
 * =========================================================
 */

(function () {

  "use strict";

  const CART_KEY = "verido_cart";

  window.dataLayer = window.dataLayer || [];


  /* =========================================================
     PRODUCT MASTER
  ========================================================= */

  const PRODUCTS = {

    "VER-001": {
      id: "VER-001",
      name: "Essential Oversized Tee",
      category: "Apparel",
      price: 899,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85"
    },

    "VER-002": {
      id: "VER-002",
      name: "Minimal Everyday Hoodie",
      category: "Apparel",
      price: 1499,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85"
    },

    "VER-003": {
      id: "VER-003",
      name: "Classic Everyday Cap",
      category: "Accessories",
      price: 599,
      image:
        "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=700&q=85"
    },

    "VER-004": {
      id: "VER-004",
      name: "Premium Everyday Sneakers",
      category: "Footwear",
      price: 2499,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85"
    },

    "VER-005": {
      id: "VER-005",
      name: "Premium Cotton Shirt",
      category: "Apparel",
      price: 1299,
      image:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=85"
    },

    "VER-006": {
      id: "VER-006",
      name: "Urban Running Sneakers",
      category: "Footwear",
      price: 2999,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=85"
    },

    "VER-007": {
      id: "VER-007",
      name: "Minimal Leather Wallet",
      category: "Accessories",
      price: 999,
      image:
        "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=700&q=85"
    },

    "VER-008": {
      id: "VER-008",
      name: "Classic Everyday Backpack",
      category: "Accessories",
      price: 1799,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85"
    }

  };


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

    } catch (error) {

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
     CART COUNT
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


    /*
     * MASTER PRODUCT DATA ALWAYS WINS
     *
     * This prevents ₹0 problem.
     */

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


    if (!finalProduct.id) {

      return;

    }


    const cart =
      getCart();


    const existing =
      cart.find(

        function (item) {

          return String(item.id) ===
            finalProduct.id;

        }

      );


    if (existing) {

      existing.quantity =
        Number(existing.quantity || 1) + 1;

      existing.price =
        finalProduct.price;

      existing.name =
        finalProduct.name;

      existing.category =
        finalProduct.category;

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


    /* GA4 */

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

            quantity: 1

          }

        ]

      }

    });


    console.log(
      "✅ Added:",
      finalProduct
    );

    console.log(
      "🛒 Cart:",
      getCart()
    );

  }


  /* =========================================================
     REMOVE PRODUCT
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

      event: "remove_from_cart",

      item_id:
        productId

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
        Math.floor(newQuantity)
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
      "🧹 VERIDO CART CLEARED"
    );


    /*
     * Reload cart page so the
     * dynamic renderer immediately
     * shows empty cart.
     */

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

      }

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
     INITIAL COUNT
  ========================================================= */

  updateCartCount();


  console.log(
    "✅ VERIDO CART ENGINE READY"
  );


})();
