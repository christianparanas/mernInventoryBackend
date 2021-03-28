const mongoose = require('mongoose')

// create schema
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	created_at: {
		type: Date,
		default: Date.now
	}
})

// export the schema and in here it renamed to User
module.exports = mongoose.model('User', userSchema)