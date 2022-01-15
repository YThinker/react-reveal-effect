<p align="center"><img src="https://github.com/YThinker/react-reveal-effect/raw/main/logo.svg" /></p>

<h1 align="center">react-reveal-effect</h1>
<p align="center">Reveal Effect of Fluent Design for React</p>

&nbsp;
&nbsp;

## Features
✨
- 💪 Excellent performance, use CSS entirely to draw light effects
- 📦 Lightweight package
- 👍 React Hooks & React Components are all supported
- IE 10 is supported

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
```javascript
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
```javascript
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
```javascript
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
### Global Options
|Options Property|Description|Type|Default|
|----|----|----|----|
|borderColor|border effect color|borderColor?: string|rgba(255, 255, 255, 0.25)|
|lightColor|hover effect color|lightColor?: string|rgba(255, 255, 255, 0.25)|
|clickEffect|take click effect|clickEffect?: string|false|
|borderGradientSize|border effect size|borderGradientSize?: number|150|
|lightGradientSize|hover effect size|lightGradientSize?: number|150|

### Hooks
Parameter
|Params|Description|Type|
|----|----|----|
|selector|draw effect on the selector|{<br/>&nbsp;&nbsp;borderSelector?: HTMLElement\|HTMLElement[], <br/>&nbsp;&nbsp;elementSelector: HTMLElement\|HTMLElement[]<br/>}|
|options|effect options|Hooks Options|

Hooks Options(extend from global options)
|Options Property|Description|Type|Default|
|----|----|----|----|
|...global options|||
|effectBorder|take border effect|effectBorder?: boolean|true|
|effectBackground|take hover effect|effectBackground?: boolean|true|

### Component
Property
|Props|Description|Type|
|----|----|----|
|config|effect options|Component Options|

Component Options(extend from global options)
|Options Property|Description|Type|Default|
|----|----|----|----|
|...global options|||
|borderWidth|border effect line width|string|
|borderRadius|border effect radius|string|
|parcel|parcel type<br/>"parcel": might break layout<br/>"safe":border effect might be obscured by "overflow: hidden" and "RevealEffect" component's position property is "relative"|"parcel"\|"safe"|"safe"|

&nbsp;

## License
MIT

&nbsp;

> This plugin is extend from [🔗fluent-reveal-effect](https://www.npmjs.com/package/fluent-reveal-effect)\
> 🙆‍♀️ Thank U