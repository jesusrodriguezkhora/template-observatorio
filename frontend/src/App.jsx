import { Routes, Route, Navigate } from "react-router";
import { MUNICIPALITY } from "./config/municipality";
import ColorModeToggle from "./components/ColorModeToggle";

function App() {
  return (
    <>
      <title>{`${MUNICIPALITY.shortName}`}</title>
      <ColorModeToggle />
      <Routes>
        <Route path="/" element={<Navigate to="/proyectos" replace />} />
        <Route path="/proyectos" element={<h1>Proyectos</h1>} />
        <Route path="/actuaciones" element={<h1>Actuaciones</h1>} />
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </>
  );
}

export default App;