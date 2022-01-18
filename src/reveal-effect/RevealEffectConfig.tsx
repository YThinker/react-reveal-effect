import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { ConfigComponentProps, GlobalEffectConfigType, PositionProps } from "./types";

export const MousePosition = createContext<PositionProps>({
  pageX: null,
  pageY: null,
});

const globalConfig = {
  borderColor: "rgba(255, 255, 255, 0.6)",
  lightColor: "rgba(255, 255, 255, 0.3)",
  clickEffectColor: "rgba(255, 255, 255, 0.3)",
  clickEffect: false,
  borderGradientSize: 150,
  lightGradientSize: 150,
  clickEffectGradientSize: 80,
  effectBackground: true,
  effectBorder: true,
}
export const EffectConfig = createContext<GlobalEffectConfigType>(globalConfig);

export const RevealEffectConfig = (props: PropsWithChildren<ConfigComponentProps>) => {
  const [position, setPosition] = useState<PositionProps>({pageX: 0, pageY: 0});

  const handleMouseMove = (e: MouseEvent) => {
    setPosition(pre => ({...pre, pageX: e.pageX, pageY: e.pageY}))
  }
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [handleMouseMove])

  let config = globalConfig;
  if(props.config){
    config = {...globalConfig, ...props.config};
  }
  return (
    <MousePosition.Provider value={position}>
      <EffectConfig.Provider value={config}>
        {props.children}
      </EffectConfig.Provider>
    </MousePosition.Provider>
  );
}