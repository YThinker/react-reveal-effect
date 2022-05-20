import { useContext, useEffect, useMemo, useRef, useState } from "react";
import applyEffect from "./utils/applyEffect";
import { EffectConfig, MousePosition } from "./RevealEffectConfig";
import { ApplyEffectInfoType, EffectElementRef, EffectElementRefs, EffectConfigType, InitObjectType } from "./types";

const useRevealEffect = (
  selector: {
    borderSelector?: EffectElementRef | EffectElementRefs | HTMLElement | null | HTMLElement[],
    elementSelector?: EffectElementRef | EffectElementRefs | HTMLElement | null | HTMLElement[],
  },
  config?: EffectConfigType
) => {

  const { pageX, pageY } = useContext(MousePosition);

  if((typeof pageX !== "number" && pageX !== null) || (typeof pageY !== "number" && pageY !== null)){
    throw new Error("useRevealEffect hook is only ever to be used as the child of <RevealEffectConfig> element.");
  }

  const globalConfig = useContext(EffectConfig);

  const assignConfig = useMemo(() => Object.assign({}, globalConfig, config), [globalConfig, config]);

  const initBorderObject = useRef<InitObjectType | undefined>();
  const initElementObject = useRef<InitObjectType | undefined>();

  const borderInfo = useRef<ApplyEffectInfoType | undefined>();
  const elementInfo = useRef<ApplyEffectInfoType | undefined>();
  const handleAfterStop = () => {
    borderInfo.current?.removeEffect();
    elementInfo.current?.removeEffect();
  }

  useEffect(() => {
    if(pageX === null || pageY === null || assignConfig.stop) {
      handleAfterStop();
    }
  }, [pageX, pageY, assignConfig])

  const draw = (
    selector: HTMLElement | HTMLElement[],
    isContainer?: boolean
  ) => applyEffect(
    selector,
    Boolean(isContainer),
    assignConfig,
    pageX,
    pageY,
    Boolean(isContainer) ? initBorderObject : initElementObject
  )

  useEffect(() => {
    if(!assignConfig.stop){
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
    pageX, pageY,
    initBorderObject,
    initElementObject,
    assignConfig
  ])

  return {
    borderInfo: borderInfo.current,
    elementInfo: elementInfo.current
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

export default useRevealEffect;