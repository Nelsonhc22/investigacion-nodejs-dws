// ============================================
// app.js - Archivo principal del servidor
// Hecho por: Estudiante 1 (Persona 1)
// Universidad Don Bosco - DWS
// ============================================

// Importamos express (lo instalamos con: npm install express)
const express = require('express');

// Creamos la aplicacion
const app = express();

// Definimos el puerto donde va a correr el servidor
const PORT = 3000;

// Middleware para que el servidor pueda leer datos en formato JSON
app.use(express.json());

// Middleware para que el servidor pueda leer datos de formularios
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estaticos (CSS, imagenes, etc.)
app.use(express.static('public'));

// -----------------------------------------------
// RUTAS PRINCIPALES (Estudiante 1 - estructura base)
// Las rutas completas las agrega el Estudiante 3
// -----------------------------------------------

// Ruta de inicio - pagina principal
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>App NodeJs - DWS</title>
        <style>
          body { font-family: Arial; text-align: center; padding: 50px; background: #f0f0f0; }
          h1 { color: #333; }
          p { color: #666; }
          .btn { 
            display: inline-block; 
            padding: 10px 20px; 
            background: #4CAF50; 
            color: white; 
            text-decoration: none; 
            border-radius: 5px;
            margin: 10px;
          }
        </style>
      </head>
      <body>
        <h1>Bienvenido a la App NodeJs</h1>
        <p>Proyecto de investigacion - DWS - Universidad Don Bosco</p>
        <a href="/info" class="btn">Ver informacion</a>
        <a href="/datos" class="btn">Ver datos</a>
      </body>
    </html>
  `);
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log('===========================================');
  console.log('  Servidor corriendo en: http://localhost:' + PORT);
  console.log('  Proyecto: App NodeJs - DWS');
  console.log('  Universidad Don Bosco');
  console.log('===========================================');
});

// Exportamos app para que otros archivos puedan usarla
module.exports = app;
