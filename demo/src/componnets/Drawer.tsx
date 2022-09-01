import { useMediaQuery, DrawerProps, Drawer, Theme } from "@mui/material";
import { useContext, useState, useMemo, PropsWithChildren, useEffect, createContext } from "react";

export const DrawerStateContext = createContext<ReturnType<typeof useDrawerContext>>({
  showToggleButton: false,
  offToggleButton: true,
  drawerState: [false, () => void 0]
});

export const useDrawerContext = () => {
  const drawerMediaMatche = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  const [offToggleButton, setOffToggleButton] = useState(true);
  useEffect(() => {
    setOffToggleButton(false);
    return () => setOffToggleButton(true);
  }, [])

  const drawerState = useState(false);

  return {
    showToggleButton: !offToggleButton && drawerMediaMatche,
    offToggleButton,
    drawerState
  }
}

const CustomDrawer = ({ children }: PropsWithChildren<{}>) => {

  const {
    showToggleButton,
    offToggleButton,
    drawerState: [drawerOpen, setDrawerOpen]
  } = useContext(DrawerStateContext);

  const { sx: sxProps, ...drawerProps } = useMemo<DrawerProps>(() => {
    let props: DrawerProps = {
      variant: "permanent"
    }
    if (showToggleButton) {
      props = {
        variant: "temporary",
        open: drawerOpen,
        onClose: () => setDrawerOpen(false)
      }
    }
    return props;
  }, [showToggleButton, drawerOpen])

  if(offToggleButton){
    return null;
  }
  return (
    <Drawer
      sx={{
        width: 240,
        height: "100%",
        "& .MuiDrawer-paper": {
          width: 240,
          top: 60
        },
        ...sxProps
      }}
      {...drawerProps}
    >
      {children}
    </Drawer>
  )
}

export default CustomDrawer;