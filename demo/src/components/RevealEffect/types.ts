import { ReactElement } from "react";

export interface PositionProps {
  pageX: number|null,
  pageY: number|null,
}

export interface EffectConfigProps {
  borderColor?: string,
  lightColor?: string,
  clickEffect?: boolean,
  borderGradientSize?: number,
  lightGradientSize?: number
}

export interface ConfigComponentProps {
  config?: EffectConfigProps
}

export type EffectElement = HTMLElement | (() => HTMLElement) | Element;
export type EffectElements = EffectElement[];

export interface EffectOptions extends EffectConfigProps {
  effectBorder?: boolean,
  effectBackground?: boolean,
}

export interface PreProcessElement {
  oriBg: CSSStyleDeclaration["backgroundImage"],
  el: HTMLElement,
  removeMouseListener: Array<() => void> | null
}

export type PreProcessElements = Array<PreProcessElement>;

export interface InitObject {
  options: EffectOptions,
  childrenBorder?: PreProcessElements,
  children?: PreProcessElements,
  isPressed: boolean
}

type Pracel = "parcel"|"shrink"|"safe";
export interface RevealEffectStyles extends EffectOptions {
  borderWidth?: string,
  borderRadius?: string,

  /**
   * 是否使用非入侵式包裹光效
   * @description "parcel" 使用对布局有影响的光效包裹元素，包裹使用光效的元素的父元素会有一段溢出的宽高
   * @discard （未生效）"shrink" 破坏性更改使用光效的元素，缩放使用光效的元素的宽高
   * @description "safe" 不对布局产生影响，也不更改使用光效的元素，通过插入一个absolute元素的方式添加边框光效（可能会被overflow遮挡）
   */
  parcel?: Pracel,
}

export interface RevealEffectProps  {
  config: RevealEffectStyles,
  children: ReactElement<HTMLElement>
}