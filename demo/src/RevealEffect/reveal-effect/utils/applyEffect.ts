import { MutableRefObject } from "react";
import { drawEffect, getOffset, getPreProcessElements, handleRemove, isIntersected } from "./helpers";

import { ApplyEffectInfoType, GlobalEffectConfigType, InitObjectType, PreProcessElement } from "../types";

export default function applyEffect(
  selector: HTMLElement | Array<HTMLElement>,
  isContainer: boolean,
  options: GlobalEffectConfigType,
  pageX: number|null,
  pageY: number|null,
  initObject: MutableRefObject<InitObjectType | undefined>
): ApplyEffectInfoType|undefined {

  if(pageX === null || pageY === null){
    return;
  }

  function init() {

    if (initObject.current) {
      return initObject.current;
    }
    return {
      options: Object.assign({}, options),
      childrenBorder: isContainer && selector ? getPreProcessElements(selector) : undefined,
      children: (!isContainer) && selector ? getPreProcessElements(selector) : undefined,
      isPressed: false
    };
  }

  initObject.current = init();
  /**
   * @description To get the newest options
   */
  initObject.current.options = Object.assign({}, options);

  const initObjectCopy = initObject.current;

  /**
   * @description clear effect when options have been changed
   */
  if(!initObjectCopy.options.clickEffect){
    initObjectCopy.children?.forEach(item => {
      handleRemove(item, "mousedown");
      handleRemove(item, "mouseup");
    });
  }
  if(!initObjectCopy.options.effectBorder){
    removeChildrenBorderEventListener();
    clearAllBorderEffect();
  }

  function clearEffect(element: PreProcessElement) {
    initObjectCopy.isPressed = false
    element.el.style.backgroundImage = element.oriBg
  }


  function enableBackgroundEffects(
    element: PreProcessElement,
  ) {

    if (element.removeMouseListener.mousemove || element.removeMouseListener.mouseleave) {
      return;
    }
    //element background effect --------------------
    const handleMousemoveEvent = (e: MouseEvent) => {
      const { clickEffectColor, lightColor, clickEffectGradientSize, lightGradientSize: gradientSize } = initObjectCopy.options;

      let x = e.pageX - getOffset(element).left - window.scrollX
      let y = e.pageY - getOffset(element).top - window.scrollY

      const { options, isPressed } = initObjectCopy;
      if (options.clickEffect && isPressed) {
        let cssLightEffect = `radial-gradient(circle ${clickEffectGradientSize}px at ${x}px ${y}px, rgba(255,255,255,0), ${clickEffectColor || lightColor}, rgba(255,255,255,0), rgba(255,255,255,0))`;
        options.effectBackground && (cssLightEffect += `, radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${lightColor}, rgba(255,255,255,0))`)

        drawEffect(element, x, y, lightColor, gradientSize, cssLightEffect)
      }
      else if(options.effectBackground){
        drawEffect(element, x, y, lightColor, gradientSize)
      }
    }
    element.el.addEventListener("mousemove", handleMousemoveEvent);
    element.removeMouseListener.mousemove = () => element.el.removeEventListener("mousemove", handleMousemoveEvent);

    const handleMouseleaveEvent = () => {
      clearEffect(element)
    }
    element.el.addEventListener("mouseleave", handleMouseleaveEvent)
    element.removeMouseListener.mouseleave = () => element.el.removeEventListener("mouseleave", handleMouseleaveEvent);
  }



  function enableClickEffects(
    element: PreProcessElement
  ) {

    if (element.removeMouseListener.mousedown || element.removeMouseListener.mouseup) {
      return;
    }
    const handleMousedownEvent = (e: MouseEvent) => {
      initObjectCopy.isPressed = true;

      const { clickEffectColor, lightColor, clickEffectGradientSize, lightGradientSize: gradientSize } = initObjectCopy.options;

      const x = e.pageX - getOffset(element).left - window.scrollX
      const y = e.pageY - getOffset(element).top - window.scrollY

      let cssLightEffect = `radial-gradient(circle ${clickEffectGradientSize}px at ${x}px ${y}px, rgba(255,255,255,0), ${clickEffectColor || lightColor}, rgba(255,255,255,0), rgba(255,255,255,0))`;
      initObjectCopy.options.effectBackground && (cssLightEffect += `, radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${lightColor}, rgba(255,255,255,0))`)

      drawEffect(element, x, y, lightColor, gradientSize, cssLightEffect)
    }
    element.el.addEventListener("mousedown", handleMousedownEvent)
    element.removeMouseListener.mousedown = () => element.el.removeEventListener("mousedown", handleMousedownEvent);


    const handleMouseupEvent = (e: MouseEvent) => {
      initObjectCopy.isPressed = false;

      const { lightColor, lightGradientSize: gradientSize } = initObjectCopy.options;

      const x = e.pageX - getOffset(element).left - window.scrollX
      const y = e.pageY - getOffset(element).top - window.scrollY

      initObjectCopy.options.effectBackground ?
      drawEffect(element, x, y, lightColor, gradientSize) :
      clearEffect(element);
    }
    element.el.addEventListener("mouseup", handleMouseupEvent)
    element.removeMouseListener.mouseup = () => element.el.removeEventListener("mouseup", handleMouseupEvent);
  }

  if (isContainer && initObjectCopy.options.effectBorder && initObjectCopy?.childrenBorder) {
    for (let i = 0; i < initObjectCopy.childrenBorder.length; i++) {
      const element = initObjectCopy.childrenBorder[i];
      const options = initObjectCopy.options;
      const x = pageX - getOffset(element).left - window.scrollX
      const y = pageY - getOffset(element).top - window.scrollY

      if (isIntersected(element, pageX, pageY, options.borderGradientSize)) {
        drawEffect(element, x, y, options.borderColor, options.borderGradientSize)
      }
      else {
        clearEffect(element);
      }

    }
  }

  if (!isContainer && initObjectCopy?.children) {
    for (let i = 0; i < initObjectCopy.children.length; i++) {
      const element = initObjectCopy.children[i];
      const options = initObjectCopy.options;
      //element background effect
      enableBackgroundEffects(element)

      //element click effect
      options.clickEffect && enableClickEffects(element)
    }
  }



  function removeChildrenEventListener() {
    initObject.current?.children?.forEach(item => {
      handleRemove(item);
    })
  }
  function removeChildrenBorderEventListener() {
    initObject.current?.childrenBorder?.forEach(item => {
      handleRemove(item);
    });
  }
  function clearAllBackgroundEffect() {
    initObject.current?.children?.forEach(item => clearEffect(item));
  }
  function clearAllBorderEffect() {
    initObject.current?.childrenBorder?.forEach(item => clearEffect(item));
  }
  /**
   * @description Clear Effect
   */
  return {
    borderIsIntersected: initObjectCopy.childrenBorder?.map(element => isIntersected(element, pageX, pageY, options.borderGradientSize)),
    elementIsIntersected: initObjectCopy.children?.map(element => isIntersected(element, pageX, pageY, options.borderGradientSize)),
    removeEffect() {
      removeChildrenEventListener();
      removeChildrenBorderEventListener();
      clearAllBorderEffect();
      clearAllBackgroundEffect();
      initObject.current = undefined;
    }
  }
}
