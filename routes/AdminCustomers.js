const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.get("/customers", async (req, res) => {
  db.query(
    "SELECT id, name, email, created_at FROM customer",
    (err, result) => {
      // check if db has items
      if (result.length > 0) {
        res.status(200).json({
          result,
        });
      } else {
        res.status(202).json({
          message: "No Customers registered",
        });
      }

      if (err) {
        res.status(404).json({
          message: "Server cannot be reached!",
        });
      }
    }
  );
});

// get specifiv customer details
router.post("/customer/:id", async (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT id, name, email, created_at, address FROM customer WHERE id = ?",
    id,

    (err, result) => {
      if (result.length > 0) {
        res.status(200).json({
          result,
        });
      } else {
        res.status(202).json({
          message: "No Customers registered",
        });
      }

      if (err) {
        res.status(404).json({
          message: "Server cannot be reached!",
        });
      }
    }
  );
});

module.exports = router;
