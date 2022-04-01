import { styled } from '@mui/material';
import { useRef } from 'react'
import { useRevealEffect } from '../../../../RevealEffect';

const HrComponent = styled("hr")({
  backgroundColor: "rgba(100, 100, 100, 0.4)",
  margin: 0,
  border: "none",
  height: 1,
})

const Hr = () => {
  const hrRef = useRef<HTMLHRElement|null>(null);
  useRevealEffect(
    {borderSelector: hrRef},
    {borderGradientSize: 200}
  );

  return <HrComponent ref={hrRef} />
}

export default Hr;