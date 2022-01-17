import { Children, cloneElement, PropsWithChildren, useEffect, useRef, useState } from "react";
import { RevealEffectProps } from "./types";
import { useRevealEffect } from "./useRevealEffect";


export const RevealEffect = (props: PropsWithChildren<RevealEffectProps>) => {

  const { children } = props;
  const { borderRadius, borderWidth = "1px", parcel, ...options } = props.config;
  if(!children || Children.count(children) !== 1){
    throw new Error("Must and only needs one child");
  }
  const child = Children.only(children)

  const borderRef = useRef(null);
  const elementRef = useRef(null);
  const [shrinkStyles, setShrinkStyles] = useState({
    border: {},
    element: {}
  });
  useEffect(() => {
    console.log(elementRef.current);
    if(parcel === "shrink" && elementRef.current) {
      const styles = window.getComputedStyle(elementRef.current);
      console.log(styles);
      setShrinkStyles({
        border: {
          display: "inline-block",
          borderRadius,
          padding: borderWidth,
          width: styles.width,
          height: styles.height,
          boxSizing: "border-box"
        },
        element: {
          borderRadius: borderRadius,
          width: `calc(${styles.width} - ${borderWidth} - ${borderWidth})`,
          height: `calc(${styles.height} - ${borderWidth} - ${borderWidth})`
        }
      })
    }
  }, [])
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
      <div ref={borderRef} style={shrinkStyles.border}>
        {cloneElement(
          child,
          {style: shrinkStyles.element, ref: elementRef},
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
          zIndex: 1
        }}></div>
        {cloneElement(
          child,
          {style: {borderRadius: borderRadius, position: "relative", zIndex: 1}, ref: elementRef},
        )}
      </div>
    );
  }
}