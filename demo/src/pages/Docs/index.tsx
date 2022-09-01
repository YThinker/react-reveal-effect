import { Build, Code, ExpandLess, ExpandMore, GridView, Phishing, Tune } from "@mui/icons-material";
import { Collapse, Container, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { ReactNode, useContext, useEffect, useState } from "react";
import { Routes, Route, useLocation, Outlet } from "react-router";
import { Link } from "react-router-dom";
import AnimationPage from "../../componnets/AnimationPage";
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
  }, [])

  return (
    <Grid container sx={{
      height: "100%"
    }}>
      <Drawer>
        <List>
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