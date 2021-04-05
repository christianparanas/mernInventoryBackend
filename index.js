
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



// customer ==============================

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
				res.status(202).json({
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
		 				expiresIn: "1h",
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
			 		res.status(202).json({
			 			message: "Password is Incorrect!"
			 		})
			 	}
		 	} else {
		 		res.status(204).json({
			 		message: "User didn't exist!"
			 	})
		 	}
		 }
	)
	
})


// admin =================================================

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
		 				expiresIn: "1h",
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
			 		res.status(202).json({
			 			message: "Password is Incorrect!"
			 		})
			 	}
		 	} else {
		 		res.status(204).json({
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

app.post("/delproduct", async (req, res) => {
	const product = req.body;

	db.query("DELETE FROM products WHERE product_id = ?", product.id,
		
		 (err, result) => {
			if(!err) {
				res.status(200).json({
			 		message: "Item successfully deleted!"
			 	})
			} else {
				res.status(400).json({
					message: "Server cannot be reached!"
				})
			}
		}
	);
	
})

app.post("/updateproduct", async (req, res) => {
	const {id, name, price, quantity} = req.body;

	db.query("UPDATE products SET product_name = ?, product_price = ?, product_quantity = ? WHERE product_id = ?", 
		[name, price, quantity, id],
		
		 (err) => {
			if(!err) {
				res.status(200).json({
			 		message: "Item successfully deleted!"
			 	})
			} else {
				res.status(400).json({
					message: "Server cannot be reached!"
				})
			}
		}
	);
	
})


// retrieve all products data to admin panel
app.get("/adminproducts", async (req, res) => {

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

// overview dashboard
app.get("/adminoverview", async (req, res) => {

	// get product count
	db.query("SELECT * FROM products",
	
		 (err, product_result) => {
			if(!err) {
				// get customer count
				db.query("SELECT * FROM customer",
					
					 (err, customer_result) => {
						if(!err) {
							res.status(200).json({
						 		productCount: product_result.length,
						 		customerCount: customer_result.length
						 	})
						}
			 	})
			} else {
				res.status(400).json({
					message: "Server cannot be reached!"
				})
			}
		}
	);
	
})

// admin customer list
app.get("/admincustomers", async (req, res) => {
	
	db.query("SELECT id, name, email, created_at FROM customer", 
		(err, result) => {
			// check if db has items
			if(result.length > 0) {
				res.status(200).json({
					result
				})
			} else {
				res.status(202).json({
					message: "No Customers registered"
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


// get specifiv customer details
app.post("/specificcustomer", async (req, res) => {
	const id = req.body.id;
	console.log(id)

	db.query("SELECT id, name, email, created_at FROM customer WHERE id = ?", id,
		
		 (err, result) => {
			if(result.length > 0) {
				res.status(200).json({
					result
				})
			} else {
				res.status(202).json({
					message: "No Customers registered"
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
