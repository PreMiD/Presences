const presence = new Presence({
		clientId: "612042450785271811",
	}),
	presenceData: PresenceData = {
		largeImageKey: "logo",
	};

presence.on("UpdateData", async () => {
	const title = document.querySelector<HTMLElement>(
		".mtl.mbxxxl.xs-mts.xs-mbxs.petition-title"
	);
	if (title) {
		presenceData.details = title.textContent;
		presenceData.state = (
			document.querySelector(".mbxs span strong") ??
			document.querySelector<HTMLElement>("p.type-weak")
		).textContent;
		presenceData.largeImageKey = "logo";
		presenceData.buttons = [
			{
				label: "View Petition",
				url: document.location.href,
			},
		];
		presence.setActivity(presenceData);
	} else {
		presence.setActivity({
			details: "Browsing..",
			largeImageKey: "logo",
		});
	}
});
