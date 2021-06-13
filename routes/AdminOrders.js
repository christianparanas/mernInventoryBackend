const express = require('express')
const router = express.Router();

const db = require('../config/db')


router.get("/orders", async (req, res) => {

	db.query(`SELECT
							orders.id AS orderId,
							orders.status AS status,
							customer.email AS userEmail
						FROM
							orders
						INNER JOIN customer
							ON orders.customer_id = customer.id
						ORDER BY orders.created_at DESC;`, 
	(err, result) => {
		if(!err) {
			res.status(200).json({ result })
		} else { console.log(err) }
	})
})


router.post("/updateorderstatus", (req, res) => {
	console.log(req.body)

	db.query(`UPDATE orders SET status = "Delivered" WHERE id = ${req.body.id}`, 
		(err, result) => {
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


module.exports = router