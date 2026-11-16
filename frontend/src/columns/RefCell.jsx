import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { TABLE_CONFIG } from "../config/tables";
import { getDetailPath } from "../entities/paths";

function RefCell({ value, column, lookups }) {
  const label = lookups[column.entity]?.[String(value)] ?? value;

  return (
    <Link
      component={RouterLink}
      to={getDetailPath(column.entity, value)}
      color={column.color ?? TABLE_CONFIG.linkColor}
      underline="hover"
    >
      {label}
    </Link>
  );
}

export default RefCell;