const express = require('express')
const Post = require('../controllers/posts')
const router = express.Router()

router.get('/', Post.getAllPosts)

module.exports = router