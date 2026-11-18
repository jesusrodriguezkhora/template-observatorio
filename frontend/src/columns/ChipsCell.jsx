import { Box, Chip } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { CHIPS_CONFIG } from "../config/chips";
import {
  getLookupRow,
  getRefLabel,
  getRefSourceKey,
  getRefTarget,
  toIdList,
} from "./helpers";

function getChipColors(row, colorFields) {
  return {
    background:
      (colorFields && row?.[colorFields.background]) ||
      CHIPS_CONFIG.defaultBackground,
    text: (colorFields && row?.[colorFields.text]) || CHIPS_CONFIG.defaultText,
  };
}

function getChipLinkProps(target) {
  if (target?.to) {
    return { component: RouterLink, to: target.to, clickable: true };
  }
  if (target?.href) {
    return {
      component: "a",
      href: target.href,
      target: "_blank",
      rel: "noopener noreferrer",
      clickable: true,
    };
  }
  return {};
}

function ChipsCell({ value, column, lookups }) {
  const sourceKey = getRefSourceKey(column);
  const colorFields = lookups[sourceKey]?.colors;
  const ids = [...new Set(toIdList(value).map(String))];

  return (
    <Box
      component="ul"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: CHIPS_CONFIG.gap,
        m: 0,
        p: 0,
        listStyle: "none",
      }}
    >
      {ids.map((id) => {
        const colors = getChipColors(
          getLookupRow(lookups, sourceKey, id),
          colorFields,
        );
        return (
          <li key={id}>
            <Chip
              size={CHIPS_CONFIG.size}
              label={getRefLabel(id, column, lookups)}
              {...getChipLinkProps(getRefTarget(id, column, lookups))}
              sx={{
                bgcolor: colors.background,
                color: colors.text,
                fontWeight: CHIPS_CONFIG.fontWeight,
              }}
            />
          </li>
        );
      })}
    </Box>
  );
}

export default ChipsCell;