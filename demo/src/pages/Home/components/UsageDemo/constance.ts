export const hookCode = `
import { useRef } from "react"
import { useRevealEffect } from "react-reveal-effect";

import logo from "/img/logo.svg";

const commonStyles = {
  width: "24vmin",
  height: "24vmin",
  borderRadius: "16px",
}
const imgStyles = {
  ...commonStyles,
  padding: "20px",
  pointerEvents: "none",
  userSelect: "none",
  backgroundColor: "#282c34"
}

const Logo = () => {

  const logoContainerRef = useRef<HTMLDivElement|null>(null);
  const removeRevealEffect = useRevealEffect(
    {borderSelector: logoContainerRef.current},
    {borderGradientSize: 200}
  );

  return (
    <div ref={logoContainerRef}
      onClick={removeRevealEffect.triggerRun}
      style={{
        ...commonStyles,
        display: "inline-block",
        padding: "1px",
        fontSize: 0,
      }}
    >
      <img src={logo} alt="logo" style={imgStyles}/>
    </div>
  );
}

export default Logo;
`;


export const componentCode = `
import { useRef } from "react"
import { RevealEffect } from "react-reveal-effect";

import logo from "/img/logo.svg";

const commonStyles = {
  width: "24vmin",
  height: "24vmin",
}
const imgStyles = {
  ...commonStyles,
  padding: "20px",
  pointerEvents: "none",
  userSelect: "none",
  backgroundColor: "#282c34"
}

const Logo = () => {

  const logoContainerRef = useRef<HTMLDivElement|null>(null);
  const removeRevealEffect = useRevealEffect(
    {borderSelector: logoContainerRef.current},
    {borderGradientSize: 200}
  );

  return (
    <RevealEffect
      config={
        effectBackground: false,
        borderColor: "rgba(255, 255, 255, 0.4)"
      }
      style={{
        ...commonStyles,
        fontSize: 0,
      }}
    >
      <img src={logo} alt="logo" style={imgStyles}/>
    </RevealEffect>
  );
}

export default Logo;
`;