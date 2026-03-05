# Proyecto NodeJs - DWS
## Universidad Don Bosco

---

## ¿Cómo instalar y correr el proyecto?

### Paso 1: Instalar Node.js
- Entrar a https://nodejs.org
- Descargar la versión LTS (la recomendada)
- Instalarla normalmente

### Paso 2: Abrir la carpeta del proyecto
```
Abrir la terminal (CMD o PowerShell en Windows)
Ir a la carpeta del proyecto:
  cd proyecto-nodejs
```

### Paso 3: Instalar las dependencias
```
npm install
```
Esto instala Express y todo lo necesario.

### Paso 4: Correr el servidor
```
npm start
```
o también:
```
node app.js
```

### Paso 5: Abrir en el navegador
Abrir Chrome o Firefox y entrar a:
```
http://localhost:3000
```

---

## Estructura del proyecto
```
proyecto-nodejs/
│
├── app.js          ← Archivo principal (Estudiante 1)
├── package.json    ← Configuración del proyecto (Estudiante 1)
│
├── routes/         ← Las rutas van aquí (Estudiante 3)
├── views/          ← Las páginas HTML van aquí (Estudiante 2)
└── public/         ← CSS e imágenes van aquí
```

---

## ¿Quién hizo qué?
- **Estudiante 1:** app.js, package.json, estructura del proyecto
- **Estudiante 2:** Configuración del servidor en app.js, vistas en views/
- **Estudiante 3:** Rutas en routes/
- **Estudiante 4:** Eventos y lógica
- **Estudiante 5:** Funciones y pruebas finales
