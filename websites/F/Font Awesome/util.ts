export const presence = new Presence({
		clientId: "820023496934817804",
	});
export const browsingTimestamp = Math.floor(Date.now() / 1000);
export const slideshow = presence.createSlideshow();

let documentIsLoaded = document.readyState === "complete";
document.addEventListener("DOMContentLoaded", () => {
  documentIsLoaded = true;
});

const iconCache: Record<string, string> = {};
export function getIconImage(icon: HTMLElement, backgroundColor = "#fff"): string {
  if (!documentIsLoaded) return;
	const canvas = document.createElement("canvas");
	canvas.width = 512;
	canvas.height = 512;
	const ctx = canvas.getContext("2d");

  // get the icon's computed style
	const computedStyle = getComputedStyle(icon),
		computedStyleBefore = getComputedStyle(icon, ":before"),
		fontFamily = computedStyle.fontFamily,
    fontWeight = computedStyle.fontWeight,
		color = computedStyle.color,
		text = computedStyleBefore.content.replace(/"/g, ""),
    key = `${fontFamily}-${fontWeight}-${backgroundColor}-${color}-${text}`;

	if (iconCache[key]) return iconCache[key];
  // render the background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, 512, 512);

  // render the text
  ctx.font = `${fontWeight} 384px/1 ${fontFamily}`;
	ctx.fillStyle = color;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText(text, 256, 256);
	iconCache[key] = canvas.toDataURL();
	presence.info(`${text} -> ${iconCache[key]}`);
	return iconCache[key];
}
