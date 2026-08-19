/**
 * VERIDO E-COMMERCE PERFORMANCE MARKETING LAB
 * Product Catalog
 */

window.VERIDO_PRODUCTS = [

  {
    id: "VERIDO-TS-001",
    name: "Classic Oversized Black T-Shirt",
    category: "T-Shirts",
    subcategory: "Oversized",
    brand: "VERIDO",
    price: 799,
    compareAtPrice: 999,
    currency: "INR",
    stock: 25,
    availability: "in_stock",
    color: "Black",
    size: ["S", "M", "L", "XL"],
    image: "assets/images/black-tshirt.jpg"
  },

  {
    id: "VERIDO-TS-002",
    name: "Premium Oversized White T-Shirt",
    category: "T-Shirts",
    subcategory: "Oversized",
    brand: "VERIDO",
    price: 849,
    compareAtPrice: 1099,
    currency: "INR",
    stock: 18,
    availability: "in_stock",
    color: "White",
    size: ["S", "M", "L", "XL"],
    image: "assets/images/white-tshirt.jpg"
  },

  {
    id: "VERIDO-HS-001",
    name: "Essential Black Hoodie",
    category: "Hoodies",
    subcategory: "Casual",
    brand: "VERIDO",
    price: 1499,
    compareAtPrice: 1899,
    currency: "INR",
    stock: 12,
    availability: "in_stock",
    color: "Black",
    size: ["M", "L", "XL"],
    image: "assets/images/black-hoodie.jpg"
  },

  {
    id: "VERIDO-JG-001",
    name: "Relaxed Fit Blue Jeans",
    category: "Jeans",
    subcategory: "Relaxed Fit",
    brand: "VERIDO",
    price: 1799,
    compareAtPrice: 2199,
    currency: "INR",
    stock: 20,
    availability: "in_stock",
    color: "Blue",
    size: ["30", "32", "34", "36"],
    image: "assets/images/blue-jeans.jpg"
  },

  {
    id: "VERIDO-CT-001",
    name: "Minimal Everyday Cap",
    category: "Accessories",
    subcategory: "Caps",
    brand: "VERIDO",
    price: 499,
    compareAtPrice: 699,
    currency: "INR",
    stock: 30,
    availability: "in_stock",
    color: "Black",
    size: ["Free Size"],
    image: "assets/images/black-cap.jpg"
  },

  {
    id: "VERIDO-TS-003",
    name: "Streetwear Graphic T-Shirt",
    category: "T-Shirts",
    subcategory: "Graphic",
    brand: "VERIDO",
    price: 899,
    compareAtPrice: 1199,
    currency: "INR",
    stock: 15,
    availability: "in_stock",
    color: "Charcoal",
    size: ["S", "M", "L", "XL"],
    image: "assets/images/graphic-tshirt.jpg"
  }

];


/* =========================================
   PRODUCT HELPERS
========================================= */

window.getProductById = function (productId) {

  return window.VERIDO_PRODUCTS.find(
    product => product.id === productId
  );

};


window.getProductsByCategory = function (category) {

  return window.VERIDO_PRODUCTS.filter(
    product =>
      product.category.toLowerCase() ===
      category.toLowerCase()
  );

};


window.getProductValue = function (productId, quantity = 1) {

  const product =
    window.getProductById(productId);

  if (!product) return 0;

  return product.price * quantity;

};


/* =========================================
   DEBUG
========================================= */

console.log(
  "✅ VERIDO product catalog loaded:",
  window.VERIDO_PRODUCTS.length,
  "products"
);
