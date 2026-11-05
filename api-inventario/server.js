const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let productos = [
  { id: 1, nombre: "Teclado", cantidad: 10 },
  { id: 2, nombre: "Mouse", cantidad: 25 },
];
let siguienteId = 3;

// Leer todos
app.get("/api/productos", (req, res) => {
  res.json(productos);
});

// Leer uno
app.get("/api/productos/:id", (req, res) => {
  const producto = productos.find((p) => p.id === Number(req.params.id));
  if (!producto) return res.status(404).json({ error: "No encontrado" });
  res.json(producto);
});

// Crear
app.post("/api/productos", (req, res) => {
  const { nombre, cantidad } = req.body;
  if (!nombre) return res.status(400).json({ error: "Falta el nombre" });
  const nuevo = { id: siguienteId++, nombre, cantidad: Number(cantidad) || 0 };
  productos.push(nuevo);
  res.status(201).json(nuevo);
});

// Actualizar
app.put("/api/productos/:id", (req, res) => {
  const producto = productos.find((p) => p.id === Number(req.params.id));
  if (!producto) return res.status(404).json({ error: "No encontrado" });
  producto.nombre = req.body.nombre ?? producto.nombre;
  producto.cantidad = req.body.cantidad ?? producto.cantidad;
  res.json(producto);
});

// Eliminar
app.delete("/api/productos/:id", (req, res) => {
  const antes = productos.length;
  productos = productos.filter((p) => p.id !== Number(req.params.id));
  if (productos.length === antes) {
    return res.status(404).json({ error: "No encontrado" });
  }
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
