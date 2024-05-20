const iframe = new iFrame();


iframe.on("UpdateData", async () => {
	let details = null,
		state = null;

	// - - - - - - - - - - - - - - - - - - - - - Clipmaker 3 - - - - - - - - - - - - - - - - - - - - -

	if (document.location.pathname.startsWith("/legacy/gen3/clipmaker.html")) {
		const tracks = document.querySelectorAll("span.noselect"),
			clips = document.getElementsByClassName("clip");

		details = "Editing in Clipmaker 3";
		state = `${tracks.length} tracks | ${clips.length} clips`;
	}

	// - - - - - - - - - - - - - - - - - - - - - Clipmaker 2 - - - - - - - - - - - - - - - - - - - - -

	else if (document.location.pathname.startsWith("/legacy/gen2/clipmaker.html")) {
		const objects = document.querySelectorAll("#controls > div:nth-child(4) > ul.pz-listbox > li");
		const effects = document.querySelectorAll("#controls > div:nth-child(5) > ul.pz-listbox > li");

		details = "Editing in Clipmaker 2";
		state = `${objects.length} objects | ${effects.length} effects`;
	}

	iframe.send({
		details: details,
		state: state
	});
});
