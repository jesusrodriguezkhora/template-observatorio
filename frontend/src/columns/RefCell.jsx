import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { TABLE_CONFIG } from "../config/tables";
import { getDetailPath } from "../entities/paths";
import { getRefLabel } from "./helpers";

function RefCell({ value, column, lookups }) {
  const label = getRefLabel(value, column, lookups);

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