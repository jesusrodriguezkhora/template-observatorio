import { Box, Tooltip, Typography } from "@mui/material";
import { TIMELINE_CONFIG } from "../config/timeline";
import { formatDate } from "../columns/formatters";
import { MAX_SERIES } from "../charts/colors";
import { getTimePosition } from "./timeline";

const CONFIG = TIMELINE_CONFIG;

function toPercent(fraction) {
  return `${fraction * 100}%`;
}

function getRowColor(row) {
  return `chart.series${(row.slot % MAX_SERIES) + 1}`;
}

function getTooltip(row) {
  return `${row.label}: ${formatDate(row.start)} – ${formatDate(row.end)}`;
}

function YearAxis({ years }) {
  return (
    <Box sx={{ gridColumn: 2, gridRow: 1, position: "relative", height: 24 }}>
      {years.map(({ year, left }) => (
        <Typography
          key={year}
          variant={CONFIG.axisVariant}
          sx={{
            position: "absolute",
            left: toPercent(left),
            pl: 0.5,
            fontWeight: 600,
            color: "text.secondary",
          }}
        >
          {year}
        </Typography>
      ))}
    </Box>
  );
}

function YearBands({ years, rowCount }) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        gridColumn: 2,
        gridRow: `2 / span ${rowCount}`,
        position: "relative",
      }}
    >
      {years.map(({ year, left, width }, index) =>
        index % 2 === 0 ? (
          <Box
            key={year}
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: toPercent(left),
              width: toPercent(width),
              bgcolor: CONFIG.yearBand,
            }}
          />
        ) : null,
      )}
    </Box>
  );
}

function TodayLine({ position, rowCount }) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        gridColumn: 2,
        gridRow: `2 / span ${rowCount}`,
        position: "relative",
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: toPercent(position),
          width: CONFIG.today.width,
          transform: "translateX(-50%)",
          bgcolor: CONFIG.today.color,
        }}
      />
    </Box>
  );
}

function TodayLegend() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 0.75,
        mb: 0.5,
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          width: CONFIG.today.width,
          height: 14,
          bgcolor: CONFIG.today.color,
        }}
      />
      <Typography variant={CONFIG.axisVariant} sx={{ color: "text.secondary" }}>
        {CONFIG.today.label}
      </Typography>
    </Box>
  );
}

function TimelineBar({ row, index }) {
  return (
    <Box
      sx={{
        gridColumn: 2,
        gridRow: index + 2,
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      {row.left === null ? (
        <Typography variant="caption" sx={{ pl: 1, color: "text.secondary" }}>
          {CONFIG.noDatesLabel}
        </Typography>
      ) : (
        <Tooltip title={getTooltip(row)}>
          <Box
            sx={{
              position: "absolute",
              left: toPercent(row.left),
              width: toPercent(row.width),
              minWidth: CONFIG.barMinWidth,
              height: CONFIG.barHeight,
              borderRadius: `${CONFIG.barRadius}px`,
              bgcolor: getRowColor(row),
            }}
          />
        </Tooltip>
      )}
    </Box>
  );
}

function Timeline({ timeline, today = null }) {
  const { years, rows } = timeline;
  const todayPosition = getTimePosition(timeline, today);

  return (
    <Box sx={{ overflowX: "auto" }}>
      {todayPosition !== null && <TodayLegend />}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `${CONFIG.labelColumn} minmax(0, 1fr)`,
          gridAutoRows: `minmax(${CONFIG.rowHeight}px, auto)`,
          columnGap: CONFIG.columnGap,
          minWidth: CONFIG.minWidth,
        }}
      >
        <YearAxis years={years} />
        <YearBands years={years} rowCount={rows.length} />
        {rows.map((row, index) => (
          <Typography
            key={`label-${row.key}`}
            variant={CONFIG.labelVariant}
            sx={{
              gridColumn: 1,
              gridRow: index + 2,
              alignSelf: "center",
              py: 0.5,
            }}
          >
            {row.label}
          </Typography>
        ))}
        {rows.map((row, index) => (
          <TimelineBar key={`bar-${row.key}`} row={row} index={index} />
        ))}
        {todayPosition !== null && (
          <TodayLine position={todayPosition} rowCount={rows.length} />
        )}
      </Box>
    </Box>
  );
}

export default Timeline;