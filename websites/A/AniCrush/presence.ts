const presence = new Presence({
	clientId: "1208440916461887488",
});
const enum Assets {
	Logo = "favicon",
}
let video = {
	exists: false,
	duration: 0,
	currentTime: 0,
	paused: true,
};

presence.on(
	"iFrameData",
	(data: {
		exists: boolean;
		duration: number;
		currentTime: number;
		paused: boolean;
	}) => {
		video = data;
	}
);
presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
	};
	const { pathname, href, search } = document.location,
		showButtons = await presence.getSetting<boolean>("buttons");
	switch (true) {
		case pathname === "/home":
			presenceData.details = "Browsing Home";
			break;
		case pathname === "/az-list":
			presenceData.details = "Browzing AZ List";
			break;
		case pathname === "/most-popular":
			presenceData.details = "Browsing Most Popular";
			break;
		case pathname.startsWith("/watch/"): {
			const streamingType = Array.from(
					document.querySelectorAll(".list .w-type").values()
				)
					.find(div => div.querySelector(".avail .active"))
					?.querySelector(".item-sub .name")
					?.textContent?.toLowerCase(),
				[startTimestamp, endTimestamp] = presence.getTimestamps(
					Math.floor(video.currentTime),
					Math.floor(video.duration)
				);

			presenceData.details = `Watching ${
				document.querySelector(".seoWidget.d-none")?.textContent ?? "?"
			}`;

			presenceData.state = `Episode ${
				Number(
					document.querySelector(".active .btn-ep")?.textContent
				).toLocaleString() || "?"
			}/${
				Number(
					document.querySelector(`.item.item-${streamingType} .name`)
						?.textContent
				).toLocaleString() || "?"
			}`;
			if (video.exists) {
				if (await presence.getSetting<boolean>("timestamps")) {
					presenceData.startTimestamp = startTimestamp;
					presenceData.endTimestamp = endTimestamp;
				}
				if (video.paused) {
					presenceData.smallImageKey = Assets.Pause;
					presenceData.smallImageText = "Paused";
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				} else {
					presenceData.smallImageKey = Assets.Play;
					presenceData.smallImageText = "Playing";
				}
			}
			break;
		}
		case pathname.startsWith("/detail/"): {
			presenceData.details = `Viewing ${
				document.querySelector(
					".about-anime .infor .heading .main .heading-md.mb-0.text-white"
				)?.textContent || "?"
			}`;
			presenceData.state = `Rating ${
				document.querySelector(".score .s-mark")?.textContent || "?"
			}/10.0`;
			break;
		}
		case pathname.startsWith("/watch2gether/create/"): {
			presenceData.details = `Watch2gether ${
				document.querySelector(".anime-name a")?.textContent || "?"
			}`;
			presenceData.state = "Creating room";
			break;
		}
		case pathname.startsWith("/watch2gether/"): {
			const streamingType = document
					.querySelector(".live-header .other-items")
					.children[1].querySelector(".text")
					?.textContent?.toLowerCase(),
				[startTimestamp, endTimestamp] = presence.getTimestamps(
					Math.floor(video.currentTime),
					Math.floor(video.duration)
				),
				totalEpisodes = Number(
					Array.from(
						document.querySelectorAll(`.item.item-${streamingType} .text`)
					).at(-1)?.textContent
				),
				viewers = Number(
					document.querySelector(".item-viewers span")?.textContent[0]
				);
			presenceData.details = `Watch2gether ${
				document.querySelector(".anime-block .main h3 a")?.textContent || "?"
			}`;
			presenceData.state = `Episode ${
				Number(
					document
						.querySelector(".other-items .item-ep span")
						?.textContent?.replace("Episode ", "")
				).toLocaleString() || "?"
			}/${
				isNaN(totalEpisodes) || !totalEpisodes
					? "?"
					: totalEpisodes.toLocaleString() || "?"
			} | ${
				isNaN(viewers) || !viewers
					? "? viewers"
					: viewers > 1
					? `${viewers.toLocaleString()} viewers`
					: `${viewers} viewer`
			}`;
			const buttonAllowed = await presence.getSetting<boolean>(
				"watch2getherJoinRoomButton"
			);
			if (buttonAllowed && showButtons) {
				presenceData.buttons = [
					{
						label: "Join Room",
						url: href,
					},
				];
			}
			const showTimestamps = await presence.getSetting<boolean>("timestamps");
			if (video.exists) {
				if (showTimestamps) {
					presenceData.startTimestamp = startTimestamp;
					presenceData.endTimestamp = endTimestamp;
				}
				if (video.paused) {
					presenceData.smallImageKey = Assets.Pause;
					presenceData.smallImageText = "Paused";
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				} else {
					presenceData.smallImageKey = Assets.Play;
					presenceData.smallImageText = "Playing";
				}
			}
			break;
		}
		case pathname.startsWith("/watch2gether"): {
			presenceData.details = "Browsing Watch2gether";
			break;
		}
		default: {
			const searchParams = new URLSearchParams(search),
				letter = searchParams.get("letter"),
				pages: Record<string, PresenceData> = {
					"/most-popular": {
						details: "Browsing most popular anime",
					},
					"/az-list": {
						details: `Browsing ${!letter ? "all " : ""}anime${
							letter ? ` starting with ${letter}` : ""
						}`,
					},
					"/estimated-schedule": {
						details: "Browsing estimated anime schedules",
					},
					"/search": {
						details: `Searching for ${searchParams.get("keyword") || "anime"}`,
					},
				};
			for (const [path, data] of Object.entries(pages)) {
				if (pathname.startsWith(path)) {
					presenceData = { ...presenceData, ...data };
					if (!presenceData.buttons && showButtons) {
						presenceData.buttons = [
							{
								label: "Browse Anime",
								url: href,
							},
						];
					}
				}
			}
			if (!presenceData.details) {
				presenceData.details = "Browsing...";
				presenceData.smallImageKey = Assets.Search;
			}
			break;
		}
	}
	presence.setActivity(presenceData);
});
