import { Code, ExpandLess, ExpandMore, BuildCircle } from "@mui/icons-material";
import { Collapse, Container, Grid, List, ListItemButton, ListItemIcon, ListItemText, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router";
import { Link } from "react-router-dom";
import Drawer from "../../componnets/Drawer";

import TypescriptListIcon from "../../img/typescript_listitem.png";


const StyledImage = styled("img")``;
const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 2.5em
`;
const StyledChildListItemText = styled(ListItemText)`
  padding-left: 2.5em;
`;

const Docs = () => {
  const location = useLocation();

  const [componentsCollapseOpen, setComponentsCollapseOpen] = useState(false);
  const toggleComponentsCollapse = () => {
    setComponentsCollapseOpen(!componentsCollapseOpen);
  }

  useEffect(() => {
    if(["/docs/reveal-effect-config", "/docs/useRevealEffect", "/docs/reveal-effect"].includes(location.pathname)){
      setComponentsCollapseOpen(true);
    }
  }, [location.pathname, setComponentsCollapseOpen])

  return (
    <Grid container sx={{
      height: "100%"
    }}>
      <Drawer>
        <List>
          <ListItemButton selected={location.pathname === "/docs/getstarted"} component={Link} to="/docs/getstarted">
            <StyledListItemIcon><BuildCircle /></StyledListItemIcon>
            <ListItemText>Getting Started</ListItemText>
          </ListItemButton>
          <ListItemButton selected={location.pathname === "/docs/types"} component={Link} to="/docs/types">
            <StyledListItemIcon>
              <StyledImage src={TypescriptListIcon}
                sx={{
                  width: "1em",
                  height: "1em",
                  fontSize: "1.5em"
                }}
              />
            </StyledListItemIcon>
            <ListItemText>Types</ListItemText>
          </ListItemButton>
          <ListItemButton sx={{ width: "100%" }} onClick={toggleComponentsCollapse}>
            <StyledListItemIcon><Code /></StyledListItemIcon>
            <ListItemText>Components</ListItemText>
            {componentsCollapseOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={componentsCollapseOpen} sx={{ width: "100%" }}>
            <List sx={{ width: "100%" }}>
              <ListItemButton selected={location.pathname === "/docs/reveal-effect-config"} component={Link} to="/docs/reveal-effect-config">
                <StyledChildListItemText>RevealEffectConfig</StyledChildListItemText>
              </ListItemButton>
              <ListItemButton selected={location.pathname === "/docs/useRevealEffect"} component={Link} to="/docs/useRevealEffect">
                <StyledChildListItemText>useRevealEffect</StyledChildListItemText>
              </ListItemButton>
              <ListItemButton selected={location.pathname === "/docs/reveal-effect"} component={Link} to="/docs/reveal-effect">
                <StyledChildListItemText>RevealEffect</StyledChildListItemText>
              </ListItemButton>
              <ListItemButton selected={location.pathname === "/docs/reveal-effect-constructor"} component={Link} to="/docs/reveal-effect-constructor">
                <StyledChildListItemText>RevealEffectConstructor</StyledChildListItemText>
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Drawer>
      <Container sx={{ flex: 1 }}>
        <Outlet />
      </Container>
    </Grid>
  )
}

export default Docs;