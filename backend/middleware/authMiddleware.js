const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    let token;

    // 1. Verificamos si la cabecera 'Authorization' existe y empieza con 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 2. Obtenemos el token de la cabecera (quitando la palabra 'Bearer ')
            token = req.headers.authorization.split(' ')[1];

            // 3. Verificamos y decodificamos el token usando nuestro secreto
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Buscamos al usuario en la BD por el ID que estaba en el token
            // El '-password' le dice a Mongoose que no queremos traer el campo password
            req.user = await User.findById(decoded.id).select('-password');

            // 5. Si todo es correcto, llamamos a la siguiente función (el controlador)
            next();
        } catch (error) {
            console.error(error);
            res.status(401); // No autorizado
            throw new Error('No autorizado, token falló');
        }
    }

    // Si no hay token en la cabecera
    if (!token) {
        res.status(401);
        throw new Error('No autorizado, no hay token');
    }
};

module.exports = {
    protect
};