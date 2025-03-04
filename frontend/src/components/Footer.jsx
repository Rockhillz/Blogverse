import React from "react";
import { Container, Typography, Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        textAlign: "center",
        bgcolor: "grey.100",
        mt: "20px"
      }}
    >
      <Container>
        <Typography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()} IzUcHi. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
