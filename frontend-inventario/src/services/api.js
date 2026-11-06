const URL_API = (import.meta.env.VITE_API_URL ?? 'http://localhost:3000') + '/api/productos';

export const obtenerProductos = async () => {
  const respuesta = await fetch(URL_API);
  if (!respuesta.ok) throw new Error('Error al obtener productos');
  return await respuesta.json();
};

export const crearProducto = async (producto) => {
  const respuesta = await fetch(URL_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  });
  if (!respuesta.ok) {
    const error = await respuesta.json();
    throw new Error(error.mensaje || 'Error al crear el producto');
  }
  return await respuesta.json();
};

export const actualizarProducto = async (id, producto) => {
  const respuesta = await fetch(`${URL_API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  });
  if (!respuesta.ok) {
    const error = await respuesta.json();
    throw new Error(error.mensaje || 'Error al actualizar el producto');
  }
  return await respuesta.json();
};

export const eliminarProducto = async (id) => {
  const respuesta = await fetch(`${URL_API}/${id}`, { method: 'DELETE' });
  if (!respuesta.ok) throw new Error('Error al eliminar el producto');
  return true;
};
