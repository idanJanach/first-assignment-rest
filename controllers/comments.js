const Comment = require('../models/comment');


const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
    
        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).json({ error: 'Comment not found' });
    
        res.json(comment);
      } catch (error) {
        res.status(500).json({ error: 'Error retrieving comment' });
      }
  };

const getAllCommentsForPost = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) return res.status(400).json({ error: 'Post ID is required' });

    const comments = await Comment.find({ postId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving comments for post' });
  }
};

const addComment = async (req, res) => {
  try {
    const { postId, senderId, content } = req.body;
    if (!postId || !senderId || !content) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const comment = new Comment({ postId, senderId, content });
    await comment.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Error creating comment' });
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    comment.content = content || comment.content;
    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Error updating comment' });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting comment' });
  }
};

module.exports = {
  getCommentById,
  getAllCommentsForPost,
  addComment,
  updateComment,
  deleteComment,
};
