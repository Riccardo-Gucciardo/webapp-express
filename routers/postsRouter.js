const express = require('express')
const router = express.Router();

const upload = require("../middleware/multer.js")
const postController = require("../controllers/postController.js")
const {index,show,store,update,patch,destroy,storeReview,} = postController;

router.get('/', index);
router.get('/:id', show );
router.put('/:id', update);
router.patch('/:id', patch);
router.delete('/:id', destroy);  
router.post('/:id/reviews', storeReview) 
router.post('/', upload.single('image'),store)

module.exports = router;
 