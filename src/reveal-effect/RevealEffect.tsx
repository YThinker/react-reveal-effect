import { Children, cloneElement, forwardRef, useEffect, useRef, useState } from "react";
import useForkRef from "./hooks/useForkRef";
import { BoxSizingType, OverridableComponent, RevealEffectComponentTypeMap } from "./types";
import useRevealEffect from "./useRevealEffect";

const RevealEffect = forwardRef((props, ref) => {

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
  const { borderWidth:width = "1px", effectBoxSizing = "content-box", ...restConfig } = config || {};
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
    if(effectBoxSizing === "border-box" && insiderElementRef.current) {
      styles.current ?? (styles.current = {...window.getComputedStyle(insiderElementRef.current)});
      setShrinkStyles({
        border: {
          width: styles.current.width,
          height: styles.current.height,
          boxSizing: "border-box",
          padding: borderWidth,
          borderRadius: styles.current?.borderRadius
        },
        element: {
          width: `calc(${styles.current.width} - ${borderWidth} - ${borderWidth})`,
          height: `calc(${styles.current.height} - ${borderWidth} - ${borderWidth})`
        }
      })
    }
  }, [borderWidth, effectBoxSizing])

  // use reveal effect
  useRevealEffect({
    borderSelector: insiderBorderRef,
    elementSelector: insiderElementRef
  }, restConfig);

  /** default effectBoxSizing is content-box */
  if(effectBoxSizing === "border-box"){
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
  } else if(effectBoxSizing === "safe"){
    return (
      <Tag ref={ref}
        style={{position: "relative", borderRadius: styles.current?.borderRadius, ...style}}
        className={className}
        {...restProps}
      >
        <span ref={forkBorderRef}
          style={{
            position: "absolute",
            top: `-${borderWidth}`,
            left: `-${borderWidth}`,
            display: "block",
            width: `calc(100% + ${borderWidth} + ${borderWidth})`,
            height: `calc(100% + ${borderWidth} + ${borderWidth})`,
            borderRadius: styles.current?.borderRadius,
            zIndex: 1,
            ...borderStyle
          }}
          className={borderClassName}
        ></span>
        {cloneElement(
          child,
          {style: {position: "relative", zIndex: 1}, ref: insiderElementRef},
        )}
      </Tag>
    );
  } else {
    return (
      <Tag ref={forkContainerRef}
        style={{padding: borderWidth, borderRadius: styles.current?.borderRadius, ...style }}
        className={className}
        {...restProps}
      >
        {cloneElement(
          child,
          {ref: insiderElementRef},
        )}
      </Tag>
    );
  }
}) as OverridableComponent<RevealEffectComponentTypeMap<BoxSizingType>>

export default RevealEffect;