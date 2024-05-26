const presence = new Presence({ 
		clientId: "1244143703660953651",
	}),

browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "https://forum.wolfery.com/uploads/default/original/1X/96ef8d56ab7b19e7f69cf42fc9109c98bf93e588.png",
}

// TODO: Add LFRP Flag (v1.1.0) 
// TODO: Find potential links for adding presence button to open character sheet. (v1.1.0)

const detailMsg = "Roleplaying on Wolfery.com";
let stateMsg = "",
	characterName = document.querySelector(".namesection--title").textContent;

presence.on("UpdateData", async () => {
	const [characterPrivacy] = await Promise.all([
		presence.getSetting<boolean>("characterPrivacy")
	]);

	if (characterPrivacy) {
		stateMsg = "";
		characterName = "";
	} else 
		stateMsg = `Playing As: ${characterName}`;

	presence.setActivity({
		details: detailMsg,
		state: stateMsg,
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
	}); 
});
