const presence = new Presence({
	clientId: "755666356141293568",
});

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

let prev = "";

type Detail = {
	name?: string;
};

let last: Detail = {};

type Episode = {
	title?: string;
	subject?: string;
};

let lastEpisode: Episode = {};

function getQuery() {
	return JSON.parse(
		`{"${decodeURI(location.search.substring(1))
			.replaceAll('"', '\\"')
			.replaceAll("&", '","')
			.replaceAll("=", '":"')}"}`
	);
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/xGOEvzT.png",
	};

	if (window.location.pathname === "/") presenceData.details = "메인";
	else if (window.location.pathname.startsWith("/search")) {
		presenceData.details = "검색";
		presenceData.state = getQuery().keyword;
	} else if (window.location.pathname.match(/^\/item\/\d/)) {
		if (prev === window.location.pathname && last.name)
			presenceData.details = last.name;
		else {
			prev = window.location.pathname;
			last = await (
				await fetch(
					`https://laftel.net/api/v1.0/items/${
						window.location.pathname.split("/")[2]
					}/detail/`,
					{
						headers: {
							laftel: "TeJava",
						},
					}
				)
			).json();
			presenceData.details = last.name;
		}
	} else if (location.pathname.match(/\/player\/\d*\/\d/)) {
		const video: HTMLVideoElement = document.querySelector("video");
		if (video && !isNaN(video.duration)) {
			if (prev !== window.location.pathname) {
				prev = window.location.pathname;
				lastEpisode = await (
					await fetch(
						`https://laftel.net/api/episodes/v1/${
							window.location.pathname.split("/")[3]
						}`,
						{
							headers: {
								laftel: "TeJava",
							},
						}
					)
				).json();
			}

			presenceData.details = `${lastEpisode.title} - ${lastEpisode.subject}`;

			if (
				video.currentTime > 0 &&
				!video.paused &&
				!video.ended &&
				video.readyState > 2
			) {
				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestamps(
						Math.floor(video.currentTime),
						Math.floor(video.duration)
					);
				presenceData.smallImageKey = Assets.Play;
			} else {
				presenceData.startTimestamp = null;
				presenceData.endTimestamp = null;
				presenceData.state = "일시 정지됨";
				presenceData.smallImageKey = Assets.Pause;
			}
		}
	}

	presence.setActivity(presenceData);
});
