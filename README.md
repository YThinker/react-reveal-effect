<p align="center"><img src="https://ythinker.github.io/react-reveal-effect/static/media/logo.204f4024266c5c4ed14b824e7cb03c1f.svg" /></p>

<h1 align="center">react-reveal-effect</h1>
<p align="center">Reveal Effect of Fluent Design for React</p>

&nbsp;

## Features
✨
- 💪 Excellent performance, use CSS entirely to draw light effects
- 📦 Lightweight package
- 👍 React Hooks & React Components are all supported
- IE 10 is supported

&nbsp;

## Demo
🔗 https://ythinker.github.io/react-reveal-effect

&nbsp;

## Install
🔗NPM Package https://www.npmjs.com/package/react-reveal-effect
```bash
> npm i react-reveal-effect --save
```

&nbsp;

## Usage
🔨you can choose to use hooks or component\
🚩Whether you choose to use hooks or component, you must use the global configuration context on their parent node\
\
Parent.ts
```tsx
import { RevealEffectConfig } from 'react-reveal-effect';

const Father = () => {
  return (
    <RevealEffectConfig
      config={...global options}
    >
      ...
    </RevealEffectConfig>
  )
}
```

### Hooks
Child.ts
```tsx
import { useRevealEffect } from "react-reveal-effect";

const Child = () => {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const removeEffect = useRevealEffect(
    {
      borderSelector: containerRef.current,
      elementSelector: buttonRef.current
    },
    {...custom options}
  );

  return (
    <div ref={containerRef}>
      <button ref={buttonRef}></button>
    </div>
  )
}
```

### Component
```tsx
import { RevealEffect } from "react-reveal-effect";

const Child = () => {

  return (
    <RevealEffect config={...custom options}>
      <button></button>
    </RevealEffect>
  )
}
```

## Options
⚙
### Global Options(Type: EffectOptionsType)
| Options Property        | Description         | Type                             | Default                   |
| ----------------------- | ------------------- | -------------------------------- | ------------------------- |
| borderColor             | border effect color | borderColor?: string             | rgba(255, 255, 255, 0.25) |
| lightColor              | hover effect color  | lightColor?: string              | rgba(255, 255, 255, 0.25) |
| clickEffectColor        | click effect color  | clickEffectColor?: string        | rgba(255, 255, 255, 0.25) |
| clickEffect             | take click effect   | clickEffect?: string             | false                     |
| borderGradientSize      | border effect size  | borderGradientSize?: number      | 150                       |
| lightGradientSize       | hover effect size   | lightGradientSize?: number       | 150                       |
| clickEffectGradientSize | click effect size   | clickEffectGradientSize?: number | 80                        |
| effectBorder            | take border effect  | effectBorder?: boolean           | true                      |
| effectBackground        | take hover effect   | effectBackground?: boolean       | true                      |

### Hooks
Parameter
| Params   | Description                 | Type                                                                                                                              |
| -------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| selector | draw effect on the selector | {<br/>&nbsp;&nbsp;borderSelector?: HTMLElement\|HTMLElement[], <br/>&nbsp;&nbsp;elementSelector: HTMLElement\|HTMLElement[]<br/>} |
| options  | effect options              | EffectOptionsType                                                                                                                 |


### Component
Property
| Props  | Description    | Type              |
| ------ | -------------- | ----------------- |
| config | effect options | EffectOptionsType |

Component Options(extend from EffectOptionsType)
| Options Property  | Description                                                                                                                                                                                                                                                                     | Type                               | Default |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------- |
| ...global options |                                                                                                                                                                                                                                                                                 | EffectOptionsType                  |
| borderWidth       | border effect line width                                                                                                                                                                                                                                                        | string                             |
| borderRadius      | border effect radius                                                                                                                                                                                                                                                            | string                             |
| style             | container style                                                                                                                                                                                                                                                                 | string                             |
| borderStyle       | border element style                                                                                                                                                                                                                                                            | string                             |
| className         | container className                                                                                                                                                                                                                                                             | string                             |
| borderClassName   | border element className                                                                                                                                                                                                                                                        | string                             |
| borderRef         | border element ref                                                                                                                                                                                                                                                              | MutableRefObject\<HTMLDivElement\> |
| parcel            | parcel type<br/>"parcel": might break layout<br/>"shrink": It works by shrink the child element which may cause the child element to be clipped<br/>"safe":border effect might be obscured by "overflow: hidden" and "RevealEffect" component's position property is "relative" | "parcel"\|"shrink"\|"safe"         | "safe"  |

&nbsp;

## License
MIT

&nbsp;

> This plugin is extend from [🔗fluent-reveal-effect](https://www.npmjs.com/package/fluent-reveal-effect)\
> 🙆‍♀️ Thank U

&nbsp;

## Q&A
### How to use hooks when selector is an array
Case 1
```tsx
const App = () => {

  const logoContainerRef = useRef<HTMLDivElement|null>(null);
  const hrRef = useRef<HTMLHRElement|null>(null);
  const refArray = useMemo(() => {
    return [logoContainerRef.current, hrRef.current].filter(item => Boolean(item))
  }, [hrRef.current, logoContainerRef.current]);
  useRevealEffect(
    {borderSelector: refArray as HTMLElement[]},
    {borderGradientSize: 200}
  );


  return (
    <>
      <div ref={logoContainerRef} className='logo-container'>
        <img src="" className="logo" alt="logo" />
      </div>
      <hr ref={hrRef} className="hr"/>
    </>
  );
}
```
Case 2
```jsx
const Home = () => {
 
  const gridPaperMap = [{
    title: 'PersonalCenter',
    icon: PersonalCenterIcon,
    link: '',
    onClick: drawerStore?.openPersonalCenter,
  }, {
    title: 'SphereViewer',
    icon: SphereViewerIcon,
    link: '/sphereviewer',
  }, {
    title: 'ShaderToy',
    icon: Unity3DIcon,
    link: '/shaderdisplay',
  }];


  const [gridRef, setGridRef] = useState<Array<HTMLDivElement|null>>([]);
  useRevealEffect({
    borderSelector: gridRef.filter(item => Boolean(item)) as Array<HTMLDivElement>
  }, {
    borderColor: "rgba(0, 0, 0, 0.3)"
  });

  return (
    <>
      <Grid>
        {gridPaperMap.map((item, index: number) => (
          <GridPaper
            ref={el => {
              setGridRef((pre: Array<HTMLDivElement|null>) => {
                if(pre.length === gridPaperMap.length){
                  return pre;
                }
                return pre.concat(el);
              })
            }}
          />
        ))}
      </Grid>
    </>
  );
}
```
### Define borderStyle|borderClassName|borderRef when Parcel is not "shrink"
&nbsp;&nbsp;&nbsp;&nbsp;If you have defined borderStyle|borderClassName|borderRef When RevealEffect component's options Parcel is not "shrink", they will take effect on the container element because if Parcel is not "shrink",the border effect will be added on the container element.


&nbsp;

## Changelog
### v1.2.0
Added some new options for effect options. (clickEffectGradientSize, clickEffectColor)\
Added some new property for RevealEffect component. (style, borderStyle, className, borderClassName, ref, borderRef)\
Effect options is reactive.\
Some types have been changed.
### v1.1.0
Added a new option for RevealEffect component(parcel: "shrink").\
ClickEffect won't be affected by EffectBackground.