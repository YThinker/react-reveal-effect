import { MutableRefObject } from "react";
import { clearAllBackgroundEffect, clearAllBorderEffect, clearEffect, drawEffect, getOffset, handleRemove, init, isIntersected, removeChildrenBorderEventListener, removeChildrenEventListener } from "./helpers";

import { ApplyEffectInfoType, EffectType, GlobalEffectConfigType, InitObjectType, PreProcessElement } from "../types";

export default function applyEffect<T extends EffectType>(
  selector: HTMLElement | Array<HTMLElement>,
  isContainer: boolean,
  config: GlobalEffectConfigType<T>,
  pageX: number|null,
  pageY: number|null,
  initObject: MutableRefObject<InitObjectType<T> | undefined>
): ApplyEffectInfoType|undefined {

  if(pageX === null || pageY === null){
    return;
  }

  initObject.current = init<T>(initObject, config, isContainer, selector);
  /**
   * @description To get the newest config
   */
  initObject.current.config = Object.assign({}, config);

  const initObjectCopy = initObject.current;

  /**
   * @description clear effect when config have been changed
   */
  if(!initObjectCopy.config.clickEffect){
    initObjectCopy.children?.forEach(item => {
      handleRemove(item, "mousedown");
      handleRemove(item, "mouseup");
    });
  }
  if(!initObjectCopy.config.borderEffect){
    removeChildrenBorderEventListener(initObjectCopy);
    clearAllBorderEffect(initObjectCopy);
  }

  /**
   * @description element mouse move listener
   */
  function enableBackgroundEffects(
    element: PreProcessElement,
  ) {

    if (element.removeMouseListener.mousemove || element.removeMouseListener.mouseleave) {
      return;
    }
    /* element background effect -------------------- */
    const handleMousemoveEvent = (e: MouseEvent) => {
      const { clickColor, elementColor, clickGradientSize, elementGradientSize: gradientSize } = initObjectCopy.config;

      let x = e.pageX - getOffset(element).left - window.scrollX
      let y = e.pageY - getOffset(element).top - window.scrollY

      const { config, isPressed } = initObjectCopy;
      if (config.clickEffect && isPressed) {
        let cssLightEffect = `radial-gradient(circle ${clickGradientSize}px at ${x}px ${y}px, rgba(255,255,255,0), ${clickColor || elementColor}, rgba(255,255,255,0), rgba(255,255,255,0))`;
        config.elementEffect && (cssLightEffect += `, radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${elementColor}, rgba(255,255,255,0))`)

        drawEffect(element, x, y, elementColor, gradientSize, cssLightEffect)
      }
      else if(config.elementEffect){
        drawEffect(element, x, y, elementColor, gradientSize)
      }
    }
    element.el.addEventListener("mousemove", handleMousemoveEvent);
    element.removeMouseListener.mousemove = () => element.el.removeEventListener("mousemove", handleMousemoveEvent);

    const handleMouseleaveEvent = () => {
      clearEffect(initObjectCopy, element)
    }
    element.el.addEventListener("mouseleave", handleMouseleaveEvent)
    element.removeMouseListener.mouseleave = () => element.el.removeEventListener("mouseleave", handleMouseleaveEvent);
  }

  /**
   * @description element mouse click listener
   */
  function enableClickEffects(
    element: PreProcessElement
  ) {

    if (element.removeMouseListener.mousedown || element.removeMouseListener.mouseup) {
      return;
    }
    const handleMousedownEvent = (e: MouseEvent) => {
      initObjectCopy.isPressed = true;

      const { clickColor, elementColor, clickGradientSize, elementGradientSize: gradientSize } = initObjectCopy.config;

      const x = e.pageX - getOffset(element).left - window.scrollX
      const y = e.pageY - getOffset(element).top - window.scrollY

      let cssLightEffect = `radial-gradient(circle ${clickGradientSize}px at ${x}px ${y}px, rgba(255,255,255,0), ${clickColor || elementColor}, rgba(255,255,255,0), rgba(255,255,255,0))`;
      initObjectCopy.config.elementEffect && (cssLightEffect += `, radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${elementColor}, rgba(255,255,255,0))`)

      drawEffect(element, x, y, elementColor, gradientSize, cssLightEffect)
    }
    element.el.addEventListener("mousedown", handleMousedownEvent)
    element.removeMouseListener.mousedown = () => element.el.removeEventListener("mousedown", handleMousedownEvent);


    const handleMouseupEvent = (e: MouseEvent) => {
      initObjectCopy.isPressed = false;

      const { elementColor, elementGradientSize: gradientSize } = initObjectCopy.config;

      const x = e.pageX - getOffset(element).left - window.scrollX
      const y = e.pageY - getOffset(element).top - window.scrollY

      initObjectCopy.config.elementEffect ?
      drawEffect(element, x, y, elementColor, gradientSize) :
      clearEffect(initObjectCopy, element);
    }
    element.el.addEventListener("mouseup", handleMouseupEvent)
    element.removeMouseListener.mouseup = () => element.el.removeEventListener("mouseup", handleMouseupEvent);
  }

  if (isContainer && initObjectCopy.config.borderEffect && initObjectCopy?.childrenBorder) {
    for (let i = 0; i < initObjectCopy.childrenBorder.length; i++) {
      const element = initObjectCopy.childrenBorder[i];
      const config = initObjectCopy.config;
      const x = pageX - getOffset(element).left - window.scrollX
      const y = pageY - getOffset(element).top - window.scrollY

      if (isIntersected(element, pageX, pageY, config.borderGradientSize)) {
        drawEffect(element, x, y, config.borderColor, config.borderGradientSize)
      }
      else {
        clearEffect(initObjectCopy, element);
      }

    }
  }

  if (!isContainer && initObjectCopy?.children) {
    for (let i = 0; i < initObjectCopy.children.length; i++) {
      const element = initObjectCopy.children[i];
      const config = initObjectCopy.config;
      if(config.effectType === "border-image") {
        const x = pageX - getOffset(element).left - window.scrollX
        const y = pageY - getOffset(element).top - window.scrollY
        if (isIntersected(element, pageX, pageY, config.borderGradientSize)) {
          drawEffect(element, x, y, config.borderColor, config.borderGradientSize, undefined, config.effectType)
        }
        else {
          clearEffect(initObjectCopy, element);
        }
      }
      //element background effect
      enableBackgroundEffects(element)

      //element click effect
      config.clickEffect && enableClickEffects(element)
    }
  }

  /**
   * @description Clear Effect
   */
  return {
    borderIsIntersected: initObjectCopy.childrenBorder?.map(element => isIntersected(element, pageX, pageY, config.borderGradientSize)),
    elementIsIntersected: initObjectCopy.children?.map(element => isIntersected(element, pageX, pageY, config.borderGradientSize)),
    removeEffect() {
      removeChildrenEventListener(initObjectCopy);
      removeChildrenBorderEventListener(initObjectCopy);
      clearAllBorderEffect(initObjectCopy);
      clearAllBackgroundEffect(initObjectCopy);
      initObject.current = undefined;
    }
  }
}
