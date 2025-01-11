const express = require('express');
const {
  getAllPosts,
  getPostById,
  getPostsBySender,
  addPost,
  updatePost,
} = require('../controllers/posts');

const router = express.Router();

router.get('/', getAllPosts);

router.get('/:id', getPostById);

router.get('/', getPostsBySender);

router.post('/', addPost);

router.put('/:id', updatePost);

module.exports = router;
