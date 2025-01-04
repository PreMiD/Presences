/* eslint-disable camelcase */

import { CinebyApi, MovieDetails, TvDetails } from "./api";

const presence = new Presence({
	clientId: "1325115346696273993",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/zAKeytL.png",
			details: "Browsing",
			type: ActivityType.Watching,
		},
		{ pathname } = document.location,
		[showBrowsing, usePresenceName, showCover] = await Promise.all([
			presence.getSetting<boolean>("showBrowsing"),
			presence.getSetting<boolean>("usePresenceName"),
			presence.getSetting<boolean>("showCover"),
		]);

	switch (pathname.split("/")[1]) {
		case "movie": {
			const { title, poster_path, release_date, runtime } =
				await CinebyApi.getCurrent<MovieDetails>(pathname);

			if (title) {
				if (usePresenceName) presenceData.name = title;
				presenceData.details = title;
				presenceData.state = `${release_date
					.split("-")
					.shift()} • ${runtime} minutes`;

				if (showCover)
					presenceData.largeImageKey = `https://image.tmdb.org/t/p/original${poster_path}`;
			}
			break;
		}
		case "tv": {
			const {
				name: title,
				season_poster,
				episode_title,
				season_number,
				episode_number,
			} = await CinebyApi.getCurrent<TvDetails>(pathname);

			if (title) {
				if (usePresenceName) presenceData.name = title;

				presenceData.details = usePresenceName ? episode_title : title;
				presenceData.state = usePresenceName
					? `Season ${season_number}, Episode ${episode_number}`
					: `S${season_number}:E${episode_number} ${episode_title}`;

				if (showCover)
					presenceData.largeImageKey = `https://image.tmdb.org/t/p/original${season_poster}`;
			}
			break;
		}
		case "anime": {
			const { details } = await CinebyApi.getCurrentAnime(pathname),
				{ title, thumbnail, episodes } = details,
				{ episode, title: episodeTitle } = episodes.find(
					({ episode }) => episode === (parseInt(pathname.split("/").pop()) || 1) 
				);

			if (details) {
				if (usePresenceName) presenceData.name = title;

				presenceData.details = usePresenceName
					? episodeTitle.replace(/E[0-9]{1,}: /, "").trim()
					: title;
				presenceData.state = `Episode ${episode}`;

				if (showCover) presenceData.largeImageKey = thumbnail;
			}
			break;
		}
		default:
			if (!showBrowsing) return presence.clearActivity();
	}

	const video = document.querySelector("video");
	if (video && !video.paused) {
		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestampsfromMedia(video);
	}

	presence.setActivity(presenceData);
});
