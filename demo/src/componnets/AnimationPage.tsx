import { styled } from '@mui/material';
import { HTMLMotionProps, motion } from 'framer-motion'
import React, { PropsWithChildren } from 'react'

const StyledMotionDiv = styled(motion.div)`
  height: 100%;
  overflow: auto;
`;

export default function AnimationPage(props: PropsWithChildren<HTMLMotionProps<"div">>) {

  const {
    children,
    exit = {translateX: "-100%"},
    initial = {translateX: "100%"},
    animate = {translateX: 0},
    ...restProps
  } = props;

  return (
    <StyledMotionDiv exit={exit} initial={initial} animate={animate} {...restProps}>{children}</StyledMotionDiv>
  )
}