const mysql = require('mysql')

const db = mysql.createConnection({
	host: 'freedb.tech',
	user: 'freedbtech_christian',
	password: 'christian',
	database: 'freedbtech_Ecommerce'
})

module.exports = db