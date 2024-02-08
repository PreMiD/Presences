type PageAction = {
	id: string;
	path: string;
	text: string;
	icon?: string;
};

type VideoContext = {
	elapsed: number;
	duration: number;
	ended: boolean;
	paused: boolean;
};

const presence = new Presence({
		clientId: "707389880505860156",
	}),
	strings = presence.getStrings({
		playing: "general.playing",
		paused: "general.paused",
		browsing: "general.browsing",
		episode: "general.viewEpisode",
	});
let video: VideoContext = null,
	lastVideoOption = 1;

const enum Assets {
	Season = "https://cdn.rcd.gg/PreMiD/websites/M/Monos%20Chinos/assets/0.png",
	Directory = "https://cdn.rcd.gg/PreMiD/websites/M/Monos%20Chinos/assets/1.png",
	Logo = "https://cdn.rcd.gg/PreMiD/websites/M/Monos%20Chinos/assets/logo.png",
}

presence.on("iFrameData", async (context: VideoContext) => {
	video = context;
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
		},
		browsingData: PresenceData = {
			largeImageKey: Assets.Logo,
			details: (await strings).browsing,
			smallImageKey: Assets.Viewing,
			smallImageText: (await strings).browsing,
		},
		actions: PageAction[] = [
			{
				id: "episode",
				path: "/ver/",
				text: (await strings).playing,
			},
			{
				id: "seasonList",
				path: "/emision",
				text: "viendo lista de emisión",
				icon: Assets.Season,
			},
			{
				id: "directory",
				path: "/animes",
				text: "viendo el directorio",
				icon: Assets.Directory,
			},
			{
				id: "seasonCalendar",
				path: "/calendario",
				text: "viendo el calendario",
				icon: Assets.Season,
			},
			{
				id: "directoryAnime",
				path: "/anime/",
				text: "viendo lista de episodios",
				icon: Assets.Directory,
			},
			{
				id: "search",
				path: "/buscar",
				text: "buscando animes:",
				icon: Assets.Search,
			},
			{
				id: "profile",
				path: "/mi-perfil",
				text: "Viendo perfil",
			},
		];
	let action: PageAction = null;

	for (const [i, info] of actions.entries()) {
		if (document.location.pathname.startsWith(info.path)) {
			action = actions[i];
			break;
		}
	}

	if (action === null) Object.assign(presenceData, browsingData);
	else if (action.id === "episode") {
		const detailsMatch = document
			.querySelector(".heromain_h1")
			.textContent.replace(/- /gm, "")
			.match(/^([^\d]+)(\d+)/);

		if (!detailsMatch) return presence.setActivity(browsingData);

		const [title, episode] = detailsMatch.slice(1);

		Object.assign(presenceData, {
			details: title,
			state: `${(await strings).episode} ${episode}`,
			smallImageKey: Assets.Viewing,
			smallImageText: "viendo el capitulo",
		});

		const currentOptionElement = document.querySelector(
				".TPlayerNv > .Button.Current"
			),
			currentOption = currentOptionElement
				? parseInt(
						currentOptionElement
							.getAttribute("data-tplayernv")
							.match(/Opt(\d+)/i)[1]
				  )
				: -1;

		if (currentOption !== -1 && currentOption !== lastVideoOption) {
			lastVideoOption = currentOption;
			video = null;
		}

		if (!video || (video && video.ended))
			return presence.setActivity(presenceData);

		const [startTimestamp, endTimestamp] = presence.getTimestamps(
			Math.floor(video.elapsed),
			Math.floor(video.duration)
		);

		Object.assign(presenceData, {
			smallImageKey: video.paused ? Assets.Pause : Assets.Play,
			smallImageText: (await strings)[video.paused ? "paused" : "playing"],
		} as PresenceData);

		if (!video.paused) {
			Object.assign(presenceData, {
				startTimestamp,
				endTimestamp,
			});
		}
	} else {
		if (
			document.location.pathname.includes("/anime/") &&
			document.querySelector("div.chapterdetails h1")
		) {
			presenceData.state = document.querySelector(
				"div.chapterdetails h1"
			).textContent;
		}

		if (
			document.location.pathname.includes("/buscar") &&
			document.querySelector("div.heroarea h1 span")
		) {
			presenceData.state = document.querySelector(
				"div.heroarea h1 span"
			).textContent;
		}

		if (
			document.location.pathname.includes("/mi-perfil") &&
			document.querySelector("div.profile div.promain h1")
		) {
			presenceData.state = document.querySelector(
				"div.profile div.promain h1"
			).textContent;
		}

		Object.assign(presenceData, {
			details: action.text,
			smallImageKey: action.icon,
			smallImageText: action.text,
		} as PresenceData);
	}

	presence.setActivity(presenceData);
});
