import { drawEffect, getOffset, getPreProcessElements, handleRemove, isIntersected } from "./utils/helpers";
import { ClassEffectConfigType, EffectType, PreProcessElement, PreProcessElements } from "./types";
import { globalConfig } from "./constants";

export default class revealEffectConstructor<T extends EffectType = 'background-image'> {
  private children?: PreProcessElements
  private childrenBorder?: PreProcessElements
  private isContainer: boolean
  private _config: ClassEffectConfigType<T>;
  private isPressed: boolean = false;
  private rootEventListenerPoints: Array<() => void> = [];
  static globalRoot?: (HTMLElement | typeof window) | null;
  private static globalRootEventListenerPoints: Array<() => void> = [];
  private static globalDrawPoints: Array<revealEffectConstructor<any>> = [];

  constructor(
    selector: HTMLElement | Array<HTMLElement>,
    isContainer: boolean,
    config: ClassEffectConfigType<T>,
  ) {
    this.isContainer = isContainer;
    this.children = (!isContainer && selector) ? getPreProcessElements(selector) : undefined;
    if(config.effectType === "background-image"){
      this.childrenBorder = (isContainer && selector) ? getPreProcessElements(selector) : undefined;
    }
    this._config = Object.assign({}, globalConfig, config)
    this.init();
  }

  private clearEffect(element: PreProcessElement) {
    this.isPressed = false
    element.el.style.backgroundImage = element.oriBg
    element.el.style.borderImage = element.oriBorderBg
  }

  removeChildrenEventListener() {
    this.children?.forEach(item => {
      handleRemove(item);
    })
  }
  removeChildrenBorderEventListener() {
    this.childrenBorder?.forEach(item => {
      handleRemove(item);
    });
  }
  clearAllBackgroundEffect() {
    this.children?.forEach(item => this.clearEffect(item));
  }
  clearAllBorderEffect() {
    this.childrenBorder?.forEach(item => this.clearEffect(item));
  }

  /**
   * @description element mouse move listener
   */
  private enableBackgroundEffects(
    element: PreProcessElement,
  ) {
    if (element.removeMouseListener.mousemove || element.removeMouseListener.mouseleave) {
      return;
    }
    /* element background effect -------------------- */
    const handleMousemoveEvent = (e: MouseEvent) => {
      const { clickColor, elementColor, clickGradientSize, elementGradientSize: gradientSize } = this.config;

      let x = e.pageX - getOffset(element).left - window.scrollX
      let y = e.pageY - getOffset(element).top - window.scrollY

      if (this.config.clickEffect && this.isPressed) {
        let cssLightEffect = `radial-gradient(circle ${clickGradientSize}px at ${x}px ${y}px, rgba(255,255,255,0), ${clickColor || elementColor}, rgba(255,255,255,0), rgba(255,255,255,0))`;
        this.config.elementEffect && (cssLightEffect += `, radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${elementColor}, rgba(255,255,255,0))`)

        drawEffect(element, x, y, elementColor, gradientSize, cssLightEffect)
      }
      else if(this.config.elementEffect){
        drawEffect(element, x, y, elementColor, gradientSize)
      }
    }
    element.el.addEventListener("mousemove", handleMousemoveEvent);
    element.removeMouseListener.mousemove = () => element.el.removeEventListener("mousemove", handleMousemoveEvent);

    const handleMouseleaveEvent = () => {
      this.clearEffect(element)
    }
    element.el.addEventListener("mouseleave", handleMouseleaveEvent)
    element.removeMouseListener.mouseleave = () => element.el.removeEventListener("mouseleave", handleMouseleaveEvent);
  }

  /**
   * @description element mouse click listener
   */
  private enableClickEffects(
    element: PreProcessElement
  ) {
    if (element.removeMouseListener.mousedown || element.removeMouseListener.mouseup) {
      return;
    }
    const handleMousedownEvent = (e: MouseEvent) => {
      this.isPressed = true;

      const { clickColor, elementColor, clickGradientSize, elementGradientSize: gradientSize } = this.config;

      const x = e.pageX - getOffset(element).left - window.scrollX
      const y = e.pageY - getOffset(element).top - window.scrollY

      let cssLightEffect = `radial-gradient(circle ${clickGradientSize}px at ${x}px ${y}px, rgba(255,255,255,0), ${clickColor || elementColor}, rgba(255,255,255,0), rgba(255,255,255,0))`;
      this.config.elementEffect && (cssLightEffect += `, radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${elementColor}, rgba(255,255,255,0))`)

      drawEffect(element, x, y, elementColor, gradientSize, cssLightEffect)
    }
    element.el.addEventListener("mousedown", handleMousedownEvent)
    element.removeMouseListener.mousedown = () => element.el.removeEventListener("mousedown", handleMousedownEvent);


    const handleMouseupEvent = (e: MouseEvent) => {
      this.isPressed = false;

      const { elementColor, elementGradientSize: gradientSize } = this.config;

      const x = e.pageX - getOffset(element).left - window.scrollX
      const y = e.pageY - getOffset(element).top - window.scrollY

      this.config.elementEffect ?
      drawEffect(element, x, y, elementColor, gradientSize) :
      this.clearEffect(element);
    }
    element.el.addEventListener("mouseup", handleMouseupEvent)
    element.removeMouseListener.mouseup = () => element.el.removeEventListener("mouseup", handleMouseupEvent);
  }

  private listenRootEvent() {
    if(this.config.root && !this.rootEventListenerPoints?.length) {
      const handleMouseMove = (e: MouseEvent) => this.draw(e.pageX, e.pageY)
      const handleMouseLeave = () => this.draw(null, null)
      this.config.root.addEventListener("mousemove", handleMouseMove as any);
      this.rootEventListenerPoints.push(() => this.config.root?.removeEventListener('mousemove', handleMouseMove as any))
      this.config.root.addEventListener("mouseleave", handleMouseLeave);
      this.rootEventListenerPoints.push(() => this.config.root?.removeEventListener('mouseleave', handleMouseLeave))
    } else if (revealEffectConstructor.globalRoot) {
      if(!revealEffectConstructor.globalDrawPoints.some(point => point === this)) {
        revealEffectConstructor.globalDrawPoints.push(this);
      }
      if(!revealEffectConstructor.globalRootEventListenerPoints?.length) {
        const handleMouseMove = (e: MouseEvent) => revealEffectConstructor.globalDrawPoints.forEach(point => point.draw(e.pageX, e.pageY))
        const handleMouseLeave = () => revealEffectConstructor.globalDrawPoints.forEach(point => point.draw(null, null))
        revealEffectConstructor.globalRoot.addEventListener("mousemove", handleMouseMove as any);
        revealEffectConstructor.globalRootEventListenerPoints.push(() => revealEffectConstructor.globalRoot?.removeEventListener('mousemove', handleMouseMove as any))
        revealEffectConstructor.globalRoot.addEventListener("mouseleave", handleMouseLeave);
        revealEffectConstructor.globalRootEventListenerPoints.push(() => revealEffectConstructor.globalRoot?.removeEventListener('mouseleave', handleMouseLeave))
      }
    }
  }

  private removeRootEventListener() {
    revealEffectConstructor.globalRootEventListenerPoints.forEach(remove => remove())
    revealEffectConstructor.globalRootEventListenerPoints = []
    revealEffectConstructor.globalDrawPoints = []
    this.rootEventListenerPoints.forEach(remove => remove())
    this.rootEventListenerPoints = [];
  }

  private init() {
    if(this.config.stop) {
      this.removeEffect();
      return;
    }
    this.listenRootEvent();
    if(this.isContainer && !this.config.borderEffect){
      this.removeChildrenBorderEventListener();
      this.clearAllBorderEffect();
    }
    if (!this.isContainer && this.children) {
      for (const element of this.children) {
        //element background effect
        if(this.config.elementEffect) {
          this.enableBackgroundEffects(element)
        } else {
          handleRemove(element, 'mouseleave')
          handleRemove(element, 'mousemove')
          this.clearEffect(element);
        }

        //element click effect
        if(this.config.clickEffect) {
          this.enableClickEffects(element)
        } else {
          handleRemove(element, "mousedown");
          handleRemove(element, "mouseup");
          this.clearEffect(element);
        }
      }
    }
  }

  set config (newConfig: Partial<ClassEffectConfigType<T>>) {
    this._config = Object.assign(this._config, newConfig);
    this.init()
  }

  get config(): ClassEffectConfigType<T> {
    return this._config
  }

  removeEffect() {
    this.removeRootEventListener();
    this.removeChildrenEventListener();
    this.removeChildrenBorderEventListener();
    this.clearAllBorderEffect();
    this.clearAllBackgroundEffect();
  }

  stop() {
    this.config = { stop: true };
  }

  start() {
    this.config = { stop: false };
  }

  draw(pageX: number|null, pageY: number|null) {
    if(this.config.stop || pageX === null || pageY === null){
      this.removeEffect();
      return;
    }

    if (this.isContainer && this.config.borderEffect && this.childrenBorder) {
      for (const element of this.childrenBorder) {
        const x = pageX - getOffset(element).left - window.scrollX
        const y = pageY - getOffset(element).top - window.scrollY

        if (isIntersected(element, pageX, pageY, this.config.borderGradientSize)) {
          drawEffect(element, x, y, this.config.borderColor, this.config.borderGradientSize)
        }
        else {
          this.clearEffect(element);
        }
      }
    }

    /**
     * if effectType is 'border-image', it must hasn't childrenBorder, draw effect on border
     */
    if (!this.isContainer && this.children && this.config.effectType === "border-image") {
      for (const element of this.children) {
        const x = pageX - getOffset(element).left - window.scrollX
        const y = pageY - getOffset(element).top - window.scrollY
        if (isIntersected(element, pageX, pageY, this.config.borderGradientSize)) {
          drawEffect(element, x, y, this.config.borderColor, this.config.borderGradientSize, undefined, this.config.effectType)
        }
        else {
          this.clearEffect(element);
        }
      }
    }
  }
}
