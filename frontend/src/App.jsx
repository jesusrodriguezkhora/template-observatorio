import { Routes, Route, Navigate } from "react-router";
import { MUNICIPALITY } from "./config/municipality";
import { HOME_PATH } from "./config/navigation";
import AppLayout from "./layout/AppLayout";

function App() {
  return (
    <>
      <title>{`${MUNICIPALITY.observatoryTitle} · ${MUNICIPALITY.shortName}`}</title>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to={HOME_PATH} replace />} />
          <Route path="proyectos" element={<h1>Proyectos</h1>} />
          <Route path="actuaciones" element={<h1>Actuaciones</h1>} />
          <Route path="*" element={<h1>Página no encontrada</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;