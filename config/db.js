const mysql = require('mysql')

const db = mysql.createConnection({
	multipleStatements: true,
	host: 'remotemysql.com',
	user: 'fREvO1oE2s',
	password: 'M5tUoTN3SF',
	database: 'fREvO1oE2s'
})

module.exports = db