import { AppBar, Toolbar, Link, Box, Theme, styled, Container } from "@mui/material"

import logo from "../../img/logo.svg";

const Logo = styled("img")({
  width: 64,
  height: "auto"
});
const LinkStyles = {
  marginLeft: (theme: Theme) => theme.spacing(2)
}

export default () => {

  return (
    <AppBar position="sticky" sx={{
      backgroundColor: "transparent",
      backdropFilter: "blur(10px)"
    }}>
      <Container maxWidth="xl" sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Link href="#/">
          <Logo src={logo}/>
        </Link>
        <Box>
          <Link sx={LinkStyles} variant="button" href="#/demo" color="inherit" underline="hover">
            Demo
          </Link>
          <Link sx={LinkStyles} variant="button" href="#/docs" color="inherit" underline="hover">
            Docs
          </Link>
          <Link sx={LinkStyles} variant="button" href="#/changelog" color="inherit" underline="hover">
            Changelog
          </Link>
        </Box>
      </Container>
    </AppBar>
  )
}