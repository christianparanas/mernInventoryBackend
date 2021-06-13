const express = require('express')
const router = express.Router();

const db = require('../config/db')



// load user info
router.post("/credentials", (req, res) => {
	const userId = req.body.id

	db.query(`SELECT * FROM customer WHERE id = ${userId}`, (err, result) => {
		if(!err) {
				res.status(200).json({
					result
				})
		} else {
			res.status(202).json({
				msg: "Error"
			})
		}
	})
})


router.post("/updatecredentials", (req, res) => {
	console.log(req.body)
	const { id, name, email, address } = req.body

	db.query(`UPDATE customer SET name = ?, email = ?, address = ? WHERE id = ?`, [name, email, address, id], (err, result) => {
			if(!err) {
				res.status(200).json({
					msg: "Success"
				})
			} else {
				res.status(202).json({
					msg: "Error"
				})
			}
		})
})


// put userOrders history to their acct page
router.post("/orders", (req, res) => {
	const userId = req.body.id
	console.log(userId)

	db.query(`SELECT DISTINCT 
						 orders.id,
						 orders.status,
						 orders.created_at,
						 orders.total,
						 orders.payment_mode,
						 orders.shipping_option,

						 GROUP_CONCAT(order_item.quantity) AS product_quantities,
						 GROUP_CONCAT(products.product_image) AS product_images,
						 GROUP_CONCAT(products.product_name) AS product_names
	
						FROM orders
						INNER JOIN order_item
							ON orders.id = order_item.order_id
						INNER JOIN products
							ON order_item.product_id = products.product_id
						WHERE orders.customer_id = ${userId}
						GROUP BY orders.id
						ORDER BY orders.created_at DESC`, 

	(err, result) => {
		if(!err) {
			res.status(200).json({
				result
			})
		} else {
			console.log(err)
		}
	})
})



module.exports = router