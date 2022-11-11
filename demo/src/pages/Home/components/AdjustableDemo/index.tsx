import { Box, Container, Grid, List, ListItem, ListItemText, Slider, Switch, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { ChangeEvent, PropsWithChildren, useRef, useState } from "react";
import { ColorResult } from "react-color";
import ColorPicker from "../../../../componnets/ColorPicker";
import { RevealEffect, RevealEffectStylesType } from "../../../../RevealEffect";

const listItemEffectConfig: RevealEffectStylesType<"background-image", "safe"> = {
  clickEffect: false,
  elementEffect: false,
  borderGradientSize: 70,
  effectBoxSizing: "safe"
};

interface ListItemContainerProps {
  index: number;
}
const ListItemContainer = (props: PropsWithChildren<ListItemContainerProps>) => (
  <RevealEffect config={listItemEffectConfig}
    component={motion.div}
    initial={{ y: 30, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ margin: "-100px" }}
  >
    <ListItem sx={{ backgroundColor: "#282c34" }}>{props.children}</ListItem>
  </RevealEffect>
)

interface RevealEffectConfig extends RevealEffectStylesType<"background-image", "safe"> {
  borderWidth: number;
}
const AdjustableDemo = () => {
  const rootRef = useRef<HTMLDivElement|null>(null);

  const [config, setConfig] = useState<RevealEffectConfig>({
    clickEffect: true,
    clickColor: "rgba(255, 255, 255, 0.2)",
    elementEffect: true,
    borderEffect: true,
    borderWidth: 1,
    borderColor: "#ffffff",
    elementColor: "#164cdc",
    effectBoxSizing: "safe"
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

  const handleLightColorChange = (color: ColorResult) => { handleColorChange(color, "elementColor") }
  const handleBorderColorChange = (color: ColorResult) => { handleColorChange(color, "borderColor") }
  const handleColorChange = (color: ColorResult, name: keyof typeof config) => {
    setConfig(pre => ({ ...pre, [name]: color.hex }))
  }

  return (
    <Container
      sx={{
        maxWidth: 1200,
        padding: "6vh 0",
      }}
    >
      <Typography variant="h4" color="#fff"
        sx={(theme) => ({
          mb: "2vh",
          fontWeight: 500,
          [theme.breakpoints.down("md")]: {
            textAlign: "center"
          }
        })}
      >Try it</Typography>
      <Grid container
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        sx={{
          textAlign: "center"
        }}
        ref={rootRef}
      >
        <List sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: 560,
          height: "100%",
          color: "#fff",
          padding: "20px 0",
          boxSizing: "border-box"
        }}>
          <ListItemContainer index={0}>
            <ListItemText primary="Click Effect"/>
            <Switch edge="end" name="clickEffect" checked={config.clickEffect} onChange={handleSwitchChange}/>
          </ListItemContainer>
          <ListItemContainer index={1}>
            <ListItemText primary="Light Effect"/>
            <Switch edge="end" name="elementEffect" checked={config.elementEffect} onChange={handleSwitchChange}/>
          </ListItemContainer>
          <ListItemContainer index={2}>
            <ListItemText primary="Border Effect"/>
            <Switch edge="end" name="borderEffect" checked={config.borderEffect} onChange={handleSwitchChange}/>
          </ListItemContainer>
          <ListItemContainer index={4}>
            <ListItemText primary="Border Width"/>
            <Slider size="small" name="borderWidth"
              sx={{width: "50%"}}
              max={10} valueLabelDisplay="auto"
              value={config.borderWidth} onChange={(_, newValue) => handleSliderChange("borderWidth", newValue)}
            />
          </ListItemContainer>
          <ListItemContainer index={4}>
            <ListItemText primary="Border Color"/>
            <ColorPicker color={config.borderColor} onChangeComplete={handleBorderColorChange} />
          </ListItemContainer>
          <ListItemContainer index={4}>
            <ListItemText primary="Light Color"/>
            <ColorPicker color={config.elementColor} onChangeComplete={handleLightColorChange} />
          </ListItemContainer>
        </List>

        <Grid item justifyContent="center" alignItems="center"
          sx={{flex: 1, minWidth: 320}}
        >
          <RevealEffect config={config}
            component={motion.div} initial={{ opacity: 0, y: "100%" }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: "-100px" }}
          >
            <Box component="button"
              onClick={() => setConfig(pre => ({ ...pre, clickEffect: !pre.clickEffect }))}
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

    </Container>
  );
}

export default AdjustableDemo;