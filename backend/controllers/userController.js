const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// @desc    Registrar un nuevo usuario
// @route   POST /api/users/register
// @access  Publico
const registerUser = async (req, res) => {
    // 1. Obtenemos los datos del cuerpo de la petición
    const {
        nombre,
        apellido,
        email,
        password
    } = req.body;

    // 2. Verificamos que todos los campos estén presentes
    if (!nombre || !apellido || !email || !password) {
        res.status(400); // Bad Request
        throw new Error('Por favor, completa todos los campos');
    }

    // 3. Verificamos si el usuario ya existe en la base de datos
    const userExists = await User.findOne({
        email
    });
    if (userExists) {
        res.status(400);
        throw new Error('El usuario con ese email ya existe');
    }

    // 4. Hasheamos (encriptamos) la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Creamos el nuevo usuario en la base de datos
    const user = await User.create({
        nombre,
        apellido,
        email,
        password: hashedPassword,
    });

    // 6. Si el usuario se creó con éxito, enviamos una respuesta
    if (user) {
        res.status(201).json({ // 201: Created
            _id: user._id,
            nombre: user.nombre,
            email: user.email,
            token: generateToken(user._id), // Generamos un token JWT para el usuario recién registrado
            // No enviaremos la contraseña de vuelta, ni siquiera la hasheada
        });
    } else {
        res.status(400);
        throw new Error('Datos de usuario inválidos');
    }
};

// @desc    Autenticar (loguear) un usuario
// @route   POST /api/users/login
// @access  Publico
const loginUser = async (req, res) => {
    // 1. Obtenemos el email y password del cuerpo de la petición
    const {
        email,
        password
    } = req.body;

    // 2. Buscamos al usuario en la base de datos por su email
    const user = await User.findOne({
        email
    });

    // 3. Verificamos si el usuario existe Y si la contraseña coincide
    // bcrypt.compare compara la contraseña en texto plano con la hasheada
    if (user && (await bcrypt.compare(password, user.password))) {
        // 4. Si todo coincide, enviamos los datos del usuario y un nuevo token
        res.status(200).json({
            _id: user._id,
            nombre: user.nombre,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        // 5. Si no coincide, enviamos un error de no autorizado
        res.status(401); // Unauthorized
        throw new Error('Credenciales inválidas');
    }
};

module.exports = {
    registerUser,
    loginUser,
};