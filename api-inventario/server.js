const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PUERTO = 3000;

app.use(cors());
app.use(express.json());

const RUTA_DATOS = path.join(__dirname, 'data', 'productos.json');

const leerDatos = () => {
  try {
    if (!fs.existsSync(RUTA_DATOS)) {
      const dirData = path.dirname(RUTA_DATOS);
      if (!fs.existsSync(dirData)) fs.mkdirSync(dirData, { recursive: true });
      const datosIniciales = [
        { id: 1, nombre: "Camiseta Deportiva", precio: 45000, stock: 4, cantidadMinima: 5, descuento: 10 },
        { id: 2, nombre: "Tenis Running", precio: 180000, stock: 15, cantidadMinima: 6, descuento: 10 },
        { id: 3, nombre: "Gorra Casual", precio: 25000, stock: 2, cantidadMinima: 5, descuento: 10 }
      ];
      fs.writeFileSync(RUTA_DATOS, JSON.stringify(datosIniciales, null, 2), 'utf-8');
      return datosIniciales;
    }
    const contenido = fs.readFileSync(RUTA_DATOS, 'utf-8');
    return JSON.parse(contenido);
  } catch (error) {
    console.error('Error al leer datos:', error);
    return [];
  }
};

const guardarDatos = (datos) => {
  try {
    fs.writeFileSync(RUTA_DATOS, JSON.stringify(datos, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error al guardar datos:', error);
  }
};

const validarProducto = (req, res, next) => {
  const { nombre, precio, stock, cantidadMinima, descuento } = req.body;
  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') return res.status(400).json({ mensaje: 'El nombre es obligatorio.' });
  if (typeof precio !== 'number' || precio <= 0) return res.status(400).json({ mensaje: 'El precio debe ser un número mayor a 0.' });
  if (typeof stock !== 'number' || stock < 0 || !Number.isInteger(stock)) return res.status(400).json({ mensaje: 'El stock debe ser un entero mayor o igual a 0.' });
  if (typeof cantidadMinima !== 'number' || cantidadMinima < 0 || !Number.isInteger(cantidadMinima)) return res.status(400).json({ mensaje: 'La cantidad mínima debe ser un entero mayor o igual a 0.' });
  if (typeof descuento !== 'number' || descuento < 0 || descuento > 100) return res.status(400).json({ mensaje: 'El descuento debe ser un número entre 0 y 100.' });
  next();
};

app.get('/api/productos', (req, res) => res.json(leerDatos()));

app.post('/api/productos', validarProducto, (req, res) => {
  const productos = leerDatos();
  const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
  const nuevoProducto = { id: nuevoId, nombre: req.body.nombre.trim(), precio: req.body.precio, stock: req.body.stock, cantidadMinima: req.body.cantidadMinima, descuento: req.body.descuento };
  productos.push(nuevoProducto);
  guardarDatos(productos);
  res.status(201).json(nuevoProducto);
});

app.put('/api/productos/:id', validarProducto, (req, res) => {
  const id = parseInt(req.params.id);
  let productos = leerDatos();
  const indice = productos.findIndex(p => p.id === id);
  if (indice === -1) return res.status(404).json({ mensaje: 'Producto no encontrado.' });
  productos[indice] = { id, nombre: req.body.nombre.trim(), precio: req.body.precio, stock: req.body.stock, cantidadMinima: req.body.cantidadMinima, descuento: req.body.descuento };
  guardarDatos(productos);
  res.json(productos[indice]);
});

app.delete('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let productos = leerDatos();
  const productosFiltrados = productos.filter(p => p.id !== id);
  if (productos.length === productosFiltrados.length) return res.status(404).json({ mensaje: 'Producto no encontrado.' });
  guardarDatos(productosFiltrados);
  res.status(204).send();
});

app.listen(PUERTO, () => console.log(`Servidor API StockMaster en http://localhost:${PUERTO}`));
