import { drawEffect, getOffset, getPreProcessElements, handleRemove, isIntersected } from "./utils/helpers";
import { ClassEffectConfigType, EffectConfigType, EffectType, PreProcessElement, PreProcessElements } from "./types";
import { globalConfig } from "./constants";

export default class RevealEffectConstructor<T extends EffectType = 'background-image'> {

  private children?: PreProcessElements
  private childrenBorder?: PreProcessElements
  private _config: ClassEffectConfigType<T>;
  private isPressed: boolean = false;

  private rootEventListenerPoints: Array<() => void> = [];
  private static _globalRoot?: (HTMLElement | typeof window) | null;
  private static globalRootEventListenerPoints: Array<() => void> = [];
  private static globalDrawPoints: Array<RevealEffectConstructor<any>> = [];

  constructor(
    selector: {
      borderSelector?: HTMLElement | Array<HTMLElement> | null,
      elementSelector?: HTMLElement | Array<HTMLElement> | null,
    },
    config: EffectConfigType<T>,
  ) {
    this.children = selector.elementSelector ? getPreProcessElements(selector.elementSelector) : undefined;
    if(config.effectType === "background-image"){
      this.childrenBorder = selector.borderSelector ? getPreProcessElements(selector.borderSelector) : undefined;
    }
    /** 初始化内部_config，阻止ts{_config未赋值}报错 */
    this._config = Object.assign({}, globalConfig, config)
    this.init();
  }

  /** 清除光效的工具函数 */
  private clearEffect(element: PreProcessElement) {
    this.isPressed = false
    element.el.style.backgroundImage = element.oriBg
    element.el.style.borderImage = element.oriBorderBg
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

  /** 挂载全局监听 */
  private listenRootEvent() {
    if(this.config.root && !this.rootEventListenerPoints?.length) {
      const handleMouseMove = (e: MouseEvent) => this.draw(e.pageX, e.pageY)
      const handleMouseLeave = () => this.draw(null, null)
      this.config.root.addEventListener("mousemove", handleMouseMove as any);
      this.rootEventListenerPoints.push(() => this.config.root?.removeEventListener('mousemove', handleMouseMove as any))
      this.config.root.addEventListener("mouseleave", handleMouseLeave);
      this.rootEventListenerPoints.push(() => this.config.root?.removeEventListener('mouseleave', handleMouseLeave))
    } else if (!RevealEffectConstructor.globalDrawPoints.some(point => point === this)) {
      RevealEffectConstructor.globalDrawPoints.push(this);
    }
  }

  /** 卸载监听及清除绘制 */
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

  /** 卸载root监听 */
  private removeRootEventListener() {
    RevealEffectConstructor.globalDrawPoints.filter(point => point !== this)
    this.rootEventListenerPoints.forEach(remove => remove())
    this.rootEventListenerPoints = [];
  }

  /** 启动、暂停绘制 */
  stop() {
    this.config = { stop: true };
  }
  start() {
    this.config = { stop: false };
  }

  /** 卸载监听，清除光效 */
  off() {
    this.removeRootEventListener();
    this.removeChildrenEventListener();
    this.removeChildrenBorderEventListener();
    this.clearAllBackgroundEffect();
    this.clearAllBorderEffect();
    this.children = undefined;
    this.childrenBorder = undefined;
    this.config.root = undefined;
  }

  /** 初始化 */
  private init(preConfig?: ClassEffectConfigType<T>) {
    // 暂停时清除所有绘制的光效
    if(this.config.stop) {
      this.clearAllBackgroundEffect();
      this.clearAllBorderEffect();
      return;
    }
    // config中root变更时，卸载监听，重新挂载
    if(preConfig?.root !== this.config.root) {
      this.removeRootEventListener();
    }
    if(preConfig?.root !== this.config.root || !this.config.root) {
      this.listenRootEvent();
    }
    // borderEffect为false时清除border绘制的光效
    if(!this.config.borderEffect){
      this.removeChildrenBorderEventListener();
      this.clearAllBorderEffect();
    }
    // children存在时处理
    if (this.children) {
      for (const element of this.children) {
        //element background effect
        if(this.config.elementEffect) {
          this.enableBackgroundEffects(element)
        } else if(preConfig?.elementEffect){
          handleRemove(element, 'mouseleave')
          handleRemove(element, 'mousemove')
          this.clearEffect(element);
        }

        //element click effect
        if(this.config.clickEffect) {
          this.enableBackgroundEffects(element)
          this.enableClickEffects(element)
        } else if(preConfig?.clickEffect){
          handleRemove(element, "mousedown");
          handleRemove(element, "mouseup");
          this.clearEffect(element);
        }
      }
    }
  }

  /** 配置 监听配置变更重新初始化 */
  set config (newConfig: Partial<ClassEffectConfigType<T>>) {
    const preConfig = {...this._config};
    this._config = Object.assign(this._config, newConfig);
    this.init(preConfig)
  }
  get config(): ClassEffectConfigType<T> {
    return this._config
  }

  /** 公用root节点，重新挂载公用监听 */
  static set globalRoot (newGlobalRoot) {
    RevealEffectConstructor._globalRoot = newGlobalRoot;
    RevealEffectConstructor.unmount();
    RevealEffectConstructor.mount()
  }
  static get globalRoot () {
    return RevealEffectConstructor._globalRoot;
  }

  /** 挂载、卸载公用监听 */
  static mount () {
    if(RevealEffectConstructor.globalRoot && !RevealEffectConstructor.globalRootEventListenerPoints?.length) {
      const handleMouseMove = (e: MouseEvent) => RevealEffectConstructor.globalDrawPoints.forEach(point => point.draw(e.pageX, e.pageY))
      const handleMouseLeave = () => RevealEffectConstructor.globalDrawPoints.forEach(point => point.draw(null, null))
      RevealEffectConstructor.globalRoot.addEventListener("mousemove", handleMouseMove as any);
      RevealEffectConstructor.globalRootEventListenerPoints.push(() => RevealEffectConstructor.globalRoot?.removeEventListener('mousemove', handleMouseMove as any))
      RevealEffectConstructor.globalRoot.addEventListener("mouseleave", handleMouseLeave);
      RevealEffectConstructor.globalRootEventListenerPoints.push(() => RevealEffectConstructor.globalRoot?.removeEventListener('mouseleave', handleMouseLeave))
    }
  }
  static unmount () {
    RevealEffectConstructor.globalRootEventListenerPoints.forEach(remove => remove())
    RevealEffectConstructor.globalRootEventListenerPoints = []
  }

  /** 绘制 */
  draw(pageX: number|null, pageY: number|null) {
    if(this.config.stop || pageX === null || pageY === null){
      this.clearAllBackgroundEffect();
      this.clearAllBorderEffect();
      return;
    }

    if (this.config.borderEffect && this.childrenBorder) {
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
    if (this.children && this.config.effectType === "border-image") {
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
