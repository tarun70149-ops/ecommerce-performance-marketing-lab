<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0">

  <title>Cart | VERIDO</title>

  <meta
    name="description"
    content="Review your VERIDO shopping cart and proceed to secure checkout.">


  <style>

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }


    body {

      font-family:
        Arial,
        Helvetica,
        sans-serif;

      background: #f7f7f7;

      color: #111;

      line-height: 1.5;

    }


    a {
      color: inherit;
      text-decoration: none;
    }


    button,
    input {
      font-family: inherit;
    }


    /* =========================================
       TOP BAR
    ========================================= */

    .top-bar {

      background: #111;

      color: #fff;

      text-align: center;

      padding: 10px 20px;

      font-size: 13px;

      letter-spacing: .3px;

    }


    /* =========================================
       NAVBAR
    ========================================= */

    .navbar {

      background: #fff;

      min-height: 78px;

      display: flex;

      align-items: center;

      justify-content: space-between;

      padding: 0 6%;

      border-bottom: 1px solid #e5e5e5;

    }


    .logo {

      font-size: 28px;

      font-weight: 900;

      letter-spacing: 3px;

    }


    .nav-links {

      list-style: none;

      display: flex;

      gap: 34px;

    }


    .nav-links a {

      font-size: 15px;

      font-weight: 700;

      transition: .2s;

    }


    .nav-links a:hover {
      opacity: .55;
    }


    .nav-actions {

      display: flex;

      align-items: center;

      gap: 15px;

    }


    .cart-icon {

      font-weight: 700;

      display: flex;

      align-items: center;

      gap: 7px;

    }


    .cart-count {

      width: 24px;

      height: 24px;

      background: #111;

      color: #fff;

      border-radius: 50%;

      display: inline-flex;

      align-items: center;

      justify-content: center;

      font-size: 12px;

    }


    /* =========================================
       PAGE HEADER
    ========================================= */

    .page-header {

      background: #fff;

      padding: 55px 6% 50px;

      border-bottom: 1px solid #eee;

    }


    .page-header span {

      font-size: 12px;

      font-weight: 700;

      letter-spacing: 2px;

      color: #777;

    }


    .page-header h1 {

      margin-top: 8px;

      font-size: 48px;

      line-height: 1.1;

    }


    /* =========================================
       CART CONTAINER
    ========================================= */

    .cart-container {

      width: min(1200px, 90%);

      margin: 55px auto 90px;

    }


    .cart-layout {

      display: grid;

      grid-template-columns:
        minmax(0, 1.65fr)
        minmax(320px, .85fr);

      gap: 35px;

      align-items: start;

    }


    /* =========================================
       CART ITEMS
    ========================================= */

    .cart-items {

      background: #fff;

      border: 1px solid #e5e5e5;

    }


    .cart-header {

      display: flex;

      align-items: center;

      justify-content: space-between;

      padding: 25px 28px;

      border-bottom: 1px solid #e8e8e8;

    }


    .cart-header h2 {

      font-size: 23px;

    }


    #itemCount {

      font-size: 14px;

      color: #777;

    }


    /* =========================================
       DYNAMIC PRODUCT
    ========================================= */

    .cart-product {

      display: grid;

      grid-template-columns: 120px 1fr auto;

      gap: 22px;

      padding: 25px 28px;

      border-bottom: 1px solid #e8e8e8;

    }


    .product-image {

      width: 120px;

      height: 150px;

      overflow: hidden;

      background: #eee;

    }


    .product-image img {

      width: 100%;

      height: 100%;

      object-fit: cover;

      display: block;

    }


    .product-category {

      font-size: 11px;

      text-transform: uppercase;

      letter-spacing: 1.5px;

      color: #888;

      margin-bottom: 5px;

    }


    .product-name {

      font-size: 20px;

      font-weight: 800;

      margin-bottom: 5px;

    }


    .product-price {

      font-weight: 700;

      margin-bottom: 17px;

    }


    .quantity-control {

      display: inline-flex;

      align-items: center;

      border: 1px solid #ddd;

    }


    .quantity-control button {

      width: 36px;

      height: 36px;

      border: 0;

      background: #fff;

      cursor: pointer;

      font-size: 18px;

    }


    .quantity-control button:hover {

      background: #f2f2f2;

    }


    .quantity-input {

      width: 45px;

      height: 36px;

      border: 0;

      border-left: 1px solid #ddd;

      border-right: 1px solid #ddd;

      text-align: center;

      outline: none;

      font-weight: 700;

    }


    .remove-btn {

      margin-left: 12px;

      border: 0;

      background: transparent;

      color: #777;

      text-decoration: underline;

      cursor: pointer;

      font-size: 13px;

    }


    .remove-btn:hover {

      color: #111;

    }


    .line-total {

      font-size: 17px;

      font-weight: 800;

      white-space: nowrap;

    }


    /* =========================================
       EMPTY CART
    ========================================= */

    .empty-cart {

      display: none;

      text-align: center;

      padding: 70px 30px;

    }


    .empty-cart.visible {

      display: block;

    }


    .empty-cart .icon {

      font-size: 55px;

      margin-bottom: 15px;

    }


    .empty-cart h2 {

      font-size: 28px;

      margin-bottom: 8px;

    }


    .empty-cart p {

      color: #777;

      margin-bottom: 25px;

    }


    .shop-btn {

      display: inline-block;

      background: #111;

      color: #fff;

      padding: 13px 25px;

      font-weight: 700;

    }


    /* =========================================
       CART ACTIONS
    ========================================= */

    .cart-actions {

      display: flex;

      justify-content: space-between;

      align-items: center;

      padding: 22px 28px;

      background: #fff;

    }


    .continue-btn {

      font-weight: 700;

      font-size: 14px;

    }


    .clear-btn {

      background: transparent;

      border: 1px solid #ccc;

      padding: 10px 17px;

      cursor: pointer;

      font-weight: 700;

    }


    .clear-btn:hover {

      background: #111;

      color: #fff;

      border-color: #111;

    }


    /* =========================================
       SUMMARY
    ========================================= */

    .summary {

      background: #fff;

      border: 1px solid #e5e5e5;

      padding: 28px;

      position: sticky;

      top: 20px;

    }


    .summary h2 {

      font-size: 23px;

      margin-bottom: 25px;

    }


    .summary-row {

      display: flex;

      justify-content: space-between;

      gap: 20px;

      margin-bottom: 15px;

      font-size: 15px;

    }


    .summary-row span:last-child {

      font-weight: 700;

    }


    .discount-row {

      color: #16803c;

    }


    .summary-divider {

      border-top: 1px solid #ddd;

      margin: 20px 0;

    }


    .total-row {

      display: flex;

      justify-content: space-between;

      font-size: 20px;

      font-weight: 900;

      margin-bottom: 22px;

    }


    .checkout-btn {

      width: 100%;

      border: 0;

      background: #111;

      color: #fff;

      padding: 16px;

      font-size: 16px;

      font-weight: 800;

      cursor: pointer;

    }


    .checkout-btn:hover {

      background: #333;

    }


    .checkout-btn:disabled {

      background: #bbb;

      cursor: not-allowed;

    }


    .secure-note {

      text-align: center;

      font-size: 12px;

      color: #777;

      margin-top: 14px;

    }


    /* =========================================
       COUPON
    ========================================= */

    .coupon-box {

      margin-top: 28px;

      padding-top: 25px;

      border-top: 1px solid #e5e5e5;

    }


    .coupon-box label {

      display: block;

      font-size: 13px;

      font-weight: 700;

      margin-bottom: 9px;

    }


    .coupon-form {

      display: flex;

    }


    .coupon-form input {

      flex: 1;

      min-width: 0;

      height: 43px;

      border: 1px solid #ddd;

      padding: 0 12px;

      outline: none;

    }


    .coupon-form button {

      width: 80px;

      border: 0;

      background: #111;

      color: #fff;

      font-weight: 700;

      cursor: pointer;

    }


    .coupon-message {

      display: none;

      margin-top: 10px;

      font-size: 13px;

    }


    .coupon-message.success {

      display: block;

      color: #16803c;

    }


    .coupon-message.error {

      display: block;

      color: #c62828;

    }


    /* =========================================
       BENEFITS
    ========================================= */

    .cart-benefits {

      display: grid;

      grid-template-columns:
        repeat(3, 1fr);

      gap: 15px;

      margin-top: 30px;

    }


    .benefit {

      background: #fff;

      border: 1px solid #e5e5e5;

      padding: 22px;

      display: flex;

      flex-direction: column;

      gap: 5px;

    }


    .benefit strong {

      font-size: 14px;

    }


    .benefit span {

      color: #777;

      font-size: 13px;

    }


    /* =========================================
       FOOTER
    ========================================= */

    footer {

      background: #111;

      color: #fff;

      padding: 65px 6% 25px;

    }


    .footer-grid {

      display: grid;

      grid-template-columns:
        2fr 1fr 1fr 1fr;

      gap: 45px;

      max-width: 1200px;

      margin: auto;

    }


    footer h3 {

      font-size: 23px;

      letter-spacing: 2px;

      margin-bottom: 12px;

    }


    footer h4 {

      margin-bottom: 15px;

    }


    footer p {

      color: #aaa;

      max-width: 300px;

    }


    footer ul {

      list-style: none;

    }


    footer li {

      margin-bottom: 8px;

    }


    footer li a {

      color: #aaa;

      font-size: 14px;

    }


    footer li a:hover {

      color: #fff;

    }


    .footer-bottom {

      max-width: 1200px;

      margin: 45px auto 0;

      padding-top: 20px;

      border-top: 1px solid #333;

      display: flex;

      justify-content: space-between;

      color: #777;

      font-size: 12px;

    }


    /* =========================================
       RESPONSIVE
    ========================================= */

    @media (max-width: 900px) {

      .cart-layout {

        grid-template-columns: 1fr;

      }

      .summary {

        position: static;

      }

      .nav-links {

        display: none;

      }

      .footer-grid {

        grid-template-columns:
          1fr 1fr;

      }

    }


    @media (max-width: 600px) {

      .page-header h1 {

        font-size: 36px;

      }


      .cart-product {

        grid-template-columns:
          85px 1fr;

        gap: 15px;

      }


      .product-image {

        width: 85px;

        height: 110px;

      }


      .line-total {

        grid-column: 2;

      }


      .cart-actions {

        flex-direction: column;

        align-items: stretch;

        gap: 15px;

      }


      .cart-benefits {

        grid-template-columns: 1fr;

      }


      .footer-grid {

        grid-template-columns: 1fr;

      }


      .footer-bottom {

        flex-direction: column;

        gap: 10px;

      }

    }

  </style>

</head>


<body>


  <!-- =========================================
       TOP BAR
  ========================================== -->

  <div class="top-bar">

    Free shipping on orders above ₹999
    • Easy 7-day returns

  </div>


  <!-- =========================================
       NAVBAR
  ========================================== -->

  <header class="navbar">

    <a
      href="index.html"
      class="logo"
      data-event="logo_click">

      VERIDO

    </a>


    <nav>

      <ul class="nav-links">

        <li>
          <a href="index.html">
            Home
          </a>
        </li>

        <li>
          <a
            href="shop.html"
            data-event="shop_navigation">
            Shop
          </a>
        </li>

        <li>
          <a
            href="offers.html"
            data-event="offers_navigation">
            Offers
          </a>
        </li>

        <li>
          <a href="about.html">
            About
          </a>
        </li>

        <li>
          <a href="contact.html">
            Contact
          </a>
        </li>

      </ul>

    </nav>


    <div class="nav-actions">

      <a
        href="cart.html"
        class="cart-icon"
        data-event="cart_click">

        🛒 Cart

        <span
          class="cart-count"
          data-cart-count>
          0
        </span>

      </a>

    </div>

  </header>


  <!-- =========================================
       PAGE HEADER
  ========================================== -->

  <section class="page-header">

    <span>
      VERIDO
    </span>

    <h1>
      Your Cart
    </h1>

  </section>


  <!-- =========================================
       MAIN CART
  ========================================== -->

  <main class="cart-container">


    <div
      class="cart-layout"
      id="cartLayout">


      <!-- =====================================
           CART ITEMS
      ====================================== -->

      <section>

        <div
          class="cart-items"
          id="cartItems">

          <div class="cart-header">

            <h2>
              Shopping Bag
            </h2>

            <span id="itemCount">
              0 Items
            </span>

          </div>


          <!--
            PRODUCTS ARE GENERATED
            DYNAMICALLY HERE.
          -->

          <div id="dynamicCartProducts"></div>


          <!-- =================================
               EMPTY CART
          ================================== -->

          <div
            class="empty-cart"
            id="emptyCart">

            <div class="icon">
              🛒
            </div>

            <h2>
              Your cart is empty
            </h2>

            <p>
              Looks like you haven't added
              anything yet.
            </p>

            <a
              href="shop.html"
              class="shop-btn">

              Start Shopping

            </a>

          </div>


          <!-- =================================
               CART ACTIONS
          ================================== -->

          <div
            class="cart-actions"
            id="cartActions">

            <a
              href="shop.html"
              class="continue-btn"
              data-event="continue_shopping">

              ← Continue Shopping

            </a>


            <button
              type="button"
              class="clear-btn"
              id="clearCartBtn">

              Clear Cart

            </button>

          </div>

        </div>

      </section>


      <!-- =====================================
           ORDER SUMMARY
      ====================================== -->

      <aside
        class="summary"
        id="summary">

        <h2>
          Order Summary
        </h2>


        <div class="summary-row">

          <span>
            Subtotal
          </span>

          <span id="subtotal">
            ₹0
          </span>

        </div>


        <div class="summary-row">

          <span>
            Shipping
          </span>

          <span id="shipping">
            ₹0
          </span>

        </div>


        <div
          class="summary-row discount-row">

          <span>
            Discount
          </span>

          <span id="discount">
            -₹0
          </span>

        </div>


        <div class="summary-divider"></div>


        <div class="total-row">

          <span>
            Total
          </span>

          <span id="total">
            ₹0
          </span>

        </div>


        <!-- CHECKOUT -->

        <button
          type="button"
          class="checkout-btn"
          id="checkoutBtn"
          data-checkout>

          Proceed to Checkout

        </button>


        <div class="secure-note">

          🔒 Secure & encrypted checkout

        </div>


        <!-- COUPON -->

        <div class="coupon-box">

          <label>
            Have a coupon?
          </label>


          <div class="coupon-form">

            <input
              type="text"
              id="couponInput"
              placeholder="ENTER CODE"
              autocomplete="off">


            <button
              type="button"
              id="couponBtn">

              Apply

            </button>

          </div>


          <div
            class="coupon-message"
            id="couponMessage">
          </div>

        </div>

      </aside>

    </div>


    <!-- =====================================
         BENEFITS
    ====================================== -->

    <div class="cart-benefits">


      <div class="benefit">

        <strong>
          🚚 Fast Delivery
        </strong>

        <span>
          Delivery across India
        </span>

      </div>


      <div class="benefit">

        <strong>
          ↩ Easy Returns
        </strong>

        <span>
          7-day return policy
        </span>

      </div>


      <div class="benefit">

        <strong>
          🔒 Secure Payment
        </strong>

        <span>
          Safe checkout process
        </span>

      </div>


    </div>

  </main>


  <!-- =========================================
       FOOTER
  ========================================== -->

  <footer>

    <div class="footer-grid">


      <div>

        <h3>
          VERIDO
        </h3>

        <p>
          Premium everyday essentials
          designed for modern lifestyles.
        </p>

      </div>


      <div>

        <h4>
          Shop
        </h4>

        <ul>

          <li>
            <a href="shop.html">
              All Products
            </a>
          </li>

          <li>
            <a href="shop.html?category=apparel">
              Apparel
            </a>
          </li>

          <li>
            <a href="shop.html?category=footwear">
              Footwear
            </a>
          </li>

          <li>
            <a href="shop.html?category=accessories">
              Accessories
            </a>
          </li>

        </ul>

      </div>


      <div>

        <h4>
          Support
        </h4>

        <ul>

          <li>
            <a href="contact.html">
              Contact Us
            </a>
          </li>

          <li>
            <a href="faq.html">
              FAQ
            </a>
          </li>

          <li>
            <a href="shipping.html">
              Shipping
            </a>
          </li>

          <li>
            <a href="returns.html">
              Returns
            </a>
          </li>

        </ul>

      </div>


      <div>

        <h4>
          Company
        </h4>

        <ul>

          <li>
            <a href="about.html">
              About Us
            </a>
          </li>

          <li>
            <a href="privacy.html">
              Privacy
            </a>
          </li>

          <li>
            <a href="terms.html">
              Terms
            </a>
          </li>

        </ul>

      </div>


    </div>


    <div class="footer-bottom">

      <span>
        © 2026 VERIDO. All rights reserved.
      </span>

      <span>
        Performance Marketing Lab
      </span>

    </div>

  </footer>


  <!-- =========================================
       EXISTING CART ENGINE
  ========================================== -->

  <script src="cart.js"></script>


  <!-- =========================================
       DYNAMIC CART RENDER ENGINE
  ========================================== -->

  <script>

    (function () {

      "use strict";


      /* =======================================
         DATA LAYER
      ======================================= */

      window.dataLayer =
        window.dataLayer || [];


      function pushEvent(
        eventName,
        data = {}
      ) {

        window.dataLayer.push({

          event: eventName,

          ...data

        });

        console.log(
          "[VERIDO CART PAGE]",
          eventName,
          data
        );

      }


      /* =======================================
         GET CART
      ======================================= */

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
            "Cart read error:",
            error
          );

          return [];

        }

      }


      /* =======================================
         SAVE CART
      ======================================= */

      function saveCart(cart) {

        localStorage.setItem(

          "verido_cart",

          JSON.stringify(cart)

        );

      }


      /* =======================================
         FORMAT MONEY
      ======================================= */

      function money(value) {

        return "₹" +
          Number(value || 0)
            .toLocaleString("en-IN");

      }


      /* =======================================
         ESCAPE HTML
      ======================================= */

      function escapeHTML(value) {

        return String(value || "")

          .replace(
            /&/g,
            "&amp;"
          )

          .replace(
            /</g,
            "&lt;"
          )

          .replace(
            />/g,
            "&gt;"
          )

          .replace(
            /"/g,
            "&quot;"
          )

          .replace(
            /'/g,
            "&#039;"
          );

      }


      /* =======================================
         PRODUCT IMAGE MAP
      ======================================= */

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


      /* =======================================
         CALCULATE SUBTOTAL
      ======================================= */

      function getSubtotal(cart) {

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


      /* =======================================
         TOTAL ITEM QUANTITY
      ======================================= */

      function getQuantity(cart) {

        return cart.reduce(

          function (total, item) {

            return total +
              Number(item.quantity || 1);

          },

          0

        );

      }


      /* =======================================
         SHIPPING
      ======================================= */

      function getShipping(subtotal) {

        if (subtotal <= 0) {

          return 0;

        }

        return subtotal >= 999
          ? 0
          : 99;

      }


      /* =======================================
         DISCOUNT
      ======================================= */

      let appliedCoupon =
        localStorage.getItem(
          "verido_coupon"
        ) || "";


      function getDiscount(subtotal) {

        if (
          appliedCoupon ===
          "VERIDO15"
        ) {

          return subtotal * 0.15;

        }

        return 0;

      }


      /* =======================================
         RENDER CART
      ======================================= */

      function renderCart() {

        const cart =
          getCart();


        const container =
          document.getElementById(
            "dynamicCartProducts"
          );


        const emptyCart =
          document.getElementById(
            "emptyCart"
          );


        const cartActions =
          document.getElementById(
            "cartActions"
          );


        const summary =
          document.getElementById(
            "summary"
          );


        const itemCount =
          document.getElementById(
            "itemCount"
          );


        const checkoutBtn =
          document.getElementById(
            "checkoutBtn"
          );


        const subtotal =
          getSubtotal(cart);


        const shipping =
          getShipping(subtotal);


        const discount =
          getDiscount(subtotal);


        const total =
          Math.max(
            0,
            subtotal +
            shipping -
            discount
          );


        /* =================================
           ITEM COUNT
        ================================= */

        const quantity =
          getQuantity(cart);


        itemCount.textContent =
          quantity +
          (
            quantity === 1
              ? " Item"
              : " Items"
          );


        /* =================================
           EMPTY
        ================================= */

        if (!cart.length) {

          container.innerHTML = "";

          emptyCart.classList.add(
            "visible"
          );

          cartActions.style.display =
            "none";

          summary.style.display =
            "none";

          checkoutBtn.disabled =
            true;

          updateHeaderCount(0);

          return;

        }


        emptyCart.classList.remove(
          "visible"
        );

        cartActions.style.display =
          "flex";

        summary.style.display =
          "block";

        checkoutBtn.disabled =
          false;


        /* =================================
           PRODUCTS
        ================================= */

        container.innerHTML =
          cart.map(

            function (item, index) {

              const id =
                escapeHTML(
                  item.id ||
                  ("ITEM-" + index)
                );


              const name =
                escapeHTML(
                  item.name ||
                  "VERIDO Product"
                );


              const category =
                escapeHTML(
                  item.category ||
                  "Product"
                );


              const price =
                Number(
                  item.price || 0
                );


              const qty =
                Number(
                  item.quantity || 1
                );


              const lineTotal =
                price * qty;


              const image =
                item.image ||
                productImages[
                  item.id
                ] ||
                "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=700&q=85";


              return `

                <article
                  class="cart-product"
                  data-id="${id}">

                  <div
                    class="product-image">

                    <img
                      src="${escapeHTML(image)}"
                      alt="${name}"
                      loading="lazy">

                  </div>


                  <div>

                    <div
                      class="product-category">

                      ${category}

                    </div>


                    <div
                      class="product-name">

                      ${name}

                    </div>


                    <div
                      class="product-price">

                      ${money(price)}

                    </div>


                    <div>

                      <div
                        class="quantity-control">

                        <button
                          type="button"
                          class="qty-minus"
                          data-id="${id}">

                          −

                        </button>


                        <input
                          class="quantity-input"
                          type="number"
                          min="1"
                          max="99"
                          value="${qty}"
                          data-id="${id}">


                        <button
                          type="button"
                          class="qty-plus"
                          data-id="${id}">

                          +

                        </button>

                      </div>


                      <button
                        type="button"
                        class="remove-btn"
                        data-remove-id="${id}">

                        Remove

                      </button>

                    </div>

                  </div>


                  <div
                    class="line-total">

                    ${money(lineTotal)}

                  </div>

                </article>

              `;

            }

          ).join("");


        /* =================================
           SUMMARY
        ================================= */

        document.getElementById(
          "subtotal"
        ).textContent =
          money(subtotal);


        document.getElementById(
          "shipping"
        ).textContent =
          shipping === 0
            ? "FREE"
            : money(shipping);


        document.getElementById(
          "discount"
        ).textContent =
          "-" +
          money(discount);


        document.getElementById(
          "total"
        ).textContent =
          money(total);


        /* =================================
           HEADER COUNT
        ================================= */

        updateHeaderCount(
          quantity
        );

      }


      /* =======================================
         HEADER COUNT
      ======================================= */

      function updateHeaderCount(count) {

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

      }


      /* =======================================
         UPDATE QUANTITY
      ======================================= */

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


        quantity =
          Number(quantity);


        if (
          !Number.isFinite(quantity) ||
          quantity <= 0
        ) {

          removeProduct(
            productId
          );

          return;

        }


        product.quantity =
          Math.min(
            99,
            Math.floor(quantity)
          );


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


        renderCart();

      }


      /* =======================================
         REMOVE PRODUCT
      ======================================= */

      function removeProduct(
        productId
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


        const newCart =
          cart.filter(

            function (item) {

              return String(item.id) !==
                String(productId);

            }

          );


        saveCart(newCart);


        pushEvent(
          "remove_from_cart",
          {

            ecommerce: {

              currency:
                "INR",

              value:
                product
                  ? Number(
                      product.price || 0
                    ) *
                    Number(
                      product.quantity || 1
                    )
                  : 0,

              items:
                product
                  ? [{

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

                    }]
                  : []

            }

          }
        );


        renderCart();

      }


      /* =======================================
         CLEAR CART
      ======================================= */

      function clearCart() {

        const cart =
          getCart();


        if (!cart.length) return;


        const value =
          getSubtotal(cart);


        localStorage.removeItem(
          "verido_cart"
        );


        localStorage.removeItem(
          "verido_coupon"
        );


        appliedCoupon = "";


        pushEvent(
          "clear_cart",
          {

            previous_cart_items:
              cart.length,

            previous_cart_quantity:
              getQuantity(cart),

            previous_cart_value:
              value

          }
        );


        renderCart();

      }


      /* =======================================
         COUPON
      ======================================= */

      function applyCoupon() {

        const input =
          document.getElementById(
            "couponInput"
          );


        const message =
          document.getElementById(
            "couponMessage"
          );


        const code =
          String(
            input.value || ""
          )
          .trim()
          .toUpperCase();


        message.className =
          "coupon-message";


        if (
          code ===
          "VERIDO15"
        ) {

          appliedCoupon =
            "VERIDO15";


          localStorage.setItem(
            "verido_coupon",
            "VERIDO15"
          );


          message.textContent =
            "✓ 15% discount applied.";


          message.classList.add(
            "success"
          );


          pushEvent(
            "coupon_applied",
            {

              coupon:
                "VERIDO15"

            }
          );


          renderCart();


          return;

        }


        appliedCoupon = "";


        localStorage.removeItem(
          "verido_coupon"
        );


        message.textContent =
          "Invalid coupon code.";


        message.classList.add(
          "error"
        );


        renderCart();

      }


      /* =======================================
         CHECKOUT
      ======================================= */

      function proceedToCheckout() {

        const cart =
          getCart();


        if (!cart.length) {

          alert(
            "Your cart is empty."
          );

          return;

        }


        const subtotal =
          getSubtotal(cart);


        const shipping =
          getShipping(subtotal);


        const discount =
          getDiscount(subtotal);


        const total =
          Math.max(
            0,
            subtotal +
            shipping -
            discount
          );


        const items =
          cart.map(

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


        pushEvent(
          "begin_checkout",
          {

            ecommerce: {

              currency:
                "INR",

              value:
                total,

              items:
                items

            }

          }
        );


        /* SAVE CURRENT CHECKOUT */

        localStorage.setItem(

          "verido_checkout",

          JSON.stringify({

            items:
              cart,

            subtotal:
              subtotal,

            shipping:
              shipping,

            discount:
              discount,

            coupon:
              appliedCoupon,

            total:
              total,

            timestamp:
              new Date().toISOString()

          })

        );


        window.location.href =
          "checkout.html";

      }


      /* =======================================
         EVENT LISTENERS
      ======================================= */

      document.addEventListener(

        "click",

        function (event) {


          /* PLUS */

          const plus =
            event.target.closest(
              ".qty-plus"
            );


          if (plus) {

            const id =
              plus.dataset.id;


            const cart =
              getCart();


            const item =
              cart.find(

                function (product) {

                  return String(
                    product.id
                  ) === String(id);

                }

              );


            if (item) {

              updateQuantity(

                id,

                Number(
                  item.quantity || 1
                ) + 1

              );

            }


            return;

          }


          /* MINUS */

          const minus =
            event.target.closest(
              ".qty-minus"
            );


          if (minus) {

            const id =
              minus.dataset.id;


            const cart =
              getCart();


            const item =
              cart.find(

                function (product) {

                  return String(
                    product.id
                  ) === String(id);

                }

              );


            if (item) {

              updateQuantity(

                id,

                Number(
                  item.quantity || 1
                ) - 1

              );

            }


            return;

          }


          /* REMOVE */

          const remove =
            event.target.closest(
              "[data-remove-id]"
            );


          if (remove) {

            removeProduct(
              remove.dataset.removeId
            );

            return;

          }


          /* CLEAR */

          if (
            event.target.closest(
              "#clearCartBtn"
            )
          ) {

            clearCart();

            return;

          }


          /* COUPON */

          if (
            event.target.closest(
              "#couponBtn"
            )
          ) {

            applyCoupon();

            return;

          }


          /* CHECKOUT */

          if (
            event.target.closest(
              "#checkoutBtn"
            )
          ) {

            proceedToCheckout();

            return;

          }

        }

      );


      /* =======================================
         QUANTITY INPUT
      ======================================= */

      document.addEventListener(

        "change",

        function (event) {

          const input =
            event.target.closest(
              ".quantity-input"
            );


          if (!input) return;


          updateQuantity(

            input.dataset.id,

            input.value

          );

        }

      );


      /* =======================================
         ENTER COUPON
      ======================================= */

      document.getElementById(
        "couponInput"
      ).addEventListener(

        "keydown",

        function (event) {

          if (
            event.key ===
            "Enter"
          ) {

            event.preventDefault();

            applyCoupon();

          }

        }

      );


      /* =======================================
         INITIAL VIEW CART EVENT
      ======================================= */

      const initialCart =
        getCart();


      pushEvent(
        "view_cart",
        {

          ecommerce: {

            currency:
              "INR",

            value:
              getSubtotal(
                initialCart
              ),

            items:
              initialCart.map(

                function (item) {

                  return {

                    item_id:
                      item.id || "",

                    item_name:
                      item.name || "",

                    item_category:
                      item.category ||
                      "",

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

              )

          }

        }
      );


      /* =======================================
         INITIAL RENDER
      ======================================= */

      renderCart();


      /* =======================================
         DEBUG
      ======================================= */

      window.veridoCartPageDebug =
        function () {

          const cart =
            getCart();


          console.log(
            "================================"
          );

          console.log(
            "VERIDO CART PAGE DEBUG"
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
            getQuantity(cart)
          );

          console.log(
            "Subtotal:",
            getSubtotal(cart)
          );

          console.log(
            "Shipping:",
            getShipping(
              getSubtotal(cart)
            )
          );

          console.log(
            "Coupon:",
            appliedCoupon
          );

          console.log(
            "================================"
          );

        };


      console.log(
        "✅ VERIDO dynamic cart page loaded."
      );

    })();

  </script>


</body>

</html>
