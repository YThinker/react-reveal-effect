import { PreProcessElement, PreProcessElements } from "./types";

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
	cssLightEffect?: string
) {
	let lightBg;

	if (cssLightEffect === undefined) {
		lightBg = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${lightColor}, rgba(255,255,255,0))`;
	} else {
		lightBg = cssLightEffect;
	}

	element.el.style.backgroundImage = lightBg;
}

export function preProcessElements(elements: HTMLElement[]) {
	const res: PreProcessElements = [];

	elements.forEach(el => {
		res.push({
			oriBg: getComputedStyle(el)["backgroundImage"],
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