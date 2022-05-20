import { Card, CardContent, CardHeader, styled, Typography } from '@mui/material'
import { motion } from 'framer-motion';
import { ReactNode, RefObject } from 'react';
import { RevealEffect } from '../../../../RevealEffect';

interface IntroduceCardProps {
  icon: ReactNode;
  title: string;
  content: string;
  index: number;
  rootRef: RefObject<Element>
}

const MuiMotionDiv = styled(motion.div)(({ theme }) => {
  return {
    flexShrink: 0,
    flexBasis: "calc(25% - 32px)",
    height: "160px",
    [theme.breakpoints.down("lg")]: {
      flexBasis: "calc(50% - 16px)",
      height: 180
    },
    [theme.breakpoints.down("sm")]: {
      flexBasis: "80%",
      maxWidth: 340,
      height: 160
    },
  }
});
const IntroduceCard = (props: IntroduceCardProps) => {
  const { icon, title, content } = props;

  return (
    <RevealEffect
      config={{
        effectBoxSizing: "safe",
        clickEffect: false,
        elementEffect: false,
      }}
      borderStyle={{ borderRadius: "16px" }}
      component={MuiMotionDiv}
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ margin: "-200px 0px -200px 0px" }}
    >
      <Card
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: "16px"
        }}
      >
        <CardHeader
          avatar={icon}
          title={<Typography variant="h5">{title}</Typography>}
        />
        <CardContent sx={{
          alignItems: "center"
        }}
        >{content}</CardContent>
      </Card>
    </RevealEffect>
  )
}

export default IntroduceCard