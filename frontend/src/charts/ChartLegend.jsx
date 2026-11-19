import { Box, Typography } from "@mui/material";
import { CHART_CONFIG } from "../config/charts";
import { formatPercent } from "../columns/formatters";
import { formatValue } from "../columns";
import { COMPACT } from "../widgets/compactQuery";
import { getItemColor } from "./colors";

const { percentDecimals, swatchSize } = CHART_CONFIG.legend;

function ChartLegend({ chart, items }) {
  return (
    <Box
      component="ul"
      sx={{
        m: 0,
        p: 0,
        listStyle: "none",
        display: "grid",
        gridTemplateColumns: "auto minmax(0, 1fr) auto auto",
        columnGap: 1.5,
        rowGap: 0.75,
        alignItems: "baseline",
        [COMPACT]: { gridTemplateColumns: "auto minmax(0, 1fr)", rowGap: 0 },
      }}
    >
      {items.map((item) => (
        <Box component="li" key={item.key} sx={{ display: "contents" }}>
          <Box
            component="span"
            aria-hidden="true"
            sx={{
              width: swatchSize,
              height: swatchSize,
              borderRadius: 0.5,
              bgcolor: getItemColor(item),
              alignSelf: "center",
            }}
          />
          <Typography
            component="span"
            variant="body2"
            sx={{ overflowWrap: "anywhere" }}
          >
            {item.label}
          </Typography>
          <Box
            component="span"
            sx={{
              display: "contents",
              [COMPACT]: {
                gridColumn: "2",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                columnGap: 1.5,
                mb: 0.75,
              },
            }}
          >
            <Typography
              component="span"
              variant="body2"
              sx={{ fontWeight: 600, textAlign: "right" }}
            >
              {item.value === null
                ? "—"
                : formatValue(item.value, chart.valueType, chart)}
            </Typography>
            <Typography
              component="span"
              variant="body2"
              sx={{
                color: "text.secondary",
                textAlign: "right",
                minWidth: "3.5em",
              }}
            >
              {formatPercent(item.share, {
                fraction: true,
                decimals: percentDecimals,
              })}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default ChartLegend;