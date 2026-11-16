import { Box, Typography } from "@mui/material";
import { useAuth } from "../auth/AuthContext";
import { DETAIL_CONFIG } from "../config/detail";
import ColumnValue from "../columns/ColumnValue";

function FieldsTab({ tab, entity, record, lookups }) {
  const { canAccess } = useAuth();
  const fields = tab.fields.filter((field) => canAccess(field.roles));

  return (
    <Box
      component="dl"
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, minmax(${DETAIL_CONFIG.fieldMinWidth}px, 1fr))`,
        columnGap: 4,
        rowGap: 2.5,
        m: 0,
      }}
    >
      {fields.map((field) => (
        <Box key={field.field} sx={{ gridColumn: field.fullWidth ? "1 / -1" : "auto" }}>
          <Typography component="dt" variant="body2" sx={{ fontWeight: 600 }}>
            {field.label}
          </Typography>
          <Typography component="dd" sx={{ m: 0 }}>
            <ColumnValue def={field} row={record} entity={entity} lookups={lookups} />
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default FieldsTab;