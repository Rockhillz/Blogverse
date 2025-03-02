import { useState, useEffect } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "../components/Sidebar";
import DashOverview from "../components/DashOverview";
import DashPosts from "../components/DashPost";

const Dashboard = () => {
  const [ title, setTitle ] = useState("")
  useEffect(() => {
    document.title = `Dashboard`;
  }, [title]);

  const [selectedSection, setSelectedSection] = useState("Overview");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ display: "flex", marginTop: "6px" }}>
      <Sidebar onSelect={setSelectedSection} />
      <Box 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          ml: isMobile ? 0 : "230px",  // Add margin-left only in desktop
          transition: "margin-left 0.3s ease" 
        }}
      >
        <Typography variant="h4" mb={2}>
          {selectedSection}
        </Typography>
        {selectedSection === "Overview" ? <DashOverview /> : <DashPosts />}
      </Box>
    </Box>
  );
};

export default Dashboard;