"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

import UploadForm from "./UploadForm";

// Styled components
const NavbarContainer = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  position: "fixed",
  top: 0,
}));

const NavbarInnerContainer = styled(Toolbar)(() => ({
  width: "80%",
  margin: "0 auto",
  justifyContent: "space-between",
}));

const NavbarBrand = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "1.25rem",
  marginRight: theme.spacing(4),
  "& a": {
    color: theme.palette.secondary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
      opacity: 0.8,
    },
  },
}));

const NavMenu = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  marginLeft: "auto",
}));

const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <NavbarInnerContainer>
        <NavbarBrand variant="h6">
          <Link href="/">Gallery App</Link>
        </NavbarBrand>
        <NavMenu>
          <UploadForm />
        </NavMenu>
      </NavbarInnerContainer>
    </NavbarContainer>
  );
};

export default Navbar;
