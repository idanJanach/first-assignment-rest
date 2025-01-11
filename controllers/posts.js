const Post = require('../models/post');

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving posts' });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving post' });
  }
};

const getPostsBySender = async (req, res) => {
  try {
    const { sender } = req.query;
    if (!sender) return res.status(400).json({ error: 'Sender ID is required' });

    const posts = await Post.find({ senderId: sender });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving posts by sender' });
  }
};

const addPost = async (req, res) => {
  try {
    const { senderId, title, content } = req.body;
    if (!senderId || !title || !content) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const post = new Post({ senderId, title, content });
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error updating post' });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  getPostsBySender,
  addPost,
  updatePost,
};
