import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import SectionTitle from "../../../../componnets/SectionTitle";
import { CustomTab, CustomTabs } from "./CustomTabs";
import HighlightCode from "./HighlightCode";

export type TabLabel = "Hook"|"Component"
interface TabListItem {
  label: TabLabel;
}
const TabList: Array<TabListItem> = [{
  label: "Hook",
}, {
  label: "Component",
}];

const UsageDemo = () => {
  const [tabIndex, setTabIndex] = useState<TabLabel>(TabList[0].label);
  const handleTabChange = (_: object, tabIndex: TabLabel) => {setTabIndex(tabIndex)};

  return (
    <Container
      sx={{
        maxWidth: 1200,
        padding: "max(6vh, 40px) 0"
      }}
    >
      <SectionTitle title="Usage" subtitle="Provide hook and component, give effect simply or freely"/>
      <CustomTabs value={tabIndex} onChange={handleTabChange} centered
        sx={{ marginBottom: 4 }}
      >
        {TabList.map(item => (
          <CustomTab value={item.label} label={item.label} key={item.label}/>
        ))}
      </CustomTabs>
      <HighlightCode type={tabIndex}/>
    </Container>
  )
}

export default UsageDemo;