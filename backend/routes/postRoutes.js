const express = require('express');
const router = express.Router();
const {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
} = require('../controllers/postController');
const {
    protect
} = require('../middleware/authMiddleware');

// Rutas para la colección de posts
router.route('/').get(getPosts).post(protect, createPost);

// Rutas para un post específico por su ID
router
    .route('/:id')
    .get(getPostById)
    .put(protect, updatePost)
    .delete(protect, deletePost);

module.exports = router;