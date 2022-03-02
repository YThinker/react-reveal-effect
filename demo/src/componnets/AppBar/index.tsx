import { AppBar, Toolbar, Typography, Button, Link } from "@mui/material"
import { makeStyles } from '@mui/styles';

import logo from "../../img/logo.svg";

export default () => {

  const classes = useStyles();

  return (
    <AppBar position="sticky" sx={{
      backgroundColor: "transparent",
      backdropFilter: "blur(10px)"
    }}>
      <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
        <Link href="/" sx={{fontSize: 0}}>
          <img className={classes.logo} src={logo}/>
        </Link>
        {/* <Link href="/docs" color="inherit">Docs</Link> */}
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles(() => ({
  logo: {
    width: 64,
    height: "auto"
  }
}));