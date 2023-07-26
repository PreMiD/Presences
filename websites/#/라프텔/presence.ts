const presence = new Presence({
	clientId: "1133347072200949770",
});

let prevData = "",
	animeData: detail = {},
	animeDataEpisode: episode = {};

type detail = {
	id?: string;
	name?: string;
	img?: string;
	isEnding?: boolean;
	animationInfo?: {
		airYearQuarter?: string;
	};
	metaInfo?: {
		avgRating?: string;
	};
};

type episode = {
	id?: string;
	title?: string;
	subject?: string;
	episodeNum?: string;
};

type Obj<T> = {
	[key: string]: T;
};

function convertCamel<T>(obj: Obj<unknown>): Obj<T> {
	if (obj === null || typeof obj !== "object") return obj as Obj<T>;

	if (Array.isArray(obj)) return obj.map(convertCamel) as unknown as Obj<T>;

	function convertCamel<T extends Record<string, unknown>>(
		obj: T
	): Record<string, unknown> {
		if (obj === null || typeof obj !== "object")
			return obj as Record<string, unknown>;

		if (Array.isArray(obj))
			return obj.map(convertCamel) as unknown as Record<string, unknown>;

		return Object.keys(obj).reduce(
			(camelObj: Record<string, unknown>, key: string) => {
				camelObj[
					key.replace(/_(\w)/g, (_match, letter) => letter.toUpperCase())
				] = convertCamel(obj[key] as Obj<unknown>) as unknown as Record<
					string,
					unknown
				>[string];
				return camelObj;
			},
			{} as Record<string, unknown>
		) as Record<string, unknown>;
	}

	return convertCamel(obj) as Obj<T>;
}

presence.on("UpdateData", async () => {
	const { pathname, search } = document.location,
		presenceData: PresenceData = {
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
		if (prevData === pathname && animeData.name) {
			presenceData.details = animeData.name;
			presenceData.largeImageKey = animeData.img;
			presenceData.smallImageKey = Assets.VideoCall;
			presenceData.smallImageText = animeData.isEnding ? "완결작품" : "방영중";
			presenceData.state = animeData.animationInfo.airYearQuarter;

			presenceData.buttons = [
				{
					label: "감상하기",
					url: `https://laftel.net/item/${animeData.id}`,
				},
				{
					label: `별점 ${animeData.metaInfo.avgRating}점`,
					url: `https://laftel.net/item/${animeData.id}/review`,
				},
			];
		} else {
			prevData = pathname;
			animeData = convertCamel(
				await (
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
				).json()
			);

			presenceData.details = animeData.name;
			presenceData.largeImageKey = animeData.img;
			presenceData.smallImageKey = Assets.VideoCall;
			presenceData.smallImageText = animeData.isEnding ? "완결작품" : "방영중";
			presenceData.state = animeData.animationInfo.airYearQuarter;

			presenceData.buttons = [
				{
					label: "감상하기",
					url: `https://laftel.net/item/${animeData.id}`,
				},
				{
					label: `별점 ${animeData.metaInfo.avgRating}점`,
					url: `https://laftel.net/item/${animeData.id}/review`,
				},
			];
		}
	} else if (pathname.match(/\/player\/\d*\/\d/)) {
		const video: HTMLVideoElement = document.querySelector("video");
		if (video && !isNaN(video.duration)) {
			if (prevData !== pathname) {
				prevData = pathname;
				animeDataEpisode = convertCamel(
					await (
						await fetch(
							`https://laftel.net/api/episodes/v1/${pathname.split("/")[3]}`,
							{
								headers: {
									laftel: "TeJava",
								},
							}
						)
					).json()
				);
			}

			if (!animeData.id) {
				animeData = await (
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

			presenceData.details = `${animeDataEpisode.title}`;
			presenceData.state = `${animeDataEpisode.episodeNum}화 ${animeDataEpisode.subject}`;
			presenceData.largeImageKey = animeData.img;

			presenceData.buttons = [
				{
					label: "자세히 보기",
					url: `https://laftel.net/item/${animeData.id}`,
				},
				{
					label: `${animeDataEpisode.episodeNum}화 감상하기`,
					url: `https://laftel.net/player/${animeData.id}/${animeDataEpisode.id}`,
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
