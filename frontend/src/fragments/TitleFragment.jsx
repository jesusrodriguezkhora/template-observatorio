import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { WIDGET_CONFIG } from "../config/widgets";
import ColumnValue from "../columns/ColumnValue";
import { resolveSlot } from "./slots";

const TITLE_CONFIG = WIDGET_CONFIG.title;

function TitleFragment({ fragment, entity, record, lookups }) {
  const [failedImage, setFailedImage] = useState(null);

  const title = resolveSlot(fragment.title, record);
  const overline = resolveSlot(fragment.overline, record);
  const subtitle = resolveSlot(fragment.subtitle, record);
  const image = resolveSlot(fragment.image, record);

  const imageUrl = image ? record[image.field] : null;
  const showImage = imageUrl && imageUrl !== failedImage;
  const altText = title ? String(record[title.field]) : "";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "stretch", sm: "center" },
        gap: 3,
      }}
    >
      {showImage && (
        <Box
          component="img"
          src={imageUrl}
          alt={altText}
          onError={() => setFailedImage(imageUrl)}
          sx={{
            width: { xs: "100%", sm: TITLE_CONFIG.imageWidth },
            flexShrink: 0,
            aspectRatio: TITLE_CONFIG.imageAspectRatio,
            objectFit: "cover",
            borderRadius: TITLE_CONFIG.imageBorderRadius,
            display: "block",
          }}
        />
      )}
      <Box sx={{ minWidth: 0 }}>
        {overline && (
          <Typography
            variant="overline"
            component="p"
            sx={{
              color: TITLE_CONFIG.overlineColor,
              fontWeight: 600,
              lineHeight: 1.6,
            }}
          >
            {fragment.overlineLabel && `${fragment.overlineLabel} · `}
            <ColumnValue
              def={overline}
              row={record}
              entity={entity}
              lookups={lookups}
            />
          </Typography>
        )}
        {title && (
          <Typography
            component="p"
            variant={TITLE_CONFIG.titleVariant}
            sx={{
              color: TITLE_CONFIG.titleColor,
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            <ColumnValue
              def={title}
              row={record}
              entity={entity}
              lookups={lookups}
            />
          </Typography>
        )}
        {subtitle && (
          <Typography
            variant="body2"
            component="p"
            sx={{ mt: 1, color: "text.secondary" }}
          >
            <ColumnValue
              def={subtitle}
              row={record}
              entity={entity}
              lookups={lookups}
            />
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default TitleFragment;