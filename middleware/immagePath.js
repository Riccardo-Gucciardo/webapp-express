function setImmagePath(req,res,next){
    req.imagePath =  `${req.protocol}://${req.get('host')}/img/cartella_img/`
    console.log(req.imagePath);
    
    next();
}
module.exports = setImmagePath; 