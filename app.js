

const express = require('express');

// app
const app = express();

// puerto donde corre el servidor
const PORT = 3000;

// Middleware para que el servidor pueda leer datos en formato JSON
app.use(express.json());

// Middleware para que el servidor pueda leer datos de formularios
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estaticos
app.use(express.static('public'));


// pagina principal
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Practica Node.js</title>
        <style>
          body { font-family: Arial; text-align: center; padding: 50px; background: #f0f0f0; }
          h1 { color: #333; }
          p { color: #666; }
          .btn { s
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
        <h1>Bienvenido a la App de practica de NodeJs PREMIER CODERS</h1>
        <p>Practica de Node.js</p>
        <a href="/info" class="btn">Ver informacion</a>
        <a href="/datos" class="btn">Ver datos</a>
      </body>
    </html>
  `);
});

// para iniciar el servidor
app.listen(PORT, () => {
  console.log('  Servidor corriendo en: http://localhost:' + PORT);
  console.log('  Practica, App Node.js de materia DWS');

});


module.exports = app;
