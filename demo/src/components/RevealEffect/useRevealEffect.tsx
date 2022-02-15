import { useCallback, useContext, useEffect, useRef } from "react";
import { applyEffect } from "./applyEffect";
import { EffectConfig, MousePosition } from "./RevealEffectConfig";
import { EffectElement, EffectElementRef, EffectElementRefs, EffectElements, EffectOptionsType, InitObjectType } from "./types";

export const useRevealEffect = (
  selector: {
    borderSelector?: EffectElementRef | EffectElementRefs,
    elementSelector?: EffectElementRef | EffectElementRefs,
  },
  options?: EffectOptionsType
) => {
  const { pageX, pageY } = useContext(MousePosition);
  const globalConfig = useContext(EffectConfig);

  const initBorderObject = useRef<InitObjectType | undefined>();
  const initElementObject = useRef<InitObjectType | undefined>();

  if(typeof pageX !== "number" || typeof pageY !== "number"){
    throw new Error("Has No RevealEffectConfig Context");
  }

  const draw = useCallback((
    selector?: EffectElement | EffectElements,
    isContainer?: boolean
  ) => applyEffect(
    selector,
    Boolean(isContainer),
    Object.assign({}, globalConfig, options),
    pageX,
    pageY,
    Boolean(isContainer) ? initBorderObject : initElementObject
  ), [
    pageX, pageY,
    initBorderObject,
    initElementObject,
    options, globalConfig
  ])


  const removeDraw = useRef({
    borderSelector: () => {},
    elementSelector: () => {},
  });
  useEffect(() => {
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
      removeDraw.current.borderSelector = draw(borderSelector, true)
    }
    if(elementSelector){
      removeDraw.current.elementSelector = draw(elementSelector, false)
    }
  }, [selector?.borderSelector, selector?.elementSelector, draw])
  useEffect(() => () => {
    const removeDrawObject = removeDraw.current;
    type RemoveDrawObjectKey = keyof typeof removeDrawObject;
    let key: RemoveDrawObjectKey
    for(key in removeDrawObject){
      removeDrawObject[key]();
    }
  }, []);
}

const handleSelector = (selector: EffectElementRef | undefined) => {
  return selector?.current && selector.current;
}

const handleSelectors = (selector: EffectElementRefs) => {
  return selector.map(item => item.current && item.current).filter(item => Boolean(item));
}
