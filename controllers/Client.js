const db = require("../config/db");

exports.products = (req, res) => {
  db.query(
    "SELECT * FROM products WHERE product_quantity > 0 ORDER BY product_id DESC",
    (err, result) => {
      if (err) return res.json({ err });

      // check if db has items
      if (result.length > 0) {
        res.status(200).json({ result });
      } else {
        res.status(202).json({ message: "No Items in DB" });
      }
    }
  );
};

exports.search = (req, res) => {
  const searchQuery = req.params.query;

  db.query(
    `SELECT * FROM products WHERE product_quantity > 0 AND product_name LIKE '%${searchQuery}%'`,
    (err, result) => {
      if (err) return res.json({ err });

      if (result.length > 0) {
        res.status(200).json({ result });
      } else {
        res.status(202).json({ result: "No item found" });
      }
    }
  );
};

exports.getProduct = (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM products WHERE product_id = ?", id, (err, result) => {
    if (err) return res.json({ err });

    if (result.length > 0) {
      res.status(200).json({ result });
    } else {
      res.status(202).json({ message: "Product does not exist!" });
    }
  });
};

exports.homeproducts = (req, res) => {
  db.query(
    "SELECT * FROM products WHERE product_quantity > 0 ORDER BY product_id DESC LIMIT 5",
    (err, resultone) => {
      if (err) return res.status(404).json({ err });

      if (resultone.length > 0) {
        db.query(
          "SELECT * FROM products WHERE product_quantity > 0",
          (err, resulttwo) => {
            if (err) return res.json({ err });

            res.status(200).json({
              resultfour: resultone,
              resultlength: resulttwo.length,
            });
          }
        );
      } else {
        res.status(202).json({ message: "No Product" });
      }
    }
  );
};
