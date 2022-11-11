import { Inventory2TwoTone, FlashOnTwoTone, WebTwoTone, BuildCircleTwoTone} from '@mui/icons-material';
import IntroduceCard from "./IntroduceCard";
import { Box, Container } from "@mui/material";
import { useRef } from "react";
import SectionTitle from '../../../../componnets/SectionTitle';

const introduceCardList = [{
  icon: <BuildCircleTwoTone color="error"/>,
  title: "Simple",
  content: "Out of the box, easy to config."
}, {
  icon: <Inventory2TwoTone color="success"/>,
  title: "Small",
  content: "Small bundle size, just 8kb gzipped."
}, {
  icon: <FlashOnTwoTone color="warning"/>,
  title: "Fast",
  content: "Excellent performance, use CSS entirely to draw light effects."
}, {
  icon: <WebTwoTone color="primary"/>,
  title: "Customized",
  content: "Provide React Hook api & React Component & vanillaJS, combine freely"
}, ];

const Introduce = () => {
  const rootRef = useRef<HTMLDivElement|null>(null);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        maxWidth: 1200,
        padding: "max(6vh, 40px) 0",
      }}
      ref={rootRef}
    >
      <SectionTitle title="Simple, Strong and Customized"
        subtitle="It's very easy to add a high-performance and compatible effect to your page"
      />
      <Box sx={(theme) => ({
        display: "flex",
        justifyContent: "space-between",
        [theme.breakpoints.down("sm")]: {
          justifyContent: "center",
        },
        alignItems: "center",
        flexWrap: "wrap",
        gap: 4,
      })}>
        {introduceCardList.map((item, index) => (
          <IntroduceCard
            icon={item.icon}
            title={item.title}
            content={item.content}
            key={item.title}
            index={index}
            rootRef={rootRef}
          />
        ))}
      </Box>
    </Container>

  )
}

export default Introduce;