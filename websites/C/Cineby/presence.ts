import { CinebyApi, MovieDetails, TvDetails } from "./api";

const presence = new Presence({
		clientId: "1325115346696273993",
	}),
	startTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/C/Cineby/assets/logo.png",
			details: "Browsing",
			type: ActivityType.Watching,
			startTimestamp,
		},
		{ pathname } = document.location,
		[showBrowsing, useActivityName, showCover] = await Promise.all([
			presence.getSetting<boolean>("showBrowsing"),
			presence.getSetting<boolean>("useActivityName"),
			presence.getSetting<boolean>("showCover"),
		]);

	switch (pathname.split("/")[1]) {
		case "movie": {
			const {
				title,
				poster_path: posterPath,
				release_date: releaseDate,
				runtime,
			} = await CinebyApi.getCurrent<MovieDetails>(pathname);

			if (useActivityName) presenceData.name = title;
			presenceData.details = title;
			presenceData.state = `${releaseDate
				.split("-")
				.shift()} • ${runtime} minutes`;

			if (showCover)
				presenceData.largeImageKey = `https://image.tmdb.org/t/p/original${posterPath}`;
			break;
		}
		case "tv": {
			const {
				name: title,
				season_poster: seasonPoster,
				episode_title: episodeTitle,
				season_number: seasonNumber,
				episode_number: episodeNumber,
			} = await CinebyApi.getCurrent<TvDetails>(pathname);

			if (useActivityName) presenceData.name = title;

			presenceData.details = useActivityName ? episodeTitle : title;
			presenceData.state = useActivityName
				? `Season ${seasonNumber}, Episode ${episodeNumber}`
				: `S${seasonNumber}:E${episodeNumber} ${episodeTitle}`;

			if (showCover)
				presenceData.largeImageKey = `https://image.tmdb.org/t/p/original${seasonPoster}`;

			break;
		}
		case "anime": {
			const { details } = await CinebyApi.getCurrentAnime(pathname),
				{ title, thumbnail, episodes } = details,
				{ episode, title: episodeTitle } = episodes.find(
					({ episode }) =>
						episode === (parseInt(pathname.split("/").pop()) || 1)
				);

			if (useActivityName) presenceData.name = title;

			presenceData.details = useActivityName
				? episodeTitle.replace(/E[0-9]{1,}: /, "").trim()
				: title;
			presenceData.state = `Episode ${episode}`;

			if (showCover) presenceData.largeImageKey = thumbnail;
			break;
		}
		default:
			if (!showBrowsing) return presence.clearActivity();
	}

	const video = document.querySelector("video");
	if (video) {
		if (!video.paused) {
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestampsfromMedia(video);
		} else presenceData.smallImageKey = Assets.Pause;
	}

	presence.setActivity(presenceData);
});
