"use client";
import React from "react";
import { Container, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Typography textAlign={"center"} variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Gallery App. All rights reserved.
      </Typography>
    </Container>
  );
};

export default Footer;
