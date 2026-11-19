import { Box, Tooltip, Typography } from "@mui/material";
import { CHART_CONFIG } from "../config/charts";
import { formatPercent } from "../columns/formatters";
import { formatValue } from "../columns";
import ChartLegend from "./ChartLegend";
import DistributionFrame from "./DistributionFrame";
import { getItemColor } from "./colors";

const BAR = CHART_CONFIG.bar;

function getSegmentLabel(item, chart) {
  if (chart.showValues === "value") {
    return formatValue(item.value, chart.valueType, chart);
  }
  return formatPercent(item.share, { fraction: true, decimals: 0 });
}

function getTooltip(item, chart) {
  const value = formatValue(item.value, chart.valueType, chart);
  const percent = formatPercent(item.share, { fraction: true, decimals: 1 });
  return `${item.label}: ${value} (${percent})`;
}

function Bar({ chart, items }) {
  const visible = items.filter((item) => item.share > 0);

  return (
    <Box
      aria-hidden="true"
      sx={{
        display: "flex",
        gap: `${CHART_CONFIG.segmentGap}px`,
        height: BAR.height,
        borderRadius: BAR.radius,
        overflow: "hidden",
      }}
    >
      {visible.map((item) => (
        <Tooltip key={item.key} title={getTooltip(item, chart)}>
          <Box
            sx={{
              flexGrow: item.share,
              flexBasis: 0,
              minWidth: 2,
              bgcolor: getItemColor(item),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {chart.showValues && item.share >= BAR.labelMinShare && (
              <Typography
                component="span"
                variant="caption"
                sx={{
                  fontWeight: 600,
                  color: item.isRemainder ? "text.primary" : BAR.labelColor,
                  whiteSpace: "nowrap",
                }}
              >
                {getSegmentLabel(item, chart)}
              </Typography>
            )}
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
}

function BarChart({ chart, entity, record }) {
  return (
    <DistributionFrame chart={chart} entity={entity} record={record}>
      {(distribution) => (
        <>
          <Bar chart={chart} items={distribution.items} />
          <ChartLegend chart={chart} items={distribution.items} />
        </>
      )}
    </DistributionFrame>
  );
}

export default BarChart;