/**
 * VERIDO E-COMMERCE PERFORMANCE MARKETING LAB
 * Common Utility Functions
 */

(function () {

  "use strict";


  /* =========================================
     CURRENCY
  ========================================= */

  function formatCurrency(
    amount,
    currency = "INR"
  ) {

    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 0
      }
    ).format(
      Number(amount || 0)
    );

  }


  /* =========================================
     NUMBER
  ========================================= */

  function formatNumber(
    number
  ) {

    return new Intl.NumberFormat(
      "en-IN"
    ).format(
      Number(number || 0)
    );

  }


  /* =========================================
     PERCENTAGE
  ========================================= */

  function formatPercentage(
    value,
    decimals = 1
  ) {

    return Number(
      value || 0
    ).toFixed(
      decimals
    ) + "%";

  }


  /* =========================================
     CART VALUE
  ========================================= */

  function calculateCartValue(
    cart = []
  ) {

    return cart.reduce(
      function (
        total,
        item
      ) {

        return total +
          (
            Number(
              item.price || 0
            ) *
            Number(
              item.quantity || 1
            )
          );

      },
      0
    );

  }


  /* =========================================
     CART QUANTITY
  ========================================= */

  function calculateCartQuantity(
    cart = []
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


  /* =========================================
     URL PARAMETER
  ========================================= */

  function getURLParameter(
    parameter
  ) {

    const params =
      new URLSearchParams(
        window.location.search
      );

    return (
      params.get(parameter) || ""
    );

  }


  /* =========================================
     ALL URL PARAMETERS
  ========================================= */

  function getURLParameters() {

    const params =
      new URLSearchParams(
        window.location.search
      );

    const result = {};

    params.forEach(
      function (
        value,
        key
      ) {

        result[key] =
          value;

      }
    );

    return result;

  }


  /* =========================================
     RANDOM ID
  ========================================= */

  function generateId(
    prefix = "VERIDO"
  ) {

    return (
      prefix +
      "-" +
      Date.now() +
      "-" +
      Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()
    );

  }


  /* =========================================
     ORDER ID
  ========================================= */

  function generateOrderId() {

    return generateId(
      "ORDER"
    );

  }


  /* =========================================
     LOCAL STORAGE SET
  ========================================= */

  function setStorage(
    key,
    value
  ) {

    try {

      localStorage.setItem(
        key,
        JSON.stringify(value)
      );

    } catch (error) {

      console.warn(
        "LocalStorage save failed:",
        error
      );

    }

  }


  /* =========================================
     LOCAL STORAGE GET
  ========================================= */

  function getStorage(
    key,
    defaultValue = null
  ) {

    try {

      const value =
        localStorage.getItem(
          key
        );

      if (!value) {
        return defaultValue;
      }

      return JSON.parse(
        value
      );

    } catch (error) {

      return defaultValue;

    }

  }


  /* =========================================
     LOCAL STORAGE REMOVE
  ========================================= */

  function removeStorage(
    key
  ) {

    try {

      localStorage.removeItem(
        key
      );

    } catch (error) {

      console.warn(
        "LocalStorage remove failed:",
        error
      );

    }

  }


  /* =========================================
     DEBOUNCE
  ========================================= */

  function debounce(
    callback,
    delay = 300
  ) {

    let timer;

    return function () {

      const context =
        this;

      const args =
        arguments;

      clearTimeout(
        timer
      );

      timer =
        setTimeout(
          function () {

            callback.apply(
              context,
              args
            );

          },
          delay
        );

    };

  }


  /* =========================================
     SAFE JSON PARSE
  ========================================= */

  function safeJSONParse(
    value,
    fallback = null
  ) {

    try {

      return JSON.parse(
        value
      );

    } catch (error) {

      return fallback;

    }

  }


  /* =========================================
     CHECK EMPTY VALUE
  ========================================= */

  function isEmpty(
    value
  ) {

    return (
      value === undefined ||
      value === null ||
      value === ""
    );

  }


  /* =========================================
     SCROLL PERCENTAGE
  ========================================= */

  function getScrollPercentage() {

    const scrollTop =
      window.scrollY;

    const documentHeight =
      document.documentElement
        .scrollHeight;

    const viewportHeight =
      window.innerHeight;

    const totalScrollable =
      documentHeight -
      viewportHeight;

    if (
      totalScrollable <= 0
    ) {

      return 100;

    }

    return Math.round(
      (
        scrollTop /
        totalScrollable
      ) * 100
    );

  }


  /* =========================================
     EXPOSE UTILS
  ========================================= */

  window.VERIDO_UTILS = {

    formatCurrency:
      formatCurrency,

    formatNumber:
      formatNumber,

    formatPercentage:
      formatPercentage,

    calculateCartValue:
      calculateCartValue,

    calculateCartQuantity:
      calculateCartQuantity,

    getURLParameter:
      getURLParameter,

    getURLParameters:
      getURLParameters,

    generateId:
      generateId,

    generateOrderId:
      generateOrderId,

    setStorage:
      setStorage,

    getStorage:
      getStorage,

    removeStorage:
      removeStorage,

    debounce:
      debounce,

    safeJSONParse:
      safeJSONParse,

    isEmpty:
      isEmpty,

    getScrollPercentage:
      getScrollPercentage

  };


  /* =========================================
     DEBUG
  ========================================= */

  console.log(
    "✅ VERIDO utils.js loaded successfully."
  );

})();
