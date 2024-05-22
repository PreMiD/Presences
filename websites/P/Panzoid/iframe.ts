/*eslint prefer-template: "off"*/

const iframe = new iFrame();


iframe.on("UpdateData", async () => {
	let details = "",
		state = "";

	// - - - - - - - - - - - - - - - - - - - - - Clipmaker 3 - - - - - - - - - - - - - - - - - - - - -
	if (document.location.pathname.startsWith("/legacy/gen3/clipmaker.html")) {
		details = "Editing in Clipmaker 3";

		const renderingProgress = getRenderingProgress();
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

		const renderingProgress = getRenderingProgress();
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
