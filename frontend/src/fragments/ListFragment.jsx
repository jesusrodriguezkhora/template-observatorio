import { Box, Typography } from "@mui/material";
import { WIDGET_CONFIG } from "../config/widgets";
import FragmentSubtitle from "./FragmentSubtitle";
import { getListItems } from "./listItems";

const LIST_CONFIG = WIDGET_CONFIG.list;

function ListFragment({ fragment, record, lookups }) {
  const items = getListItems(fragment, record, lookups);

  return (
    <Box>
      {fragment.subtitle && (
        <FragmentSubtitle>{fragment.subtitle}</FragmentSubtitle>
      )}
      {items.length === 0 ? (
        <Typography variant={WIDGET_CONFIG.textVariant}>—</Typography>
      ) : (
        <Box
          component="ul"
          sx={{
            m: 0,
            p: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: LIST_CONFIG.itemGap,
          }}
        >
          {items.map((item) => (
            <Box
              component="li"
              key={item.id}
              sx={{ display: "flex", alignItems: "baseline", gap: 1.5 }}
            >
              {item.badge && (
                <Box
                  component="span"
                  sx={{
                    flexShrink: 0,
                    minWidth: LIST_CONFIG.badgeMinWidth,
                    px: 0.75,
                    py: 0.25,
                    borderRadius: LIST_CONFIG.badgeRadius,
                    bgcolor: item.background || LIST_CONFIG.badgeBackground,
                    color: item.color || LIST_CONFIG.badgeText,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                >
                  {item.badge}
                </Box>
              )}
              <Typography component="span" variant={WIDGET_CONFIG.textVariant}>
                {item.text}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default ListFragment;