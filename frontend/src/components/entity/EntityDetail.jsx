import { IconButton, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink, useParams } from "react-router";
import { getEntity } from "../../entities/registry";
import { getParentPath } from "../../entities/paths";
import { loadDetailData } from "../../entities/queries";
import { useAsyncData } from "../../hooks/useAsyncData";
import { getTabValueDefs } from "../../tabs";
import PageHeader from "../PageHeader";
import AsyncState from "../AsyncState";
import EntityTabs from "./EntityTabs";
import EntityPipeline from "./EntityPipeline";

function getBackLabel(entity) {
  if (entity.parent) {
    return `Volver a ${getEntity(entity.parent.entity).labels.singular.toLowerCase()}`;
  }
  return `Volver a ${entity.labels.plural.toLowerCase()}`;
}

function EntityDetail({ entityKey }) {
  const entity = getEntity(entityKey);
  const { id } = useParams();
  const backLabel = getBackLabel(entity);

  const { data, loading, error } = useAsyncData(`detail/${entityKey}/${id}`, () =>
    loadDetailData(entityKey, id, getTabValueDefs(entity)),
  );

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
              <Tooltip title={backLabel}>
                <IconButton
                  component={RouterLink}
                  to={getParentPath(entity, data.record)}
                  aria-label={backLabel}
                  edge="start"
                >
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