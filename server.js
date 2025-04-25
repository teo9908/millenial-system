const express = require('express');
const app = express();
const path = require('path'); // Importar el módulo path
const port = 3800; // Puedes cambiar el puerto si lo deseas


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Middleware para servir archivos estáticos desde la carpeta 'public'

app.use(express.static(path.join(__dirname, 'public')));


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Endpoint API para obtener los productos desde productos.json

app.get('/api/productos', (req, res) => {
    const productos = require('./productos.json'); // Cargar el archivo JSON
    res.json(productos); // Enviar los productos como respuesta JSON
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
