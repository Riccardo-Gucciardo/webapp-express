const express = require("express");
const app = express()

const cors = require("cors")
const port = 3000;

const postrouter = require("./routers/postsRouter.js")
const notFound = require("./middleware/notFound.js")
const errorHandler = require("./middleware/errorHandler.js")
const setImmagePath = require("./middleware/immagePath.js")

app.use(cors({
    origin : 'http://localhost:5173' 
}))

app.use(express.static('public'));
app.use(express.json());

app.use(setImmagePath)


app.use('/movies', postrouter)


app.use(notFound);
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`example app listening on port ${port}`);  
     
})  