import { useState } from 'react';

const FilaProducto = ({ producto, onEditar, onEliminar, onAjustarStock, guardando }) => {
  const [cantidadAjuste, setCantidadAjuste] = useState('');

  const ajustarUnidad = (delta) => {
    const nuevoStock = producto.stock + delta;
    if (nuevoStock >= 0) onAjustarStock(producto.id, nuevoStock);
  };

  const ajustarExacto = (esSuma) => {
    const cantidad = Number(cantidadAjuste);
    if (isNaN(cantidad) || cantidad <= 0) return;
    const nuevoStock = esSuma ? producto.stock + cantidad : producto.stock - cantidad;
    if (nuevoStock >= 0) {
      onAjustarStock(producto.id, nuevoStock);
      setCantidadAjuste('');
    } else {
      alert('El stock no puede quedar negativo.');
    }
  };

  return (
    <tr>
      <td className="fw-semibold">{producto.nombre}</td>
      <td className="text-nowrap">${producto.precio.toLocaleString('es-CO')}</td>
      <td>
        <div className="d-flex justify-content-center align-items-center gap-1">
          <button className="btn btn-sm registro-btn-unidad px-2" onClick={() => ajustarUnidad(-1)} disabled={guardando || producto.stock === 0} title="Restar 1"><i className="fa-solid fa-minus"></i></button>
          <span className="fw-bold px-1" style={{ minWidth: '30px' }}>{producto.stock}</span>
          <button className="btn btn-sm registro-btn-unidad px-2" onClick={() => ajustarUnidad(1)} disabled={guardando} title="Sumar 1"><i className="fa-solid fa-plus"></i></button>
        </div>
      </td>
      <td>{producto.cantidadMinima}</td>
      <td>{producto.descuento}%</td>
      <td className="text-nowrap">
        <div className="d-flex justify-content-center align-items-center gap-1">
          <input type="number" className="form-control form-control-sm text-center" style={{ width: '60px' }} placeholder="0" value={cantidadAjuste} onChange={(e) => setCantidadAjuste(e.target.value)} disabled={guardando} />
          {/* Botones de cantidad exacta con la paleta de colores */}
          <button className="btn btn-sm registro-btn-sumar-exacto px-2" onClick={() => ajustarExacto(true)} disabled={guardando} title="Sumar cantidad exacta"><i className="fa-solid fa-plus"></i></button>
          <button className="btn btn-sm registro-btn-restar-exacto px-2" onClick={() => ajustarExacto(false)} disabled={guardando} title="Restar cantidad exacta"><i className="fa-solid fa-minus"></i></button>
        </div>
      </td>
      <td className="text-nowrap">
        <div className="d-flex justify-content-center gap-2">
          {/* El botón editar usa el color de acción de la paleta */}
          <button className="btn btn-sm registro-btn-editar" onClick={() => onEditar(producto)} disabled={guardando} title="Editar"><i className="fa-solid fa-pen-to-square"></i></button>
          {/* El botón eliminar mantiene el rojo por ser una acción de alerta/peligro */}
          <button className="btn btn-sm btn-outline-danger" onClick={() => onEliminar(producto.id, producto.nombre)} disabled={guardando} title="Eliminar"><i className="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  );
};

export default FilaProducto;
