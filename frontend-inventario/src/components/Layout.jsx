export default function Layout({ paginas, actual, cambiar, children }) {
  return (
    <>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
        {Object.entries(paginas).map(([id, pagina]) => (
          <button
            key={id}
            onClick={() => cambiar(id)}
            style={{ fontWeight: id === actual ? 'bold' : 'normal' }}
          >
            {pagina.titulo}
          </button>
        ))}
      </nav>
      <main>{children}</main>
    </>
  )
}
