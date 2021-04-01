
const express = require('express')
const db = require('./config/db.js')
const cors = require('cors')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// init
const app = express()
dotenv.config()

app.listen(process.env.PORT || 3001, () => { console.log("Server is running!") })

// needed to fix some errors
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.post("/register", async (req, res) => {
	const creden = req.body;
	console.log(creden)

	db.query("SELECT * FROM customer WHERE email = ?", creden.email,
		// check if email already used by other users
		async (err, rows) => {
			if(rows.length <= 0) {
				// insert into the database
				db.query("INSERT INTO customer (name, email, password ) VALUES (?, ?, ?)",
					[creden.name, creden.email, creden.password],
					(err, result) => {
						console.log(err)
					}
				);
				res.send({ status: 200 })

			} else {
				res.status(400).json({
			 			message: "Email already exist!"
			 		})
			}
		}
	)
	
})

app.post("/login", async (req, res) => {
	let { email, password } = req.body;
	console.log(req.body)

	// in case user enter uppercase email
	email = email.toLowerCase()

	db.query(
		 "SELECT * FROM customer WHERE email = ?", email,

		 // check if password is valid
		 async (err, rows) => {

		 	if(rows.length > 0) {
		 		if(password == rows[0].password) {
		 			let userId = rows[0].id

		 			// generate token
		 			const token = jwt.sign({ userId }, process.env.TOKEN_SECRET, {
		 				expiresIn: 600,
		 			})

			 		res.status(200).json({
			 				auth: true,
			 				token: token,
			 				result: {
			 					id: rows[0].id,
				 				name: rows[0].name,
				 				email: rows[0].email,
			 				}
			 		})
			 	} else {
			 		res.status(400).json({
			 			message: "Password is Incorrect!"
			 		})
			 	}
		 	} else {
		 		res.status(400).json({
			 		message: "User didn't exist!"
			 	})
		 	}
		 }
	)
	
})

// admin auth
app.post("/adminlogin", async (req, res) => {
	let { username, password } = req.body;
	console.log(req.body)

	db.query(
		 "SELECT * FROM admin WHERE username = ?", username,

		 // check if password is valid
		 async (err, rows) => {

		 	if(rows.length > 0) {
		 		if(password == rows[0].password) {
		 			let userId = rows[0].id

		 			// generate token
		 			const token = jwt.sign({ userId }, process.env.TOKEN_SECRET, {
		 				expiresIn: 600,
		 			})

			 		res.status(200).json({
			 				auth: true,
			 				token: token,
			 				result: {
			 					id: rows[0].id,
				 				name: rows[0].name,
				 				username: rows[0].username,
				 				email: rows[0].email,
			 				}
			 		})
			 	} else {
			 		res.status(400).json({
			 			message: "Password is Incorrect!"
			 		})
			 	}
		 	} else {
		 		res.status(400).json({
			 		message: "User didn't exist!"
			 	})
		 	}
		 }
	)
	
})


// add new prodct route
app.post("/newproduct", async (req, res) => {
	const product = req.body;

	db.query("INSERT INTO products (product_name, product_image, product_price, product_quantity ) VALUES (?, ?, ?, ?)",
		[product.name, product.image, product.price, product.quantity],
		
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


// retrieve all products data to admin panel
app.get("/adminproducts", async (req, res) => {

	db.query("SELECT * FROM products", (err, result) => {
			if(err) {
				res.status(400).json({
					message: "Error!"
				})
			} else {
				res.status(200).json({
					result
				})
			}
		}
	);
})

