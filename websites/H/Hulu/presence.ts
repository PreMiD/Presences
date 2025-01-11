const presence = new Presence({
		clientId: "607719679011848220",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		live: "general.live",
		search: "general.searching",
	});

function capitalize(text: string): string {
	text = text.toLowerCase();
	return text.charAt(0).toUpperCase() + text.slice(1);
}

let elapsed: number, oldUrl: string, header, title, item;

presence.on("UpdateData", async () => {
	const showAsWatching = await presence.getSetting("showAsWatching");

	let video: HTMLVideoElement = null,
		details,
		state,
		smallImageKey,
		smallImageText,
		startTimestamp,
		endTimestamp,
		buttons: ButtonData[] | null = null;

	buttons = null;

	const { href, pathname: path } = window.location;
	if (href !== oldUrl) {
		oldUrl = href;
		elapsed = Math.floor(Date.now() / 1000);
	}

	details = "Browsing";
	startTimestamp = elapsed;

	if (path.includes("/hub")) {
		header = document.querySelector(".Hub__title");
		title = document.querySelector(".SimpleModalNav__title");
		details = "Viewing Category";
		if (header) {
			state = header.textContent;
			if (title) state = `${state} (${title.textContent})`;
		}
	} else if (path.includes("/genre")) {
		header = document.querySelector(".Hub__title");
		title = document.querySelector(".SimpleModalNav__title");
		details = "Viewing Genre";
		if (header) {
			state = header.textContent;
			if (title) state = `${state} (${title.textContent})`;
		}
	} else if (path.includes("/series")) {
		title = document.querySelector(".Masthead__title");
		item = document.querySelector(".Subnav__item.active");
		details = "Viewing Series";
		if (title) {
			state = title.textContent;
			if (item) state = `${state}'s ${item.textContent}`;
		}
	} else if (path.includes("/movie")) {
		title = document.querySelector(".Masthead__title");
		item = document.querySelector(".Subnav__item.active");
		details = "Viewing Movie";
		if (title) {
			state = title.textContent;
			if (item) state = `${state}'s ${item.textContent}`;
		}
	} else if (path.includes("/network")) {
		const brand: HTMLImageElement = document.querySelector(
			".SimpleModalNav__brandImage"
		);
		item = document.querySelector(".Subnav__item.active");
		details = "Viewing Network";
		if (brand) {
			state = brand.alt;
			if (item) state = `${state}'s ${item.textContent}`;
		}
	} else if (path.includes("/sports_episode")) {
		title = document.querySelector(".Masthead__title");
		item = document.querySelector(".Subnav__item.active");
		details = "Viewing Sports Episode";
		if (title) {
			state = title.textContent;
			if (item) state = `${state}'s ${item.textContent}`;
		}
	} else if (path.includes("/sports_team")) {
		title = document.querySelector(".Masthead__title");
		item = document.querySelector(".Subnav__item.active");
		details = "Viewing Sports Team";
		if (title) {
			state = title.textContent;
			if (item) state = `${state}'s ${item.textContent}`;
		}
	} else if (path.includes("/search")) {
		const input: HTMLInputElement = document.querySelector(".cu-search-input");
		details = "Searching";
		smallImageKey = Assets.Search;
		smallImageText = (await strings).search;
		if (input && input.value.length > 0) state = input.value;
	} else if (path.includes("/live")) {
		const category = document.querySelector(
			".LiveGuide__filter-item--selected"
		);
		title = document.querySelector(".ModalHeader__showname");
		details = "Viewing Live";
		if (category) {
			state = capitalize(category.textContent);
			if (title) state = `${state} (${title.textContent})`;
		}
	} else if (path.includes("/my-stuff")) details = "Viewing My Stuff";
	else if (path.includes("/manage-dvr")) {
		item = document.querySelector(".Subnav__item.active");
		details = "Viewing My DVR";
		if (item) state = capitalize(item.textContent);
	} else if (path.includes("/watch")) {
		/* 		video = document.querySelector(".content-video-player");
		if (video) {
			title = document.querySelector(".metadata-area__second-line");
			const content = document.querySelector(".metadata-area__third-line"),
				timestamps = presence.getTimestamps(
					Math.floor(video.currentTime),
					Math.floor(video.duration)
				),
				live = timestamps[1] === Infinity;
			details = "Watching";
			if (title) details = title.textContent;

			if (content && content.textContent.length > 0)
				state = content.textContent;

			smallImageKey = live
				? Assets.Live
				: video.paused
				? Assets.Pause
				: Assets.Play;
			smallImageText = live
				? (await strings).live
				: video.paused
				? (await strings).pause
				: (await strings).play;
			if (!video.paused) {
				if (!live) [startTimestamp, endTimestamp] = timestamps;
				else startTimestamp = elapsed;
			}
		} else { */
		video = document.querySelector("video#content-video-player");
		details = "Viewing Watch History";
		if (video) {
			title = document.querySelector(
				"#web-player-app div.PlayerMetadata__titleText"
			);
			const content = document.querySelector(
					"#web-player-app div.PlayerMetadata__subTitle"
				),
				sliderEl = document.querySelector(".Timeline__slider"),
				timestamps = presence.getTimestamps(
					parseInt(sliderEl.getAttribute("aria-valuenow")),
					parseInt(sliderEl.getAttribute("aria-valuemax"))
				);

			if (!video.paused) {
				startTimestamp = timestamps[0];
				endTimestamp = timestamps[1];
			} else {
				startTimestamp = null;
				endTimestamp = null;
			}

			details = "Watching";
			if (title) details = title.textContent;

			if (content && content.textContent.length > 0)
				state = content.textContent;

			smallImageKey = video.paused ? Assets.Pause : null;
			smallImageText = video.paused ? (await strings).pause : null;
			/* } */
		}
	}

	let largeImageText = null;
	const seasonAndEpisode = state?.match(/S(\d+) E(\d+)-/);
	if (seasonAndEpisode?.length > 2) {
		largeImageText = `Season ${seasonAndEpisode[1]}, Episode ${seasonAndEpisode[2]}`;
		state = state.replace(/S(\d+) E(\d+)-/, "");
		buttons = [
			{
				label: "Watch Episode",
				url: href,
			},
		];
	}

	presence.setActivity(
		{
			...(showAsWatching &&
				state && { name: details, type: ActivityType.Watching }),
			...(largeImageText && { largeImageText }),
			details,
			state,
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/H/Hulu/assets/logo.png",
			smallImageKey,
			smallImageText,
			startTimestamp,
			endTimestamp,
			...((buttons && { buttons }) as unknown as ButtonData[]),
		},
		video ? !video.paused : true
	);
});
