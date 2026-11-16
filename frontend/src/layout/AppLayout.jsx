import { Box } from "@mui/material";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, minWidth: 0, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default AppLayout;