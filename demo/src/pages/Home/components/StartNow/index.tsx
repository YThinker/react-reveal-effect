import { Box, Button, Container, Grid, Typography } from '@mui/material';
import SectionTitle from '../../../../componnets/SectionTitle';
import ImageGrid from './ImageGrid';
import { ArrowRight, ContentCopy, Done } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import copy from 'copy-to-clipboard';

import ReactLogo from "../../../../img/react.png";
import TypescriptLogo from "../../../../img/typescript.png";
import EdgeLogo from "../../../../img/edge_48x48.png"
import ChromeLogo from "../../../../img/chrome_48x48.png"
import FirefoxLogo from "../../../../img/firefox_48x48.png"
import SafariLogo from "../../../../img/safari_48x48.png"
import OperaLogo from "../../../../img/opera_48x48.png"


const environmentCompacibilityVersion = [{
  name: "React",
  logo: ReactLogo,
  version: ">= 16.8.0"
}, {
  name: "Typescript",
  logo: TypescriptLogo,
  version: ">= 3.2"
}];
const browserCompacibilityVersion = [{
  name: "IE/Edge",
  logo: EdgeLogo,
  version: "IE >= 10"
}, {
  name: "Firefox",
  logo: FirefoxLogo,
  version: "Firefox >= 16"
}, {
  name: "Chrome",
  logo: ChromeLogo,
  version: "IE >= 26"
}, {
  name: "Safari",
  logo: SafariLogo,
  version: "IE >= 7"
}, {
  name: "Opera",
  logo: OperaLogo,
  version: "IE >= 12.1"
}, ];

const StartNow = () => {
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
        maxWidth: 1200,
        padding: "max(6vh, 40px) 0"
      }}
    >
      <SectionTitle title="Start Now"/>
      <Grid container>
        <Box sx={{
          width: 400
        }}>
          <Button variant="contained" href="#/docs" endIcon={<ArrowRight />}
            sx={{ mb: 4 }}
          >Docs</Button>
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
        </Box>
        <Grid container
          justifyContent="center"
          alignItems="center"
          gap={4}
          flex={1}
        >
          {[environmentCompacibilityVersion, browserCompacibilityVersion].map((versionList, index) => (
            <Grid item container gap={4} key={index}
              justifyContent="center"
              alignItems="center"
            >
              {versionList.map(item => (
                <ImageGrid name={item.name} logo={item.logo} version={item.version} key={item.name}/>
              ))}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  )
}

export default StartNow;