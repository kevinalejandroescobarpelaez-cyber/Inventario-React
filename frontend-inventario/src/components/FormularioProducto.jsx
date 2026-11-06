import { useState, useEffect } from 'react';

const FormularioProducto = ({ productoAEditar, onGuardar, onCancelar, guardando }) => {
  const [formulario, setFormulario] = useState({ nombre: '', precio: '', stock: '', cantidadMinima: '', descuento: '' });
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (productoAEditar) {
      setFormulario({
        nombre: productoAEditar.nombre,
        precio: productoAEditar.precio,
        stock: productoAEditar.stock,
        cantidadMinima: productoAEditar.cantidadMinima,
        descuento: productoAEditar.descuento
      });
    } else {
      setFormulario({ nombre: '', precio: '', stock: '', cantidadMinima: '', descuento: '' });
    }
  }, [productoAEditar]);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
    if (errores[e.target.name]) setErrores({ ...errores, [e.target.name]: null });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!formulario.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio.';
    const precio = Number(formulario.precio);
    if (isNaN(precio) || precio <= 0) nuevosErrores.precio = 'Debe ser mayor a 0.';
    const stock = Number(formulario.stock);
    if (isNaN(stock) || stock < 0 || !Number.isInteger(stock)) nuevosErrores.stock = 'Entero >= 0.';
    const cantidadMinima = Number(formulario.cantidadMinima);
    if (isNaN(cantidadMinima) || cantidadMinima < 0 || !Number.isInteger(cantidadMinima)) nuevosErrores.cantidadMinima = 'Entero >= 0.';
    const descuento = Number(formulario.descuento);
    if (isNaN(descuento) || descuento < 0 || descuento > 100) nuevosErrores.descuento = 'Entre 0 y 100.';
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      onGuardar({
        nombre: formulario.nombre.trim(),
        precio: Number(formulario.precio),
        stock: Number(formulario.stock),
        cantidadMinima: Number(formulario.cantidadMinima),
        descuento: Number(formulario.descuento)
      });
    }
  };

  return (
    <div className="card mb-4 shadow-sm border-0">
      <div className="card-body p-4 p-md-5">
        <h5 className="registro-subtitulo">
          {productoAEditar ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        </h5>
        
        {/* Formulario reorganizado en dos filas */}
        <form onSubmit={handleSubmit} className="row g-4">
          
          {/* FILA 1: Nombre del producto (Ocupa todo el ancho disponible) */}
          <div className="col-12">
            <label htmlFor="nombre" className="form-label registro-label-campo">Nombre del Producto</label>
            <div className="input-group">
              <span className="input-group-text registro-icono-input"><i className="fa-solid fa-cart-flatbed"></i></span>
              <input 
                type="text" 
                className={`form-control ${errores.nombre ? 'is-invalid' : ''}`} 
                id="nombre" 
                name="nombre" 
                value={formulario.nombre} 
                onChange={handleChange} 
                disabled={guardando} 
                placeholder="Ej. Camiseta Deportiva" 
              />
            </div>
            {errores.nombre && <div className="registro-error">{errores.nombre}</div>}
          </div>

          {/* FILA 2: Campos numéricos (Se reparten el ancho en pantallas grandes) */}
          <div className="col-12 col-sm-6 col-lg-3">
            <label htmlFor="precio" className="form-label registro-label-campo">Precio ($)</label>
            <div className="input-group">
              <span className="input-group-text registro-icono-input"><i className="fa-solid fa-tag"></i></span>
              <input 
                type="number" 
                className={`form-control registro-input-forzado ${errores.precio ? 'is-invalid' : ''}`} 
                id="precio" 
                name="precio" 
                value={formulario.precio} 
                onChange={handleChange} 
                disabled={guardando} 
                placeholder="0" 
              />
            </div>
            {errores.precio && <div className="registro-error">{errores.precio}</div>}
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <label htmlFor="stock" className="form-label registro-label-campo">Stock</label>
            <div className="input-group">
              <span className="input-group-text registro-icono-input"><i className="fa-solid fa-warehouse"></i></span>
              <input 
                type="number" 
                className={`form-control registro-input-forzado ${errores.stock ? 'is-invalid' : ''}`} 
                id="stock" 
                name="stock" 
                value={formulario.stock} 
                onChange={handleChange} 
                disabled={guardando} 
                placeholder="0" 
              />
            </div>
            {errores.stock && <div className="registro-error">{errores.stock}</div>}
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <label htmlFor="cantidadMinima" className="form-label registro-label-campo">Cant. Mínima</label>
            <div className="input-group">
              <span className="input-group-text registro-icono-input"><i className="fa-solid fa-arrow-down-up-across-line"></i></span>
              <input 
                type="number" 
                className={`form-control registro-input-forzado ${errores.cantidadMinima ? 'is-invalid' : ''}`} 
                id="cantidadMinima" 
                name="cantidadMinima" 
                value={formulario.cantidadMinima} 
                onChange={handleChange} 
                disabled={guardando} 
                placeholder="0" 
              />
            </div>
            {errores.cantidadMinima && <div className="registro-error">{errores.cantidadMinima}</div>}
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <label htmlFor="descuento" className="form-label registro-label-campo">Descuento (%)</label>
            <div className="input-group">
              <span className="input-group-text registro-icono-input"><i className="fa-solid fa-percent"></i></span>
              <input 
                type="number" 
                className={`form-control registro-input-forzado ${errores.descuento ? 'is-invalid' : ''}`} 
                id="descuento" 
                name="descuento" 
                value={formulario.descuento} 
                onChange={handleChange} 
                disabled={guardando} 
                placeholder="0" 
              />
            </div>
            {errores.descuento && <div className="registro-error">{errores.descuento}</div>}
          </div>

          {/* Botones de acción */}
          <div className="col-12 d-flex justify-content-end gap-2 mt-4">
            {productoAEditar && (
              <button type="button" className="btn btn-secondary px-4" onClick={onCancelar} disabled={guardando}>
                Cancelar
              </button>
            )}
            <button type="submit" className="btn registro-btn-primario px-4" disabled={guardando}>
              <i className="fa-solid fa-check me-2"></i>
              {guardando ? 'Guardando...' : (productoAEditar ? 'Guardar Cambios' : 'Agregar Producto')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioProducto;
