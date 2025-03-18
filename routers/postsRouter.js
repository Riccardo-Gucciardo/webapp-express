const express = require('express')
const router = express.Router();

const postController = require("../controllers/postController.js")
const {index,show,store,update,patch,destroy} = postController;

router.get('/', index);
router.get('/:id', show );
router.post('/', store);
router.put('/:id', update);
router.patch('/:id', patch);
router.delete('/:id', destroy);   

module.exports = router;
 