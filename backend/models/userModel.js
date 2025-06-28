const mongoose = require('mongoose');

// mongoose.Schema nos permite definir la estructura de nuestros documentos en MongoDB
const userSchema = new mongoose.Schema({
    // Definimos el campo 'nombre'
    nombre: {
        type: String, // El tipo de dato debe ser una cadena de texto
        required: [true, 'Por favor, introduce tu nombre'], // Es un campo obligatorio
    },
    // Definimos el campo 'apellido'
    apellido: {
        type: String,
        required: [true, 'Por favor, introduce tu apellido'],
    },
    // Definimos el campo 'email'
    email: {
        type: String,
        required: [true, 'Por favor, introduce tu email'],
        unique: true, // Esto asegura que no pueda haber dos usuarios con el mismo email
    },
    // Definimos el campo 'password'
    password: {
        type: String,
        required: [true, 'Por favor, introduce tu contraseña'],
    },
    // En el futuro, podríamos añadir más campos aquí, como 'rol', 'fotoPerfil', etc.
}, {
    // Opciones del esquema
    timestamps: true, // Esto añade automáticamente dos campos a nuestro modelo: createdAt y updatedAt
});

// Exportamos el modelo para poder usarlo en otras partes de nuestra aplicación.
// Mongoose creará una colección en la base de datos llamada 'users' (pluraliza 'User').
module.exports = mongoose.model('User', userSchema);