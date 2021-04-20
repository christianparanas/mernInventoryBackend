const mysql = require('mysql')

const db = mysql.createConnection({
	multipleStatements: true,
	host: 'freedb.tech',
	user: 'freedbtech_christian',
	password: 'christian',
	database: 'freedbtech_Ecommerce'
})

module.exports = db