import { Stack } from "@mui/material";
import { WIDGET_CONFIG } from "../config/widgets";
import WidgetGrid from "../widgets/WidgetGrid";

function GridTab({ tab, entity, record, lookups }) {
  return (
    <Stack spacing={WIDGET_CONFIG.grid.gridGap}>
      {tab.grids.map((grid, index) => (
        <WidgetGrid
          key={`grid-${index}`}
          grid={grid}
          catalog={entity.widgets}
          entity={entity}
          record={record}
          lookups={lookups}
        />
      ))}
    </Stack>
  );
}

export default GridTab;