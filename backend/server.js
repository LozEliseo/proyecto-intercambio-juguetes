// Inportar las dependencias
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const testRoutes = require('./routes/testRoutes');
const userRoutes = require('./routes/userRoutes');

// Configurar las variables de entorno
dotenv.config();

// Conectar a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado...'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// Crear la aplicación Express
const app = express();

// Habilitar CORS para permitir solicitudes desde el frontend
app.use(cors());


// Middlewares para entender JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware para las rutas
// Le decimos a Express que para cualquier ruta que empiece con '/api',
// debe usar el archivo de rutas que importamos.
app.use('/api', testRoutes);
app.use('/api/users', userRoutes);

// Definir el puerto para verificar que la aplicación se está ejecutando
const PORT = process.env.PORT || 5001;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});