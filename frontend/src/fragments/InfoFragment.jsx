import { Box, Typography } from "@mui/material";
import ColumnValue from "../columns/ColumnValue";
import FragmentSubtitle from "./FragmentSubtitle";
import { toValueDef } from "./helpers";
import { WIDGET_CONFIG } from "../config/widgets";

function InfoFragment({ fragment, entity, record, lookups }) {
  const content = fragment.field ? (
    <ColumnValue
      def={toValueDef(fragment)}
      row={record}
      entity={entity}
      lookups={lookups}
    />
  ) : (
    fragment.text
  );

  return (
    <Box>
      {fragment.subtitle && (
        <FragmentSubtitle>{fragment.subtitle}</FragmentSubtitle>
      )}
      <Typography
        component="div"
        variant={WIDGET_CONFIG.textVariant}
        sx={{ whiteSpace: "pre-line" }}
      >
        {content}
      </Typography>
    </Box>
  );
}

export default InfoFragment;