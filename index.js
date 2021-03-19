
const express = require('express')
const app = express()
const db = require('./config/db.js')
const cors = require('cors')

const PORT = process.env.PORT || 3001;

// needed to fix some errors
app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
	res.send("hello")
})

app.post("/api/register", (req, res) => {
	const creden = req.body;
	console.log(creden)
	
	// insert into the database
	db.query("INSERT INTO users (name, email, password ) VALUES (?, ?, ?)",
		[creden.name, creden.email, creden.password],
		(err, result) => {
			console.log(err)
		}
	);

})

app.listen(PORT, () => {
	console.log("Server is running!")
})