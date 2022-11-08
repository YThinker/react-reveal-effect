import { useContext, useEffect, useMemo, useRef } from "react";
import { EffectConfig, MousePosition } from "./RevealEffectConfig";
import { EffectConfigType, EffectSelector, EffectType } from "./types";
import revealEffectConstructor from "./revealEffectConstructor";
import { handleSelector, handleSelectors } from "./utils/helpers";

const useRevealEffect = <T extends EffectType>(
  selector: EffectSelector<T>,
  config?: EffectConfigType<T>
) => {

  const { pageX, pageY } = useContext(MousePosition);

  if((typeof pageX !== "number" && pageX !== null) || (typeof pageY !== "number" && pageY !== null)){
    console.warn('useRevealEffect hook is only ever to be used as the child of <RevealEffectConfig> element.')
  }

  const globalConfig = useContext(EffectConfig);
  const assignConfig = useMemo(() => Object.assign({}, globalConfig, config), [globalConfig, config]);

  const borderRevealEffectInstance = useRef<revealEffectConstructor<T>>()
  const elementRevealEffectInstance = useRef<revealEffectConstructor<T>>()

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
      borderRevealEffectInstance.current = new revealEffectConstructor(borderSelector, true, assignConfig)
    }
    if(elementSelector){
      elementRevealEffectInstance.current = new revealEffectConstructor(elementSelector, false, assignConfig)
    }

    return () => {
      borderRevealEffectInstance.current?.removeEffect()
      borderRevealEffectInstance.current = undefined
      elementRevealEffectInstance.current?.removeEffect()
      elementRevealEffectInstance.current = undefined
    }
  }, [selector?.borderSelector, selector?.elementSelector])

  useEffect(() => {
    if(borderRevealEffectInstance.current) {
      borderRevealEffectInstance.current.config = assignConfig
    }
    if(elementRevealEffectInstance.current) {
      elementRevealEffectInstance.current.config = assignConfig
    }
  }, [assignConfig])

  useEffect(() => {
    if(revealEffectConstructor.globalRoot) {
      return;
    }
    if(borderRevealEffectInstance.current && !borderRevealEffectInstance.current.config.root) {
      borderRevealEffectInstance.current.draw(pageX, pageY);
    }
    if(elementRevealEffectInstance.current && !elementRevealEffectInstance.current.config.root) {
      elementRevealEffectInstance.current.draw(pageX, pageY);
    }
  }, [pageX, pageY])

  return {
    borderRevealEffectInstance: borderRevealEffectInstance.current,
    elementRevealEffectInstance: elementRevealEffectInstance.current
  }
}

export default useRevealEffect;