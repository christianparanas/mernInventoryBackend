const db = require("../config/db");

exports.cart = (req, res) => {
  const id = req.body.id;

  db.query(
    `
			SELECT 
				customers_cart.id AS cart_id, 
		    products.product_name AS cart_p_name,
		    products.product_image AS cart_p_image,
		    products.product_description AS cart_p_description,
		    products.product_price AS cart_p_price,
		    products.product_quantity AS cart_p_stock,
		    customers_cart.qty AS cart_qty,
		    customer.name AS customer_name,
		    customers_cart.updated_at AS date_added,
		    customers_cart.customer_id AS customerId,
		    customers_cart.product_id As productId,
		    address
			    
			FROM customer
			INNER JOIN customers_cart
				ON customer.id = customers_cart.customer_id
			INNER JOIN products
				ON products.product_id = customers_cart.product_id
			WHERE customer.id = ${id} 
			ORDER BY customers_cart.created_at DESC`,

    (err, result) => {
      if (err) return res.json({ err });

      if (result.length > 0) {
        res.status(200).json({ result: result });
      } else {
        res.status(202).json({ message: "Empty Cart" });
      }
    }
  );
};

exports.addtocart = (req, res) => {
  const { qty, item_id, customer_id } = req.body;

  db.query(
    `SELECT * FROM customers_cart WHERE product_id = ${item_id} AND customer_id = ${customer_id}`,
    (err, result) => {
      if (err) return res.json({ err });

      if (result.length > 0) {
        res.status(204).json({
          msg: "Item already in cart",
        });
      } else {
        db.query(
          "INSERT INTO customers_cart (qty, product_id, customer_id ) VALUES (?, ?, ?)",
          [qty, item_id, customer_id],

          (err, result) => {
            if (err) return res.json({ err });

            res.status(200).json({
              message: "Item added to cart!",
            });
          }
        );
      }
    }
  );
};

exports.updatecartqty = (req, res) => {
  const { id, order } = req.body;

  // check if what condi, inc or dec
  if (order == "add") {
    db.query(
      "UPDATE customers_cart SET qty = qty + 1 WHERE id = ?",
      [id],
      (err, result) => {
        if (err) return res.json({ err });

        res.status(200).json({
          message: "Item qty increased!",
        });
      }
    );
  } else {
    db.query(
      "UPDATE customers_cart SET qty = qty - 1 WHERE id = ?",
      [id],
      (err) => {
        if (err) return res.json({ err });

        res.status(200).json({
          message: "Item qty decreased!",
        });
      }
    );
  }
};

exports.deleteCartItem = (req, res) => {
  db.query(
    "DELETE FROM customers_cart WHERE id = ?",
    req.body.id,
    (err, result) => {
      if (err) return res.json({ err });

      res.status(200).json({
        message: "Item successfully deleted!",
      });
    }
  );
};

exports.placeorder = (req, res) => {
  const placeItems = req.body;

  // insert the order details to order table
  db.query(
    `INSERT INTO orders (customer_id, total, status, payment_mode, shipping_option) 
						VALUES (?, ?, ?, ?, ?)`,
    [
      placeItems.user_id,
      placeItems.subtotal,
      "Pending",
      placeItems.paymentMethod,
      placeItems.shippingOp,
    ],

    (err, result) => {
      if (err) return res.json({ err });

      // if there's no error on inserting on orders table, map thru cartItems to insert individual items to order_item table
      // the order_item table with a foreign key of primary key of orders table order
      placeItems.cartItems.map((val, key) => {
        db.query(
          `INSERT INTO order_item (order_id, product_id, quantity)
											VALUES (?, ?, ?)`,
          [result.insertId, val.productId, val.cart_qty],
          (err, result) => {
            if (err) return res.json({ err });

            // subtract the user product order qty to product stock
            db.query(
              `UPDATE products SET product_quantity = product_quantity - ${val.cart_qty} WHERE product_id = ${val.productId}`,
              (err, result) => {
                if (err) return res.json({ err });
              }
            );
          }
        );
      });

      // if success inserting the details, delete the items in the cart of the user
      db.query(
        "DELETE FROM customers_cart WHERE customer_id = ?",
        [placeItems.user_id],
        (err, result) => {
          if (err) {
            res.status(400);
          }
        }
      );

      // send a response to client to show to user
      res.status(200).json({
        date: placeItems.date,
        order_id: result.insertId,
        payment: placeItems.paymentMethod,
        total: placeItems.subtotal,
      });
    }
  );
};
