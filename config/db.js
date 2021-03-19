const mysql = require('mysql')

const db = mysql.createConnection({
	host: 'sql5.freemysqlhosting.net',
	user: 'sql5400010',
	password: 'G2LmlUw2kF',
	database: 'sql5400010'
})

module.exports = db