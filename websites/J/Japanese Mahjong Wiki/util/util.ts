export function findNearestAboveElement(
	element: Element,
	selector: string
): Element | null {
	let currentElement: Element | null = element;
	while (currentElement) {
		if (currentElement.matches(selector)) return currentElement;
		currentElement = currentElement.previousElementSibling;
	}
	return null;
}
