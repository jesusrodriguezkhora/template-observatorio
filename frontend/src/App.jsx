import { Routes, Route, Navigate } from "react-router";
import { MUNICIPALITY } from "./config/municipality";
import { HOME_PATH } from "./config/navigation";
import { getAllEntities } from "./entities/registry";
import AppLayout from "./layout/AppLayout";
import EntityBrowser from "./components/entity/EntityBrowser";

const browsableEntities = getAllEntities().filter((entity) => entity.browser);

function App() {
  return (
    <>
      <title>{`${MUNICIPALITY.observatoryTitle} · ${MUNICIPALITY.shortName}`}</title>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to={HOME_PATH} replace />} />
          {browsableEntities.map((entity) => (
            <Route
              key={entity.key}
              path={entity.key}
              element={<EntityBrowser key={entity.key} entityKey={entity.key} />}
            />
          ))}
          <Route path="*" element={<h1>Página no encontrada</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;