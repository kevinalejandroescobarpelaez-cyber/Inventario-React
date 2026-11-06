import React from 'react';
import logo from '../assets/logo.jpg';
import inventarioImg from '../assets/inventario.jpg';
import optimizarImg from '../assets/optimizar.jpg';
import '../App.css';

export default function HomePage() {
  return (
    <div className="container-fluid p-0 d-flex flex-column min-vh-100" style={{ backgroundColor: '#F5FAFA' }}>
      
      {/* Contenido Principal (Arriba) */}
      <main className="container text-center mt-5 mb-5 flex-grow-1">
        <h1 className="pt-serif-bold" style={{ color: '#172033' }}>
          Bienvenido a StockMaster
        </h1>
        <p className="ibm-plex-serif-regular mx-auto" style={{ color: '#526174', maxWidth: '600px' }}>
          Sistema de control de inventario especializado para artículos deportivos. 
          Gestión confiable, precisa y controlada de sus productos.
        </p>

        {/* Imagen Logo Principal */}
        <div className="my-5 d-flex justify-content-center">
          <img 
            src={logo} 
            alt="Logo StockMaster" 
            className="imagen img-fluid" 
            style={{ maxWidth: '350px' }} 
          />
        </div>

        {/* Botón de acción con Scroll hacia la nueva sección */}
        <button 
          className="btn px-4 py-2 mt-3" 
          style={{ backgroundColor: '#00AFA3', color: '#F5FAFA', fontWeight: '700' }}
          onClick={() => document.getElementById('gestion-inventario').scrollIntoView({ behavior: 'smooth' })}
        >
          <i className="fa-solid fa-warehouse me-2"></i>
          Cómo Gestionar Inventario
        </button>
      </main>

      {/* NUEVA SECCIÓN: ¿QUÉ ES Y CÓMO SE GESTIONA EL INVENTARIO? */}
      <section id="gestion-inventario" className="container-fluid py-5" style={{ backgroundColor: '#F5FAFA' }}>
        <div className="container">
          <div className="row text-center mb-4">
            <h2 className="pt-serif-bold" style={{ color: '#172033', fontSize: '32px' }}>
              Fundamentos de Gestión
            </h2>
            <p className="ibm-plex-serif-regular mx-auto" style={{ color: '#526174', maxWidth: '700px', fontSize: '20px' }}>
              Descubre por qué el control de tus artículos deportivos es la clave para el éxito operativo.
            </p>
          </div>
          
          <div className="row g-4 mt-2">
            {/* Tarjeta 1: Qué es un inventario */}
            <div className="col-md-4">
              <div className="tarjeta-producto h-100 text-center d-flex flex-column align-items-center m-0">
                <i className="fa-solid fa-boxes-packing mb-3" style={{ fontSize: '40px', color: '#00AFA3' }}></i>
                <h3 className="pt-serif-bold" style={{ color: '#172033', fontSize: '22px' }}>¿Qué es un inventario?</h3>
                <p className="ibm-plex-serif-regular mt-2 mb-0" style={{ color: '#526174', fontSize: '16px' }}>
                  Es el registro detallado y físico de todas las existencias y artículos deportivos que la empresa mantiene en bodega o almacén para su venta o distribución.
                </p>
              </div>
            </div>

            {/* Tarjeta 2: Importancia de gestionarlo */}
            <div className="col-md-4">
              <div className="tarjeta-producto h-100 text-center d-flex flex-column align-items-center m-0">
                <i className="fa-solid fa-check mb-3" style={{ fontSize: '40px', color: '#00AFA3' }}></i>
                <h3 className="pt-serif-bold" style={{ color: '#172033', fontSize: '22px' }}>¿Por qué es importante?</h3>
                <p className="ibm-plex-serif-regular mt-2 mb-0" style={{ color: '#526174', fontSize: '16px' }}>
                  Permite mantener el inventario en niveles óptimos, reduciendo costos de almacenamiento y evitando tanto el exceso de mercancía como el desabastecimiento.
                </p>
              </div>
            </div>

            {/* Tarjeta 3: Cómo gestionarlo en StockMaster */}
            <div className="col-md-4">
              <div className="tarjeta-producto h-100 text-center d-flex flex-column align-items-center m-0">
                <i className="fa-solid fa-warehouse mb-3" style={{ fontSize: '40px', color: '#00AFA3' }}></i>
                <h3 className="pt-serif-bold" style={{ color: '#172033', fontSize: '22px' }}>Gestión en StockMaster</h3>
                <p className="ibm-plex-serif-regular mt-2 mb-0" style={{ color: '#526174', fontSize: '16px' }}>
                  Nuestro sistema centraliza tu almacén. Podrás registrar nuevos productos, actualizar cantidades y monitorear tu stock actual de forma ágil y precisa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE INVENTARIO (Fondo Turquesa Profundo) */}
      <section className="container-fluid py-5 mt-4" style={{ backgroundColor: '#00AFA3' }}>
        <div className="container">
          <div className="row align-items-center">
            
            <div className="col-md-6 mb-4 mb-md-0 d-flex justify-content-center">
              <img 
                src={inventarioImg} 
                alt="Gestión de Inventario" 
                className="imagen img-fluid" 
                style={{ maxWidth: '100%' }} 
              />
            </div>

            <div className="col-md-6 text-start" style={{ color: '#F5FAFA' }}>
              <span className="ibm-plex-serif-regular d-block mb-2" style={{ fontSize: '18px' }}>
                Inventario
              </span>
              <h2 className="pt-serif-bold mb-4" style={{ color: '#F5FAFA', fontSize: '32px' }}>
                Reducir excesos y faltantes en inventario eficazmente
              </h2>
              <p className="ibm-plex-serif-regular" style={{ color: '#F5FAFA', fontSize: '20px' }}>
                Nuestro sistema te ofrece un control avanzado sobre tu inventario con funciones de seguimiento en tiempo real y predicciones precisas de demanda. Optimiza tu stock para evitar excesos y faltantes, asegurando que siempre tengas el inventario necesario para cumplir con tus objetivos operativos y comerciales.
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECCIÓN DE OPTIMIZACIÓN (Fondo Blanco Hielo) */}
      <section className="container-fluid py-5" style={{ backgroundColor: '#F5FAFA' }}>
        <div className="container">
          <div className="row align-items-center">
            
            <div className="col-md-6 text-start mb-4 mb-md-0">
              <span className="ibm-plex-serif-regular d-block mb-2" style={{ color: '#526174', fontSize: '18px' }}>
                Producción
              </span>
              <h2 className="pt-serif-bold mb-4" style={{ color: '#172033', fontSize: '32px' }}>
                Optimizar tiempos y recursos en producción
              </h2>
              <p className="ibm-plex-serif-regular" style={{ color: '#526174', fontSize: '20px' }}>
                Maximiza la eficiencia de tus operaciones de producción con nuestro Software. Nuestra solución se integra perfectamente para planificar y coordinar los recursos necesarios, optimizando cada etapa del proceso productivo. Con nuestro sistema, maximiza la productividad al reducir tiempos de inactividad y optimizar el uso de cada recurso, lo que te permitirá disminuir costos significativamente.
              </p>
            </div>

            <div className="col-md-6 d-flex justify-content-center">
              <img 
                src={optimizarImg} 
                alt="Optimización de recursos" 
                className="imagen img-fluid" 
                style={{ maxWidth: '100%' }} 
              />
            </div>
            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-lg-start mt-auto" style={{ backgroundColor: '#E8EEF2', color: '#526174' }}>
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
                <li>
                  <i className="fa-solid fa-shirt fs-4" style={{ color: '#00AFA3' }}></i>
                </li>
                <li>
                  <i className="fa-solid fa-boxes-packing fs-4" style={{ color: '#00AFA3' }}></i>
                </li>
                <li>
                  <i className="fa-solid fa-cart-flatbed fs-4" style={{ color: '#00AFA3' }}></i>
                </li>
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
