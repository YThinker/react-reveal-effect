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

## Demo & Docs
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

const Parent = () => {
  return (
    <RevealEffectConfig
      mountOnBody={true}
      config={{
        borderColose: "#fff"
      }}
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
      borderSelector: containerRef,
      elementSelector: buttonRef
    },
    {
      clickEffect: false
    }
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
    <RevealEffect component="span" config={{
      effectBorder: false
    }}>
      <button>Demo</button>
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
| selectors | draw effect on the selector | {<br/>&nbsp;&nbsp;borderSelector?: MutableRefObject\<HTMLElement\>\|HTMLElement\|HTMLElement[], <br/>&nbsp;&nbsp;elementSelector: HTMLElement\|HTMLElement[]<br/>} |
| options  | effect options              | EffectOptionsType                                                                                                                 |


### Component
Property
| Props  | Description    | Type              | default |
| ------ | -------------- | ----------------- |---------|
| config | effect options | ComponentOptions |
| component | The component used for the root node | elementType | div |

Component Options(extend from EffectOptionsType)
| Options Property  | Description                                                                                                                                                                                                                                                                     | Type                               | Default |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------- |
| ...global options |                                                                                                                                                                                                                                                                                 | EffectOptionsType                  |
| borderWidth       | border effect line width                                                                                                                                                                                                                                                        | string \| number                             |
| borderRadius      | border effect radius                                                                                                                                                                                                                                                            | string \| number                             |
| style             | container style                                                                                                                                                                                                                                                                 | string                             |
| borderStyle       | border element style                                                                                                                                                                                                                                                            | string                             |
| className         | container className                                                                                                                                                                                                                                                             | string                             |
| borderClassName   | border element className                                                                                                                                                                                                                                                        | string                             |
| borderRef         | border element ref                                                                                                                                                                                                                                                              | MutableRefObject\<HTMLElement\> |
| parcel            | parcel type<br/>"parcel": might break layout<br/>"shrink": It works by shrink the child element which may cause the child element to be clipped<br/>"safe":border effect might be obscured by "overflow: hidden" and "RevealEffect" component's position property is "relative" | "parcel"\|"shrink"\|"safe"         | "safe"  |

&nbsp;

## License
MIT

&nbsp;

> This plugin is extend from [🔗fluent-reveal-effect](https://www.npmjs.com/package/fluent-reveal-effect)\
> 🙆‍♀️ Thank U

&nbsp;

## Q&A
### Define borderStyle|borderClassName|borderRef when Parcel is not "shrink"
&nbsp;&nbsp;&nbsp;&nbsp;If you have defined borderStyle|borderClassName|borderRef When RevealEffect component's options Parcel is not "shrink", they will take effect on the container element because if Parcel is not "shrink",the border effect will be added on the container element.


&nbsp;

## Changelog
### v2.0.1
update RevealEffect component type, support type derivation.
fix lightColor state change
### v2.0.0
Update: \
useRevealEffect accept MutableRefObject\<HTMLElement\>\
Reveal Effect Config support mountOnBody option\
Reveal Effect & Reveal Effect Config support component option
### v1.2.2
Update Reveal Effect component's options: borderWidth & borderRadius support number type
### v1.2.1
Fixed some problem of renderer when options have been changed
### v1.2.0
Added some new options for effect options. (clickEffectGradientSize, clickEffectColor)\
Added some new property for RevealEffect component. (style, borderStyle, className, borderClassName, ref, borderRef)\
Effect options is reactive.\
Some types have been changed.
### v1.1.0
Added a new option for RevealEffect component(parcel: "shrink").\
ClickEffect won't be affected by EffectBackground.

## Iteration Planning
1. RevealEffect非入侵模式开发（不污染子元素的background-image,仅支持ie11）
2. useRevealEffect返回信息更加详细
3. 大量dom页面性能测试
4. 单元测试补齐
5. HomePage 完善