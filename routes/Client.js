const express = require('express')
const router = express.Router();

const db = require('../config/db')


// client products
router.get("/products", async (req, res) => {

	// select the product with a stock greater than zero
	db.query("SELECT * FROM products WHERE product_quantity > 0 ORDER BY product_id DESC", 
		(err, result) => {
			// check if db has items
			if(result.length > 0) {
				res.status(200).json({ result })
			} else {
				res.status(202).json({ message: "No Items in DB" })
			}
			if(err) {
				res.status(404).json({ message: "Server cannot be reached!" })
			}
		}
	);
})

// search product
router.post("/search/:query", async (req, res) => {
	const searchQuery = req.params.query;

	db.query(`SELECT * FROM products WHERE product_quantity > 0 AND product_name LIKE '%${searchQuery}%'`,
		 (err, result) => {
			if(!err) {
				if(result.length > 0) {
						res.status(200).json({ result })
					} else {
						res.status(202).json({ result: "No item found" })
					}
			} else {
				res.status(400).json({ message: "Server cannot be reached!" })
			}
		}
	);
})

// user end - get specifi product
router.post("/products/:id", async (req, res) => {
	const id = req.params.id;

	db.query("SELECT * FROM products WHERE product_id = ?", id,
		
		 (err, result) => {
			if(result.length > 0) {
				res.status(200).json({ result })
			} else {
				res.status(202).json({ message: "Product does not exist!" })
			}
			if(err) {
				res.status(404).json({ message: "Server cannot be reached!" })
			}
		}
	)
})


router.get("/homeproducts", (req, res) => {
	db.query("SELECT * FROM products WHERE product_quantity > 0 ORDER BY product_id DESC LIMIT 5", 
		(err, resultone) => {
			if(resultone) {
				if(resultone.length > 0) {
					db.query("SELECT * FROM products WHERE product_quantity > 0", 
						(err, resulttwo) => {
							res.status(200).json({ resultfour: resultone, resultlength: resulttwo.length })
						})
				} else {
					res.status(202).json({ message: "No Product" })
				}
			}

			if(err) {
				res.status(404).json({ message: "Server cannot be reached!" })
			}
		}
	);
})



module.exports = router;