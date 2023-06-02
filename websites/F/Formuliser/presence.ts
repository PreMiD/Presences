const presence = new Presence({
		clientId: "729279760596729858",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let formula: HTMLInputElement, formulaName: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/F/Formuliser/assets/logo.png",
		startTimestamp: browsingTimestamp,
	};

	formula = document.querySelector("#formula") as HTMLInputElement;

	formulaName =
		document.querySelector("span#elements-body > details > summary") ??
		document.querySelector("span#elements-body");

	presenceData.details = formula.value;
	presenceData.state = formulaName.textContent;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
