import { Children, cloneElement, forwardRef, useEffect, useRef, useState } from "react";
import useForkRef from "./hooks/useForkRef";
import { OverridableComponent, RevealEffectComponentTypeMap } from "./types";
import { useRevealEffect } from "./useRevealEffect";


export const RevealEffect = forwardRef((props, ref) => {

  const {
    children,
    style, className,
    borderStyle, borderClassName,
    borderRef,
    component: Tag = "div",
    config,
    ...restProps
  } = props;

  // only need one child
  if(!children || Children.count(children) !== 1){
    throw new Error("<RevealEffect> element must and only needs one child");
  }
  const child = Children.only(children)

  // handle border style props
  const { borderRadius:radius, borderWidth:width = "1px", parcel, ...options } = config || {};
  const borderRadius = typeof radius === "number" ? `${radius}px` : radius;
  const borderWidth = typeof width === "number" ? `${width}px` : width;

  // dom ref & expose ref
  const insiderBorderRef = useRef<HTMLElement|null>(null);
  const forkBorderRef = useForkRef(insiderBorderRef, borderRef);

  const forkContainerRef = useForkRef(forkBorderRef, ref);

  const insiderElementRef = useRef(null);

  // initial shrink styles state
  const [shrinkStyles, setShrinkStyles] = useState({
    border: {},
    element: {}
  });

  // calc styles of shrink
  const styles = useRef<CSSStyleDeclaration|undefined>();
  useEffect(() => {
    if(parcel === "shrink" && insiderElementRef.current) {
      styles.current ?? (styles.current = {...window.getComputedStyle(insiderElementRef.current)});
      setShrinkStyles({
        border: {
          display: "inline-block",
          borderRadius,
          padding: borderWidth,
          width: styles.current.width,
          height: styles.current.height,
          boxSizing: "border-box"
        },
        element: {
          borderRadius,
          width: `calc(${styles.current.width} - ${borderWidth} - ${borderWidth})`,
          height: `calc(${styles.current.height} - ${borderWidth} - ${borderWidth})`
        }
      })
    }
  }, [borderWidth, borderRadius, parcel])

  // use reveal effect
  useRevealEffect({
    borderSelector: insiderBorderRef,
    elementSelector: insiderElementRef
  }, options);

  if(parcel === "parcel"){
    return (
      <Tag ref={forkContainerRef}
        style={{display: "inline-block", borderRadius, padding: borderWidth, ...style }}
        className={className}
        {...restProps}
      >
        {cloneElement(
          child,
          {style: {borderRadius}, ref: insiderElementRef},
        )}
      </Tag>
    );
  } else if(parcel === "shrink"){
    return (
      <Tag ref={forkContainerRef}
        style={{ ...shrinkStyles.border, ...style}}
        className={className}
        {...restProps}
      >
        {cloneElement(
          child,
          {style: shrinkStyles.element, ref: insiderElementRef},
        )}
      </Tag>
    );
  } else {
    return (
      <Tag ref={ref}
        style={{display: "inline-block", position: "relative", ...style}}
        className={className}
        {...restProps}
      >
        <span ref={forkBorderRef}
          style={{
            display: "block",
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
        ></span>
        {cloneElement(
          child,
          {style: {borderRadius, position: "relative", zIndex: 1}, ref: insiderElementRef},
        )}
      </Tag>
    );
  }
}) as OverridableComponent<RevealEffectComponentTypeMap>