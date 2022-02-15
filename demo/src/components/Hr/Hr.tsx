import { useRef } from 'react'
import { useRevealEffect } from '../RevealEffect';
import "./Hr.css";

const Hr = () => {
  const hrRef = useRef<HTMLHRElement|null>(null);
  useRevealEffect(
    {borderSelector: hrRef},
    {borderGradientSize: 200}
  );

  return <hr ref={hrRef} className="hr"/>
}

export default Hr;