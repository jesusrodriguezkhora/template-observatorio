import { Box, Typography } from "@mui/material";
import { WIDGET_CONFIG } from "../config/widgets";
import ColumnValue from "../columns/ColumnValue";
import { toValueDef } from "./helpers";

function InfoFragment({ fragment, entity, record, lookups }) {
  const content = fragment.field ? (
    <ColumnValue def={toValueDef(fragment)} row={record} entity={entity} lookups={lookups} />
  ) : (
    fragment.text
  );

  return (
    <Box>
      {fragment.subtitle && (
        <Typography
          variant="body2"
          sx={{ color: WIDGET_CONFIG.subtitleColor, fontWeight: 500, mb: 0.25 }}
        >
          {fragment.subtitle}
        </Typography>
      )}
      <Typography component="div" variant="body1" sx={{ whiteSpace: "pre-line" }}>
        {content}
      </Typography>
    </Box>
  );
}

export default InfoFragment;