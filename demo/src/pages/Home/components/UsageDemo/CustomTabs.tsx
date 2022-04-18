import { styled, Tab, Tabs } from "@mui/material";

export const CustomTabs = styled(Tabs)(({theme}) => ({
  gap: 4,
  "& .MuiTabs-flexContainer": {
    position: "relative",
    zIndex: 2
  },
  "& .MuiTabs-indicator": {
    height: "100%",
    zIndex: 1,
    borderRadius: 9999,
    backgroundColor: theme.palette.primary.dark
  }
}))

export const CustomTab = styled(Tab)`
  border-radius: 9999px;
  padding-left: 30px;
  padding-right: 30px;
  &.Mui-selected {
    color: #fff;
  }
`;