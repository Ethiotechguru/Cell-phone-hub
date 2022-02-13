const mysql = require('mysql2');
require('dotenv').config()

const connectionPool = mysql.createPool({
	host: "localhost",
	user: "root",
	database: "nodeComplet",
	password: 'Samy@300891',
});

module.exports = connectionPool.promise();