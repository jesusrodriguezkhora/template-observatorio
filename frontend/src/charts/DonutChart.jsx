import { Box, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CHART_CONFIG } from "../config/charts";
import { formatPercent } from "../columns/formatters";
import { formatValue } from "../columns";
import { toNumber } from "./distribution";
import { resolveThemeColor } from "../theme/resolveThemeColor";
import ChartLegend from "./ChartLegend";
import DistributionFrame from "./DistributionFrame";
import { getItemColor } from "./colors";

const DONUT = CHART_CONFIG.donut;
const RADIUS = (DONUT.size - DONUT.thickness) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function buildArcs(items) {
  const visible = items.filter((item) => item.share > 0);
  const gap = visible.length > 1 ? CHART_CONFIG.segmentGap : 0;
  let offset = 0;

  return visible.map((item) => {
    const length = item.share * CIRCUMFERENCE;
    const arc = {
      item,
      dash: Math.max(length - gap, 1),
      offset,
    };
    offset += length;
    return arc;
  });
}

function getTooltip(item, chart) {
  const value = formatValue(item.value, chart.valueType, chart);
  const percent = formatPercent(item.share, { fraction: true, decimals: 1 });
  return `${item.label}: ${value} (${percent})`;
}

function getCenter(chart, record, distribution) {
  if (chart.center) {
    const value = toNumber(record[chart.center.field]);
    return {
      value:
        value === null
          ? "—"
          : formatValue(
              value,
              chart.center.valueType ?? chart.valueType,
              chart.center,
            ),
      caption: chart.center.caption,
    };
  }
  return {
    value: formatValue(distribution.total, chart.valueType, {
      ...chart,
      compact: true,
    }),
    caption: chart.centerCaption,
  };
}

function Ring({ chart, items }) {
  const theme = useTheme();
  const center = DONUT.size / 2;

  return (
    <svg
      width={DONUT.size}
      height={DONUT.size}
      viewBox={`0 0 ${DONUT.size} ${DONUT.size}`}
      aria-hidden="true"
      style={{ display: "block", transform: "rotate(-90deg)" }}
    >
      {buildArcs(items).map(({ item, dash, offset }) => (
        <Tooltip key={item.key} title={getTooltip(item, chart)}>
          <circle
            cx={center}
            cy={center}
            r={RADIUS}
            fill="none"
            stroke={resolveThemeColor(theme, getItemColor(item))}
            strokeWidth={DONUT.thickness}
            strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
            strokeDashoffset={-offset}
          />
        </Tooltip>
      ))}
    </svg>
  );
}

function DonutChart({ chart, entity, record }) {
  return (
    <DistributionFrame chart={chart} entity={entity} record={record}>
      {(distribution) => {
        const center = getCenter(chart, record, distribution);
        return (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Box
              sx={{
                position: "relative",
                flexShrink: 0,
                width: DONUT.size,
                height: DONUT.size,
              }}
            >
              <Ring chart={chart} items={distribution.items} />
              <Box
                sx={{
                  position: "absolute",
                  inset: DONUT.thickness,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Typography
                  component="p"
                  variant={DONUT.centerVariant}
                  sx={{ fontWeight: 600, lineHeight: 1.1 }}
                >
                  {center.value}
                </Typography>
                {center.caption && (
                  <Typography
                    component="p"
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    {center.caption}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box sx={{ flex: "1 1 200px", minWidth: 0 }}>
              <ChartLegend chart={chart} items={distribution.items} />
            </Box>
          </Box>
        );
      }}
    </DistributionFrame>
  );
}

export default DonutChart;