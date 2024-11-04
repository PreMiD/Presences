const presence = new Presence({
		clientId: "1219713910165209169",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/C/Chompu/assets/logo.png",
}

const enum Pages {
	Home = "/",
	Dashboard = "/dashboard",
	Status = "/status",
	Contact = "/contact",
}

const presenceData: PresenceData = {
	type: ActivityType.Listening,
	largeImageKey: Assets.Logo,
};

presence.on("UpdateData", async () => {
	const base = document.location.pathname;

	if (/\/dashboard\/guild\/(.*[0-9_].*)\/music-room/gi.test(base)) {
		if (
			document.querySelector<HTMLElement>("div.hidden.-player-status") &&
			document.querySelector<HTMLElement>("div.hidden.-player-status")
				.textContent === "true"
		) {
			const author = document.querySelector<HTMLAnchorElement>(
					"p.text-small.mt-1.text-foreground\\/80.-player-author"
				),
				playing = document.querySelector<HTMLAnchorElement>(
					"svg.-player-playing"
				),
				timeEndPlayer = document.querySelector<HTMLElement>(
					"p.text-small.text-foreground\\/50.-player-position-end"
				).textContent,
				[startPlayer, durationPlayer] = [
					presence.timestampFromFormat(
						document.querySelector<HTMLElement>(
							"p.text-small.-player-position-start"
						).textContent
					),
					presence.timestampFromFormat(timeEndPlayer),
				],
				[startTimestamp, endTimestamp] = presence.getTimestamps(
					startPlayer,
					durationPlayer
				);

			[presenceData.startTimestamp, presenceData.endTimestamp] = [
				startTimestamp,
				endTimestamp,
			];

			presenceData.details = document.querySelector<HTMLAnchorElement>(
				"h1.text-large.font-medium.-player-title"
			);
			presenceData.state = author;
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				"[data-label='guild-logo']"
			).src;
			presenceData.smallImageKey = playing ? Assets.Play : Assets.Pause;
			presenceData.smallImageText = playing ? "Playing" : "Pause";
			presenceData.startTimestamp = startTimestamp;
			presenceData.endTimestamp = endTimestamp;
			presenceData.buttons = [
				{
					label: `Join Player ${
						document.querySelector<HTMLAnchorElement>(
							"[data-label='player-requester']"
						).textContent
					}`,
					url: document.location.href,
				},
			];

			if (!playing) delete presenceData.startTimestamp;
		} else {
			presenceData.details = "No song queue found";
			presenceData.state = "In the server...";
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				"[data-label='guild-logo']"
			)
				? document.querySelector<HTMLImageElement>("[data-label='guild-logo']")
						.src
				: Assets.Logo;
			presenceData.smallImageText = "Zzz";
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.buttons = [
				{
					label: "Join Player",
					url: document.location.href,
				},
			];
			if (presenceData.endTimestamp) delete presenceData.endTimestamp;
		}
	} else {
		presenceData.details = "Idk";
		presenceData.state = "Browsing...";
		presenceData.largeImageKey = Assets.Logo;
		presenceData.smallImageKey = Assets.Reading;
		presenceData.smallImageText = "Zzz";
		presenceData.startTimestamp = browsingTimestamp;
		if (presenceData.buttons) delete presenceData.buttons;
		if (presenceData.endTimestamp) delete presenceData.endTimestamp;

		switch (base) {
			case Pages.Home:
				presenceData.details = "Home";
				break;
			case Pages.Dashboard:
				presenceData.details = "Dashboard";
				break;
			case Pages.Status:
				presenceData.details = "Status";
				break;
			case Pages.Contact:
				presenceData.details = "Contact";
				break;
		}
	}

	presence.setActivity(presenceData);
});
