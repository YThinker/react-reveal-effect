import { CSSProperties, ElementType, MutableRefObject, ReactElement } from "react";

export interface OptionsObject {
  [key: string]: any;
}

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
  mountOnBody?: boolean;
  component?: ElementType;
  config?: EffectOptionsType;
  [key: string]: any;
}

export type EffectElement = HTMLElement | (() => HTMLElement) | Element | null;
export type EffectElementRef = MutableRefObject<HTMLElement|null>;
export type EffectElements = EffectElement[];
export type EffectElementRefs = Array<MutableRefObject<HTMLElement|null>>;

export interface PreProcessElement {
  oriBg: CSSStyleDeclaration["backgroundImage"],
  el: HTMLElement,
  removeMouseListener: RemoveMouseListener
}
export interface RemoveMouseListener {
  mousedown: (() => void) | null;
  mouseup: (() => void) | null;
  mousemove: (() => void) | null;
  mouseleave: (() => void) | null;
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
  borderWidth?: string|number,
  borderRadius?: string|number,

  /**
   * 是否使用非入侵式包裹光效
   * @description "parcel" 使用对布局有影响的光效包裹元素，包裹使用光效的元素的父元素会有一段溢出的宽高
   * @description "shrink" 破坏性更改使用光效的元素，缩放使用光效的元素的宽高
   * @description "safe" 不对布局产生影响，也不更改使用光效的元素，通过插入一个absolute元素的方式添加边框光效（可能会被overflow遮挡）
   */
  parcel?: PracelType,
}

export interface RevealEffectProps  {
  component?: ElementType;
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

  [key: string]: any;
}

export interface ApplyEffectInfoType {
  borderIsIntersected: boolean[] | undefined;
  elementIsIntersected: boolean[] | undefined;
  removeEffect: () => void;
}
export type ApplyEffectType = (
  selector: HTMLElement | Array<HTMLElement>,
  isContainer: boolean,
  options: GlobalEffectConfigType,
  pageX: number, pageY: number,
  initObject: MutableRefObject<InitObjectType | undefined>
) => ApplyEffectInfoType