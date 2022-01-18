import { CSSProperties, MutableRefObject, ReactElement } from "react";

export interface PositionProps {
  pageX: number|null,
  pageY: number|null,
}

export interface GlobalEffectConfigType {
  borderColor: string,
  lightColor: string,
  clickEffectColor: string,
  clickEffect: boolean,
  borderGradientSize: number,
  lightGradientSize: number,
  clickEffectGradientSize: number,
  effectBorder: boolean,
  effectBackground: boolean,
}
export interface EffectOptionsType {
  borderColor?: string,
  lightColor?: string,
  clickEffectColor?: string,
  clickEffect?: boolean,
  borderGradientSize?: number,
  lightGradientSize?: number,
  clickEffectGradientSize?: number,
  effectBorder?: boolean,
  effectBackground?: boolean,
}

export interface ConfigComponentProps {
  config?: EffectOptionsType
}

export type EffectElement = HTMLElement | (() => HTMLElement) | Element;
export type EffectElements = EffectElement[];

export interface PreProcessElement {
  oriBg: CSSStyleDeclaration["backgroundImage"],
  el: HTMLElement,
  removeMouseListener: Array<() => void> | null
}

export type PreProcessElements = Array<PreProcessElement>;

export interface InitObjectType {
  options: GlobalEffectConfigType,
  childrenBorder?: PreProcessElements,
  children?: PreProcessElements,
  isPressed: boolean
}

type PracelType = "parcel"|"shrink"|"safe";
export interface RevealEffectStylesType extends EffectOptionsType {
  borderWidth?: string,
  borderRadius?: string,

  /**
   * 是否使用非入侵式包裹光效
   * @description "parcel" 使用对布局有影响的光效包裹元素，包裹使用光效的元素的父元素会有一段溢出的宽高
   * @description "shrink" 破坏性更改使用光效的元素，缩放使用光效的元素的宽高
   * @description "safe" 不对布局产生影响，也不更改使用光效的元素，通过插入一个absolute元素的方式添加边框光效（可能会被overflow遮挡）
   */
  parcel?: PracelType,
}

export interface RevealEffectProps  {
  config?: RevealEffectStylesType;
  children: ReactElement<HTMLElement>;

  /**
   * @description container style
   */
  style?: CSSProperties | undefined;

  /**
   * @description container className
   */
  className?: string | undefined;

  /**
   * @description (It works only when parcel = "shrink") border style
   */
  borderStyle?: CSSProperties | undefined;

  /**
   * @description (It works only when parcel = "shrink") border style
   */
  borderClassName?: string | undefined;

  /**
   * @description border ref
   */
  borderRef?: MutableRefObject<HTMLDivElement | null>;
}