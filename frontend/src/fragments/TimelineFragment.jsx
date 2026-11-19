import { Box, Typography } from "@mui/material";
import { WIDGET_CONFIG } from "../config/widgets";
import Timeline from "../timeline/Timeline";
import TimelineData from "../timeline/TimelineData";
import FragmentSubtitle from "./FragmentSubtitle";

function TimelineFragment({ fragment, entity, record }) {
  return (
    <Box>
      {fragment.subtitle && (
        <FragmentSubtitle>{fragment.subtitle}</FragmentSubtitle>
      )}
      <Box sx={{ mt: fragment.subtitle ? 1 : 0 }}>
        <TimelineData fragment={fragment} entity={entity} record={record}>
          {(timeline) =>
            timeline === null ? (
              <Typography variant={WIDGET_CONFIG.textVariant}>—</Typography>
            ) : (
              <Timeline timeline={timeline} />
            )
          }
        </TimelineData>
      </Box>
    </Box>
  );
}

export default TimelineFragment;