export const TypePageHeaderStyles = {
  pt: 3,
  pb: 3,
  color: "#fff"
}

export const StartedPageHighlightStyles = {
  textTransform: "none",
  color: "#fff",
  backgroundColor: "#000",
  padding: "6px 16px",
  borderRadius: '4px'
}

export const installCode = '$ npm install react-reveal-effect'

export const providerCode = `
import { RevealEffectConfig } from 'react-reveal-effect';

export default ({children}) => (
  <RevealEffectConfig mountOnBody={false} component='div'
    config={{
      borderGradientSize: 100,
      borderColor: '#ddd'
    }}
  >
    {children}
  </RevealEffectConfig>
)
`

export const hookCode = `
import { useRevealEffect } from 'react-reveal-effect';
import { useRef, useState } from 'react';

export default () => {

  const borderRef = useRef(null);
  const elementRef = useRef(null);

  const [stopFlag, setStopFlag] = useState(false);

  useRevealEffect({
    borderSelector: borderRef,
    elementSelector: elementRef
  }, {
    elementGradientSize: 110,
    stop: stopFlag
  })

  return (
    <div ref={borderRef}>
      <button>
        <span ref={elementRef}></span>
      </button>
    </div>
  )
}
`

export const componentCode = `
  import { RevealEffect } from 'react-reveal-effect';

  export default () => (
    <RevealEffect component='div'
      config={{
        borderGradientSize: 200,
        clickEffect: false,
        elementEffect: false
      }}
    >
      <button>CLICK</button>
    </RevealEffect>
  )
`;

export const vanillaCode = `
  import { revealEffectConstructor } from 'react-reveal-effect';

  const revealEffectInstance = new revealEffectConstrucotr(document.querySelectorAll('.reveal'), true, {
    clickEffect: false,
    borderColor: "rgba(255, 255, 255, 0.6)",
    elementColor: "rgba(255, 255, 255, 0.3)",
    effectType: "background-image"
    root: document.body // optional
  })

  /** stop */
  revealEffectInstance.stop();
  /** start */
  revealEffectInstance.start();
  /** or */
  revealEffectInstance.config = { stop: true }
  revealEffectInstance.config = { stop: false }

  /** manual operating draw(when root is undefined) */
  reavealEffectInstance.draw(pageX, pageY)
`
