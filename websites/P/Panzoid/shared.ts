export const enum Icons {
	Discord = "https://i.postimg.cc/3wgKPWjY/panzoid-discord.webp",
	Legacy = "https://i.postimg.cc/9MV6SF27/panzoid-legacy.png",
	Gen4 = "https://i.postimg.cc/Df5zvW9z/panzoid-gen4.png",
}

export const enum Details {
	Gen4Menu = "In Gen4 menu",
	Gen4Loading = "Loading project...",
	Gen4Editor = "Editing: {0}",
	CM3 = "Editing in Clipmaker 3",
	CM2 = "Editing in Clipmaker 2",
	CM1 = "Editing in Clipmaker 1",
	Backgrounder = "Editing in Backgrounder",
	VideoEditor = "Editing in Video Editor",
	Website = "Lurking around the website",
}

export const enum States {
	Gen4Menu = "{0} projects",
	Gen4Editor = "{0} tracks | {1} clips",
	CM3 = "{0} tracks | {1} clips",
	CM2 = "{0} objects | {1} effects",
	Rendering = "Rendering {0}%",
}

export const enum ImageTexts {
	Gen4 = "Gen4",
	Legacy = "Legacy",
}

/**
 * Replaces placeholders in a string with corresponding values from the arguments.
 *
 * @param text The string with placeholders to be formatted.
 * @param args The values to replace the placeholders with.
 * @return The formatted string with placeholders replaced.
 */
export function format(text: string, ...args: string[] | number[]) {
	return text.replace(/{(\d+)}/g, (match, number) =>
		typeof args[number] !== "undefined" ? String(args[number]) : match
	);
}

export function getRenderingState(): string {
	const element = document.querySelector<HTMLSpanElement>(
		"div.pz-progress > span"
	);
	// Get the width percentage and trim the % symbol
	// Or if the element was not found, return null
	if (element) {
		return format(
			States.Rendering,
			Number(element.style.width.slice(0, -1)).toFixed(2)
		);
	}
	return null;
}
