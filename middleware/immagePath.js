function setimmagePath(req,res,next){
    req.imagepath =  `${req.protocol}://${req.get('host')}/img/`
    next()
}
module.exports = setimmagePath; 