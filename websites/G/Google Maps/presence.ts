const presence = new Presence({
		clientId: "993496501886136371",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

function lettersOnly(str: string) {
	return str.replace(/[^a-zA-Z]/g, " ");
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo",
		startTimestamp: browsingTimestamp,
	};
	if (document.location.pathname.includes("/place")) {
		const place = document.location.href,
			indexes = [];
		for (const [index, element] of Array.from(place).entries())
			if (element === "/") indexes.push(index);

		presenceData.details = `Viewing ${lettersOnly(
			place.substring(indexes[4] + 1, indexes[5])
		)}`;
		presenceData.buttons = [
			{ label: "View Place", url: document.location.href },
		];
	} else if (document.location.pathname.includes("/dir")) {
		presenceData.details = "Viewing directions";
		let from, destination;
		if (document.querySelector("#sb_ifc50 > input") === null) {
			(from = document
				.querySelector("#sb_ifc51 > input")
				.getAttribute("aria-label")),
				(destination = document
					.querySelector("#sb_ifc52 > input")
					.getAttribute("aria-label"));
		} else {
			(from = document
				.querySelector("#sb_ifc50 > input")
				.getAttribute("aria-label")),
				(destination = document
					.querySelector("#sb_ifc51 > input")
					.getAttribute("aria-label"));
		}
		presenceData.state = `${from}, ${destination}`;
		presenceData.buttons = [
			{ label: "View Directions", url: document.location.href },
		];
	} else if (document.location.pathname.includes("/search")) {
		const search = document.location.href,
			indexes = [];
		for (const [index, element] of Array.from(search).entries())
			if (element === "/") indexes.push(index);

		presenceData.details = `Searching for ${lettersOnly(
			search.substring(indexes[4] + 1, indexes[5])
		)}`;
	} else presenceData.details = "Viewing map";

	presence.setActivity(presenceData);
	// }
});
