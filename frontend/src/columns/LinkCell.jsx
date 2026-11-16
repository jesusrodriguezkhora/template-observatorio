import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { TABLE_CONFIG } from "../config/tables";
import { getDetailPath } from "../entities/paths";

function LinkCell({ value, row, column, entity }) {
  return (
    <Link
      component={RouterLink}
      to={getDetailPath(entity.key, row.id)}
      color={column.color ?? TABLE_CONFIG.linkColor}
      underline="hover"
    >
      {value}
    </Link>
  );
}

export default LinkCell;