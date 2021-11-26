const express = require("express");
const router = express.Router();

const db = require("../config/db");

// controllers
const {
  products,
  search,
  getProduct,
  homeproducts,
} = require("../controllers/Client");

router.get("/products", products);
router.get("/search/:query", search);
router.get("/products/:id", getProduct);
router.get("/homeproducts", homeproducts);

module.exports = router;
