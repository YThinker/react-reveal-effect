import { createContext, PropsWithChildren, useEffect, useMemo } from "react";
import { globalConfig } from "./constants";
import RevealEffectConstructor from "./RevealEffectConstructor";
import { ConfigComponentProps, GlobalEffectConfigType } from "./types";

export const EffectConfig = createContext<GlobalEffectConfigType<"background-image" | "border-image">>({...globalConfig});

const RevealEffectConfig = (props: PropsWithChildren<ConfigComponentProps>) => {

  const {
    globalRoot = window,
    children,
    config: userConfig,
    off
  } = props;

  useEffect(() => {
    RevealEffectConstructor.globalRoot = globalRoot;
  }, [globalRoot])

  useEffect(() => {
    if(off === true) {
      RevealEffectConstructor.unmount();
    } else {
      RevealEffectConstructor.mount();
    }
  }, [off])

  useEffect(() => {
    return () => RevealEffectConstructor.globalRoot = undefined;
  }, [])

  const config = useMemo(() => {
    if(userConfig){
      return {...globalConfig, ...userConfig};
    }
    return {...globalConfig};
  }, [userConfig])

  return (
    <EffectConfig.Provider value={config}>
      {children}
    </EffectConfig.Provider>
  );
}

export default RevealEffectConfig;