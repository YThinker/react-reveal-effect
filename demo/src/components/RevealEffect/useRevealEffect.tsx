import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { applyEffect } from "./applyEffect";
import { EffectConfig, MousePosition } from "./RevealEffectConfig";
import { EffectElement, EffectElements, EffectOptionsType, InitObjectType } from "./types";

export const useRevealEffect = (
  selector: {
    borderSelector?: EffectElement | EffectElements | null,
    elementSelector?: EffectElement | EffectElements | null,
  },
  options?: EffectOptionsType
) => {
  const { pageX, pageY } = useContext(MousePosition);
  const globalConfig = useContext(EffectConfig);

  const initObject = useRef<InitObjectType | undefined>();
  
  if(typeof pageX !== "number" || typeof pageY !== "number"){
    throw new Error("Has No RevealEffectConfig Context");
  }

  const draw = useCallback((
    borderSelector?: EffectElement | EffectElements,
    selector?: EffectElement | EffectElements
  ) => applyEffect(
    borderSelector,
    selector,
    Object.assign(globalConfig, options),
    pageX,
    pageY,
    initObject
  ), [
    selector?.borderSelector,
    selector?.elementSelector,
    pageX, pageY,
    initObject.current,
    options, globalConfig
  ])


  let removeDraw: () => void = () => null;
  useEffect(() => {
    let borderSelector = selector?.borderSelector;
    let elementSelector = selector?.elementSelector;
    if(borderSelector instanceof Array && !borderSelector.length){
      borderSelector = undefined;
    }
    if(elementSelector instanceof Array && !elementSelector.length){
      elementSelector = undefined;
    }
    if (borderSelector || elementSelector) {
      removeDraw = draw(borderSelector!, elementSelector!)
    }
  }, [selector?.borderSelector, selector?.elementSelector, draw])
  useEffect(() => () => removeDraw(), []);
  return removeDraw;
}