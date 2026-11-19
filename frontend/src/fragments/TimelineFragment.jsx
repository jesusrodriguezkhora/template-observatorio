import { Box, Typography } from "@mui/material";
import { WIDGET_CONFIG } from "../config/widgets";
import { TIMELINE_CONFIG } from "../config/timeline";
import Timeline from "../timeline/Timeline";
import TimelineData from "../timeline/TimelineData";
import { getToday } from "../timeline/timeline";
import FragmentSubtitle from "./FragmentSubtitle";

function TimelineFragment({ fragment, entity, record }) {
  const today = fragment.showToday ? getToday() : null;
  return (
    <Box>
      {fragment.subtitle && (
        <FragmentSubtitle>{fragment.subtitle}</FragmentSubtitle>
      )}
      <Box sx={{ mt: fragment.subtitle ? TIMELINE_CONFIG.subtitleGap : 0 }}>
        <TimelineData fragment={fragment} entity={entity} record={record}>
          {(timeline) =>
            timeline === null ? (
              <Typography variant={WIDGET_CONFIG.textVariant}>—</Typography>
            ) : (
              <Timeline timeline={timeline} today={today} />
            )
          }
        </TimelineData>
      </Box>
    </Box>
  );
}

export default TimelineFragment;