
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

	db.query("SELECT * FROM customer WHERE email = ?", creden.email,
		// check if email already used by other users
		async (err, rows) => {
			if(rows.length <= 0) {
				// insert into the database
				db.query("INSERT INTO customer (name, email, password, address) VALUES (?, ?, ?, ?)",
					[creden.name, creden.email, creden.password, creden.address],
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
				 				address: rows[0].address
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
	const {id, name, description, price, quantity} = req.body;

	db.query("UPDATE products SET product_name = ?, product_description = ?, product_price = ?, product_quantity = ? WHERE product_id = ?", 
		[name, description, price, quantity, id],
		
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

// client products
app.get("/products", async (req, res) => {

	// select the product with a stock greater than zero
	db.query("SELECT * FROM products WHERE product_quantity > 0 ORDER BY product_id DESC", 
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

app.get("/adminorders", async (req, res) => {

	db.query(`SELECT
							orders.id AS orderId,
							orders.status AS status,
							customer.email AS userEmail
						FROM
							orders
						INNER JOIN customer
							ON orders.customer_id = customer.id
						ORDER BY orders.created_at DESC;
		`, (err, result) => {
			if(!err) {
				res.status(200).json({
					result
				})
			} else {
				console.log(err)
			}
		})


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

	db.query("SELECT id, name, email, created_at, address FROM customer WHERE id = ?", id,
		
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



// user end - get specifi product

app.post("/specificproduct", async (req, res) => {
	const id = req.body.id;

	db.query("SELECT * FROM products WHERE product_id = ?", id,
		
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


// get home 4 products
app.get("/homefourproducts", async (req, res) => {
	
	db.query("SELECT * FROM products ORDER BY product_id DESC LIMIT 4", 
		(err, resultone) => {
			// check if db has items
			if(resultone.length > 0) {
				db.query("SELECT * FROM products", 
					(err, resulttwo) => {
						res.status(200).json({
							resultfour: resultone,
							resultlength: resulttwo.length
						})
					})
			} else {
				res.status(202).json({
					message: "No Product"
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



// add to cart
app.post("/addtocart", (req, res) => {
	const { qty, item_id, customer_id } = req.body

	// check if product is already in the cart or not
	db.query(`SELECT * FROM customers_cart WHERE product_id = ${item_id} AND customer_id = ${customer_id}`,
		(err, result) => {
			if(result.length > 0) {
				res.status(204).json({
					msg: "Item already in cart"
				})
			} else {
				db.query("INSERT INTO customers_cart (qty, product_id, customer_id ) VALUES (?, ?, ?)",
					[qty, item_id, customer_id],
					
					 (err, result) => {
						if(!err) {
							res.status(200).json({
						 		message: "Item added to cart!"
						 	})
						} else {
							res.status(202).json({
								message: "Error!"
							})
						}
					}
				);
			}
		}
	)
})



// customer cart
app.post("/cart", async (req, res) => {
	const id = req.body.id;

	db.query(`
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
			if(result.length > 0) {
				res.status(200).json({
					result: result
				})
			} else {
				res.status(202).json({
					message: "Empty Cart"
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


// increase decrease item cart qty
app.post("/updatecartqty", async (req, res) => {
	const {id, order} = req.body;

	// check if what condi, inc or dec
	if(order == "add") {
		db.query("UPDATE customers_cart SET qty = qty + 1 WHERE id = ?", 
			[id],
			 (err) => {
				if(!err) {
					res.status(200).json({
				 		message: "Item qty increased!"
				 	})
				} else {
					res.status(400).json({
						message: "Server cannot be reached!"
					})
				}
			}
		);

	} else {
		db.query("UPDATE customers_cart SET qty = qty - 1 WHERE id = ?", 
			[id],
			
			 (err) => {
				if(!err) {
					res.status(200).json({
				 		message: "Item qty decreased!"
				 	})
				} else {
					res.status(400).json({
						message: "Server cannot be reached!"
					})
				}
			}
		);
	}
})



// delete item in the customers_cart if the cart qty equals to zero
app.post("/delcartitem", async (req, res) => {
	const cart = req.body;

	db.query("DELETE FROM customers_cart WHERE id = ?", cart.id,
		
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


// search product
app.post("/searchitem", async (req, res) => {
	const searchQuery = req.body;

	db.query(`SELECT * FROM products WHERE product_name LIKE '%${req.body.query}%'`,
		 (err, result) => {
			if(!err) {
				if(result.length > 0) {
						res.status(200).json({
					 		result
					 	})
					} else {
						res.status(202).json({
					 		result: "No item found"
					 	})
					}
			} else {
				res.status(400).json({
					message: "Server cannot be reached!"
				})
			}
		}
	);
	
})

// place order
app.post("/placeorder", (req, res) => {
	const placeItems = req.body;

	// insert the order details to order table
	db.query(`INSERT INTO orders (customer_id, total, status, payment_mode, shipping_option) 
						VALUES (?, ?, ?, ?, ?)`, [placeItems.user_id, placeItems.subtotal, "Pending", placeItems.paymentMethod, placeItems.shippingOp],

			(err, result) => {
				if(!err) {

					// if there's no error on inserting on orders table, map thru cartItems to insert individual items to order_item table
					// the order_item table with a foreign key of primary key of orders table order
					placeItems.cartItems.map((val, key) => {
						db.query(`INSERT INTO order_item (order_id, product_id, quantity)
											VALUES (?, ?, ?)`, [result.insertId, val.productId, val.cart_qty],
							(err, result) => {
								if(err) {
									res.status(202).json({
										msg: "Error while inserting cart items into order_item table"
									})
									return;

								} else {
									// subtract the user product order qty to product stock
									db.query(`UPDATE products SET product_quantity = product_quantity - ${val.cart_qty} WHERE product_id = ${val.productId}`,
										(err, result) => {
											if(err) {
												res.status(202).json({
													msg: "Error while subtracting the product quantity"
												})
											}
										}
										)
								}
							}
							)
					}
				)

				// if success inserting the details, delete the items in the cart of the user
				db.query("DELETE FROM customers_cart WHERE customer_id = ?", [placeItems.user_id], 
					(err, result) => {
						if(err) {
							res.status(400);
						}
					}
				)

				// send a response to client to show to user
				res.status(200).json({
					date: placeItems.date,
					order_id: result.insertId,
					payment: placeItems.paymentMethod,
					total: placeItems.subtotal
				})

				} else {
					console.log(err)
				}
			}
	)
})