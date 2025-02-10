/// <reference types="premid" />

const presence = new Presence({
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
baseUrl = "https://anitilky.xyz",
Assets = {
	Logo: "logo"
} as const;

const strings = presence.getStrings({
	playing: "general.playing",
	paused: "general.paused",
	browsing: "general.browsing"
});

type AnimeData = {
	title: {
		tr?: string;
		romaji?: string;
		english?: string;
	};
	coverImage?: string;
};

type UserProfile = {
	username: string;
	avatar?: string;
};

presence.on("iFrameData", async (data: { current: number; duration: number; paused: boolean; isLive: boolean }) => {
	if (!data) return;
	Object.assign(videoData, data);
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo
	};

	// Ana sayfa kontrolü
	if (path === "/") {
		presenceData.details = "Ana sayfaya göz atıyor";
		presenceData.startTimestamp = time;
	} else if (path === "/profile") { // Kendi profil sayfası kontrolü
		presenceData.details = "Kendi profiline bakıyor";
		presenceData.state = document.querySelector(".profile-username")?.textContent?.trim() || "Profil";
		presenceData.startTimestamp = time;
	} else if (path.startsWith("/u/")) { // Başka kullanıcı profili kontrolü
		const username = path.split("/").pop() || "";

		presenceData.details = "Kullanıcı profiline bakıyor";
		presenceData.state = username;
		presenceData.startTimestamp = time;
		
		presenceData.buttons = [
			{
				label: "Profile Bak",
				url: `${baseUrl}/u/${username}`
			}
		];
	} else if (/^\/anime\/[0-9a-f]{24}$/.test(path)) { // Anime detay sayfası kontrolü
		const animeId = path.split("/").pop() || "",
		titleElement = document.querySelector(".anime-title");
		
		presenceData.details = "Anime detayına bakıyor";
		presenceData.state = titleElement?.textContent?.trim() || "Bilinmeyen Anime";
		presenceData.startTimestamp = time;
		
		presenceData.buttons = [
			{
				label: "Anime Sayfasına Git",
				url: `${baseUrl}/anime/${animeId}`
			}
		];
	} else if (/^\/watch\/[0-9a-f]{24}$/.test(path)) { // Anime izleme sayfası kontrolü
		const animeId = path.split("/").pop() || "",
		urlParams = new URLSearchParams(window.location.search),
		season = urlParams.get('season') || '1',
		episode = urlParams.get('episode') || '1',
		titleElement = document.querySelector(".anime-title");

		presenceData.details = titleElement?.textContent?.trim() || "Bilinmeyen Anime";
		presenceData.state = `Sezon ${season} Bölüm ${episode}`;
		
		if (videoData) {
			presenceData.smallImageKey = videoData.paused ? "pause" : "play";
			presenceData.smallImageText = videoData.paused 
				? "Duraklatıldı" 
				: "Oynatılıyor";

			if (!videoData.paused && videoData.duration) {
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
				url: `${baseUrl}/anime/${animeId}`
			},
			{
				label: "Bölüme Git",
				url: `${baseUrl}/watch/${animeId}?season=${season}&episode=${episode}`
			}
		];
	} else if (path.includes("/anime")) { // Anime liste sayfası kontrolü
		presenceData.details = "Anime listesine göz atıyor";
		presenceData.startTimestamp = time;
	}

	if (presenceData.details) 
		presence.setActivity(presenceData);
	else
		presence.setActivity();
}); 