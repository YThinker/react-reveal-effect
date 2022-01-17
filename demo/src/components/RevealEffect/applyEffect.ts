import { MutableRefObject } from "react";
import * as Helpers from "./helpers";

import { EffectElement, EffectElements, EffectOptions, InitObject, PreProcessElement } from "./types";

export function applyEffect(
  borderSelector: EffectElement | EffectElements | undefined,
  selector: EffectElement | EffectElements | undefined,
  options: EffectOptions,
  pageX: number,
  pageY: number,
  initObject: MutableRefObject<InitObject | undefined>
) {

  function init() {

    if (initObject.current) {
      return;
    }

    const _options = {
      borderColor: "rgba(255,255,255,0.25)",
      lightColor: "rgba(255,255,255,0.25)",
      clickEffect: false,
      borderGradientSize: 150,
      lightGradientSize: 150,
      effectBorder: true,
      effectBackground: true,
    }

    initObject.current = {
      options: Object.assign(_options, options),
      childrenBorder: borderSelector ? getPreProcessElements(borderSelector) : undefined,
      children: selector ? getPreProcessElements(selector) : undefined,
      isPressed: false
    };
  }

  function getPreProcessElements(selector: EffectElement | EffectElements) {
    let els;
    if (selector instanceof Array) {
      els = Helpers.preProcessElements(selector.map(item => {
        if (typeof item === "function") {
          return item();
        } else {
          return item as HTMLElement;
        }
      }))
    } else {
      if (typeof selector === "function") {
        els = Helpers.preProcessElements([selector()])
      } else {
        els = Helpers.preProcessElements([selector as HTMLElement]);
      }
    }
    return els;
  }

  init();

  const initObjectCopy = initObject.current as InitObject;


  function clearEffect(element: PreProcessElement) {
    initObjectCopy.isPressed = false
    element.el.style.backgroundImage = element.oriBg
  }


  function enableBackgroundEffects(
    element: PreProcessElement,
    lightColor: string,
    gradientSize: number,
  ) {

    if (element.removeMouseListener?.length && element.removeMouseListener?.length >= 2) {
      return;
    }
    //element background effect --------------------
    const handleMousemoveEvent = (e: MouseEvent) => {
      let x = e.pageX - Helpers.getOffset(element).left - window.scrollX
      let y = e.pageY - Helpers.getOffset(element).top - window.scrollY

      if (initObjectCopy?.options.clickEffect && initObjectCopy?.isPressed) {
        let cssLightEffect = `radial-gradient(circle ${70}px at ${x}px ${y}px, rgba(255,255,255,0), ${lightColor}, rgba(255,255,255,0), rgba(255,255,255,0))`;
        initObjectCopy.options.effectBackground && (cssLightEffect += `, radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${lightColor}, rgba(255,255,255,0))`)

        Helpers.drawEffect(element, x, y, lightColor, gradientSize, cssLightEffect)
      }
      else if(initObjectCopy.options.effectBackground){
        Helpers.drawEffect(element, x, y, lightColor, gradientSize)
      }
    }
    element.el.addEventListener("mousemove", handleMousemoveEvent)
    element.removeMouseListener = [() => element.el.removeEventListener("mousemove", handleMousemoveEvent)]

    const handleMouseleaveEvent = () => {
      clearEffect(element)
    }
    element.el.addEventListener("mouseleave", handleMouseleaveEvent)
    element.removeMouseListener.push(() => element.el.removeEventListener("mouseleave", handleMouseleaveEvent))
  }



  function enableClickEffects(
    element: PreProcessElement,
    lightColor: string,
    gradientSize: number
  ) {

    if (element.removeMouseListener?.length && element.removeMouseListener?.length > 2) {
      return;
    }
    const handleMousedownEvent = (e: MouseEvent) => {
      initObjectCopy.isPressed = true
      const x = e.pageX - Helpers.getOffset(element).left - window.scrollX
      const y = e.pageY - Helpers.getOffset(element).top - window.scrollY

      let cssLightEffect = `radial-gradient(circle ${70}px at ${x}px ${y}px, rgba(255,255,255,0), ${lightColor}, rgba(255,255,255,0), rgba(255,255,255,0))`;
      initObjectCopy.options.effectBackground && (cssLightEffect += `, radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${lightColor}, rgba(255,255,255,0))`)

      Helpers.drawEffect(element, x, y, lightColor, gradientSize, cssLightEffect)
    }
    element.el.addEventListener("mousedown", handleMousedownEvent)
    element.removeMouseListener?.push(() => element.el.removeEventListener("mousedown", handleMousedownEvent))


    const handleMouseupEvent = (e: MouseEvent) => {
      initObjectCopy.isPressed = false
      const x = e.pageX - Helpers.getOffset(element).left - window.scrollX
      const y = e.pageY - Helpers.getOffset(element).top - window.scrollY

      initObjectCopy.options.effectBackground ?
      Helpers.drawEffect(element, x, y, lightColor, gradientSize) : 
      clearEffect(element);
    }
    element.el.addEventListener("mouseup", handleMouseupEvent)
    element.removeMouseListener?.push(() => element.el.removeEventListener("mouseup", handleMouseupEvent))
  }

  if (initObjectCopy.options.effectBorder && initObjectCopy?.childrenBorder) {
    for (let i = 0; i < initObjectCopy.childrenBorder.length; i++) {
      const element = initObjectCopy.childrenBorder[i];
      const options = initObjectCopy.options;
      const x = pageX - Helpers.getOffset(element).left - window.scrollX
      const y = pageY - Helpers.getOffset(element).top - window.scrollY

      if (Helpers.isIntersected(element, pageX, pageY, options.borderGradientSize!)) {
        Helpers.drawEffect(element, x, y, options.borderColor!, options.borderGradientSize!)
      }
      else {
        clearEffect(element);
      }

    }
  }


  if (initObjectCopy?.children) {
    for (let i = 0; i < initObjectCopy.children.length; i++) {
      const element = initObjectCopy.children[i];
      const options = initObjectCopy.options;
      //element background effect
      enableBackgroundEffects(element, options.lightColor!, options.lightGradientSize!)

      //element click effect
      options.clickEffect && enableClickEffects(element, options.lightColor!, options.lightGradientSize!)
    }
  }


  return function removeEffect() {
    const clearEl = (item: PreProcessElement) => {
      clearEffect(item);
      item.removeMouseListener?.forEach(removeHandler => removeHandler())
      item.removeMouseListener = null;
    }

    initObject.current?.childrenBorder?.forEach(item => {
      clearEl(item);
    });
    initObject.current?.children?.forEach(item => {
      clearEl(item);
    })

    initObject.current = undefined;
  }
}
