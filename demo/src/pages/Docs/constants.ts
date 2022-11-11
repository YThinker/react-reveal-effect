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
  border: '1px solid transparent'
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
    instance.off();
  </script>
`
