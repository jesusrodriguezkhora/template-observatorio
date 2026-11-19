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

function getLabelShift(position) {
  if (position < CONFIG.today.edge) {
    return "0%";
  }
  if (position > 1 - CONFIG.today.edge) {
    return "-100%";
  }
  return "-50%";
}

function TodayLabel({ position }) {
  return (
    <Box sx={{ gridColumn: 2, gridRow: 1, position: "relative", height: 20 }}>
      <Typography
        variant={CONFIG.axisVariant}
        sx={{
          position: "absolute",
          left: toPercent(position),
          transform: `translateX(${getLabelShift(position)})`,
          fontWeight: 600,
          color: CONFIG.today.color,
          whiteSpace: "nowrap",
        }}
      >
        {CONFIG.today.label}
      </Typography>
    </Box>
  );
}

function YearAxis({ years, gridRow }) {
  return (
    <Box sx={{ gridColumn: 2, gridRow, position: "relative", height: 24 }}>
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

function PlotBackground({ firstRow, rowCount }) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        gridColumn: 2,
        gridRow: `${firstRow} / span ${rowCount}`,
        bgcolor: CONFIG.background,
        borderRadius: CONFIG.backgroundRadius,
      }}
    />
  );
}

function TodayLine({ position, firstRow, rowCount }) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        gridColumn: 2,
        gridRow: `${firstRow} / span ${rowCount}`,
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

function TimelineBar({ row, gridRow }) {
  return (
    <Box
      sx={{
        gridColumn: 2,
        gridRow,
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
  const showToday = todayPosition !== null;
  const axisRow = showToday ? 2 : 1;
  const firstRow = axisRow + 1;

  return (
    <Box sx={{ overflowX: "auto" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `${CONFIG.labelColumn} minmax(0, 1fr)`,
          gridTemplateRows: `repeat(${axisRow}, auto)`,
          gridAutoRows: `minmax(${CONFIG.rowHeight}px, auto)`,
          columnGap: CONFIG.columnGap,
          minWidth: CONFIG.minWidth,
        }}
      >
        {showToday && <TodayLabel position={todayPosition} />}
        <YearAxis years={years} gridRow={axisRow} />
        <PlotBackground firstRow={firstRow} rowCount={rows.length} />
        {rows.map((row, index) => (
          <Typography
            key={`label-${row.key}`}
            variant={CONFIG.labelVariant}
            sx={{
              gridColumn: 1,
              gridRow: firstRow + index,
              alignSelf: "center",
              py: 0.5,
            }}
          >
            {row.label}
          </Typography>
        ))}
        {rows.map((row, index) => (
          <TimelineBar
            key={`bar-${row.key}`}
            row={row}
            gridRow={firstRow + index}
          />
        ))}
        {showToday && (
          <TodayLine
            position={todayPosition}
            firstRow={axisRow}
            rowCount={rows.length + 1}
          />
        )}
      </Box>
    </Box>
  );
}

export default Timeline;