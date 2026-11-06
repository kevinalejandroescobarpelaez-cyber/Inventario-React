import { useState, useEffect } from 'react';
import { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } from '../services/api';
import FormularioProducto from '../components/FormularioProducto';
import FilaProducto from '../components/FilaProducto';
import './Registro.css';

const Registro = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);
  const [mensajeExito, setMensajeExito] = useState('');
  const [productoAEditar, setProductoAEditar] = useState(null);

  useEffect(() => { cargarDatos(); }, []);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      setError(null);
      const datos = await obtenerProductos();
      setProductos(datos);
    } catch (err) {
      setError('No se pudo conectar con el servidor. Verifica que la API esté corriendo.');
    } finally {
      setCargando(false);
    }
  };

  const mostrarExito = (mensaje) => {
    setMensajeExito(mensaje);
    setTimeout(() => setMensajeExito(''), 3000);
  };

  const handleGuardar = async (datosFormulario) => {
    try {
      setGuardando(true);
      setError(null);
      
      if (productoAEditar) {
        const productoActualizado = await actualizarProducto(productoAEditar.id, datosFormulario);
        setProductos(productos.map(p => p.id === productoActualizado.id ? productoActualizado : p));
        mostrarExito('Producto actualizado correctamente.');
        setProductoAEditar(null);
      } else {
        const nuevoProducto = await crearProducto(datosFormulario);
        setProductos([...productos, nuevoProducto]);
        mostrarExito('Producto agregado correctamente.');
      }
    } catch (err) {
      setError(err.message || 'Error al guardar el producto.');
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminar = async (id, nombre) => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar el producto "${nombre}"?`)) return;
    try {
      setGuardando(true);
      setError(null);
      await eliminarProducto(id);
      setProductos(productos.filter(p => p.id !== id));
      mostrarExito('Producto eliminado correctamente.');
    } catch (err) {
      setError('Error al eliminar el producto.');
    } finally {
      setGuardando(false);
    }
  };

  const handleAjustarStock = async (id, nuevoStock) => {
    try {
      setGuardando(true);
      setError(null);
      
      const producto = productos.find(p => p.id === id);
      if (!producto) return;

      const productoActualizado = await actualizarProducto(id, { ...producto, stock: nuevoStock });
      setProductos(productos.map(p => p.id === id ? productoActualizado : p));
    } catch (err) {
      setError('Error al actualizar el stock.');
    } finally {
      setGuardando(false);
    }
  };

  const handleEditarClick = (producto) => {
    setProductoAEditar(producto);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container py-4 registro-contenedor">
      <h1 className="registro-titulo text-center">Gestión de Productos - StockMaster</h1>
      
      {error && <div className="alert alert-danger" role="alert"><i className="fa-solid fa-triangle-exclamation me-2"></i>{error}</div>}
      {mensajeExito && <div className="alert alert-success" role="alert"><i className="fa-solid fa-circle-check me-2"></i>{mensajeExito}</div>}
      
      <FormularioProducto 
        productoAEditar={productoAEditar} 
        onGuardar={handleGuardar} 
        onCancelar={() => setProductoAEditar(null)} 
        guardando={guardando} 
      />

      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <h5 className="registro-titulo mb-3" style={{ fontSize: '1.25rem', borderBottom: 'none' }}>Listado de Productos</h5>
          
          {cargando ? (
            <div className="text-center py-4">
              <div className="spinner-border text-info" role="status"><span className="visually-hidden">Cargando...</span></div>
              <p className="mt-2">Cargando productos...</p>
            </div>
          ) : productos.length === 0 ? (
            <p className="text-center text-muted py-4">No hay productos registrados.</p>
          ) : (
            /* Se usa nuestra clase personalizada en lugar de table-responsive */
            <div className="registro-tabla-contenedor">
              <table className="table table-bordered table-hover registro-tabla align-middle">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Mínimo</th>
                    <th>Descuento</th>
                    <th>Ajustar Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <FilaProducto 
                      key={producto.id} 
                      producto={producto} 
                      onEditar={handleEditarClick} 
                      onEliminar={handleEliminar} 
                      onAjustarStock={handleAjustarStock} 
                      guardando={guardando} 
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registro;
