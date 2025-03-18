const express = require("express");
const app = express()

const cors = require("cors")
const port = 3000;

const postrouter = require("./routers/postsRouter")
const notFound = require("./middleware/notFound")
const errorHandler = require("./middleware/errorHandler")

app.use(cors({
    origin : 'http://localhost:5173' 
}))

app.use(express.static('public'));
app.use(express.json());



app.use('/movies', postrouter)


app.use(notFound);
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`example app listening on port ${port}`);  
     
})  