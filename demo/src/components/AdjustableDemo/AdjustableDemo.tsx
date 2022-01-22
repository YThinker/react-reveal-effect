import { Box, FormControlLabel, Grid, List, ListItem, ListItemText, Switch } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { RevealEffect } from "../RevealEffect";

import "./AdjustableDemo.css";

const AdjustableDemo = () => {
  const [config, setConfig] = useState({
    clickEffect: false,
    effectBackground: false,
    effectBorder: true,
  })
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof typeof config;
    setConfig(pre => {
      if(pre?.[name] === undefined){
        return pre;
      }
      console.log(pre[name])
      return {...pre, [name]: !pre[name]};
    })
  }

  return (
    <Grid container component="main"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "60vh",
        textAlign: "center",
      }}
    >
      <List sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: 400,
        height: "100%",
        color: "#fff",
        padding: "20px 0",
        boxSizing: "border-box"
      }}>
        <ListItem>
          <ListItemText primary="Click Effect"/>
          <Switch edge="end" name="clickEffect" checked={config.clickEffect} onChange={handleChange}/>
        </ListItem>
        <ListItem>
          <ListItemText primary="Background Effect"/>
          <Switch edge="end" name="effectBackground" checked={config.effectBackground} onChange={handleChange}/>
        </ListItem>
        <ListItem>
          <ListItemText primary="Border Effect"/>
          <Switch edge="end" name="effectBorder" checked={config.effectBorder} onChange={handleChange}/>
        </ListItem>
      </List>
      <Grid container justifyContent="center" alignItems="center" sx={{flex: 0.6}}>
        <RevealEffect config={config}>
          <Box component="button"
            sx={{
              width: "100px",
              height: "100px",
              fontSize: "18px",
              color: "#fff",
              backgroundColor: "#282c34",
            }}
          >with clickEffect</Box>
        </RevealEffect>
      </Grid>
    </Grid>
  );
}

export default AdjustableDemo;