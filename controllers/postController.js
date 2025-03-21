// const arrayPosts = require("../data/posts.js");
// require("../routers/postsRouter.js");

const connection = require('../data/db.js')

function index(req,res){

    // let filteredPosts = arrayPosts;


    // if(req.query.tags) {
    //     filteredPosts = arrayPosts.filter(arrayPosts=>{
    //         return arrayPosts.tags.includes(req.query.tags)
    //     })
    // }


    // res.json(filteredPosts)

    const sql = 'SELECT * FROM movies'

    connection.query( sql, (err, results) => {
        if(err) return res.status(500).json({
            error: 'error'
        })

        const movies = results.map(movie =>{
            return{
                ...movie,
                image: req.imagePath + movie.image
            }
                
        })
        res.json(movies)
    })

    

}
function show(req,res){

// const id = parseInt(req.params.id);

// const post =arrayPosts.find(arrayPosts=>arrayPosts.id === id);

// if(!post){ 
    
//     res.status(404)

//     return res.json( 
//         {
//             status : 404,
//             error : "not found",
//             message :"post not found"
//         }
//     );
// }

//     res.json(post)

const {id} = req.params;

const movieSql = 'SELECT * FROM movies WHERE id= ?'

const reviewsSql = 'SELECT * FROM reviews WHERE movie_id = ?'

connection.query( movieSql, [id], (err, results) =>{

    if(err) return res.status(500).json({
    error: 'Errore lato server INDEX function'
    })

    if( results.length === 0 ) return res.status(404).json({
    error: 'movie not found'
    })

    const movie = results[0]

    connection.query(reviewsSql,[id],(err,reviewsResults)=>{
        if(err) return res.status(500).json({
            error: 'Errore lato server INDEX function'
            })

        movie.reviews = reviewsResults
        
        res.json({
            ...movie,
            image: req.imagePath + movie.image
        })

  
    })
})
    
}
function store(req,res){
    // const newId= arrayPosts[arrayPosts.length - 1].id + 1;

    // const newPost ={

    //     id : newId,
    //     title :req.body.title,
    //     content :req.body.content,
    //     immage :req.body.immage,
    //     tags : req.body.tags

    // }
    
    // arrayPosts.push(newPost)
    // console.log(arrayPosts);
    // res.status(201).json(newPost)


    const {title,director,abstract} = req.body
    
    const imageName = `${req.file.filename}`

    const sql = "INSERT INTO movies (title,director,image,abstract) VALUES (?,?,?,?)"

    connection.query(sql, [title,director,imageName,abstract], (err,results) => {
        if(err) return res.status(500).json({
            error: 'database error store'
        })

        res.status(201).json({
            status: "success",
            message: "film creato con successo",
            id: results.insertId
        })
    })
    
}
function update(req,res){
    
    // const id = parseInt(req.params.id);
    // const post = arrayPosts.find(arrayPosts => arrayPosts.id === id);
    
    
    // if (!post) {
        
    //     res.status(404)
        
    //     return res.json(
    //         {
    //         status: 404,
    //         error: "Not Found",
    //         message: 'Post not found'
    //         }
    //     );
    // }
        
        
// post.title = req.body.title;
// post.content = req.body.content;
// post.image = req.body.immagine;
// post.tags = req.body.tags;


// console.log(arrayPosts)
// res.json(post);



const { id } = req.params
const { image } = req.body

const sql ='UPDATE movies SET image = ? WHERE id = ?;'

connection.query(sql,[image,id],err => {
    if (err) return res.status(500).json({
        err: "error"
    })

    res.json({message:" update successifully"})
})


    
}
function patch(req,res){
        
    const id = parseInt(req.params.id);
    const post = arrayPosts.find(arrayPosts => arrayPosts.id === id);
    
    
    if (!post) {
        
        res.status(404)
        
        return res.json(
            {
            status: 404,
            error: "Not Found",
            message: 'Post not found'
            }
        );
    }
        
        
post.title = req.body.title;
post.content = req.body.content;
post.image = req.body.immagine;
post.tags = req.body.tags;


console.log(arrayPosts)
res.json(post);



  


    
}
function destroy(req,res){
// const id = parseInt(req.params.id);

// const post =arrayPosts.find(arrayPosts=>arrayPosts.id === id);

// if(!post){
    
//     res.status(404)

//     return res.json(
//         {
//             status : 404,
//             error : "not found",
//             message :"post not found"
//         }
//     );
// }
// arrayPosts.splice(arrayPosts.indexOf(post), 1);
// res.sendStatus(204)
    

const {id} = req.params;

const sql = 'DELETE FROM movies WHERE id = ?'

connection.query( sql, [id], (err) => {

    if(err) return res.status(500).json({
    error: 'Errore lato server DESTROY function'
    })

    if( results.length === 0 ) return res.status(404).json({
    error: 'movie not found'
    })

    res.sendStatus( 204 )
})

    
} 
function storeReview(req,res){
    const {id} = req.params;

    const {text,name,vote} = req.body

    const sql = 'INSERT INTO reviews (text,name,vote,movie_id) VALUES (?,?,?,?)'

    connection.query(sql,[text,name,vote,id], (err,results)=>{
        if(err) return res.status(500).json({
            error: 'database error storeReview' 
        })

        res.status(201)
        res.json({
            message: 'reviews added',
            id: results.insertId
        })
    })
}



module.exports = {index,show,store,update,patch,destroy,storeReview}