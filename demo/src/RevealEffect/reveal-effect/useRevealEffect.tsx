import { useContext, useEffect, useMemo, useRef } from "react";
import { EffectConfig } from "./RevealEffectConfig";
import { EffectConfigType, EffectSelector, EffectType } from "./types";
import RevealEffectConstructor from "./RevealEffectConstructor";
import { handleSelector, handleSelectors } from "./utils/helpers";

const useRevealEffect = <T extends EffectType>(
  selector: EffectSelector<T>,
  config?: EffectConfigType<T>
) => {
  const globalConfig = useContext(EffectConfig);
  const assignConfig = useMemo(() => Object.assign({}, globalConfig, config), [globalConfig, config]);

  const revealEffectInstance = useRef<RevealEffectConstructor<T>>()

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

    revealEffectInstance.current = new RevealEffectConstructor({
      borderSelector,
      elementSelector
    }, assignConfig)

    return () => {
      revealEffectInstance.current?.off()
      revealEffectInstance.current = undefined
    }
  }, [selector?.borderSelector, selector?.elementSelector])

  useEffect(() => {
    if(revealEffectInstance.current) {
      revealEffectInstance.current.config = assignConfig
    }
  }, [assignConfig])

  return revealEffectInstance.current
}

export default useRevealEffect;