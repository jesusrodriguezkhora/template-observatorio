import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { CHART_CONFIG } from "../config/charts";
import { formatPercent } from "../columns/formatters";
import { formatValue } from "../columns";
import { buildGoalBars } from "./goal";
import { getItemColor } from "./colors";

const GOAL = CHART_CONFIG.goal;

function getTooltip(bar, chart) {
  const percent = formatPercent(bar.ratio, { fraction: true, decimals: 1 });
  return `${bar.label}: ${percent} ${chart.targetLabel ?? GOAL.targetLabel}`;
}

function GoalBar({ bar, chart }) {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 2,
          mb: 0.5,
        }}
      >
        <Typography
          variant={GOAL.labelVariant}
          sx={{ color: "text.secondary" }}
        >
          {bar.label}
        </Typography>
        <Typography
          variant={GOAL.labelVariant}
          sx={{ fontWeight: 600, whiteSpace: "nowrap" }}
        >
          {bar.value === null
            ? "—"
            : formatValue(bar.value, chart.valueType, chart)}
        </Typography>
      </Box>
      <Tooltip title={getTooltip(bar, chart)}>
        <Box
          aria-hidden="true"
          sx={{
            height: GOAL.barHeight,
            borderRadius: GOAL.barRadius,
            bgcolor: CHART_CONFIG.remainderColor,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: `${bar.fill * 100}%`,
              minWidth: bar.fill > 0 ? GOAL.barHeight : 0,
              height: "100%",
              borderRadius: GOAL.barRadius,
              bgcolor: getItemColor(bar),
            }}
          />
        </Box>
      </Tooltip>
    </Box>
  );
}

function GoalChart({ chart, record }) {
  const bars = buildGoalBars(chart, record);

  if (bars === null) {
    return <Typography>—</Typography>;
  }

  return (
    <Stack spacing={GOAL.rowGap}>
      {bars.map((bar) => (
        <GoalBar key={bar.key} bar={bar} chart={chart} />
      ))}
    </Stack>
  );
}

export default GoalChart;