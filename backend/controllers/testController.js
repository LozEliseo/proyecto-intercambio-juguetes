// @desc    Obtiene un mensaje de prueba
// @route   GET /api/test
// @access  Public
const getTestMessage = (req, res) => {
    res.json({
        message: '¡La nueva arquitectura de rutas funciona!'
    });
};

module.exports = {
    getTestMessage
};