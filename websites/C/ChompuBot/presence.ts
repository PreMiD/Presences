const presence = new Presence({
	clientId: "1219713910165209169",
}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://chompubot.work/bot.png",
}

const enum Pages {
	Home = "/",
	Commands = "/commands",
	Dashboard = "/dashboard",
	FAQ = "/faq",
	Contact = "/contact"
}

let presenceData: PresenceData;

presence.on("UpdateData", async () => {

	const base = document.location.pathname

	if (/\/dashboard\/guild\/(.*[0-9_].*)\/music-room/gi.test(base)) {

		function isPlayer(): boolean {
			return !!document.querySelector<HTMLAnchorElement>('p.text-neutral-200.text-xl.text-center.mb-2');
		}

		let guildName,
			title,
			author,
			playing,
			pause,
			timeStartPlayer,
			timeEndPlayer,
			StartPlayer,
			durationPlayer,
			startTimestamp,
			endTimestamp


		const guildImage = document.querySelector<HTMLImageElement>("[data-label='guild-logo']").src
		if (!(isPlayer())) {
			guildName = document.querySelector<HTMLAnchorElement>("[data-label='player-requester']").textContent
			title = document.querySelector<HTMLAnchorElement>('h1.text-large.font-medium.-player-title')
			author = document.querySelector<HTMLAnchorElement>('p.text-small.mt-1.text-foreground\\/80.-player-author')
			playing = document.querySelector<HTMLAnchorElement>('svg.-player-playing')
			pause = document.querySelector<HTMLAnchorElement>('svg.-player-pause')

			timeStartPlayer = document.querySelectorAll<HTMLElement>('p.text-small.-player-position-start')[0].textContent,
				timeEndPlayer = document.querySelectorAll<HTMLElement>('p.text-small.text-foreground\\/50.-player-position-end')[0].textContent,

				[StartPlayer, durationPlayer] = [
					presence.timestampFromFormat(timeStartPlayer),
					(() => {
						return presence.timestampFromFormat(timeEndPlayer);
					})(),
				],

				[startTimestamp, endTimestamp] = presence.getTimestamps(StartPlayer, durationPlayer)
		}

		presenceData = {
			details: "No song queue found",
			state: "In the server...",
			largeImageKey: guildImage,
			smallImageKey: Assets.Reading,
			smallImageText: "Zzz",
			startTimestamp: browsingTimestamp,
			buttons: [
				{
					label: "Join Player",
					url: "https://chompubot.work" + base
				},
			]
		};

		if (title) {
			presenceData.details = title
			presenceData.state = author
			presenceData.smallImageKey = playing ? Assets.Play : Assets.Pause
			presenceData.smallImageText = playing ? "Playing" : "Pause"
			presenceData.startTimestamp = startTimestamp
			presenceData.endTimestamp = endTimestamp
			presenceData.buttons = [
				{
					label: "Join Player " + guildName,
					url: "https://chompubot.work" + base
				},
			]
			if (pause) {
				delete presenceData.startTimestamp
				delete presenceData.endTimestamp
			}
		}

	} else {
		presenceData = {
			details: "Idk",
			state: "Browsing...",
			largeImageKey: Assets.Logo,
			smallImageKey: Assets.Reading,
			smallImageText: "Zzz",
			startTimestamp: browsingTimestamp,
			buttons: [
				{
					label: "Website",
					url: "https://chompubot.work/"
				},
			]
		};

		switch (base) {
			case Pages.Home:
				presenceData.details = "Home"
				break
			case Pages.Commands:
				presenceData.details = "Commands"
				break
			case Pages.Dashboard:
				presenceData.details = "Dashboard"
				break
			case Pages.FAQ:
				presenceData.details = "FAQ"
				break
			case Pages.Contact:
				presenceData.details = "Contact"
				break
		}
	}

	presence.setActivity(presenceData);
});
