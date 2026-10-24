// ==========================================
// CONTROL DE INVENTARIO - Jhoanna, Jhoan y Kevin
// ==========================================
import { useState } from "react";

function Inventario() {
    const listaProductos = [
        { id: 1, nombre: "Camiseta Deportiva", precio: 45000, stock: 4, cantidadMinima: 5, descuento: 10 },
        { id: 2, nombre: "Tenis Running", precio: 180000, stock: 15, cantidadMinima: 6, descuento: 10 },
        { id: 3, nombre: "Gorra Casual", precio: 25000, stock: 2, cantidadMinima: 5, descuento: 10 }
    ];

    const [inventario, setInventario] = useState(
        listaProductos.map(item => ({ ...item, mensajeAlerta: "" }))
    );

    const calcularValorTotal = (precio, descuento) => {
        return precio - (precio * (descuento / 100));
    };

    const calcularUnidadesFaltantes = (actual, minima) => {
        if (actual < minima) {
            return minima - actual;
        }
        return 0;
    };

    const calcularDescuento = (precio, descuento) => {
        return precio * (descuento / 100);
    };

    function VerificarAlerta(idProducto) {
        const nuevoInventario = inventario.map(item => {
            if (item.id === idProducto) {
                let mensaje = "";

                if (item.stock < item.cantidadMinima) {
                    mensaje = "ALERTA: Stock crítico, requiere reposición urgente.";
                } else if (item.stock === item.cantidadMinima) {
                    mensaje = "PRECAUCIÓN: Estás en el límite mínimo permitido.";
                } else {
                    mensaje = "ESTADO: Inventario en niveles óptimos.";
                }

                return { ...item, mensajeAlerta: mensaje };
            }
            return item;
        });

        setInventario(nuevoInventario);
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>REPORTE GENERAL DE INVENTARIO</h1>

            {inventario.map((item) => {
                const valorTotal = calcularValorTotal(item.precio, item.descuento);
                const faltantes = calcularUnidadesFaltantes(item.stock, item.cantidadMinima);
                const descuentoCalculado = calcularDescuento(item.precio, item.descuento);
                const requiereAlerta = item.stock < item.cantidadMinima;

                return (
                    <div key={item.id} className="tarjeta-producto">
                        <h2>{item.nombre}</h2>
                        <p><strong>Precio Unitario:</strong> ${item.precio}</p>
                        <p><strong>Stock Actual:</strong> {item.stock} unidades</p>
                        <p><strong>Cantidad Mínima:</strong> {item.cantidadMinima} unidades</p>
                        <p><strong>Descuento ({item.descuento}%):</strong> ${descuentoCalculado}</p>
                        <p><strong>Valor a pagar:</strong> ${valorTotal}</p>
                        <p><strong>Unidades Faltantes:</strong> {faltantes}</p>

                        <button onClick={() => VerificarAlerta(item.id)}>
                            Verificar Estado
                        </button>

                        <p style={{ 
                            fontWeight: "bold", 
                            marginTop: "10px", 
                            color: requiereAlerta ? "#00AFA3" : "#526174" 
                        }}>
                            {item.mensajeAlerta}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

export default Inventario;