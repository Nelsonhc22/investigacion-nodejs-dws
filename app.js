const express = require('express');
const app = express();

// VARIABLES
const PORT        = 3000;
const nombreGrupo = 'Premier Coders';
const materia     = 'DWS901';

let estudiantes = [
  { id: 1, nombre: 'Ana Garcia',    carrera: 'Ingenieria en Sistemas' },
  { id: 2, nombre: 'Carlos Lopez',  carrera: 'Ingenieria en Sistemas' },
  { id: 3, nombre: 'Maria Ramirez', carrera: 'Ingenieria en Sistemas' },
];


// FUNCIONES
function obtenerFecha() {
  return new Date().toLocaleDateString('es-SV', {
    weekday: 'long', year: 'numeric',
    month: 'long',   day: 'numeric'
  });
}

function generarPagina(titulo, contenido) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>${titulo}</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Arial, sans-serif; background: #f0f4f8; color: #333; }
        nav {
          background: #2c3e50;
          padding: 15px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        nav .logo { color: white; font-weight: bold; font-size: 18px; }
        nav a {
          color: #ecf0f1;
          text-decoration: none;
          margin-left: 20px;
          padding: 6px 14px;
          border-radius: 4px;
        }
        nav a:hover { background: #34495e; }
        .container { max-width: 860px; margin: 40px auto; padding: 0 20px; }
        .card {
          background: white;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          margin-bottom: 20px;
        }
        h1 { font-size: 24px; margin-bottom: 15px; color: #2c3e50; }
        h2 { font-size: 20px; margin-bottom: 15px; color: #2c3e50; }
        p  { color: #666; margin-bottom: 12px; line-height: 1.6; }
        table { width: 100%; border-collapse: collapse; font-size: 14px; }
        th { background: #2c3e50; color: white; padding: 12px 15px; text-align: left; }
        td { padding: 11px 15px; border-bottom: 1px solid #eee; }
        tr:hover td { background: #f9f9f9; }
        .btn {
          display: inline-block;
          padding: 10px 20px;
          background: #2c3e50;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin: 5px;
          font-size: 14px;
          border: none;
          cursor: pointer;
        }
        .btn:hover  { background: #34495e; }
        .btn-green  { background: #27ae60; }
        .btn-green:hover { background: #219a52; }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 5px; font-size: 14px; }
        .form-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 14px;
        }
        .alert { padding: 12px 18px; border-radius: 5px; margin-bottom: 20px; font-size: 14px; }
        .alert-success { background: #d4edda; color: #155724; }
        footer { text-align: center; padding: 20px; color: #aaa; font-size: 13px; margin-top: 40px; }
      </style>
    </head>
    <body>
      <nav>
        <span class="logo">⬡ ${nombreGrupo}</span>
        <div>
          <a href="/">Inicio</a>
          <a href="/info">Informacion</a>
          <a href="/estudiantes">Estudiantes</a>
          <a href="/agregar">Agregar</a>
        </div>
      </nav>
      <div class="container">
        ${contenido}
      </div>
      <footer>${nombreGrupo} &bull; ${materia} &bull; Universidad Don Bosco</footer>
    </body>
    </html>
  `;
}


// MANEJO DE EVENTOS
const EventEmitter = require('events');
const emisor = new EventEmitter();

// Evento 1: servidor iniciado
emisor.on('servidorIniciado', (puerto) => {
  console.log('>> Servidor listo en el puerto: ' + puerto);
});

// Evento 2: solicitud recibida
emisor.on('solicitudRecibida', (ruta) => {
  console.log('>> Solicitud recibida en: ' + ruta);
});

// Evento 3: estudiante agregado
emisor.on('estudianteAgregado', (nombre) => {
  console.log('>> Nuevo estudiante registrado: ' + nombre);
});

// Evento 4: error - ruta no encontrada
emisor.on('errorServidor', (mensaje) => {
  console.log('>> Error: ' + mensaje);
});

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Middleware: dispara evento en cada solicitud
app.use((req, res, next) => {
  emisor.emit('solicitudRecibida', req.url);
  next();
});


// Rutas
// Pagina principal
app.get('/', (req, res) => {
  const contenido = `
    <div class="card">
      <h1>Bienvenido a la App de practica de Node.js</h1>
      <p>Grupo: <strong>${nombreGrupo}</strong></p>
      <p>Materia: <strong>${materia}</strong></p>
      <p>Fecha: ${obtenerFecha()}</p>
      <br>
      <a href="/info"        class="btn">Ver informacion</a>
      <a href="/estudiantes" class="btn btn-green">Ver estudiantes</a>
      <a href="/agregar"     class="btn btn-green">Agregar estudiante</a>
    </div>
  `;
  res.send(generarPagina('Inicio', contenido));
});

// Pagina de informacion del servidor
app.get('/info', (req, res) => {
  const contenido = `
    <div class="card">
      <h1>Informacion del Servidor</h1>
      <p>Grupo: <strong>${nombreGrupo}</strong></p>
      <p>Materia: <strong>${materia}</strong></p>
      <p>Puerto: <strong>${PORT}</strong></p>
      <p>Version de Node.js: <strong>${process.version}</strong></p>
      <p>Fecha: <strong>${obtenerFecha()}</strong></p>
      <br>
      <a href="/" class="btn">Volver al inicio</a>
    </div>
  `;
  res.send(generarPagina('Informacion', contenido));
});

// Pagina con la lista de estudiantes
app.get('/estudiantes', (req, res) => {
  const filas = estudiantes.map(e => `
    <tr>
      <td>${e.id}</td>
      <td>${e.nombre}</td>
      <td>${e.carrera}</td>
    </tr>
  `).join('');

  const contenido = `
    <div class="card">
      <h1>Lista de Estudiantes</h1>
      <p>Total registrados: <strong>${estudiantes.length}</strong></p>
      <br>
      <table>
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Carrera</th></tr>
        </thead>
        <tbody>${filas}</tbody>
      </table>
      <br>
      <a href="/agregar" class="btn btn-green">Agregar nuevo</a>
      <a href="/"        class="btn">Volver al inicio</a>
    </div>
  `;
  res.send(generarPagina('Estudiantes', contenido));
});

// Formulario para agregar estudiante
app.get('/agregar', (req, res) => {
  const contenido = `
    <div class="card">
      <h2>Agregar Nuevo Estudiante</h2>
      <form method="POST" action="/agregar">
        <div class="form-group">
          <label>Nombre completo</label>
          <input type="text" name="nombre" placeholder="Ej: Juan Perez" required>
        </div>
        <div class="form-group">
          <label>Carrera</label>
          <input type="text" name="carrera" placeholder="Ej: Ingenieria en Sistemas" required>
        </div>
        <button type="submit" class="btn btn-green">Guardar</button>
        <a href="/estudiantes" class="btn">Cancelar</a>
      </form>
    </div>
  `;
  res.send(generarPagina('Agregar Estudiante', contenido));
});

// Recibir el formulario y guardar el estudiante
app.post('/agregar', (req, res) => {
  const { nombre, carrera } = req.body;

  const nuevoEstudiante = {
    id:      estudiantes.length + 1,
    nombre:  nombre,
    carrera: carrera,
  };

  estudiantes.push(nuevoEstudiante);

  // Disparar evento de estudiante agregado
  emisor.emit('estudianteAgregado', nombre);

  const contenido = `
    <div class="card">
      <div class="alert alert-success">
        Estudiante <strong>${nombre}</strong> agregado correctamente.
      </div>
      <a href="/estudiantes" class="btn btn-green">Ver lista</a>
      <a href="/agregar"     class="btn">Agregar otro</a>
    </div>
  `;
  res.send(generarPagina('Listo', contenido));
});

// Ruta no encontrada, aqui para recordar que dispara evento de error
app.use((req, res) => {
  emisor.emit('errorServidor', 'Ruta no encontrada: ' + req.url);
  res.status(404).send(generarPagina('404', `
    <div class="card" style="text-align:center; padding: 60px;">
      <h1 style="font-size:60px; color:#e74c3c;">404</h1>
      <h2>Pagina no encontrada</h2>
      <p>La ruta <strong>${''}${''}</strong> no existe en este servidor.</p>
      <a href="/" class="btn">Volver al inicio</a>
    </div>
  `));
});

// Iniciar el servidor
app.listen(PORT, () => {
  emisor.emit('servidorIniciado', PORT);
  console.log('Grupo: ' + nombreGrupo + ' | Materia: ' + materia);
  console.log('Presiona Ctrl+C para detener');
  console.log('');
});

module.exports = app;