import React from 'react';
import logo from '../assets/logo.jpg';
import './Layout.css';

export default function Layout({ paginas, actual, cambiar, children }) {
  return (
    <>
      <nav className="layout-nav">
        {/* Contenedor de Botones (Izquierda) */}
        <div className="layout-pages">
          {Object.entries(paginas).map(([id, pagina]) => (
          <button
            key={id}
            onClick={() => cambiar(id)}
            className={id === actual ? 'layout-page layout-page-active' : 'layout-page'}
          >
            {pagina.titulo}
          </button>
          ))}
        </div>

        {/* Contenedor del Logo y Título (Derecha) */}
        <div className="layout-brand">
          <span className="layout-brand-title">
            StockMaster
          </span>
          <img src={logo} alt="Logo StockMaster" className="layout-logo" />
        </div>
      </nav>

      {/* Contenido Principal */}
      <main style={{ backgroundColor: '#F5FAFA', minHeight: 'calc(100vh - 72px)' }}>
        {children}
      </main>
    </>
  );
}
