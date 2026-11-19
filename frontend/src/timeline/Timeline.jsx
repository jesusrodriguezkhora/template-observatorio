import { Box, Tooltip, Typography } from "@mui/material";
import { TIMELINE_CONFIG } from "../config/timeline";
import { formatDate } from "../columns/formatters";
import { MAX_SERIES } from "../charts/colors";

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

function Timeline({ timeline }) {
  const { years, rows } = timeline;

  return (
    <Box sx={{ overflowX: "auto" }}>
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
      </Box>
    </Box>
  );
}

export default Timeline;