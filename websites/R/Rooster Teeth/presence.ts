const presence = new Presence({
		clientId: "703697546794631209",
	}),
	elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	let video: HTMLVideoElement, live;
	const path = window.location.pathname,
		presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/R/Rooster%20Teeth/assets/logo.png",
			details: "Browsing Rooster Teeth",
			startTimestamp: elapsed,
		};
	if (window.location.hash.includes("#search?term=")) {
		presenceData.details = "Searching For:";
		presenceData.state =
			document.querySelector<HTMLInputElement>(".search__input").value;
	} else if (path.includes("/live/rt-tv")) {
		video = document.querySelector(".vjs-tech");
		presenceData.details = document
			.querySelector(
				".livestream-card.livestream-schedule-item-fade-enter-done"
			)
			.querySelector(".livestream-show").textContent;
		presenceData.details += ` ${
			document
				.querySelector(
					".livestream-card.livestream-schedule-item-fade-enter-done"
				)
				.querySelector(".livestream-title").textContent
		}`;
		presenceData.state = "RT-TV";
		live = true;
	} else if (document.querySelector(".vjs-tech")) {
		live = false;
		video = document.querySelector(".vjs-tech");
		if (document.querySelector(".video-details__heading")) {
			presenceData.details = document.querySelector(
				".video-details__title"
			).textContent;
			presenceData.state = document.querySelector(
				".video-details__show"
			).textContent;
		} else {
			presenceData.details =
				document.querySelector(".player-title").textContent;
			presenceData.state = "Miniplayer";
		}
	} else if (path.includes("/watch")) {
		if (document.querySelector(".video-details__heading")) {
			presenceData.details = document.querySelector(
				".video-details__title"
			).textContent;
			presenceData.state = document.querySelector(
				".video-details__show"
			).textContent;
		} else {
			presenceData.details =
				document.querySelector(".player-title").textContent;
			presenceData.state = "Miniplayer";
		}
	} else if (path.includes("/schedule")) {
		presenceData.details = "Viewing Schedule";
		for (const x in document.querySelectorAll(".schedule-day")) {
			// eslint-disable-next-line no-prototype-builtins
			if (document.querySelectorAll(".schedule-day").hasOwnProperty(x)) {
				const position = document
					.querySelectorAll(".schedule-day")

					[x].getBoundingClientRect();
				if (position.top < window.innerHeight && position.bottom >= 0) {
					presenceData.state = document
						.querySelectorAll(".schedule-day")

						[x].querySelector(".schedule-day__heading")
						.textContent.toLowerCase();
					presenceData.state =
						presenceData.state.substr(0, 1).toUpperCase() +
						presenceData.state.substr(1);
					break;
				}
			}
		}
	} else if (path.includes("/series/")) {
		presenceData.details = "Browsing Through Videos Of:";
		presenceData.state = document.querySelector(".featured-title").textContent;
	} else if (path.includes("/channel/")) {
		presenceData.details = "Viewing Channel:";
		[, presenceData.state] = document
			.querySelector(".carousel-container")
			.querySelector(".carousel-title")
			.textContent.split("RECENT EPISODES FROM ");
	} else if (path.includes("/series")) presenceData.details = "Browsing Series";
	else if (path.includes("/episodes")) {
		if (new URLSearchParams(window.location.search).get("channel_id")) {
			presenceData.details = "Browsing Episodes Of:";
			presenceData.state = document
				.querySelector(".dropdown-label")
				.textContent.split("FILTER (")[1]
				.replace(")", "");
		} else presenceData.details = "Browsing Episodes";
	} else if (path.includes("/g/") && !path.includes("/g/all")) {
		presenceData.details = "Browsing Group:";
		if (path.includes("explore")) presenceData.state = "Explore";
		else {
			presenceData.state = document
				.querySelector(".content-sidebar")
				.querySelector(".banner-title").textContent;
		}
	} else if (path.includes("/g")) {
		presenceData.details = `Browsing ${
			path.includes("/g/all") ? "All " : ""
		}Groups`;
	}
	if (video) {
		if (live) {
			presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Live;
			presenceData.smallImageText = video.paused
				? "Live Playback paused"
				: "Live";
		} else {
			presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
			presenceData.smallImageText = video.paused
				? "Playback paused"
				: "Playing back";
			if (!video.paused) {
				presenceData.endTimestamp =
					Math.floor(Date.now() / 1000) -
					Math.floor(video.currentTime) +
					Math.floor(video.duration);
			} else delete presenceData.startTimestamp;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
