const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    // jwt.sign() crea el token. Recibe 3 argumentos:
    // 1. El payload: la información que queremos guardar en el token (en este caso, el ID del usuario).
    // 2. El secreto: la clave privada que solo el servidor conoce.
    // 3. Las opciones: aquí definimos cuánto tiempo será válido el token.
    return jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: '30d', // El token expirará en 30 días
    });
};

module.exports = generateToken;