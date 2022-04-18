import { createContext, forwardRef, useCallback, useEffect, useRef, useState } from "react";
import useForkRef from "./hooks/useForkRef";
import { ConfigComponentTypeMap, GlobalEffectConfigType, OverridableComponent, PositionProps } from "./types";

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

export const RevealEffectConfig = forwardRef((props, ref) => {

  const {
    mountOnBody = true,
    component: Tag = "div",
    children,
    config: userConfig,
    ...restProps
  } = props;

  const [position, setPosition] = useState<PositionProps>({pageX: null, pageY: null});

  const mountElement = useRef<HTMLElement|null>(null);
  const forkRef = useForkRef(mountElement, ref)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition(pre => ({...pre, pageX: e.pageX, pageY: e.pageY}))
  }, [])
  const handleMouseLeave = useCallback(() => {
    setPosition({pageX: null, pageY: null});
  }, [])
  useEffect(() => {
    if(mountOnBody) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);
    } else {
      mountElement.current?.addEventListener("mousemove", handleMouseMove);
      mountElement.current?.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if(mountOnBody) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
      } else {
        mountElement.current?.removeEventListener("mousemove", handleMouseMove);
        mountElement.current?.removeEventListener("mouseleave", handleMouseLeave);
      }
    }
  }, [handleMouseMove])

  let config = globalConfig;
  if(userConfig){
    config = {...globalConfig, ...userConfig};
  }
  return (
    <MousePosition.Provider value={position}>
      <EffectConfig.Provider value={config}>
        {
          mountOnBody ?
            children :
            <Tag ref={forkRef}
              {...restProps}
            >{children}</Tag>
        }
      </EffectConfig.Provider>
    </MousePosition.Provider>
  );
}) as OverridableComponent<ConfigComponentTypeMap<true, never>|ConfigComponentTypeMap<false>>