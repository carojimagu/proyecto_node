// const { Pool } = require('pg');

// // Configura la conexión a la base de datos
// const pool = new Pool({
//   user: 'tu_usuario',
//   host: 'localhost',
//   database: 'nombre_de_tu_base_de_datos',
//   password: 'tu_contraseña',
//   port: 5432, // Puerto por defecto de PostgreSQL
// });

const express = require("express");
const app = express();
const port = 3001;
const { infoRoles } = require("./roles.js");

app.use(express.json());

console.log(infoRoles);

//1 Ruta de bienvenida
app.get("/", (req, res) => {
  res.send("Mi primer servidor Roles 🖥️.");
});

//2 Obtener todos los cursos
app.get("/roles", (req, res) => {
  res.send(JSON.stringify(infoRoles));
});

//3 obtener los cursos por categoria
app.get("/roles/:categoria", (req, res) => {
  const { categoria } = req.params;
  if (!infoRoles[categoria]) {
    res.status(404).send("Rol no encontrado");
  } else {como
    res.json(infoRoles[categoria]);
  }
});

//4 Obtener un rol por categoría y id
app.get("/roles/:categoria/:id", (req, res) => {
  const { categoria, id } = req.params;

  if (!infoRoles[categoria]) {
    res.status(404).send("Categoría no encontrada");
    return;
  }

  const rolEnCategoria = infoRoles[categoria].find(rol => rol.id.toString() === id);

  if (!rolEnCategoria) {
    res.status(404).send("Rol no encontrado en esta categoría");
  } else {
    res.json(rolEnCategoria);
  }
});

//5 Crear un nuevo rol en una categoría
app.post("/crear/roles/:categoria", (req, res) => {
  const { categoria } = req.params;
  const nuevoRol = req.body;

  if (!nuevoRol.name || !nuevoRol.description) {
    res.status(400).send("El nombre y la descripción del rol son obligatorios");
  } else {
    //6 Encontrar el último ID y generar uno nuevo incrementando en 1
    const ultimaPosicion = infoRoles[categoria].length - 1;
    const ultimoID = ultimaPosicion >= 0 ? infoRoles[categoria][ultimaPosicion].id : 0;
    nuevoRol.id = ultimoID + 1;

    infoRoles[categoria].push(nuevoRol);
    res.status(201).json(nuevoRol);
  }
});


//6 Actualizar un curso por su ID en una categoría
app.put("/cursos/:tema/:id", (req, res) => {
  const { tema, id } = req.params;
  const cursoIndex = infoRoles[tema].findIndex((roles) => roles.id == id);

  if (rolesIndex === -1) {
    res.status(404).send("Curso no encontrado");
  } else {
    const RolesActualizado = req.body;
    infoRoles[tema][rolesIndex] = {
      ...infoRoles[tema][rolesIndex],
      ...RolesActualizado,
    };
    res.json(infoRoles[tema][rolesIndex]);
  }
});

//7 Borrar un curso por su ID
app.delete("/roles/:categoria/:id", (req, res) => {
  const { categoria, id } = req.params;

  if (!infoRoles[categoria]) {
    res.status(404).send("Categoría no encontrada");
    return;
  }
  const rolesEnCategoria = infoRoles[categoria];
  const rolEncontrado = rolesEnCategoria.find(rol => rol.id === id);

  if (!rolEncontrado) {
    res.status(404).send("Rol no encontrado en esta categoría");
  } else {
    const rolIndex = rolesEnCategoria.indexOf(rolEncontrado);
    rolesEnCategoria.splice(rolIndex, 1);
    res.status(204).send();
  }
});



// Iniciar el servidor
app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});
