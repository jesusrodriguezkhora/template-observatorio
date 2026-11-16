import { Routes, Route, Navigate } from "react-router";
import { MUNICIPALITY } from "./config/municipality";
import ColorModeToggle from "./components/ColorModeToggle";
import RequireRole from "./auth/RequireRole";
import { useAuth } from "./auth/AuthContext";
import { ROLES } from "./config/roles";

function App() {
  const { role } = useAuth();
  return (
    <>
      <title>{`${MUNICIPALITY.shortName}`}</title>
      <ColorModeToggle />
      <p>Rol actual: {role}</p>
      <RequireRole roles={[ROLES.ADMINISTRACION]} fallback={<p>Bloque oculto para tu rol</p>}>
        <p>Bloque solo para administración</p>
      </RequireRole>
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