
import { useState, useEffect } from "react";
import styles from './Inventario.module.css';
import { obtenerProductos } from '../services/api';

function Inventario() {
    const [inventario, setInventario] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarInventario = async () => {
            try {
                setCargando(true);
                setError(null);
                const datos = await obtenerProductos();
                const productosConAlerta = datos.map(item => ({ ...item, mensajeAlerta: "" }));
                setInventario(productosConAlerta);
            } catch (err) {
                setError(err.message || "No se pudo conectar con el servidor.");
            } finally {
                setCargando(false);
            }
        };

        cargarInventario();
    }, []);

    /* Traemos los datos que tenemos guardados en la base de datos */
    const calcularValorTotal = (precio, descuento) => precio - (precio * (descuento / 100));
    const calcularUnidadesFaltantes = (actual, minima) => actual < minima ? minima - actual : 0;
    const calcularDescuento = (precio, descuento) => precio * (descuento / 100);

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

    if (cargando) return <div className={styles.loader}>Cargando inventario desde el servidor...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    /* Aqui empieza el contenido de Invetario.jsx */
    return (
        <div className={styles.inventarioContenedor}>
            <header>
                <h1 className={styles.titulo}>REPORTE GENERAL DE INVENTARIO</h1>
                <p className={styles.subtitulo}>Sistema de control y gestión en tiempo real</p>
            </header>

            {inventario.length === 0 ? (
                <p className={styles.vacio}>No hay productos registrados en el inventario.</p>
            ) : (
                <div className={styles.grid}>
                    {inventario.map((item) => {
                        const valorTotal = calcularValorTotal(item.precio, item.descuento);
                        const faltantes = calcularUnidadesFaltantes(item.stock, item.cantidadMinima);
                        const descuentoCalculado = calcularDescuento(item.precio, item.descuento);
                        const requiereAlerta = item.stock < item.cantidadMinima;
                        
                        /* Generacion automatica de tarjetas que nos muestran los datos que guardamos en la BD */
                        return (
                            <div 
                                key={item.id} 
                                className={styles.tarjeta}
                                style={{ borderLeft: `6px solid ${requiereAlerta ? "#e74c3c" : "#00AFA3"}` }}
                            >
                                <div className={styles.cardHeader}>
                                    <h2 className={styles.productTitle}>{item.nombre}</h2>
                                    <span className={styles.badge}>ID: {item.id}</span>
                                </div>

                                <div className={styles.infoGrid}>
                                    <div className={styles.infoItem}>
                                        <label>Precio Unitario:</label>
                                        <span className={styles.value}>${item.precio.toLocaleString()}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <label>Stock Actual:</label>
                                        <span className={styles.value} style={{ color: requiereAlerta ? "#e74c3c" : "#2c3e50", fontWeight: "bold" }}>
                                            {item.stock} un.
                                        </span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <label>Cantidad Mínima:</label>
                                        <span className={styles.value}>{item.cantidadMinima} un.</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <label>Descuento ({item.descuento}%):</label>
                                        <span className={styles.valueDiscount}>-${descuentoCalculado.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className={styles.divider}></div>

                                <div className={styles.footerInfo}>
                                    <div className={styles.totalRow}>
                                        <span>Valor a pagar:</span>
                                        <span className={styles.totalPrice}>${valorTotal.toLocaleString()}</span>
                                    </div>
                                    {faltantes > 0 && (
                                        <div className={styles.faltantesRow}>
                                            <span>Unidades Faltantes:</span>
                                            <span className={styles.faltantesBadge}>{faltantes}</span>
                                        </div>
                                    )}
                                </div>

                                <button onClick={() => VerificarAlerta(item.id)}>
                                    Verificar Estado
                                </button>

                                {item.mensajeAlerta && (
                                    <p className={styles.alertaText} style={{ color: requiereAlerta ? "#c0392b" : "#16a085" }}>
                                        {item.mensajeAlerta}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
            
            <br />

            {/* Footer */}
            <footer className="text-center text-lg-start mt-auto" style={{ backgroundColor: '#E8EEF2', color: '#526174', marginTop: '40px', padding: '20px', borderRadius: '8px' }}>
                <div className="container p-4">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 mb-4 mb-md-0 text-start">
                            <h5 className="pt-serif-bold" style={{ color: '#172033' }}>StockMaster</h5>
                            <p className="ibm-plex-serif-regular">
                                Optimizando procesos internos y mejorando la organización del almacén para la toma de decisiones estratégicas.
                            </p>
                        </div>
                        <div className="col-lg-6 col-md-12 mb-4 mb-md-0 text-lg-end d-flex align-items-center justify-content-lg-end justify-content-center">
                            <ul className="list-unstyled mb-0 d-flex gap-4">
                                <li><i className="fa-solid fa-shirt fs-4" style={{ color: '#00AFA3' }}></i></li>
                                <li><i className="fa-solid fa-boxes-packing fs-4" style={{ color: '#00AFA3' }}></i></li>
                                <li><i className="fa-solid fa-cart-flatbed fs-4" style={{ color: '#00AFA3' }}></i></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="text-center p-3 ibm-plex-serif-regular" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    © 2026 Creado por: Kevin, Jhoanna y Jhoan
                </div>
            </footer>
        </div>
    );
}

export default Inventario;