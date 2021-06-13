const express = require('express')
const router = express.Router();

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../config/db')

const salt = 10;

router.post("/register", async (req, res) => {
	const creden = req.body;

	bcrypt.hash(creden.password, salt, (err, hashedPass) => {
		if(!err) {
			db.query("SELECT * FROM customer WHERE email = ?", creden.email,
				// check if email already used by other users
				async (err, rows) => {
					if(rows.length <= 0) {
						// insert into the database
						db.query("INSERT INTO customer (name, email, password, address) VALUES (?, ?, ?, ?)",
							[creden.name, creden.email, hashedPass, creden.address],
							(err, result) => {
								console.log(err)
							}
						);
						res.status(200).json({
							message: "Successfully Registered!"
						})

					} else {
						res.status(202).json({
					 		message: "Email already in use!"
					 	})
					}
				}
			)
		} else {
			console.log(err)
		}
	})
})

router.post("/login", async (req, res) => {
	let { email, password } = req.body;

	// in case user enter uppercase email
	email = email.toLowerCase()

	db.query("SELECT * FROM customer WHERE email = ?", email,

		 // check if password is valid
		 (err, rows) => {
		 	if(rows.length > 0) {
		 		bcrypt.compare(password, rows[0].password, (err, ress) => {
		 			if(ress) {
			 			let userId = rows[0].id

			 			// generate token
			 			const token = jwt.sign({ userId }, process.env.TOKEN_SECRET, {
			 				expiresIn: "5h",
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
				 			message: "Email or Password is Incorrect!"
				 		})
				 	}
		 		})
		 	} else {
		 		res.status(202).json({
			 		message: "Email or Password is Incorrect!"
			 	})
		 	}
		}
	)
})


router.post("/adminlogin", async (req, res) => {
	let { username, password } = req.body;

	db.query("SELECT * FROM admin WHERE username = ?", username,

		 // check if password is valid
		(err, rows) => {
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
		 		res.status(202).json({
			 		message: "There's no account associated with that Username/Email"
			 	})
		 	}
		}
	)
})


module.exports = router;
