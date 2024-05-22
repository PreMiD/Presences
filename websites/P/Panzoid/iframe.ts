/*eslint prefer-template: "off"*/

const iframe = new iFrame();


iframe.on("UpdateData", async () => {
	let details = "",
		state = "";

	// - - - - - - - - - - - - - - - - - - - - - Clipmaker 3 - - - - - - - - - - - - - - - - - - - - -
	if (document.location.pathname.startsWith("/legacy/gen3/clipmaker.html")) {
		details = "Editing in Clipmaker 3";
		state = document.querySelectorAll("span.noselect").length
			+ " tracks | "
			+ document.querySelectorAll(".clip").length
			+ " clips";

	// - - - - - - - - - - - - - - - - - - - - - Clipmaker 2 - - - - - - - - - - - - - - - - - - - - -
	} else if (document.location.pathname.startsWith("/legacy/gen2/clipmaker.html")) {
		details = "Editing in Clipmaker 2";
		state = document.querySelectorAll("#controls > div:nth-child(4) > ul.pz-listbox > li").length
			+ " objects | "
			+ document.querySelectorAll("#controls > div:nth-child(5) > ul.pz-listbox > li").length
			+ " effects";
	}

	iframe.send({
		details,
		state
	});
});
