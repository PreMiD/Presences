const presence = new Presence({
		clientId: "721741902403207218",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		browsing: "general.browsing",
		live: "general.live",
	});
let prev: string, elapsed: number, path: string, gender: string;

enum Assets {
	Logo = "https://i.imgur.com/PjQ6k9n.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
		},
		video: HTMLVideoElement = document.querySelector("video[id$='_html5_api']");

	path = document.location.pathname;

	if (
		path.includes("/b/") &&
		document.querySelector("#broadcaster_intro") &&
		(document.querySelector("#broadcaster_intro") as HTMLElement).style
			.display === "none"
	) {
		if (window.location.href !== prev) {
			prev = window.location.href;
			elapsed = Math.floor(Date.now() / 1000);
		}

		presenceData.details = "Broadcasting as";
		presenceData.state = path.split("/")[2];
		presenceData.smallImageKey = "live";
		presenceData.smallImageText = (await strings).live;
		presenceData.startTimestamp = elapsed;
	} else if (
		!video &&
		document.querySelector("#header div.logo-zone") !== null
	) {
		presenceData.details = (await strings).browsing;
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = (await strings).browsing;

		if (path.includes("/p/")) {
			// Whoever editing this file in the future, keep this as it is for the sake of user's privacy
			presenceData.state = "Accounts";
		} else if (path.includes("/b/")) presenceData.state = "Broadcast page";
		else if (path.includes("/tag/")) {
			if (
				typeof path.split("/")[3] === "undefined" ||
				path.split("/")[3] === null ||
				path.split("/")[3] === "" ||
				path.split("/")[3].length > 1
			) {
				// Different checks to prevent "undefined" gender strings.
				presenceData.state = `Tag : ${path.split("/")[2]}`;
			} else {
				switch (path.split("/")[3]) {
					case "f":
						gender = "female";
						break;
					case "m":
						gender = "male";
						break;
					case "c":
						gender = "couple";
						break;
					case "s":
						gender = "trans";
				}

				presenceData.state = `Tag : ${path.split("/")[2]} (${gender})`;
			}
		} else {
			switch (path) {
				case "/":
					presenceData.state = "Featured cams";
					break;
				case "/female-cams/":
					presenceData.state = "Female cams";
					break;
				case "/male-cams/":
					presenceData.state = "Male cams";
					break;
				case "/couple-cams/":
					presenceData.state = "Couple cams";
					break;
				case "/trans-cams/":
					presenceData.state = "Trans cams";
					break;
				case "/tags/":
					presenceData.state = "Tags";
					break;
				case "/accounts/register/":
					presenceData.state = "Signing up";
					break;
				case "/auth/login/":
					presenceData.state = "Logging in";
					break;
				case "/auth/logout/":
					presenceData.state = "Logging out";
					break;
				case "/north-american-cams/":
					presenceData.state = "North American cams";
					break;
				case "/other-region-cams/":
					presenceData.state = "Other region cams";
					break;
				case "/euro-russian-cams/":
					presenceData.state = "Euro Russian cams";
					break;
				case "/asian-cams/":
					presenceData.state = "Asian cams";
					break;
				case "/south-american-cams/":
					presenceData.state = "South American cams";
					break;
				case "/exhibitionist-cams/":
					presenceData.state = "Exhibitionist cams";
					break;
				case "/hd-cams/":
					presenceData.state = "HD cams";
					break;
				case "/spy-on-cams/":
					presenceData.state = "Private cams";
					break;
				case "/new-cams/":
					presenceData.state = "New cams";
					break;
				case "/mature-cams/":
					presenceData.state = "Mature cams";
					break;
				case "/teen-cams/":
					presenceData.state = "Teen cams";
					break;
				case "/sitemap/":
				case "/2257/":
				case "/terms/":
				case "/contest/details/":
				case "/jobs/":
				case "/apps/":
				case "/billingsupport/":
				case "/security/":
				case "/affiliates/":
				case "/privacy/":
				case "/law_enforcement/":
					presenceData.details = "Reading";
					presenceData.state = "Law and meta pages";
					presenceData.smallImageKey = Assets.Reading;
					presenceData.smallImageText = "Reading";
					break;
				case "/tube/":
					presenceData.state = "Tube";
					break;
				case "/accounts/welcome/":
					presenceData.state = "Welcome page";
					break;
				case "/my_collection/private_shows/":
					presenceData.state = "Recorded private shows";
					break;
				case "/my_collection/photo_videos/":
					presenceData.state = "Purchased photos/videos";
					break;
				case "/tipping/free_tokens/":
					presenceData.state = "Free token methods";
					break;
				case "/supporter/upgrade/":
					presenceData.state = "Upgrade page";
					break;
				default:
					presenceData.state = "Cams";
			}
		}
	} else if (path.includes("/photo_videos/")) {
		if (!video && path.includes("/photo_videos/photo/")) {
			presenceData.details = "Looking at a photo";
			presenceData.state = document.querySelector("h1").textContent;
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = (await strings).browsing;
		} else if (video && path.includes("/photo_videos/photo/")) {
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(
					Math.floor(video.currentTime),
					Math.floor(video.duration)
				);

			presenceData.details = "Watching a clip";
			presenceData.state = document.querySelector("h1").textContent;
			presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
			presenceData.smallImageText = video.paused
				? (await strings).pause
				: (await strings).play;

			if (video.paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		} else {
			presenceData.details = (await strings).browsing;
			presenceData.state = "Photosets";
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = (await strings).browsing;
		}
	} else if (path.split("/")[2] === null || path.split("/")[2].length === 0) {
		if (window.location.href !== prev) {
			prev = window.location.href;
			elapsed = Math.floor(Date.now() / 1000);
		}

		presenceData.startTimestamp = elapsed;
		[, presenceData.details] = path.split("/");

		if (video && !video.paused) {
			presenceData.smallImageKey = "live";
			presenceData.smallImageText = (await strings).live;
		} else {
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = (await strings).browsing;
			presenceData.state = (await strings).browsing;
		}
	} else {
		presenceData.details = (await strings).browsing;
		presenceData.state = "Cams";
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = (await strings).browsing;
	}

	presence.setActivity(presenceData);
});
