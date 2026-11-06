import React from 'react';
import logo from '../assets/logo.jpg';

export default function Layout({ paginas, actual, cambiar, children }) {
  return (
    <>
      <nav 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '1rem 2rem',
          backgroundColor: '#00AFa3', // Verde esmeralda corporativo
          color: '#F5FAFA', // Blanco hielo
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}
      >
        {/* Contenedor de Botones (Izquierda) */}
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {Object.entries(paginas).map(([id, pagina]) => (
          <button
            key={id}
            onClick={() => cambiar(id)}
            style={{ fontWeight: id === actual ? 'bold' : 'normal' }}
          >
            {pagina.titulo}
          </button>
          ))}
        </div>

        {/* Contenedor del Logo y Título (Derecha) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span 
            style={{ 
              fontFamily: '"PT Serif", serif', 
              fontWeight: '700', 
              fontSize: '22px' 
            }}
          >
            StockMaster
          </span>
          <img 
            src={logo} 
            alt="Logo StockMaster" 
            style={{ 
              height: '40px', 
              width: 'auto',
              borderRadius: '4px' // Opcional, para suavizar los bordes
            }} 
          />
        </div>
      </nav>

      {/* Contenido Principal */}
      <main style={{ backgroundColor: '#F5FAFA', minHeight: 'calc(100vh - 72px)' }}>
        {children}
      </main>
    </>
  );
}
