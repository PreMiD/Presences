const presence = new Presence({
	clientId: "1015402986534608948",
});

let browsingTimestamp: number = null,
	oldPrompt: string = null;

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/uCqmcTv.png",
		},
		{ pathname } = window.location;
	switch (pathname) {
		case "/": {
			const input = document.querySelector<HTMLDivElement>("#prompt"),
				container = document.querySelector(
					".h-full.w-full > .relative > div > div"
				);
			presenceData.state = input.textContent ? `"${input.textContent}"` : "Waiting for input...";
			if (container.querySelector("svg.text-gray-300"))
				presenceData.details = "Thinking of a prompt";
			else if (
				input.nextElementSibling
					.querySelector("img")
					.classList.contains("animate-wiggle")
			) {
				if (!browsingTimestamp) {
					browsingTimestamp = Date.now() / 1000;
					oldPrompt = input.textContent;
				}
				presenceData.details = "Generating images";
				presenceData.state = `"${oldPrompt}"`;
			} else {
				browsingTimestamp = null;
				if (document.activeElement === input && input.textContent !== oldPrompt)
					presenceData.details = "Thinking of a new prompt";
				else if (container.childElementCount > 3) {
					presenceData.details = "Viewing results";
					presenceData.state = `"${oldPrompt}"`;
				} else {
					presenceData.details = "Viewing a generated image";
					presenceData.state = `"${oldPrompt}"`;
				}
			}
			break;
		}
		case "/privacy": {
			presenceData.details = "Reading privacy policy";
			break;
		}
		case "/terms": {
			presenceData.details = "Reading terms and conditions";
			break;
		}
	}
	if (presenceData.details) {
		presenceData.startTimestamp = browsingTimestamp;
		presence.setActivity(presenceData);
	} else presence.setActivity();
});
