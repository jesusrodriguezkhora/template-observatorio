import { Typography } from "@mui/material";
import { getColumnType } from "../columns";
import { getEntity } from "../entities/registry";
import { loadRelatedData } from "../entities/queries";
import { useAsyncData } from "../hooks/useAsyncData";
import AsyncState from "../components/AsyncState";
import EntityTable from "../components/entity/EntityTable";

function RelatedTab({ tab, entity, record }) {
  const target = getEntity(tab.entity);

  const { data, loading, error } = useAsyncData(
    `related/${entity.key}/${record.id}/${target.key}`,
    () => loadRelatedData(entity.key, record.id, target.key),
  );

  const hiddenFields = target.columns
    .filter((column) => getColumnType(column.type).lookupSource?.(column) === entity.key)
    .map((column) => column.field);

  return (
    <AsyncState loading={loading} error={error}>
      {() =>
        data.rows.length === 0 ? (
          <Typography sx={{ color: "text.secondary" }}>
            Todavía no hay {target.labels.plural.toLowerCase()}.
          </Typography>
        ) : (
          <EntityTable
            entity={target}
            rows={data.rows}
            lookups={data.lookups}
            hiddenFields={hiddenFields}
          />
        )
      }
    </AsyncState>
  );
}

export default RelatedTab;