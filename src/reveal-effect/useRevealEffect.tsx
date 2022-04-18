import { useContext, useEffect, useRef, useState } from "react";
import { applyEffect } from "./applyEffect";
import { EffectConfig, MousePosition } from "./RevealEffectConfig";
import { ApplyEffectInfoType, EffectElementRef, EffectElementRefs, EffectOptionsType, InitObjectType } from "./types";

export const useRevealEffect = (
  selector: {
    borderSelector?: EffectElementRef | EffectElementRefs | HTMLElement | null | HTMLElement[],
    elementSelector?: EffectElementRef | EffectElementRefs | HTMLElement | null | HTMLElement[],
  },
  options?: EffectOptionsType
) => {

  const { pageX, pageY } = useContext(MousePosition);

  if((typeof pageX !== "number" && pageX !== null) || (typeof pageY !== "number" && pageY !== null)){
    throw new Error("useRevealEffect hook is only ever to be used as the child of <RevealEffectConfig> element.");
  }

  const globalConfig = useContext(EffectConfig);

  const initBorderObject = useRef<InitObjectType | undefined>();
  const initElementObject = useRef<InitObjectType | undefined>();

  const [stopFlag, setStopFlag] = useState(false);
  const handleStart = () => setStopFlag(false);
  const borderInfo = useRef<ApplyEffectInfoType | undefined>();
  const elementInfo = useRef<ApplyEffectInfoType | undefined>();
  const handleStop = () => {
    borderInfo.current?.removeEffect();
    elementInfo.current?.removeEffect();

    setStopFlag(true);
  }

  useEffect(() => {
    if(pageX === null || pageY === null) {
      borderInfo.current?.removeEffect();
      elementInfo.current?.removeEffect();
    }
  }, [pageX, pageY])

  const draw = (
    selector: HTMLElement | HTMLElement[],
    isContainer?: boolean
  ) => applyEffect(
    selector,
    Boolean(isContainer),
    Object.assign({}, globalConfig, options),
    pageX,
    pageY,
    Boolean(isContainer) ? initBorderObject : initElementObject
  )

  useEffect(() => {
    if(!stopFlag){
      let borderSelector = null;
      let elementSelector = null;
      if(selector.borderSelector instanceof Array){
        borderSelector = handleSelectors(selector.borderSelector);
      } else {
        borderSelector = handleSelector(selector.borderSelector);
      }
      if(selector.elementSelector instanceof Array){
        elementSelector = handleSelectors(selector.elementSelector);
      } else {
        elementSelector = handleSelector(selector.elementSelector);
      }

      if(borderSelector){
        borderInfo.current = draw(borderSelector, true)
      }
      if(elementSelector){
        elementInfo.current = draw(elementSelector, false)
      }
    }
  }, [
    selector?.borderSelector, selector?.elementSelector,
    stopFlag,
    pageX, pageY,
    initBorderObject,
    initElementObject,
    options, globalConfig
  ])
  useEffect(() => handleStop, []);

  return {
    borderInfo: borderInfo.current,
    elementInfo: elementInfo.current,
    running: !stopFlag,
    triggerRun: stopFlag ? handleStart : handleStop
  };
}

const handleSelector = (selector: EffectElementRef | HTMLElement | undefined | null) => {
  if(!selector) return;
  if((selector as EffectElementRef).current){
    return (selector as EffectElementRef).current;
  }
  return selector as HTMLElement;
}

const handleSelectors = (selector: EffectElementRefs | HTMLElement[]) => {
  return selector.map(item => {
    return handleSelector(item);
  }).filter(item => Boolean(item)) as HTMLElement[]|[];
}
