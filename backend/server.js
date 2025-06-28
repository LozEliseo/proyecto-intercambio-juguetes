// Inportar las dependencias
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

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

// Definir el puerto para verificar que la aplicación se está ejecutando
const PORT = process.env.PORT || 5001;

// Ruta de prueba para verificar que la aplicación está funcionando
app.get('/api/test', (req, res) => {
  res.json({ message: '¡El Backend se ha conectado exitosamente con el Frontend!' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});