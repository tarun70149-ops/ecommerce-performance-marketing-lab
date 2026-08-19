/**
 * VERIDO E-COMMERCE PERFORMANCE MARKETING LAB
 * Central Configuration
 */

window.VERIDO_CONFIG = {

  /* ================================
     BRAND
  ================================= */

  brand: {
    name: "VERIDO",
    tagline: "Everyday Style. Better Made.",
    currency: "INR",
    currencySymbol: "₹"
  },


  /* ================================
     WEBSITE
  ================================= */

  website: {
    name: "VERIDO",
    domain: window.location.origin
  },


  /* ================================
     BUSINESS
  ================================= */

  business: {

    phone: "+919876543210",

    whatsapp: "919876543210",

    email: "support@verido.example",

    address: "Jaipur, Rajasthan, India"

  },


  /* ================================
     MARKETING TRACKING
  ================================= */

  tracking: {

    googleAdsConversionId: "",

    googleAdsConversionLabel: "",

    ga4MeasurementId: "",

    gtmContainerId: ""

  },


  /* ================================
     DEFAULT MARKETING PARAMETERS
  ================================= */

  marketing: {

    defaultSource: "website",

    defaultMedium: "organic",

    defaultCampaign: "default"

  },


  /* ================================
     FEATURE FLAGS
  ================================= */

  features: {

    analytics: true,

    ecommerceTracking: true,

    whatsappTracking: true,

    phoneTracking: true,

    formTracking: true,

    scrollTracking: true,

    debugMode: true

  }

};


/* =========================================
   CONFIG READY
========================================= */

console.log(
  "✅ VERIDO configuration loaded.",
  window.VERIDO_CONFIG
);
