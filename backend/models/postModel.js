const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    // Este campo es crucial. Almacenará el ID del usuario que creó la publicación.
    // El 'ref: 'User'' le dice a Mongoose que este ID se refiere a un documento
    // en nuestra colección de 'User'.
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    descripcion: {
        type: String,
        required: [true, 'Por favor, añade una descripción'],
    },
    tipoPublicacion: {
        type: String,
        required: true,
        // 'enum' restringe este campo a solo uno de los valores en el array.
        enum: ['Intercambio', 'Donación', 'Petición'],
    },
    edadRecomendada: {
        type: String,
        required: [true, 'Por favor, especifica la edad recomendada'],
    },
    // Guardaremos las habilidades como un array de strings.
    habilidadesRequeridas: {
        type: [String],
        required: [true, 'Por favor, especifica al menos una habilidad'],
    },
    // Por ahora, guardaremos la URL de la imagen como un string.
    // Más adelante podríamos implementar un sistema de subida de archivos.
    imagenUrl: {
        type: String,
        required: [true, 'Por favor, añade una URL de imagen'],
    },
}, {
    // Esto añade automáticamente los campos createdAt y updatedAt.
    timestamps: true,
});

// Mongoose creará una colección llamada 'posts' a partir de este modelo.
module.exports = mongoose.model('Post', postSchema);