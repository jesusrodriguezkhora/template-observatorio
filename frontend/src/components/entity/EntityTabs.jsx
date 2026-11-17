import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useSearchParams } from "react-router";
import { useAuth } from "../../auth/AuthContext";
import { DETAIL_CONFIG } from "../../config/detail";
import { getTabType } from "../../tabs";

function EntityTabs({ entity, record, lookups }) {
  const { canAccess } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const tabs = entity.detail.tabs.filter((tab) => canAccess(tab.roles));

  if (tabs.length === 0) {
    return (
      <Typography sx={{ color: "text.secondary" }}>
        No tienes acceso a la información de este registro.
      </Typography>
    );
  }

  const requestedKey = searchParams.get("tab");
  const activeTab = tabs.find((tab) => tab.key === requestedKey) ?? tabs[0];
  const showTabBar = !(DETAIL_CONFIG.hideSingleTab && tabs.length === 1);
  const { Panel } = getTabType(activeTab.type);

  function handleTabChange(_event, newKey) {
    setSearchParams(newKey === tabs[0].key ? {} : { tab: newKey }, { replace: true });
  }

  return (
    <>
      {showTabBar && (
        <Tabs
          value={activeTab.key}
          onChange={handleTabChange}
          aria-label={`Secciones de ${entity.labels.singular.toLowerCase()}`}
          sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.key}
              value={tab.key}
              label={tab.label}
              id={`tab-${tab.key}`}
              aria-controls={`tabpanel-${tab.key}`}
              sx={{ textTransform: "none" }}
            />
          ))}
        </Tabs>
      )}
      <Box
        role="tabpanel"
        id={`tabpanel-${activeTab.key}`}
        aria-labelledby={showTabBar ? `tab-${activeTab.key}` : undefined}
      >
        <Panel
          key={activeTab.key}
          tab={activeTab}
          entity={entity}
          record={record}
          lookups={lookups}
        />
      </Box>
    </>
  );
}

export default EntityTabs;