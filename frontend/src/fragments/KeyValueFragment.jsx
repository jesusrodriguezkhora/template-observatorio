import { Box, Typography } from "@mui/material";
import { useAuth } from "../auth/AuthContext";
import { WIDGET_CONFIG } from "../config/widgets";
import ColumnValue from "../columns/ColumnValue";
import FragmentSubtitle from "./FragmentSubtitle";
import { toValueDef } from "./helpers";
import { getVisibleRows } from "./keyvalueRows";

const KEYVALUE_CONFIG = WIDGET_CONFIG.keyvalue;

function KeyValueFragment({ fragment, entity, record, lookups }) {
  const { canAccess } = useAuth();
  const rows = getVisibleRows(fragment, record, canAccess);

  if (rows.length === 0) {
    return null;
  }

  const showDivider = fragment.divider ?? KEYVALUE_CONFIG.dividers;

  return (
    <Box
      sx={
        showDivider
          ? {
              "&:not(:first-of-type)": {
                borderTop: 1,
                borderColor: "divider",
                pt: 2,
              },
            }
          : undefined
      }
    >
      {fragment.subtitle && (
        <FragmentSubtitle>{fragment.subtitle}</FragmentSubtitle>
      )}
      <Box
        component="dl"
        sx={{
          m: 0,
          display: "flex",
          flexDirection: "column",
          gap: KEYVALUE_CONFIG.rowGap,
        }}
      >
        {rows.map(({ row, key }) => (
          <Box
            key={key}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 2,
            }}
          >
            <Typography
              component="dt"
              variant={WIDGET_CONFIG.textVariant}
              sx={{ color: KEYVALUE_CONFIG.labelColor }}
            >
              {row.label}
            </Typography>
            <Typography
              component="dd"
              variant={WIDGET_CONFIG.textVariant}
              sx={{
                m: 0,
                textAlign: "right",
                fontWeight: KEYVALUE_CONFIG.valueWeight,
                color: row.color,
              }}
            >
              {row.field ? (
                <ColumnValue
                  def={toValueDef(row)}
                  row={record}
                  entity={entity}
                  lookups={lookups}
                />
              ) : (
                row.text
              )}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default KeyValueFragment;