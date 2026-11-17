import { IconButton, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate, useParams } from "react-router";
import { getEntity } from "../../entities/registry";
import { getFallbackPath } from "../../entities/paths";
import { loadDetailData } from "../../entities/queries";
import { useAsyncData } from "../../hooks/useAsyncData";
import { getTabValueDefs } from "../../tabs";
import PageHeader from "../PageHeader";
import AsyncState from "../AsyncState";
import EntityTabs from "./EntityTabs";
import EntityPipeline from "./EntityPipeline";

function EntityDetail({ entityKey }) {
  const entity = getEntity(entityKey);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { data, loading, error } = useAsyncData(`detail/${entityKey}/${id}`, () =>
    loadDetailData(entityKey, id, getTabValueDefs(entity.detail.tabs)),
  );

  function handleBack() {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate(getFallbackPath(entity, data?.record));
    }
  }

  return (
    <AsyncState
      loading={loading}
      error={error}
      notFoundMessage={`No se ha encontrado el registro solicitado (${entity.labels.singular} ${id}).`}
    >
      {() => (
        <>
          <EntityPipeline trail={data.trail} />
          <PageHeader
            uppercase={false}
            title={data.record[entity.displayField]}
            leading={
              <Tooltip title="Volver">
                <IconButton onClick={handleBack} aria-label="Volver" edge="start">
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
            }
          />
          <EntityTabs entity={entity} record={data.record} lookups={data.lookups} />
        </>
      )}
    </AsyncState>
  );
}

export default EntityDetail;