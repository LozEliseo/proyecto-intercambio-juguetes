const Post = require('../models/postModel');

// @desc    Crear una nueva publicación
// @route   POST /api/posts
// @access  Privado (requiere token)
const createPost = async (req, res) => {
    // 1. Obtenemos los datos del cuerpo de la petición
    const {
        descripcion,
        tipoPublicacion,
        edadRecomendada,
        habilidadesRequeridas,
        imagenUrl,
    } = req.body;

    // 2. Verificamos que los datos necesarios estén presentes
    if (!descripcion || !tipoPublicacion || !imagenUrl) {
        res.status(400);
        throw new Error('La descripción, tipo de publicación e imagen son obligatorios');
    }

    // 3. Creamos la nueva publicación en la base de datos
    const post = await Post.create({
        // El ID del usuario lo obtenemos de req.user, que fue establecido
        // por nuestro middleware 'protect'
        user: req.user._id,
        descripcion,
        tipoPublicacion,
        edadRecomendada,
        habilidadesRequeridas,
        imagenUrl,
    });

    // 4. Enviamos la publicación creada como respuesta
    res.status(201).json(post);
};

// @desc    Obtener todas las publicaciones
// @route   GET /api/posts
// @access  Público
const getPosts = async (req, res) => {
    // Usamos .find({}) para obtener todos los documentos.
    // .populate('user', 'nombre apellido') es muy potente. Le dice a Mongoose:
    // "En cada publicación, busca el usuario referenciado por el campo 'user'
    // y trae solo su nombre y apellido".
    // .sort({ createdAt: -1 }) ordena las publicaciones de la más nueva a la más vieja.
    const posts = await Post.find({}).populate('user', 'nombre apellido').sort({
        createdAt: -1
    });
    res.status(200).json(posts);
};

// @desc    Obtener una sola publicación por su ID
// @route   GET /api/posts/:id
// @access  Público
const getPostById = async (req, res) => {
    const post = await Post.findById(req.params.id).populate('user', 'nombre apellido');

    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404); // Not Found
        throw new Error('Publicación no encontrada');
    }
};

// @desc    Actualizar una publicación existente
// @route   PUT /api/posts/:id
// @access  Privado
const updatePost = async (req, res) => {
    // 1. Encontramos la publicación que se quiere actualizar por su ID
    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(404);
        throw new Error('Publicación no encontrada');
    }

    // 2. Verificamos que el usuario logueado sea el autor de la publicación
    // Comparamos el ID del usuario en el post con el ID del usuario en el token
    // Es importante usar .toString() porque son de tipos diferentes (ObjectID vs String)
    if (post.user.toString() !== req.user.id) {
        res.status(401); // No autorizado
        throw new Error('Usuario no autorizado para modificar esta publicación');
    }

    // 3. Si es el autor, actualizamos la publicación con los datos del body
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // La opción { new: true } nos devuelve el documento actualizado
    });

    res.status(200).json(updatedPost);
};

// @desc    Eliminar una publicación
// @route   DELETE /api/posts/:id
// @access  Privado
const deletePost = async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(404);
        throw new Error('Publicación no encontrada');
    }

    // Misma verificación de propiedad que en la actualización
    if (post.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Usuario no autorizado para eliminar esta publicación');
    }

    // Si es el autor, procedemos a eliminar
    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
        id: req.params.id,
        message: 'Publicación eliminada'
    });
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
};