import { Drawer, List, ListItem, ListItemText, IconButton, useMediaQuery, useTheme, Box } from "@mui/material";
import { useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Sidebar = ({ onSelect }) => {
  const [selected, setSelected] = useState("Overview");
  const [open, setOpen] = useState(false); // Default closed in mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSelect = (item) => {
    setSelected(item);
    onSelect(item);
    if (isMobile) setOpen(false); // Close sidebar on selection in mobile
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Toggle Button (Arrow) */}
      {isMobile && (
        <IconButton
          onClick={() => setOpen(!open)}
          sx={{
            position: "fixed",
            top: "54px",
            left: open ? "170px" : "10px", // Move button when sidebar opens
            zIndex: 1201,
            transition: "left 0.3s ease",
            backgroundColor: "#fff", // Make it visible on any background
            boxShadow: 1,
          }}
        >
          <ArrowForwardIosIcon sx={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
        </IconButton>
      )}

      {/* Sidebar */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open || !isMobile}
        onClose={() => setOpen(false)}
        sx={{
          width: open ? (isMobile ? 160 : 240) : 0,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: isMobile ? 160 : 240,
            marginTop: "64px",
            height: "calc(100vh - 64px)",
            transition: "width 0.3s ease",
          },
        }}
      >
        <List>
          {["Overview", "Posts"].map((item) => (
            <ListItem
              key={item}
              selected={selected === item}
              onClick={() => handleSelect(item)}
              sx={{
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
            >
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
