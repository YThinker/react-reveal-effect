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
  useRevealEffect(
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

export const classCode = `
  <div id='container'>
    <span id='children'></span>
  </div>

  <script type='module'>
    import { RevealEffectConstructor } from 'react-reveal-effect'

    const instance = new RevealEffectConstructor({
      borderSelector: document.getElementById('container'),
      elementSelector: document.getElementById('children')
    }, {
      elementColor: 'rgba(255, 255, 255, 0.6)'
      borderColor: 'rgba(255, 255, 255, 0.4)',
      root: document.body
    })

    // change config
    instance.config = { clickEffect: true, clickColor: 'rgba(200, 200, 200)' }
    // stop draw effect
    instance.stop();
    // restart draw effect
    instance.start();
    // remove event listener
    instance.removeEffect();
  </script>
`;
