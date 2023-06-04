const presence = new Presence({
		clientId: "1104875968134397963",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/N/Ngewibu/assets/logo.png",
			startTimestamp: browsingTimestamp,
		},
		{ href, pathname, search } = document.location,
		video = document.querySelector<HTMLVideoElement>("video");
	if (pathname.startsWith("/search")) {
		presenceData.details = "Searching for";
		presenceData.state = search.split("?q=")[1];
		presenceData.smallImageKey = Assets.Search;
	} else if (pathname.startsWith("/play")) {
		const thumbnail = document
				.querySelector<HTMLMetaElement>('meta[property="og:image"]')
				.getAttribute("content")
				.replace("webp", "png"),
			title = document
				.querySelector<HTMLMetaElement>('meta[property="og:title"]')
				.getAttribute("content")
				.replace(" - NGEWIBU.TV", "");

		presenceData.largeImageKey = thumbnail || presenceData.largeImageKey;
		presenceData.state = `Episode ${title
			.match(/E \d+/g)[0]
			.replace("E ", "")}`;
		presenceData.details = `Watching ${title}`;
		if (video) {
			presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
			presenceData.smallImageText = video.paused ? "Paused" : "Playing";
			presenceData.buttons = [{ label: "Watch Video", url: href }];
		} else presenceData.buttons = [{ label: "View Anime", url: href }];
	} else if (pathname.startsWith("/video/")) {
		const thumbnail = document
			.querySelector<HTMLMetaElement>('meta[property="og:image"]')
			.getAttribute("content")
			.replace("webp", "png");

		presenceData.largeImageKey = thumbnail || presenceData.largeImageKey;
		presenceData.state = "Shorts Video";
		presenceData.details = `Watching ${document
			.querySelector<HTMLMetaElement>('meta[property="og:title"]')
			.getAttribute("content")
			.replace(" - NGEWIBU.TV", "")}`;
		if (video) {
			presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
			presenceData.smallImageText = video.paused ? "Paused" : "Playing";
			presenceData.buttons = [{ label: "Watch Video", url: href }];
		} else presenceData.buttons = [{ label: "View Videos", url: href }];
	} else if (pathname === "/") {
		presenceData.details = "Viewing home page";
		presenceData.smallImageKey = Assets.Viewing;
	} else if (pathname.includes("/anime")) {
		presenceData.details = `Viewing Anime category ${
			pathname.split("/")[2] || "semua"
		}`;
		presenceData.state = `Page ${pathname.split("/")[3] || 1}`;
		presenceData.smallImageKey = Assets.Viewing;
		presenceData.buttons = [{ label: "View Animes", url: href }];
	} else if (pathname.includes("/tv-shows")) {
		presenceData.details = "Viewing TV Shows";
		presenceData.state = `Page ${pathname.split("/")[2] || 1}`;
		presenceData.smallImageKey = Assets.Viewing;
		presenceData.buttons = [{ label: "View TV Shows", url: href }];
	} else if (pathname.includes("/trending")) {
		presenceData.details = "Viewing trending";
		presenceData.state = `${pathname.split("/")[2] || "umum"}`;
		presenceData.smallImageKey = Assets.Viewing;
		presenceData.buttons = [{ label: "View Trending", url: href }];
	} else if (pathname.includes("/videos")) {
		presenceData.details = "Viewing shorts videos";
		presenceData.state = `Page ${pathname.split("/")[2] || 1}`;
		presenceData.smallImageKey = Assets.Viewing;
		presenceData.buttons = [{ label: "View Shorts", url: href }];
	} else if (pathname.includes("/jadwal-tayang")) {
		presenceData.details = "Viewing jadwal tayang";
		presenceData.state = document.querySelector(
			"h6.mb-3.text-white.px-2"
		).textContent;
		presenceData.smallImageKey = Assets.Viewing;
		presenceData.buttons = [{ label: "View Jadwal Tayang", url: href }];
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
