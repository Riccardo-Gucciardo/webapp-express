const mysql2 = require('mysql2')


const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "movies_db"
})

connection.connect( (err) => {
    if( err ) throw err;

    console.log( "Connessione al DB avvenuta con successo")
})

module.exports = connection; 