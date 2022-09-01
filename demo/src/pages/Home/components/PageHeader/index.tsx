import { useEffect, useRef, useState } from "react"
import { useRevealEffect } from "../../../../RevealEffect";

import { Box, Link as MaterialLink, Typography, Skeleton, styled, Button, Grid, Container } from "@mui/material";
import { ArrowRight, ContentCopy, Done } from '@mui/icons-material';
import copy from "copy-to-clipboard";

import GithubIcon from "../../../../img/GithubIcon";
import NpmIcon from "../../../../img/NpmIcon";

import logo from "../../../../img/logo.svg";
import { Link } from "react-router-dom";

const imgStyles = {
  width: "24vmin",
  height: "24vmin",
  borderRadius: "16px",
  padding: "20px",
}
const Logo = styled("img")({
  ...imgStyles,
  pointerEvents: "none",
  userSelect: "none",
  backgroundColor: "#282c34"
})

const marginBottom = "max(5vh, 30px)"

const PageHeader = () => {

  const [stopFlag, setStopFlag] = useState(false);
  const logoContainerRef = useRef<HTMLDivElement|null>(null);
  useRevealEffect(
    {borderSelector: logoContainerRef.current},
    {
      borderGradientSize: 200,
      stop: stopFlag
    }
  );

  const [imgReady, setImgReady] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => { setImgReady(true) };
    img.src = logo;
    return () => { img.onload = null; }
  }, []);


  const [copySuccess, setCopySuccess] = useState(false);
  const [timer, setTimer] = useState<number>(0);
  useEffect(() => {
    if(copySuccess){
      const timer = window.setTimeout(() => setCopySuccess(false), 2000);
      setTimer(timer);
    }
  }, [copySuccess, setCopySuccess]);
  useEffect(() => clearTimeout(timer), []);

  const copyCommand = () => {
    copy("npm install react-reveal-effect");
    setCopySuccess(true);
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        height: "calc(100vh - 60px)",
        maxWidth: 1200,
        textAlign: "center"
      }}
    >
      <Box ref={logoContainerRef} onClick={() => setStopFlag(!stopFlag)} sx={{
        minWidth: "20vmin",
        minHeight: "20vmin",
        marginBottom,
        display: "inline-block",
        padding: "1px",
        fontSize: 0,
        backgroundColor: "rgba(100, 100, 100, 0.2)",
        borderRadius: "16px",
        overflow: "hidden"
      }}>
        {imgReady ?
          <Logo src={logo} alt="logo" /> :
          <Skeleton sx={imgStyles} variant="rectangular" />
        }
      </Box>
      <Box sx={{ marginBottom }}>
        <Typography
          sx={{
            color: "#fff",
            fontSize: "calc(10px + 8vmin)",
            letterSpacing: 1,
          }}
          variant="h1" component="h1"
        >
          React-Reveal-Effect
        </Typography>
        <Typography
          sx={{
            color: "#fff",
            fontSize: "max(calc(10px + 1vmin), 20px)",
            fontWeight: 400,
            marginTop: "1em"
          }}
          variant="subtitle1"
        >
          Reveal Effect of Fluent Design for React
        </Typography>
      </Box>
      <Grid container justifyContent="center" alignItems="center"
        gap={3} sx={{ marginBottom }}
      >
        <Button component={Link} variant="contained" to="/docs" endIcon={<ArrowRight />}>Docs</Button>
        <Button
          sx={{
            textTransform: "none",
            color: "#fff",
            backgroundColor: "#000",
            padding: "6px 16px"
          }} endIcon={copySuccess ? <Done color="primary"/> : <ContentCopy />}
          onClick={copyCommand}
        >
          <Typography component="code"
            sx={{fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace"}}
          >npm install react-reveal-effect</Typography>
        </Button>
      </Grid>
      <Box>
        <MaterialLink sx={{margin: "0 20px", display: "inline-block"}} href="https://github.com/YThinker/react-reveal-effect" target="_blank">
          <GithubIcon sx={{fontSize: 40}}/>
        </MaterialLink>
        <MaterialLink sx={{margin: "0 20px", display: "inline-block"}} href="https://www.npmjs.com/package/react-reveal-effect" target="_blank">
          <NpmIcon sx={{fontSize: 40}}/>
        </MaterialLink>
      </Box>

    </Container>
  );
}


export default PageHeader;