/*eslint prefer-template: "off"*/

const iframe = new iFrame();


function getLegacyRenderingProgress() : number {
	const element = document.querySelector<HTMLElement>("div.pz-progress > span");
	return element ? Number(element.style.width.slice(0, -1)) : null;
}


iframe.on("UpdateData", async () => {
	let details = "",
		state = "";

	// - - - - - - - - - - - - - - - - - - - - - Clipmaker 3 - - - - - - - - - - - - - - - - - - - - -
	if (document.location.pathname.startsWith("/legacy/gen3/clipmaker.html")) {
		details = "Editing in Clipmaker 3";

		const renderingProgress = getLegacyRenderingProgress();
		if (renderingProgress === null) {
			state = document.querySelectorAll("span.noselect").length
				+ " tracks | "
				+ document.querySelectorAll(".clip").length
				+ " clips";
		} else
			state = `Rendering ${renderingProgress.toFixed(2)}%`;

	// - - - - - - - - - - - - - - - - - - - - - Clipmaker 2 - - - - - - - - - - - - - - - - - - - - -
	} else if (document.location.pathname.startsWith("/legacy/gen2/clipmaker.html")) {
		details = "Editing in Clipmaker 2";

		const renderingProgress = getLegacyRenderingProgress();
		if (renderingProgress === null) {
			state = document.querySelectorAll("#controls > div:nth-child(4) > ul.pz-listbox > li").length
				+ " objects | "
				+ document.querySelectorAll("#controls > div:nth-child(5) > ul.pz-listbox > li").length
				+ " effects";
		} else
			state = `Rendering ${renderingProgress.toFixed(2)}%`;
	}

	iframe.send({
		details,
		state
	});
});
