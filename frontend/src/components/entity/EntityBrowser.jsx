import { InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router";
import { getEntity } from "../../entities/registry";
import { loadBrowserData } from "../../entities/queries";
import { useAsyncData } from "../../hooks/useAsyncData";
import { filterBySearch } from "../../utils/search";
import PageHeader from "../PageHeader";
import AsyncState from "../AsyncState";
import EntityTable from "./EntityTable";

function EntityBrowser({ entityKey }) {
  const entity = getEntity(entityKey);
  const plural = entity.labels.plural.toLowerCase();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const { data, loading, error } = useAsyncData(`browser/${entityKey}`, () =>
    loadBrowserData(entityKey),
  );

  function handleSearchChange(event) {
    const value = event.target.value;
    setSearchParams(value ? { q: value } : {}, { replace: true });
  }

  return (
    <>
      <PageHeader title={entity.labels.plural} />

      <TextField
        fullWidth
        size="small"
        placeholder="Buscar"
        value={query}
        onChange={handleSearchChange}
        sx={{ mb: 3 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          },
          htmlInput: { "aria-label": `Buscar ${plural}` },
        }}
      />

      <AsyncState loading={loading} error={error}>
        {() => {
          if (data.rows.length === 0) {
            return <Typography sx={{ color: "text.secondary" }}>Todavía no hay {plural}.</Typography>;
          }

          const visibleRows = filterBySearch(data.rows, entity.browser.searchFields, query);

          if (visibleRows.length === 0) {
            return (
              <Typography sx={{ color: "text.secondary" }}>
                Ningún resultado para «{query}».
              </Typography>
            );
          }

          return (
            <>
              <EntityTable entity={entity} rows={visibleRows} lookups={data.lookups} />
              <Typography
                variant="body2"
                sx={{ mt: 1.5, color: "text.secondary", textAlign: "right" }}
              >
                Mostrando {visibleRows.length} de {data.rows.length} {plural}
              </Typography>
            </>
          );
        }}
      </AsyncState>
    </>
  );
}

export default EntityBrowser;