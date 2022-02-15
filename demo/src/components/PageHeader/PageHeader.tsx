import { useEffect, useRef, useState } from "react"
import { useRevealEffect } from "../RevealEffect";

import { Box, Link, Typography, Skeleton } from "@mui/material";
import GithubIcon from "../../img/GithubIcon";
import NpmIcon from "../../img/NpmIcon";

import logo from "../../img/logo.svg";

const PageHeader = () => {

  const logoContainerRef = useRef<HTMLDivElement|null>(null);
  useRevealEffect(
    {borderSelector: logoContainerRef},
    {borderGradientSize: 200}
  );

  const [imgReady, setImgReady] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => { setImgReady(true) };
    img.src = logo;
    return () => { img.onload = null; }
  }, []);

  const imgStyles = {
    width: "auto",
    height: "30vmin",
    borderRadius: "16px",
    padding: "20px",
  }

  return (
    <>
      <Box component="header" sx={{ position: "relative", textAlign: "center", height: "100vh" }}>
        <Box ref={logoContainerRef} sx={{
          minWidth: "20vmin",
          minHeight: "20vmin",
          marginTop: "8vh",
          display: "inline-block",
          padding: "1px",
          fontSize: 0,
          backgroundColor: "rgba(100, 100, 100, 0.2)",
          borderRadius: "16px",
          overflow: "hidden"
        }}>
          {imgReady ? 
            <img src={logo} style={{
              ...imgStyles, 
              pointerEvents: "none",
              userSelect: "none",
              backgroundColor: "#282c34"
            }} alt="logo" /> : 
            <Skeleton sx={{...imgStyles, width: "30vmin"}} variant="rectangular" />
          }
        </Box>
        <Typography
          sx={{
            color: "#fff",
            fontSize: "calc(10px + 10vmin)",
            letterSpacing: 1,
            marginTop: "10vh"
          }}
          variant="h1" component="h1"
        >
          React-Reveal-Effect
        </Typography>
        <Typography
          sx={{
            color: "#fff",
            fontSize: "calc(10px + 2vmin)",
            fontWeight: 400,
            marginTop: "5vh"
          }}
          variant="subtitle1"
        >
          Reveal Effect of Fluent Design for React
        </Typography>
        <Box sx={{
          marginTop: "4vmin"
        }}>
          <Link sx={{margin: "0 20px"}} href="https://github.com/YThinker/react-reveal-effect" target="_blank">
            <GithubIcon sx={{fontSize: 40}}/>
          </Link>
          <Link sx={{margin: "0 20px"}} href="https://www.npmjs.com/package/react-reveal-effect" target="_blank">
            <NpmIcon sx={{fontSize: 40}}/>
          </Link>
        </Box>

      </Box>
    </>
  );
}

export default PageHeader;