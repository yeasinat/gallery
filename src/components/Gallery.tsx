import { Container, Box } from "@mui/material";
import React from "react";

const Gallery = () => {
  return (
    <Container>
      <Box
        sx={{
          textAlign: "center",
          height: "100vh",
          marginTop: 9,
          bgcolor: "#cfe8fc",
          padding: 2,
          borderRadius: 1,
        }}
      >
        Gallery
      </Box>
    </Container>
  );
};

export default Gallery;
