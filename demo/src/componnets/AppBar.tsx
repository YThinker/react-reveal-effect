import { AppBar, Link, Box, Theme, styled, Container } from "@mui/material"

import logo from "../img/logo.svg";

const Logo = styled("img")({
  width: 64,
  height: "auto"
});
const LinkStyles = {
  marginLeft: (theme: Theme) => theme.spacing(2)
}

const CustomAppBar = () => {

  return (
    <AppBar position="fixed" sx={{
      backgroundColor: "transparent",
      backdropFilter: "blur(10px)"
    }}>
      <Container sx={{display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1200}}>
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

export default CustomAppBar;