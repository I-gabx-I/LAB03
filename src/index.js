import React, { StrictMode } from "react"; // Importa React y StrictMode para detectar problemas en la app
import { createRoot } from "react-dom/client"; // Importa el nuevo método para renderizar en React 18+
import "./styles.css"; // Importa los estilos CSS

import App from "./App"; // Importa el componente principal de la aplicación

const root = createRoot(document.getElementById("root")); // Crea el punto de entrada al DOM
root.render(
  <StrictMode>
    <App /> {/* Renderiza el componente App dentro del modo estricto */}
  </StrictMode>
);
