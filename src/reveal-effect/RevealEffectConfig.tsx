import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { ConfigComponentProps, EffectConfigProps, PositionProps } from "./types";

export const MousePosition = createContext<PositionProps>({
  pageX: null,
  pageY: null,
});

export const EffectConfig = createContext<EffectConfigProps>({
  borderColor: "rgba(255, 255, 255, 0.6)",
  lightColor: "rgba(255, 255, 255, 0.3)",
  clickEffect: false,
  borderGradientSize: 150,
  lightGradientSize: 150
});

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

  const config = props.config;
  if(config){
    return (
      <MousePosition.Provider value={position}>
        <EffectConfig.Provider value={{...config}}>
          {props.children}
        </EffectConfig.Provider>
      </MousePosition.Provider>
    );
  }
  return (
    <MousePosition.Provider value={position}>
      <EffectConfig.Provider value={{
        borderColor: "rgba(255, 255, 255, 0.6)",
        lightColor: "rgba(255, 255, 255, 0.3)",
        clickEffect: false,
        borderGradientSize: 150,
        lightGradientSize: 150
      }}>
        {props.children}
      </EffectConfig.Provider>
    </MousePosition.Provider>
  );
}