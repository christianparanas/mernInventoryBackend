
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

			 		res.status(200).json({
			 				id: rows[0].id,
			 				name: rows[0].name,
			 				email: rows[0].email,
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




// // check if user exist
// 	const userExist = await User.findOne({email: req.body.email })
// 	if(!userExist) return res.status(400).send("User doesn't exist")

// 	// valid password
// 	const validPassword = await bcrypt.compare(req.body.password, userExist.password)
// 	if(!validPassword) return res.status(400).send("Invalid Password!")

// 	// create and assign token
// 	const token = jwt.sign({ _id: userExist._id, email: userExist.email }, process.env.TOKEN_SECRET, {
// 		expiresIn: "10h"
// 	})

// 	// send response if the validation was success
// 	res.header('auth-token', token)

















// MYSQL
// app.get("/", (req, res) => {
// 	res.send("hello")
// })

// app.post("/api/register", (req, res) => {
// 	const creden = req.body;
// 	console.log(creden)
	
// 	// insert into the database
// 	db.query("INSERT INTO users (name, email, password ) VALUES (?, ?, ?)",
// 		[creden.name, creden.email, creden.password],
// 		(err, result) => {
// 			console.log(err)
// 		}
// 	);

// })

