const presence = new Presence({
	clientId: "1015402986534608948",
});

type State = "start" | "generation" | "results";

let browsingTimestamp: number = Date.now() / 1000,
	oldPrompt: string = null,
	activityState: State = "start";

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/uCqmcTv.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = window.location;
	switch (pathname) {
		case "/": {
			const input = document.querySelector<HTMLDivElement>("#prompt"),
				container = document.querySelector(
					".h-full.w-full > .relative > div > div"
				);
			presenceData.state = input.textContent
				? `"${input.textContent}"`
				: "Waiting for input...";
			if (container.querySelector("svg.text-gray-300"))
				presenceData.details = "Thinking of a prompt";
			else if (
				input.nextElementSibling
					.querySelector("img")
					.classList.contains("animate-wiggle")
			) {
				if (activityState !== "generation") {
					presenceData.startTimestamp = browsingTimestamp = Date.now() / 1000;
					oldPrompt = input.textContent;
					activityState = "generation";
				}
				presenceData.details = "Generating images";
				presenceData.state = `"${oldPrompt}"`;
			} else {
				if (activityState !== "results") {
					presenceData.startTimestamp = browsingTimestamp = Date.now() / 1000;
					activityState = "results";
				}
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
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
