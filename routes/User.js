const express = require("express");
const router = express.Router();

const db = require("../config/db");

// controllers
const {
  credentials,
  updatecredentials,
  orders,
} = require("../controllers/User");

router.post("/credentials", credentials);
router.post("/updatecredentials", updatecredentials);
router.post("/orders", orders);

module.exports = router;
