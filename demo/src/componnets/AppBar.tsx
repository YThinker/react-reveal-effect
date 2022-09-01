import { AppBar, Link as MaterialLink, Box, styled, Container, IconButton, Grid } from "@mui/material"
import { Menu } from "@mui/icons-material";

import logo from "../img/logo.svg";
import { DrawerStateContext } from "./Drawer";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Logo = styled("img")({
  width: "auto",
  height: 60
});

const CustomAppBar = () => {

  const {
    showToggleButton,
    drawerState: [drawerOpen, setDrawerOpen]
  } = useContext(DrawerStateContext);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  return (
    <AppBar position="fixed" sx={{
      backgroundColor: "transparent",
      backdropFilter: "blur(10px)"
    }}>
      <Container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1200 }}>
        <Grid container justifyContent="center" alignItems="center" gap={2}
          sx={{ width: "unset" }}
        >
          {showToggleButton &&
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                ml: 0,
                width: "2em", height: "2em"
              }}
            >
              <Menu />
            </IconButton>
          }
          <MaterialLink component={Link} to="/" sx={{
            display: "inline-block",
            fontSize: 0
          }}>
            <Logo src={logo} />
          </MaterialLink>
        </Grid>
        <Box>
          <MaterialLink component={Link} sx={{ ml: 2 }} variant="button" to="/demo" color="inherit" underline="hover">
            Demo
          </MaterialLink>
          <MaterialLink component={Link} sx={{ ml: 2 }} variant="button" to="/docs" color="inherit" underline="hover">
            Docs
          </MaterialLink>
          <MaterialLink component={Link} sx={{ ml: 2 }} variant="button" to="/changelog" color="inherit" underline="hover">
            Changelog
          </MaterialLink>
        </Box>
      </Container>
    </AppBar>
  )
}

export default CustomAppBar;