const presence = new Presence({
		clientId: "820023496934817804",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
  slideshow = presence.createSlideshow();

const iconCache: Record<string, string> = {};
function getIconImage(icon: HTMLElement): string {
	const canvas = document.createElement("canvas");
	canvas.width = 512;
	canvas.height = 512;
	const ctx = canvas.getContext("2d");

	const computedStyle = getComputedStyle(icon),
		computedStyleBefore = getComputedStyle(icon, ":before"),
		fontFamily = computedStyle.fontFamily,
		color = computedStyle.color,
		text = computedStyleBefore.content.replace(/"/g, "");

	if (iconCache[text]) return iconCache[text];
	ctx.font = `normal 512px/1 ${fontFamily}`;
	ctx.fillStyle = color;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText(text, 256, 256);
	iconCache[text] = canvas.toDataURL();
	presence.info(`${text} -> ${iconCache[text]}`);
	return iconCache[text];
}
