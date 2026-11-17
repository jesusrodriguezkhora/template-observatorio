import { Breadcrumbs, Link, Tooltip, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link as RouterLink } from "react-router";
import { DETAIL_CONFIG } from "../../config/detail";
import { getDetailPath } from "../../entities/paths";

const { showOnRoot, maxItemWidth } = DETAIL_CONFIG.pipeline;

const itemSx = {
  display: "block",
  maxWidth: maxItemWidth,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

function EntityPipeline({ trail }) {
  if (trail.length < 2 && !showOnRoot) {
    return null;
  }

  return (
    <Breadcrumbs
      aria-label="Ubicación en la jerarquía"
      separator={<NavigateNextIcon fontSize="small" />}
      sx={{ mb: 2 }}
    >
      {trail.map(({ entity, record }, index) => {
        const name = record[entity.displayField];
        const tooltip = `${entity.labels.singular}: ${name}`;
        const isCurrent = index === trail.length - 1;

        return (
          <Tooltip key={entity.key} title={tooltip}>
            {isCurrent ? (
              <Typography
                aria-current="page"
                variant="body2"
                sx={{ ...itemSx, color: "text.primary", fontWeight: 600 }}
              >
                {name}
              </Typography>
            ) : (
              <Link
                component={RouterLink}
                to={getDetailPath(entity.key, record.id)}
                variant="body2"
                color="inherit"
                underline="hover"
                sx={itemSx}
              >
                {name}
              </Link>
            )}
          </Tooltip>
        );
      })}
    </Breadcrumbs>
  );
}

export default EntityPipeline;