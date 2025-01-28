const mysql = require("promise-mysql");

const dotenv = require("dotenv");
dotenv.config();

// Create a connection to the MySQL database.
const connection = mysql.createConnection({
    host:process.env.host,
    database:process.env.database,
    user:process.env.user,
    password:process.env.password
})

const getConnection = async ()=> await connection;

module.exports = { 
    getConnection
}