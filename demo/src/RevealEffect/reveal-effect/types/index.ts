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

export type EffectType = "background-image" | "border-image";
export interface GlobalEffectConfigType<T extends EffectType> {
  borderEffect: boolean,
  elementEffect: boolean,
  clickEffect: boolean,
  borderColor: string,
  elementColor: string,
  clickColor: string,
  borderGradientSize: number,
  elementGradientSize: number,
  clickGradientSize: number,
  stop: boolean;
  effectType: T;
}

type CustomPartial<T> = {
  [K in keyof T]?: T[K] | undefined;
}
export interface EffectConfigType<T extends EffectType> extends CustomPartial<GlobalEffectConfigType<T>> { }


export interface ConfigComponentProps<T extends EffectType, B extends boolean> {
  mountOnBody?: B;
  config?: EffectConfigType<T>;
  component?: B extends true ? never : ElementType;
  off?: boolean;
}
export interface ConfigComponentTypeMap<T extends EffectType = "background-image", B extends boolean = true, D extends ElementType = 'div', P = {}> {
  props: P & PropsWithChildren<ConfigComponentProps<T, B>>;
  defaultComponent: D;
}

export type EffectElement = (() => Element) | Element | null | undefined;
export type EffectElementRef = MutableRefObject<HTMLElement | null>;
export type EffectElements = EffectElement[];
export type EffectElementRefs = Array<MutableRefObject<HTMLElement | null>>;

export interface PreProcessElement {
  oriBg: CSSStyleDeclaration["backgroundImage"],
  oriBorderBg: CSSStyleDeclaration["borderImage"],
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

export interface InitObjectType<T extends EffectType> {
  config: GlobalEffectConfigType<T>,
  childrenBorder?: PreProcessElements,
  children?: PreProcessElements,
  isPressed: boolean
}

export type BoxSizingType = "content-box" | "border-box" | "safe";
export interface RevealEffectStylesType<T extends EffectType, B extends BoxSizingType = "content-box"> extends EffectConfigType<T> {
  borderWidth?: T extends "border-image" ? never : string | number,

  /**
   * 是否使用非入侵式包裹光效
   * @description "content-box" 使用对布局有影响的光效包裹元素，包裹使用光效的元素的父元素会有一段溢出的宽高
   * @description "border-box" 破坏性更改使用光效的元素，缩放使用光效的元素的宽高
   * @description "safe" 不对布局产生影响，也不更改使用光效的元素，通过插入一个absolute元素的方式添加边框光效（可能会被overflow遮挡）
   * @default "content-box"
   */
  effectBoxSizing?: T extends "border-image" ? never : B,
}

export interface RevealEffectComponentProps<T extends EffectType, B extends BoxSizingType = "content-box"> {
  component?: ElementType;
  config?: RevealEffectStylesType<T, B>;
  children: ReactElement<HTMLElement>;

  /**
   * @description (It works only when effectBoxSizing = "safe") border style
   */
  borderStyle?: B extends "safe" ? CSSProperties | undefined : never;

  /**
   * @description (It works only when effectBoxSizing = "safe") border className
   */
  borderClassName?: B extends "safe" ? string | undefined : never;

  /**
   * @description (It works only when effectBoxSizing = "safe") border ref
   */
  borderRef?: B extends "safe" ? MutableRefObject<HTMLDivElement | null> : never;
}
export interface RevealEffectComponentTypeMap<B extends BoxSizingType = "content-box", D extends ElementType = 'div', P = {}> {
  props: P & (PropsWithChildren<RevealEffectComponentProps<"background-image", B>> | PropsWithChildren<RevealEffectComponentProps<"border-image", B>>);
  defaultComponent: D;
}

export interface ApplyEffectInfoType {
  borderIsIntersected: boolean[] | undefined;
  elementIsIntersected: boolean[] | undefined;
  removeEffect: () => void;
}
export type ApplyEffectType<T extends EffectType> = (
  selector: HTMLElement | Array<HTMLElement>,
  isContainer: boolean,
  config: GlobalEffectConfigType<T>,
  pageX: number, pageY: number,
  initObject: MutableRefObject<InitObjectType<T> | undefined>
) => ApplyEffectInfoType

export interface EffectSelector<T> {
  borderSelector?: T extends "border-image" ? never : (EffectElementRef | EffectElementRefs | HTMLElement | null | HTMLElement[]),
  elementSelector?: EffectElementRef | EffectElementRefs | HTMLElement | null | HTMLElement[],
}