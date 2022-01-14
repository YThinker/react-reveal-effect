import { Children, cloneElement, PropsWithChildren, useRef } from "react";
import { RevealEffectProps } from "./types";
import { useRevealEffect } from "./useRevealEffect";


export const RevealEffect = (props: PropsWithChildren<RevealEffectProps>) => {

  const { children } = props;
  const { borderRadius, borderWidth, parcel, ...options } = props.config;
  if(!children || Children.count(children) !== 1){
    throw new Error("Must and only needs one child");
  }
  const child = Children.only(children)

  const borderRef = useRef(null);
  const elementRef = useRef(null);
  useRevealEffect({
    borderSelector: borderRef.current,
    elementSelector: elementRef.current
  }, options);

  if(parcel === "parcel"){
    return (
      <div ref={borderRef} style={{display: "inline-block", borderRadius, padding: borderWidth }}>
        {cloneElement(
          child,
          {style: {borderRadius: borderRadius}, ref: elementRef},
        )}
      </div>
    );
  } else if(parcel === "shrink"){
    return (
      <div style={{display: "inline-block", borderRadius, padding: borderWidth }}>
        {cloneElement(
          child,
          {style: {borderRadius: borderRadius, width: ``}, ref: elementRef},
        )}
      </div>
    );
  } else {
    return (
      <div style={{display: "inline-block", position: "relative"}}>
        <div ref={borderRef} style={{
          position: "absolute",
          width: `calc(100% + ${borderWidth} + ${borderWidth})`,
          height: `calc(100% + ${borderWidth} + ${borderWidth})`,
          top: `-${borderWidth}`,
          left: `-${borderWidth}`,
          borderRadius,
          zIndex: -1
        }}></div>
        {cloneElement(
          child,
          {style: {borderRadius: borderRadius}, ref: elementRef},
        )}
      </div>
    );
  }
}