import { Box, Grid, List, ListItem, ListItemText, Slider, Switch } from "@mui/material";
import { ChangeEvent, useMemo, useState } from "react";
import { RevealEffect } from "../../../../RevealEffect";

const AdjustableDemo = () => {
  const [config, setConfig] = useState({
    clickEffect: true,
    effectBackground: true,
    effectBorder: true,
    borderRadius: 8,
    borderWidth: 1,
  })
  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof typeof config;
    setConfig(pre => {
      if(pre?.[name] === undefined){
        return pre;
      }
      return {...pre, [name]: !pre[name]};
    })
  }
  const handleSliderChange = (type: keyof typeof config, newValue: number|number[]) => {
    setConfig(pre => {
      if(pre?.[type] === undefined){
        return pre;
      }
      return {...pre, [type]: newValue};
    })
  }

  const listItemEffectConfig = useMemo(() => ({
    clickEffect: false,
    effectBackground: false,
    borderGradientSize: 70
  }), []);

  return (
    <Grid container component="main"
      justifyContent="center"
      alignItems="center"
      sx={{
        padding: "10vh 0",
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
        <RevealEffect config={listItemEffectConfig}>
          <ListItem sx={{ backgroundColor: "#282c34" }}>
            <ListItemText primary="Click Effect"/>
            <Switch edge="end" name="clickEffect" checked={config.clickEffect} onChange={handleSwitchChange}/>
          </ListItem>
        </RevealEffect>
        <RevealEffect config={listItemEffectConfig}>
          <ListItem sx={{ backgroundColor: "#282c34" }}>
            <ListItemText primary="Background Effect"/>
            <Switch edge="end" name="effectBackground" checked={config.effectBackground} onChange={handleSwitchChange}/>
          </ListItem>
        </RevealEffect>
        <RevealEffect config={listItemEffectConfig}>
          <ListItem sx={{ backgroundColor: "#282c34" }}>
            <ListItemText primary="Border Effect"/>
            <Switch edge="end" name="effectBorder" checked={config.effectBorder} onChange={handleSwitchChange}/>
          </ListItem>
        </RevealEffect>
        <RevealEffect config={listItemEffectConfig}>
          <ListItem sx={{ backgroundColor: "#282c34" }}>
            <ListItemText primary="Border Radius"/>
            <Slider size="small" name="borderRadius"
              sx={{width: "50%"}}
              max={30} valueLabelDisplay="auto"
              value={config.borderRadius} onChange={(_, newValue) => handleSliderChange("borderRadius", newValue)}
            />
          </ListItem>
        </RevealEffect>
        <RevealEffect config={listItemEffectConfig}>
          <ListItem sx={{ backgroundColor: "#282c34" }}>
            <ListItemText primary="Border Radius"/>
            <Slider size="small" name="borderWidth"
              sx={{width: "50%"}}
              max={10} valueLabelDisplay="auto"
              value={config.borderWidth} onChange={(_, newValue) => handleSliderChange("borderWidth", newValue)}
            />
          </ListItem>
        </RevealEffect>
      </List>

      <Grid container justifyContent="center" alignItems="center" sx={{flex: 0.6}}>
        <RevealEffect config={{...config}}>
          <Box component="button"
            sx={{
              width: "100px",
              height: "100px",
              fontSize: "18px",
              color: "#fff",
              backgroundColor: "#282c34",
            }}
          >Demo</Box>
        </RevealEffect>
      </Grid>
    </Grid>
  );
}

export default AdjustableDemo;