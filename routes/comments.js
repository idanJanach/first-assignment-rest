const express = require('express');
const {
  getCommentById,
  getAllCommentsForPost,
  addComment,
  updateComment,
  deleteComment,
} = require('../controllers/comments');

const router = express.Router();


router.get('/:id', getCommentById);

router.get('/post/:postId', getAllCommentsForPost);

router.post('/', addComment);

router.put('/:id', updateComment);

router.delete('/:id', deleteComment);

module.exports = router;


