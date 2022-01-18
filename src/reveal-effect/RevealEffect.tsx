import { Children, cloneElement, forwardRef, PropsWithChildren, useEffect, useImperativeHandle, useRef, useState } from "react";
import { RevealEffectProps } from "./types";
import { useRevealEffect } from "./useRevealEffect";


export const RevealEffect = forwardRef<HTMLDivElement, PropsWithChildren<RevealEffectProps>>((props, ref) => {

  const { 
    children,
    style, className,
    borderStyle, borderClassName,
    borderRef
  } = props;
  const { borderRadius, borderWidth = "1px", parcel, ...options } = props.config || {};

  // only need one child
  if(!children || Children.count(children) !== 1){
    throw new Error("Must and only needs one child");
  }
  const child = Children.only(children)

  // dom ref and styles
  const insiderBorderRef = useRef<HTMLDivElement|null>(null);
  const insiderElementRef = useRef(null);
  const safeContainerRef = useRef(null);
  const [shrinkStyles, setShrinkStyles] = useState({
    border: {},
    element: {}
  });

  // calc styles of shrink
  useEffect(() => {
    if(parcel === "shrink" && insiderElementRef.current) {
      const styles = window.getComputedStyle(insiderElementRef.current);
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
  // use reveal effect
  useRevealEffect({
    borderSelector: insiderBorderRef.current,
    elementSelector: insiderElementRef.current
  }, options);

  // forward and expose dom ref
  // expose container ref
  useImperativeHandle<HTMLDivElement|null, HTMLDivElement|null>(ref, () => {
    if(parcel === "safe"){
      return safeContainerRef.current;
    }
    return insiderBorderRef.current;
  }, [insiderBorderRef.current, safeContainerRef.current])
  // expose border ref
  useImperativeHandle<HTMLDivElement|null, HTMLDivElement|null>(
    borderRef,
    () => insiderBorderRef.current,
    [insiderBorderRef.current]
  )

  if(parcel === "parcel"){
    return (
      <div ref={insiderBorderRef} style={{display: "inline-block", borderRadius, padding: borderWidth, ...style }} className={className}>
        {cloneElement(
          child,
          {style: {borderRadius: borderRadius}, ref: insiderElementRef},
        )}
      </div>
    );
  } else if(parcel === "shrink"){
    return (
      <div ref={insiderBorderRef} style={{ ...shrinkStyles.border, ...style}} className={className}>
        {cloneElement(
          child,
          {style: shrinkStyles.element, ref: insiderElementRef},
        )}
      </div>
    );
  } else {
    return (
      <div ref={safeContainerRef} style={{display: "inline-block", position: "relative", ...style}} className={className}>
        <div ref={insiderBorderRef}
          style={{
            position: "absolute",
            width: `calc(100% + ${borderWidth} + ${borderWidth})`,
            height: `calc(100% + ${borderWidth} + ${borderWidth})`,
            top: `-${borderWidth}`,
            left: `-${borderWidth}`,
            borderRadius,
            zIndex: 1,
            ...borderStyle
          }}
          className={borderClassName}
        ></div>
        {cloneElement(
          child,
          {style: {borderRadius: borderRadius, position: "relative", zIndex: 1}, ref: insiderElementRef},
        )}
      </div>
    );
  }
})