const iframe = new iFrame();

iframe.on("UpdateData", async () => {
	let details = "",
		state = "";

	// - - - - - - - - - - - - - - - - - - - - - Clipmaker 3 - - - - - - - - - - - - - - - - - - - - -
	if (document.location.pathname.startsWith("/legacy/gen3/clipmaker.html")) {
		details = Details.CM3;

		const renderingProgress = getRenderingProgress();
		if (renderingProgress === null) {
			state = format(States.CM3,
				document.querySelectorAll("span.noselect").length,
				document.querySelectorAll(".clip").length
			);
		} else
			state = format(States.Rendering, renderingProgress.toFixed(2));

	// - - - - - - - - - - - - - - - - - - - - - Clipmaker 2 - - - - - - - - - - - - - - - - - - - - -
	} else if (document.location.pathname.startsWith("/legacy/gen2/clipmaker.html")) {
		details = Details.CM2;

		const renderingProgress = getRenderingProgress();
		if (renderingProgress === null) {
			state = format(States.CM2,
				document.querySelectorAll("#controls > div:nth-child(4) > ul.pz-listbox > li").length,
				document.querySelectorAll("#controls > div:nth-child(5) > ul.pz-listbox > li").length
			);
		} else
			state = format(States.Rendering, renderingProgress.toFixed(2));
	}

	iframe.send({
		details,
		state,
	});
});
