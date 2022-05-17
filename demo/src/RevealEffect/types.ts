import { ComponentPropsWithRef, CSSProperties, ElementType, MutableRefObject, PropsWithChildren, ReactElement } from "react";

export type DistributiveOmit<T, U> = T extends any
  ? Pick<T, Exclude<keyof T, U>>
  : never;

export interface OverridableTypeMap {
  props: {};
  defaultComponent: ElementType;
}

/**
* Props defined on the component
*/
// prettier-ignore
export type BaseProps<M extends OverridableTypeMap> = M['props'] & CommonProps;

/**
* Props of the component if `component={Component}` is used.
*/
// prettier-ignore
export type OverrideProps<
  M extends OverridableTypeMap,
  C extends ElementType
  > = (
    & BaseProps<M>
    & DistributiveOmit<ComponentPropsWithRef<C>, keyof BaseProps<M>>
  );

/**
* Props if `component={Component}` is NOT used.
*/
// prettier-ignore
export type DefaultComponentProps<M extends OverridableTypeMap> =
  & BaseProps<M>
  & DistributiveOmit<ComponentPropsWithRef<M['defaultComponent']>, keyof BaseProps<M>>;

/**
* Props that are valid for material-ui components.
*/
// each component declares it's classes in a separate interface for proper JSDoc.
export interface CommonProps {
  className?: string;
  // style?: CSSProperties;
}
/**
 * A component whose root component can be controlled via a `component` prop.
 *
 * Adjusts valid props based on the type of `component`.
 */
export interface OverridableComponent<M extends OverridableTypeMap> {
  <C extends ElementType>(
    props: {
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: C;
    } & OverrideProps<M, C>,
  ): JSX.Element;
  (props: DefaultComponentProps<M>): JSX.Element;
}



export interface PositionProps {
  pageX: number | null,
  pageY: number | null,
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

type CustomPartial<T> = {
  [K in keyof T]?: T[K] | undefined;
}
export interface EffectOptionsType extends CustomPartial<GlobalEffectConfigType> {}


export interface ConfigComponentProps<B extends boolean> {
  mountOnBody?: B;
  config?: EffectOptionsType;
  component?: B extends true ? never : ElementType;
}
export interface ConfigComponentTypeMap<B extends boolean = true, D extends ElementType = 'div', P = {}> {
  props: P & PropsWithChildren<ConfigComponentProps<B>>;
  defaultComponent: D;
}

export type EffectElement = (() => Element) | Element | null | undefined;
export type EffectElementRef = MutableRefObject<HTMLElement | null>;
export type EffectElements = EffectElement[];
export type EffectElementRefs = Array<MutableRefObject<HTMLElement | null>>;

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

type PracelType = "parcel" | "shrink" | "safe";
export interface RevealEffectStylesType extends EffectOptionsType {
  borderWidth?: string | number,
  borderRadius?: string | number,

  /**
   * 是否使用非入侵式包裹光效
   * @description "parcel" 使用对布局有影响的光效包裹元素，包裹使用光效的元素的父元素会有一段溢出的宽高
   * @description "shrink" 破坏性更改使用光效的元素，缩放使用光效的元素的宽高
   * @description "safe" 不对布局产生影响，也不更改使用光效的元素，通过插入一个absolute元素的方式添加边框光效（可能会被overflow遮挡）
   * @default "safe"
   */
  parcel?: PracelType,
}

export interface RevealEffectComponentProps {
  component?: ElementType;
  config?: RevealEffectStylesType;
  children: ReactElement<HTMLElement>;

  /**
   * @description container style
   */
  // style?: CSSProperties | undefined;

  /**
   * @description container className
   */
  // className?: string | undefined;

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

  // [key: string]: any;
}
export interface RevealEffectComponentTypeMap<D extends ElementType = 'div', P = {}> {
  props: P & PropsWithChildren<RevealEffectComponentProps>;
  defaultComponent: D;
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