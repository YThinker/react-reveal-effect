import { HTMLMotionProps, motion } from 'framer-motion'
import React, { PropsWithChildren } from 'react'


export default function AnimationPage(props: PropsWithChildren<HTMLMotionProps<"div">>) {

  const {
    children,
    exit = {translateX: "-100%"},
    initial = {translateX: "100%"},
    animate = {translateX: 0},
    ...restProps
  } = props;

  return (
    <motion.div exit={exit} initial={initial} animate={animate} {...restProps}>{children}</motion.div>
  )
}