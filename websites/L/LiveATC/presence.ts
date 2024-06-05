const presence = new Presence({
		clientId: "1247668968395903030",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/4YxBsgI.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = document.location;

	switch (pathname.split("/")[1]) {
		case "": {
			presenceData.details = "Viewing homepage";
			break;
		}
		case "search": {
			const params = new URL(href).searchParams;

			presenceData.details = "Searching";
			presenceData.state = `${
				params.get("freq") ? "Frequency: " : params.get("icao") ? "ICAO: " : ""
			}${params.get("freq") || params.get("icao")?.toUpperCase() || ""}`;
			params.get("freq");
			params.get("icao");
			break;
		}
		case "hlisten.php": {
			presenceData.type = ActivityType.Listening;
			const radioInfo = document
				.querySelector("h1")
				.childNodes.item(2)
				.textContent.split(" - ");
			presenceData.details = radioInfo[0];
			presenceData.state = radioInfo[1];
			presenceData.largeImageText = document
				.querySelector("font")
				.textContent.trim();
			presenceData.smallImageKey = Assets.Live;
			presenceData.buttons = [
				{
					url: href,
					label: "Listen",
				},
			];
			break;
		}
	}

	presence.setActivity(presenceData);
});
