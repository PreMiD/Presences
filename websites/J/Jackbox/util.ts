const uploadedFiles: Record<string, string> = {};
export async function uploadFile(
	url: string,
	defaultImage: string,
	presence: Presence
): Promise<string> {
	if (uploadedFiles[url]) return uploadedFiles[url];
	uploadedFiles[url] = defaultImage;

	try {
		const imageData = await fetch(url).then(res => res.blob()),
			formData = new FormData();
		formData.append("file", imageData, "file");
		const resultURL = await fetch("https://pd.premid.app/create/image", {
			method: "POST",
			body: formData,
		}).then(res => res.text());

		presence.info(resultURL);
		uploadedFiles[url] = resultURL;
		return resultURL;
	} catch (err) {
		presence.error(err);
		return url;
	}
}

const svgCache: Map<SVGElement, string> = new Map();
export function getSVGImageData(initialSvg: SVGElement): Promise<string> {
	if (svgCache.has(initialSvg))
		return Promise.resolve(svgCache.get(initialSvg));

	const clone = initialSvg.cloneNode(true) as SVGElement,
		initialPaths = initialSvg.querySelectorAll("path"),
		clonePaths = clone.querySelectorAll("path"),
		canvas = document.createElement("canvas"),
		ctx = canvas.getContext("2d"),
		image = document.createElement("img");

	canvas.width = 512;
	canvas.height = 512;

	// To fix issues on some browsers like Firefox
	clone.setAttribute("width", "512");
	clone.setAttribute("height", "512");

	for (const [i, initialPath] of initialPaths.entries()) {
		const fillStyle = getComputedStyle(initialPath).fill;
		clonePaths[i].setAttribute("fill", fillStyle);
	}

	const xml = new XMLSerializer().serializeToString(clone),
		svgURL = `data:image/svg+xml;base64,${btoa(xml)}`;

	return new Promise(resolve => {
		image.onload = () => {
			ctx.drawImage(image, 0, 0, 512, 512);
			const data = canvas.toDataURL("image/png");
			svgCache.set(initialSvg, data);
			resolve(data);
		};
		image.src = svgURL;
	});
}
