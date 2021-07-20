const mysql = require('mysql')

const db = mysql.createConnection({
	multipleStatements: true,
	host: 'sql200.epizy.com',
	user: 'epiz_28143499',
	password: '6Edw4ud5tiB4yP',
	database: 'epiz_28143499_tindahan'
})

module.exports = db