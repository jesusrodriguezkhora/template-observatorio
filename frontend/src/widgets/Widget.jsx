import { useId } from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { useAuth } from "../auth/AuthContext";
import { WIDGET_CONFIG } from "../config/widgets";
import { getFragmentType } from "../fragments";
import { getVisibleFragments } from "./visibility";

function Widget({ widget, entity, record, lookups }) {
  const { canAccess } = useAuth();
  const titleId = useId();
  const visibleFragments = getVisibleFragments(widget, record, canAccess);

  if (visibleFragments.length === 0) {
    return null;
  }

  return (
    <Paper
      component="section"
      variant="outlined"
      aria-labelledby={titleId}
      sx={{ borderRadius: WIDGET_CONFIG.borderRadius, p: WIDGET_CONFIG.padding }}
    >
      <Typography
        id={titleId}
        component="h2"
        variant="subtitle1"
        sx={{ fontWeight: 600, mb: WIDGET_CONFIG.titleGap }}
      >
        {widget.title}
      </Typography>
      <Stack spacing={WIDGET_CONFIG.fragmentGap}>
        {visibleFragments.map(({ fragment, key }) => {
          const { Fragment } = getFragmentType(fragment.type);
          return (
            <Fragment
              key={key}
              fragment={fragment}
              entity={entity}
              record={record}
              lookups={lookups}
            />
          );
        })}
      </Stack>
    </Paper>
  );
}

export default Widget;