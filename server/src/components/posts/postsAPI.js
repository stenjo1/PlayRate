const express = require('express');

const router = express.Router();
const controller = require('./postsController');

router.get('/', controller.getPosts);
router.post('/', controller.createPost);
router.get('/:postId', controller.getPostById);
router.patch('/:postId', controller.editReview);
router.delete('/:postId', controller.deletePost);

module.exports = router;