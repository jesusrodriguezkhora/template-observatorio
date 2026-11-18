import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { TABLE_CONFIG } from "../config/tables";
import { getDetailPath } from "../entities/paths";
import { getLookupRow, getRefLabel } from "./helpers";

function RefCell({ value, column, lookups }) {
  const label = getRefLabel(value, column, lookups);
  const color = column.color ?? TABLE_CONFIG.linkColor;

  if (column.entity) {
    return (
      <Link
        component={RouterLink}
        to={getDetailPath(column.entity, value)}
        color={color}
        underline="hover"
      >
        {label}
      </Link>
    );
  }

  const source = lookups[column.catalog];
  const href = source?.linkField
    ? getLookupRow(lookups, column.catalog, value)?.[source.linkField]
    : null;

  if (href) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer" color={color} underline="hover">
        {label}
      </Link>
    );
  }

  return label;
}

export default RefCell;