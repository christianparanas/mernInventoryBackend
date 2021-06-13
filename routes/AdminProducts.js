const express = require('express')
const router = express.Router();

const db = require('../config/db')


// overview
router.get("/overview", async (req, res) => {

	// get product count
	db.query(`SELECT * FROM products; 
						SELECT * FROM customer; 
						SELECT * FROM orders;
						SELECT SUM(total) AS total FROM orders`,
		 (err, result) => {
			if(!err) {
				// get  count
				res.status(200).json({
					customerCount: result[1].length,
					productCount: result[0].length,
					orderCount: result[2].length,
					totalSales: result[3][0]
				})
			} else {
				console.log(err)
				res.status(400).json({
					message: "Server cannot be reached!"
				})
			}
		}
	);
})


router.get("/products", (req, res) => {

	db.query("SELECT * FROM products ORDER BY product_id DESC", 
		(err, result) => {
			// check if db has items
			if(result.length > 0) {
				res.status(200).json({
					result
				})
			} else {
				res.status(202).json({
					message: "No Items in DB"
				})
			}

			if(err) {
				res.status(404).json({
					message: "Server cannot be reached!"
				})
			}
		}
	);
})


router.post("/newproduct", async (req, res) => {
	const product = req.body;

	db.query("INSERT INTO products (product_name, product_image, product_description, product_price, product_quantity ) VALUES (?, ?, ?, ?, ?)",
		[product.name, product.image, product.description, product.price, product.quantity],
		
		 (err, result) => {
			if(!err) {
				res.status(200).json({
			 		message: "Product saved!"
			 	})
			} else {
				res.status(400).json({
					message: "Error!"
				})
			}
		}
	);
})


router.post("/updateproduct", (req, res) => {
	const { id, name, description, price, quantity } = req.body;

	db.query("UPDATE products SET product_name = ?, product_description = ?, product_price = ?, product_quantity = ? WHERE product_id = ?", 
		[name, description, price, quantity, id],
		
		 (err) => {
			if(!err) {
				res.status(200).json({
			 		message: "Item updated!"
			 	})
			} else {
				res.status(400).json({
					message: "Server cannot be reached!"
				})
			}
		}
	);
})


router.delete("/deleteproduct/:id", (req, res) => {
	const id = req.params.id;

	db.query("DELETE FROM products WHERE product_id = ?", id,
		 (err, result) => {

			if(!err) {
				res.status(200).json({
			 		message: "Item deleted!"
			 	})
			} else if(err.errno == 1451) {
				res.status(202).json({
					message: "This Item can't be deleted because it is referenced in the other tables."
				})
			} else {
				res.status(400).json({
					message: "Server cannot be reached!"
				})
			}
		}
	);
})



module.exports = router;

