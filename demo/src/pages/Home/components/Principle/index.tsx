import { Container } from '@mui/material';
import { useRef } from 'react'
import SectionTitle from '../../../../componnets/SectionTitle';
import { useRevealEffect } from '../../../../RevealEffect';

const Principle = () => {
  const borderRef = useRef(null);

  useRevealEffect({
    borderSelector: borderRef
  });

  return (
    <Container
      sx={{
        maxWidth: 1200,
        padding: "max(6vh, 40px) 0"
      }}
    >
      <SectionTitle title="Principle" subtitle="Try to move mouse over the elements(when use 'background-image' effectType)"/>
      <div ref={borderRef} style={{
        width: "300px",
        height: "300px",
        margin: "auto",
        boxSizing: "border-box",
        color: "rgb(255, 255, 255)",
        borderRadius: "8px",
        border: "1px solid rgb(255, 255, 255)",
        padding: "30px",
        textAlign: "center"
      }}>
        <span>border</span>
        <div style={{
          width: "100%",
          height: "calc(100% - 60px)",
          border: "1px solid rgb(255, 255, 255)",
          borderRadius: "8px",
          textAlign: "center"
        }}>element</div>
      </div>
    </Container>
  )
}

export default Principle;