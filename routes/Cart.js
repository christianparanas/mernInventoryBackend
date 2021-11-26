const express = require("express");
const router = express.Router();

const db = require("../config/db");

const {
  cart,
  addtocart,
  updatecartqty,
  deleteCartItem,
  placeorder,
} = require("../controllers/Cart");

router.get("/cart", cart);
router.post("/addtocart", addtocart);
router.post("/updatecartqty", updatecartqty);
router.post("/delcartitem", deleteCartItem);
router.post("/placeorder", placeorder);

module.exports = router;
