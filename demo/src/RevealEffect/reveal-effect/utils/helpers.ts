import { MutableRefObject } from "react";
import { EffectElementRef, EffectElementRefs, EffectType, GlobalEffectConfigType, InitObjectType, PreProcessElement, PreProcessElements } from "../types";

export function init<T extends EffectType>(
	initObject: MutableRefObject<InitObjectType<T> | undefined>,
	config: GlobalEffectConfigType<T>,
	isContainer: boolean,
	selector: HTMLElement | Array<HTMLElement>
): InitObjectType<T> {

	if (initObject.current) {
		return initObject.current;
	}
	if(config.effectType === "border-image"){
		return {
			config: Object.assign({}, config),
			children: (!isContainer) && selector ? getPreProcessElements(selector) : undefined,
			isPressed: false
		};
	}
	return {
		config: Object.assign({}, config),
		childrenBorder: (isContainer && selector) ? getPreProcessElements(selector) : undefined,
		children: (!isContainer) && selector ? getPreProcessElements(selector) : undefined,
		isPressed: false
	};
}

export function clearEffect<T extends EffectType>(initObjectCopy: InitObjectType<T>, element: PreProcessElement) {
	initObjectCopy.isPressed = false
	element.el.style.backgroundImage = element.oriBg
	element.el.style.borderImage = element.oriBorderBg
}

export function removeChildrenEventListener<T extends EffectType>(initObjectCopy: InitObjectType<T>) {
	initObjectCopy?.children?.forEach(item => {
		handleRemove(item);
	})
}
export function removeChildrenBorderEventListener<T extends EffectType>(initObjectCopy: InitObjectType<T>) {
	initObjectCopy?.childrenBorder?.forEach(item => {
		handleRemove(item);
	});
}
export function clearAllBackgroundEffect<T extends EffectType>(initObjectCopy: InitObjectType<T>) {
	initObjectCopy?.children?.forEach(item => clearEffect(initObjectCopy, item));
}
export function clearAllBorderEffect<T extends EffectType>(initObjectCopy: InitObjectType<T>) {
	initObjectCopy?.childrenBorder?.forEach(item => clearEffect(initObjectCopy, item));
}

export function getOffset(element: PreProcessElement) {
	return {
		top: element.el.getBoundingClientRect().top,
		left: element.el.getBoundingClientRect().left
	};
}

export function drawEffect(
	element: PreProcessElement,
	x: number,
	y: number,
	lightColor: string,
	gradientSize: number,
	cssLightEffect?: string,
	effectType?: EffectType,
) {
	let lightBg;

	if (cssLightEffect === undefined) {
		lightBg = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${lightColor}, rgba(255,255,255,0))`;
	} else {
		lightBg = cssLightEffect;
	}

	if(effectType === "border-image") {
		element.el.style.borderImage = lightBg + ` 1% / 1 / 0 stretch`;
		return;
	}
	element.el.style.backgroundImage = lightBg;
}

export function preProcessElements(elements: HTMLElement[]) {
	const res: PreProcessElements = [];

	elements.forEach(el => {
		res.push({
			oriBg: getComputedStyle(el)["backgroundImage"],
			oriBorderBg: getComputedStyle(el)["borderImage"],
			el: el,
      removeMouseListener: {
				mousedown: null,
				mouseup: null,
				mousemove: null,
				mouseleave: null
			}
		});
	});

	return res;
}

export function getPreProcessElements(selector: HTMLElement | Array<HTMLElement>) {
	let els;
	if (selector instanceof Array) {
		els = preProcessElements(selector)
	} else {
		els = preProcessElements([selector]);
	}
	return els;
}

export function isIntersected(
  element: PreProcessElement,
  cursor_x: number,
  cursor_y: number,
  gradientSize: number
) {
	const cursor_area = {
		left: cursor_x - gradientSize,
		right: cursor_x + gradientSize,
		top: cursor_y - gradientSize,
		bottom: cursor_y + gradientSize
	}

	const el_area = {
		left: element.el.getBoundingClientRect().left + window.scrollX,
		right: element.el.getBoundingClientRect().right + window.scrollX,
		top: element.el.getBoundingClientRect().top + window.scrollY,
		bottom: element.el.getBoundingClientRect().bottom + window.scrollY
	}

	function intersectRect(r1: typeof cursor_area, r2: typeof el_area) {
		return !(
			r2.left > r1.right ||
			r2.right < r1.left ||
			r2.top > r1.bottom ||
			r2.bottom < r1.top
		)
	}
	

	const result = intersectRect(cursor_area, el_area)

	return result
}

export function handleRemove(item: PreProcessElement, initKey?: keyof typeof item.removeMouseListener) {
	if(initKey){
		item.removeMouseListener[initKey]?.();
		item.removeMouseListener[initKey] = null;
		return;
	}
	let key: keyof typeof item.removeMouseListener
	for(key in item.removeMouseListener){
		item.removeMouseListener[key]?.();
		item.removeMouseListener[key] = null;
	}
}

export const handleSelector = (selector: EffectElementRef | HTMLElement | undefined | null) => {
  if(!selector) return;
  if((selector as EffectElementRef).current){
    return (selector as EffectElementRef).current;
  }
  return selector as HTMLElement;
}

export const handleSelectors = (selector: EffectElementRefs | HTMLElement[]) => {
  return selector.map(item => {
    return handleSelector(item);
  }).filter(item => Boolean(item)) as HTMLElement[]|[];
}
