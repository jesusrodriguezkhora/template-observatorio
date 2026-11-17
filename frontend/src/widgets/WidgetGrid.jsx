import { Box } from "@mui/material";
import { useAuth } from "../auth/AuthContext";
import { WIDGET_CONFIG } from "../config/widgets";
import Widget from "./Widget";
import { getWidget, isWidgetVisible } from "./visibility";

const { columnGap, widgetGap, stackBelow, equalHeight } = WIDGET_CONFIG.grid;

function WidgetGrid({ grid, catalog, entity, record, lookups }) {
  const { canAccess } = useAuth();

  const columns = grid.columns
    .map((column, index) => ({
      key: `column-${index}`,
      size: column.size ?? 1,
      widgetKeys: column.widgets.filter((widgetKey) =>
        isWidgetVisible(getWidget(catalog, widgetKey), record, canAccess),
      ),
    }))
    .filter((column) => column.widgetKeys.length > 0);

  if (columns.length === 0) {
    return null;
  }

  const template = columns.map((column) => `minmax(0, ${column.size}fr)`).join(" ");
  const stretch = grid.equalHeight ?? equalHeight;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "minmax(0, 1fr)", [stackBelow]: template },
        gap: columnGap,
        alignItems: stretch ? "stretch" : "start",
      }}
    >
      {columns.map((column) => (
        <Box
          key={column.key}
          sx={{ display: "flex", flexDirection: "column", gap: widgetGap, minWidth: 0 }}
        >
          {column.widgetKeys.map((widgetKey, index) => (
            <Widget
              key={widgetKey}
              widget={getWidget(catalog, widgetKey)}
              entity={entity}
              record={record}
              lookups={lookups}
              grow={stretch && index === column.widgetKeys.length - 1}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default WidgetGrid;