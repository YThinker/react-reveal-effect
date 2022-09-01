import { createContext, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import useForkRef from "./hooks/useForkRef";
import { ConfigComponentTypeMap, EffectType, GlobalEffectConfigType, OverridableComponent, PositionProps } from "./types";

export const MousePosition = createContext<PositionProps>({
  pageX: null,
  pageY: null,
});

const globalConfig: GlobalEffectConfigType<"background-image"> | GlobalEffectConfigType<"border-image"> = {
  elementEffect: true,
  borderEffect: true,
  clickEffect: false,
  borderColor: "rgba(255, 255, 255, 0.6)",
  elementColor: "rgba(255, 255, 255, 0.3)",
  clickColor: "rgba(255, 255, 255, 0.3)",
  borderGradientSize: 150,
  elementGradientSize: 150,
  clickGradientSize: 80,
  stop: false,
  effectType: "background-image"
}
export const EffectConfig = createContext<GlobalEffectConfigType<"background-image"> | GlobalEffectConfigType<"border-image">>(globalConfig);

const RevealEffectConfig = forwardRef((props, ref) => {

  const {
    mountOnBody = true,
    component: Tag = "div",
    off = false,
    children,
    config: userConfig,
    ...restProps
  } = props;

  const config = useMemo(() => {
    if(userConfig){
      return {...globalConfig, ...userConfig};
    }
    return globalConfig;
  }, [globalConfig, userConfig])

  const [position, setPosition] = useState<PositionProps>({pageX: null, pageY: null});

  const mountElement = useRef<HTMLElement|null>(null);
  const forkRef = useForkRef(mountElement, ref)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({pageX: e.pageX, pageY: e.pageY})
  }, [])
  const handleMouseLeave = useCallback(() => {
    setPosition({pageX: null, pageY: null});
  }, [])
  useEffect(() => {
    const mountElementNode = mountElement.current;
    if(!off){
      if(mountOnBody) {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);
      } else {
        mountElementNode?.addEventListener("mousemove", handleMouseMove);
        mountElementNode?.addEventListener("mouseleave", handleMouseLeave);
      }
    }
    return () => {
      handleMouseLeave();
      if(mountOnBody) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
      } else {
        mountElementNode?.removeEventListener("mousemove", handleMouseMove);
        mountElementNode?.removeEventListener("mouseleave", handleMouseLeave);
      }
    }
  }, [mountOnBody, Tag, off])

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
}) as OverridableComponent<ConfigComponentTypeMap<EffectType, true, never>|ConfigComponentTypeMap<EffectType, false>>

export default RevealEffectConfig;