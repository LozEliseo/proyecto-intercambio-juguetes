import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('Cargando...');

  useEffect(() => {
    // Hacemos una petición a nuestro endpoint de prueba en el backend
    axios.get('http://localhost:5001/api/test')
      .then(response => {
        // Cuando la respuesta llega, actualizamos el estado
        setMessage(response.data.message);
      })
      .catch(error => {
        // Si hay un error, lo mostramos
        console.error('Hubo un error al conectar con el backend!', error);
        setMessage('Error: No se pudo conectar con el backend.');
      });
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez

  return (
    <div className="App">
      <h1>Frontend del Proyecto de Intercambio de Juguetes</h1>
      <p><strong>Mensaje desde el Backend:</strong> {message}</p>
    </div>
  );
}

export default App;