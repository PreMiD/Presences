const presence = new Presence({
		clientId: "1104875968134397963",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
enum Assets {
	Logo = "https://i.imgur.com/ZmylEPM.png",
	Play = "https://i.imgur.com/6s4WyWY.png",
	Pause = "https://i.imgur.com/PrYtpQb.png",
	Search = "https://i.imgur.com/08wjeL0.png",
}
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/ZmylEPM.png",
			startTimestamp: browsingTimestamp,
		},
		{ href, pathname, hostname } = document.location,
		video = document.querySelector<HTMLVideoElement>("video"),
		search = document.querySelector<HTMLInputElement>("[id='search-input']");
	if (search?.value) {
		presenceData.details = "Searching for:";
		presenceData.state = search?.value;
		presenceData.smallImageKey = Assets.Search;
	} else if (pathname.startsWith("/play")) {
		const thumbnail = document
			.querySelector('[class="img-fluid"]')
			?.getAttribute("src")
			?.replace(".webp", ".png");
		presenceData.details = document.querySelector(
			'[class="mb-1  text-truncate"]'
		)?.textContent;
		presenceData.state = document
			.querySelector('[class*="currentPlay bg-success"]')
			?.textContent.replace("E", "Episode");
		presenceData.largeImageKey = thumbnail
			? `https://${hostname}${thumbnail}`
			: Assets.Logo;
		if (video) {
			presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
			presenceData.smallImageText = video.paused ? "Paused" : "Playing";
			presenceData.buttons = [{ label: "Watch Video", url: href }];
		} else presenceData.buttons = [{ label: "View Anime", url: href }];
	} else if (pathname === "/index") {
		presenceData.details = "Browsing all animes";
		presenceData.buttons = [{ label: "Browse All Animes", url: href }];
	} else if (pathname.includes("/index")) {
		presenceData.details = `Viewing ${pathname
			.split("/")[2]
			.toLowerCase()} animes`;
		presenceData.state = `Page ${
			document.querySelector('[class="page-item active"]')?.textContent
		}/${
			document.querySelector(
				'[class="pagination pagination-sm justify-content-center"]'
			).children[
				Number(
					document.querySelector(
						'[class="pagination pagination-sm justify-content-center"]'
					).children.length
				) - 2
			].textContent
		}`;
		presenceData.buttons = [{ label: "View Animes", url: href }];
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
