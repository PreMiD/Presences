const presence = new Presence({
	clientId: "1133347072200949770",
});

let prevData = "",
	AnimeData: Detail = {},
	AnimeDataEpisode: Episode = {};

type Detail = {
	id?: string;
	name?: string;
	img?: string;
	is_ending?: boolean;
	animation_info?: {
		air_year_quarter?: string;
	};
	meta_info?: {
		avg_rating?: string;
	};
};

type Episode = {
	id?: string;
	title?: string;
	subject?: string;
	episode_num?: string;
};

presence.on("UpdateData", async () => {
	const { pathname, search } = document.location;
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/PDh4ncE.jpg",
	};

	if (pathname === "/") {
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = "둘러보는중";
		presenceData.details = "홈";
	} else if (pathname.startsWith("/search")) {
		presenceData.details = "라프텔 검색";
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = "검색중";
		presenceData.state = `"${getQuery().keyword}"`;
	} else if (pathname.match(/^\/item\/\d/)) {
		if (prevData === pathname && AnimeData.name) {
			presenceData.details = AnimeData.name;
			presenceData.largeImageKey = AnimeData.img;
			presenceData.smallImageKey = Assets.VideoCall;
			presenceData.smallImageText = AnimeData.is_ending ? "완결작품" : "방영중";
			presenceData.state = AnimeData.animation_info.air_year_quarter;

			presenceData.buttons = [
				{
					label: "감상하기",
					url: `https://laftel.net/item/${AnimeData.id}`,
				},
				{
					label: `별점 ${AnimeData.meta_info.avg_rating}점`,
					url: `https://laftel.net/item/${AnimeData.id}/review`,
				},
			];
		} else {
			prevData = pathname;
			AnimeData = await (
				await fetch(
					`https://laftel.net/api/v1.0/items/${pathname.split("/")[2]}/detail/`,
					{
						headers: {
							laftel: "TeJava",
						},
					}
				)
			).json();

			presenceData.details = AnimeData.name;
			presenceData.largeImageKey = AnimeData.img;
			presenceData.smallImageKey = Assets.VideoCall;
			presenceData.smallImageText = AnimeData.is_ending ? "완결작품" : "방영중";
			presenceData.state = AnimeData.animation_info.air_year_quarter;

			presenceData.buttons = [
				{
					label: "감상하기",
					url: `https://laftel.net/item/${AnimeData.id}`,
				},
				{
					label: `별점 ${AnimeData.meta_info.avg_rating}점`,
					url: `https://laftel.net/item/${AnimeData.id}/review`,
				},
			];
		}
	} else if (pathname.match(/\/player\/\d*\/\d/)) {
		const video: HTMLVideoElement = document.querySelector("video");
		if (video && !isNaN(video.duration)) {
			if (prevData !== pathname) {
				prevData = pathname;
				AnimeDataEpisode = await (
					await fetch(
						`https://laftel.net/api/episodes/v1/${pathname.split("/")[3]}`,
						{
							headers: {
								laftel: "TeJava",
							},
						}
					)
				).json();
			}

			if (!AnimeData.id) {
				AnimeData = await (
					await fetch(
						`https://laftel.net/api/v1.0/items/${
							pathname.split("/")[2]
						}/detail/`,
						{
							headers: {
								laftel: "TeJava",
							},
						}
					)
				).json();
			}

			presenceData.details = `${AnimeDataEpisode.title}`;
			presenceData.state = `${AnimeDataEpisode.episode_num}화 ${AnimeDataEpisode.subject}`;
			presenceData.largeImageKey = AnimeData.img;

			presenceData.buttons = [
				{
					label: "자세히 보기",
					url: `https://laftel.net/item/${AnimeData.id}`,
				},
				{
					label: `${AnimeDataEpisode.episode_num}화 감상하기`,
					url: `https://laftel.net/player/${AnimeData.id}/${AnimeDataEpisode.id}`,
				},
			];
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
				presenceData.smallImageText = "재생중";
			} else {
				presenceData.state = "일시 정지됨";
				presenceData.smallImageKey = Assets.Pause;
			}
		}
	}

	presence.setActivity(presenceData);

	function getQuery() {
		return JSON.parse(
			`{"${decodeURI(search.substring(1))
				.replaceAll('"', '\\"')
				.replaceAll("&", '","')
				.replaceAll("=", '":"')}"}`
		);
	}
});
