const presence = new Presence({
	clientId: "808664560936026122",
});
async function getStrings() {
	return presence.getStrings(
		{
			buttonJoinGame: "kahoot.buttonJoinGame",
			viewHome: "general.viewHome",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
		},
		buttons = await presence.getSetting<boolean>("buttons"),
		newLang = await presence.getSetting<string>("lang").catch(() => "en"),
		round = document.querySelector("#round").textContent;

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (document.querySelector("#containerGamePlayers").textContent && !round) {
		presenceData.details = round;
		if (buttons) {
			presenceData.buttons = [
				{
					label: strings.buttonJoinGame.replace(": {0}", ""),
					url: document.location.href,
				},
			];
		}
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
	} else presenceData.details = strings.viewHome;
	presence.setActivity(presenceData);
});
