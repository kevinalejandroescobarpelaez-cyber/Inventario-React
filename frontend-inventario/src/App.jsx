import { useState } from "react"
import Layout from "./components/Layout.jsx"
import HomePage from "./Paginas/HomePage.jsx"
import Inventario from "./Paginas/Inventario.jsx"
import Registro from "./Paginas/Registro.jsx"
import NoEncontrada from "./Paginas/NoEncontrada.jsx"
import "./App.css"

// Para agregar una pestaña: crear el archivo en Paginas/ y agregar UNA línea aquí.
const paginas = {
  home: { titulo: "Home Page", componente: HomePage },
  inventario: { titulo: "Inventario", componente: Inventario },
  registro: { titulo: "Registro", componente: Registro },
}

function App() {
  const [actual, setActual] = useState("home")
  const Pagina = paginas[actual]?.componente ?? NoEncontrada

  return (
    <Layout paginas={paginas} actual={actual} cambiar={setActual}>
      <Pagina />
    </Layout>
  )
}

export default App
