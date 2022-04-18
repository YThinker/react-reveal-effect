import { Fab, styled } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';
import { motion, useViewportScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

const BackToTop = () => {
  const [fabVisible, setFabVisible] = useState(false);
  const { scrollY } = useViewportScroll();

  useEffect(() => scrollY.onChange(yTop => {
    if(yTop >= 60) {
      setFabVisible(true);
    } else {
      setFabVisible(false);
    }
  }), []);

  const triggerToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }


  const MotionDiv = styled(motion.div)`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  return (
    <Fab size="small" color="primary"
      sx={{
        position: "fixed",
        right: "5%",
        bottom: "5%",
        zIndex: 99,
        opacity: 0,
        transform: "scale(0)",
        transition: "all 0.2s"
      }}
      style={{ opacity: fabVisible ? 1 : 0, transform: `scale(${fabVisible ? 1 : 0})` }}
      onClick={triggerToTop}
    >
      <MotionDiv whileHover={{ y: -2 }}>
        <ArrowUpward />
      </MotionDiv>
    </Fab>
  )
}

export default BackToTop;