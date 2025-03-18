import mysql from "mysql2"


const connection = mysql. createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "movies_db"
})

connection. connect( (err) => {
    if( err ) throw err;

    console.log( "Connessione al DB avvenuta con successo")
})

export default connection;