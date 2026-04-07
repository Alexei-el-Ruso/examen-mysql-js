const mysql = require ("mysql2");

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'tester',
	password: 'test',
	port: 3306,
	database: 'ecommerce_db'
})

connection.connect(function (err, db) {
	if (err) {
		throw err;
	}
	console.log("Connected to E-Commerce Database");
})

module.exports = connection;