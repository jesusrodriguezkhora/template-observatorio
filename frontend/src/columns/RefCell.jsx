import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { TABLE_CONFIG } from "../config/tables";
import { getRefLabel, getRefTarget } from "./helpers";

function RefCell({ value, column, lookups }) {
  const label = getRefLabel(value, column, lookups);
  const target = getRefTarget(value, column, lookups);

  if (!target) {
    return label;
  }

  const linkProps = target.to
    ? { component: RouterLink, to: target.to }
    : { href: target.href, target: "_blank", rel: "noopener noreferrer" };

  return (
    <Link {...linkProps} color={column.color ?? TABLE_CONFIG.linkColor} underline="hover">
      {label}
    </Link>
  );
}

export default RefCell;