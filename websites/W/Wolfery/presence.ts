const presence = new Presence({ clientId: "1244143703660953651" }),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "https://forum.wolfery.com/uploads/default/original/1X/96ef8d56ab7b19e7f69cf42fc9109c98bf93e588.png",
}

// TODO: Find potential links for adding presence button to open character sheet. (v1.1.0)

let detailMsg = "Roleplaying on Wolfery.com",
	stateMsg = "",
	appLocation = null;

presence.on("UpdateData", async () => {
	const [characterPrivacy] = await Promise.all([
		presence.getSetting<boolean>("characterPrivacy"),
	]);

	appLocation = document
		.querySelector(".panel--titletxt")
		.textContent.toLowerCase();

	const getCharacterName = () =>
		document.querySelector(".namesection--title").textContent;

	switch (appLocation) {
		case "awake":
		case "character info": {
			let characterName = getCharacterName();

			if (characterPrivacy) {
				stateMsg = "";
				characterName = "";
			} else stateMsg = `Awake As: ${characterName}`;
			break;
		}
		case "character select": {
			stateMsg = "✏️ Choosing Character";
			detailMsg = null;
			break;
		}
		case "character settings": {
			stateMsg = "🔧 Tweaking Character Settings";
			detailMsg = null;
			break;
		}
		default: {
			stateMsg = "Roleplaying on Wolfery.com";
			detailMsg = null;
		}
	}

	presence.setActivity({
		details: detailMsg,
		state: stateMsg,
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
	});
});
