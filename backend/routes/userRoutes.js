const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser
} = require('../controllers/userController');

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión de un usuario
router.post('/login', loginUser);

module.exports = router;