interface ChannelSlotData {
	displayTitle: string;
	start: string;
	end: string;
	seriesNumber?: number;
	episodeNumber?: number;
}

interface ChannelMetadata {
	id: string;
	name: string;
	slots: {
		now: ChannelSlotData;
		next: ChannelSlotData;
	};
	slug: string;
}

interface LiveChannelNextData {
	props: {
		pageProps: {
			channelSlug: string;
			channelsMetaData: {
				channels: ChannelMetadata[];
			};
		};
	};
}

interface CategoriesNextData {
	props: {
		pageProps: {
			category: {
				slug: string;
				title: string;
			};
		};
	};
}

interface ProgrammeNextData {
	props: {
		pageProps: {
			title: {
				CTAText?: string;
				episodeNumber?: number;
				programmeTitle: string;
				seriesNumber?: number;
				titleType: string;
			};
		};
	};
}

enum Assets {
	Logo = "https://i.imgur.com/XisKvdg.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.pngg",
}

const presence = new Presence({
	clientId: "1043125926793318420",
});

function fetchNextData<T>(): T {
	const nextDataElement = document.querySelector("#__NEXT_DATA__");

	if (!nextDataElement) return null;

	return JSON.parse(nextDataElement.textContent);
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: Date.now(),
		},
		{ pathname: path } = document.location,
		privacyMode = await presence.getSetting<boolean>("privacy");

	if (privacyMode) presenceData.details = "Watching ITVX";
	else {
		switch (path) {
			case "/": {
				presenceData.details = "Browsing ITVX";
				presenceData.state = "Home Page";

				break;
			}
			case "/watch": {
				const nextData = fetchNextData<LiveChannelNextData>(),
					// When you first go to watch a channel, the slug is null and the default channel is ITV1
					currentChannelMetadata =
						nextData.props.pageProps.channelsMetaData.channels.find(
							x => x.slug === (nextData.props.pageProps.channelSlug || "itv")
						);

				// At the moment, it doesn't seem the title of the current programme changes when it transitions from one programme
				// to the next. Use the channel slot data start and end times to determine which title to show.
				let currentSlot: ChannelSlotData;

				const nowSlotTimestamps = [
						new Date(currentChannelMetadata.slots.now.start).getTime(),
						new Date(currentChannelMetadata.slots.now.end).getTime(),
					],
					timestampNow = Date.now();

				// If the current timestamp is after the slot starts, and before it ends
				if (
					timestampNow > nowSlotTimestamps[0] &&
					timestampNow < nowSlotTimestamps[1]
				)
					currentSlot = currentChannelMetadata.slots.now;
				else currentSlot = currentChannelMetadata.slots.next;

				const seriesNum = currentSlot.seriesNumber,
					epNum = currentSlot.episodeNumber;

				presenceData.details = `Watching ${currentChannelMetadata.name} Live`;
				presenceData.state = currentSlot.displayTitle;
				presenceData.smallImageKey = Assets.Live;
				presenceData.smallImageText = "Live";

				if (seriesNum && epNum)
					presenceData.state += ` (S${seriesNum} E${epNum})`;

				break;
			}
			case "/watch/tv-guide": {
				presenceData.details = "Browsing ITV";
				presenceData.state = "Viewing the TV Guide";

				break;
			}
			default:
				if (path.startsWith("/watch/collections/films")) {
					presenceData.details = "Browsing ITVX";
					presenceData.state = "Viewing Films";
				} else if (path.startsWith("/watch/categories")) {
					presenceData.details = "Browsing ITVX";
					presenceData.state = `Viewing ${
						fetchNextData<CategoriesNextData>().props.pageProps.category.title
					} Category`;
				} else if (
					/^[-+]?[0-9A-Fa-f]+\.?[0-9A-Fa-f]*?$/.test(
						path.split("/")[path.split("/").length - 1]
					)
				) {
					delete presenceData.startTimestamp;

					const nextData = fetchNextData<ProgrammeNextData>();
					presenceData.details = `Watching ${nextData.props.pageProps.title.programmeTitle}`;

					if (
						nextData.props.pageProps.title.CTAText &&
						nextData.props.pageProps.title.titleType !== "FILM"
					)
						presenceData.state = nextData.props.pageProps.title.CTAText;

					const [video] = document.querySelectorAll("video");

					if (!video.paused) {
						[presenceData.startTimestamp, presenceData.endTimestamp] =
							presence.getTimestamps(
								Math.floor(video.currentTime),
								Math.floor(video.duration)
							);

						presenceData.smallImageKey = Assets.Play;
						presenceData.smallImageText = "Playing";
					} else {
						presenceData.smallImageKey = Assets.Pause;
						presenceData.smallImageText = "Paused";
					}
				}
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
