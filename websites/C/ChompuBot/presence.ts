const presence = new Presence({
		clientId: "1219713910165209169",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://chompubot.work/logo.jpg",
}

const enum Pages {
	Home = "/",
	Commands = "/commands",
	Dashboard = "/dashboard",
	FAQ = "/faq",
	Contact = "/contact",
}

let presenceData: PresenceData;

presence.on("UpdateData", async () => {
	const base = document.location.pathname;

	if (/\/dashboard\/guild\/(.*[0-9_].*)\/music-room/gi.test(base)) {
		let username,
			title,
			author,
			playing,
			timeStartPlayer,
			timeEndPlayer,
			startPlayer,
			durationPlayer,
			startTimestamp,
			endTimestamp;

		const status = document.querySelector<HTMLElement>(
			"div.hidden.-player-status"
		).textContent;

		if (status === "loading") {
			presenceData = {
				details: document.querySelector<HTMLAnchorElement>(
					"p.text-white.text-lg.-guild-name"
				).textContent,
				state: "Loading...",
				largeImageKey: document.querySelector<HTMLImageElement>(
					"[data-label='guild-logo']"
				).src,
				smallImageKey: Assets.Reading,
				smallImageText: "Zzz",
				startTimestamp: browsingTimestamp,
				buttons: [
					{
						label: "Join Player",
						url: document.location.href,
					},
				],
			};
		} else if (status === "true") {
			username = document.querySelector<HTMLAnchorElement>(
				"[data-label='player-requester']"
			).textContent;
			title = document.querySelector<HTMLAnchorElement>(
				"h1.text-large.font-medium.-player-title"
			);
			author = document.querySelector<HTMLAnchorElement>(
				"p.text-small.mt-1.text-foreground\\/80.-player-author"
			);
			playing = document.querySelector<HTMLAnchorElement>(
				"svg.-player-playing"
			);
			timeStartPlayer = document.querySelector<HTMLElement>(
				"p.text-small.-player-position-start"
			).textContent;
			timeEndPlayer = document.querySelector<HTMLElement>(
				"p.text-small.text-foreground\\/50.-player-position-end"
			).textContent;
			[startPlayer, durationPlayer] = [
				presence.timestampFromFormat(timeStartPlayer),
				(() => {
					return presence.timestampFromFormat(timeEndPlayer);
				})(),
			];
			[startTimestamp, endTimestamp] = presence.getTimestamps(
				startPlayer,
				durationPlayer
			);

			presenceData = {
				details: title,
				state: author,
				largeImageKey: document.querySelector<HTMLImageElement>(
					"[data-label='guild-logo']"
				).src,
				smallImageKey: playing ? Assets.Play : Assets.Pause,
				smallImageText: playing ? "Playing" : "Pause",
				startTimestamp,
				endTimestamp,
				buttons: [
					{
						label: `Join Player ${username}`,
						url: document.location.href,
					},
				],
			};

			if (!playing) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		} else {
			presenceData = {
				details: "No song queue found",
				state: "In the server...",
				largeImageKey: document.querySelector<HTMLImageElement>(
					"[data-label='guild-logo']"
				).src,
				smallImageKey: Assets.Reading,
				smallImageText: "Zzz",
				startTimestamp: browsingTimestamp,
				buttons: [
					{
						label: "Join Player",
						url: document.location.href,
					},
				],
			};
		}
	} else {
		presenceData = {
			details: "Idk",
			state: "Browsing...",
			largeImageKey: Assets.Logo,
			smallImageKey: Assets.Reading,
			smallImageText: "Zzz",
			startTimestamp: browsingTimestamp,
		};

		switch (base) {
			case Pages.Home:
				presenceData.details = "Home";
				break;
			case Pages.Commands:
				presenceData.details = "Commands";
				break;
			case Pages.Dashboard:
				presenceData.details = "Dashboard";
				break;
			case Pages.FAQ:
				presenceData.details = "FAQ";
				break;
			case Pages.Contact:
				presenceData.details = "Contact";
				break;
		}
	}

	presence.setActivity(presenceData);
});
