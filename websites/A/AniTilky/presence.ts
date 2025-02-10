/// <reference types="premid" />

export const presence = new Presence({
	clientId: "1124065204200820786"
}),
	time = Math.floor(Date.now() / 1000),
	path = document.location.pathname,
	videoData = {
		current: 0,
		duration: 0,
		paused: true,
		isLive: false
	},
	baseUrl = "https://anitilky.xyz";

presence.on(
	"iFrameData",
	async (data: { current: number; duration: number; paused: boolean; isLive: boolean }) => {
		if (!data) return;
		Object.assign(videoData, data);
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo"
	};

	// Ana sayfa kontrolü
	if (path === "/") {
		presenceData.details = "Ana sayfaya göz atıyor";
		presenceData.startTimestamp = time;
	} else if (path === "/profile") {
		// Kendi profil sayfası kontrolü
		presenceData.details = "Kendi profiline bakıyor";
		presenceData.state =
			document.querySelector(".profile-username")?.textContent?.trim() ||
			"Profil";
		presenceData.startTimestamp = time;
	} else if (path.startsWith("/u/")) {
		// Başka kullanıcı profili kontrolü
		presenceData.details = "Kullanıcı profiline bakıyor";
		presenceData.state = path.split("/").pop() || "";
		presenceData.startTimestamp = time;

		presenceData.buttons = [
			{
				label: "Profile Bak",
				url: `${baseUrl}/u/${presenceData.state}`
			}
		];
	} else if (/^\/anime\/[0-9a-f]{24}$/.test(path)) {
		// Anime detay sayfası kontrolü
		presenceData.details = "Anime detayına bakıyor";
		presenceData.state =
			document.querySelector(".anime-title")?.textContent?.trim() ||
			"Bilinmeyen Anime";
		presenceData.startTimestamp = time;

		presenceData.buttons = [
			{
				label: "Anime Sayfasına Git",
				url: `${baseUrl}${path}`
			}
		];
	} else if (/^\/watch\/[0-9a-f]{24}$/.test(path)) {
		// Anime izleme sayfası kontrolü
		const urlParams = new URLSearchParams(window.location.search),
			season = urlParams.get("season") || "1",
			episode = urlParams.get("episode") || "1";

		presenceData.details =
			document.querySelector(".anime-title")?.textContent?.trim() ||
			"Bilinmeyen Anime";
		presenceData.state = `Sezon ${season} Bölüm ${episode}`;

		if (typeof videoData.paused === "boolean") {
			presenceData.smallImageKey = videoData.paused ? "pause" : "play";
			presenceData.smallImageText = videoData.paused
				? "Duraklatıldı"
				: "Oynatılıyor";

			if (!videoData.paused && videoData.duration > 0) {
				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestamps(
						Math.floor(videoData.current),
						Math.floor(videoData.duration)
					);
			}
		}

		presenceData.buttons = [
			{
				label: "Anime Sayfasına Git",
				url: `${baseUrl}/anime/${path.split("/").pop()}`
			},
			{
				label: "Bölüme Git",
				url: `${baseUrl}${path}?season=${season}&episode=${episode}`
			}
		];
	} else if (path.includes("/anime")) {
		// Anime liste sayfası kontrolü
		presenceData.details = "Anime listesine göz atıyor";
		presenceData.startTimestamp = time;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});