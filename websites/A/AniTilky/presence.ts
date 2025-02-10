/// <reference types="premid" />

declare const presence: Presence;
declare const strings: Promise<{
	playing: string;
	paused: string;
	browsing: string;
}>;
declare const startTimestamp: number;
declare const video: {
	current: number;
	duration: number;
	paused: boolean;
	isLive: boolean;
};

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
	video = data;
});

const enum Assets {
	Logo = "logo"
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo
	},
	baseUrl = "https://anitilky.xyz";

	// Ana sayfa kontrolü
	if (document.location.pathname === "/") {
		presenceData.details = "Ana sayfaya göz atıyor";
		presenceData.startTimestamp = startTimestamp;
	}
	// Kendi profil sayfası kontrolü
	else if (document.location.pathname === "/profile") {
		presenceData.details = "Kendi profiline bakıyor";
		presenceData.state = document.querySelector(".profile-username")?.textContent?.trim() || "Profil";
		presenceData.startTimestamp = startTimestamp;
	}
	// Başka kullanıcı profili kontrolü
	else if (document.location.pathname.startsWith("/u/")) {
		const username = document.location.pathname.split("/").pop() || "";

		presenceData.details = "Kullanıcı profiline bakıyor";
		presenceData.state = username;
		presenceData.startTimestamp = startTimestamp;
		
		presenceData.buttons = [
			{
				label: "Profile Bak",
				url: `${baseUrl}/u/${username}`
			}
		];
	}
	// Anime detay sayfası kontrolü
	else if (/^\/anime\/[0-9a-f]{24}$/.test(document.location.pathname)) {
		const animeId = document.location.pathname.split("/").pop() || "";
		const titleElement = document.querySelector(".anime-title");
		
		presenceData.details = "Anime detayına bakıyor";
		presenceData.state = titleElement?.textContent?.trim() || "Bilinmeyen Anime";
		presenceData.startTimestamp = startTimestamp;
		
		presenceData.buttons = [
			{
				label: "Anime Sayfasına Git",
				url: `${baseUrl}/anime/${animeId}`
			}
		];
	}
	// Anime izleme sayfası kontrolü
	else if (/^\/watch\/[0-9a-f]{24}$/.test(document.location.pathname)) {
		const animeId = document.location.pathname.split("/").pop() || "";
		const urlParams = new URLSearchParams(window.location.search);
		const season = urlParams.get('season') || '1';
		const episode = urlParams.get('episode') || '1';
		const titleElement = document.querySelector(".anime-title");

		presenceData.details = titleElement?.textContent?.trim() || "Bilinmeyen Anime";
		presenceData.state = `Sezon ${season} Bölüm ${episode}`;
		
		if (video) {
			presenceData.smallImageKey = video.paused ? "pause" : "play";
			presenceData.smallImageText = video.paused 
				? "Duraklatıldı" 
				: "Oynatılıyor";

			if (!video.paused && video.duration) {
				[presenceData.startTimestamp, presenceData.endTimestamp] = 
					presence.getTimestamps(
						Math.floor(video.current),
						Math.floor(video.duration)
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
	}
	// Anime liste sayfası kontrolü
	else if (document.location.pathname.includes("/anime")) {
		presenceData.details = "Anime listesine göz atıyor";
		presenceData.startTimestamp = startTimestamp;
	}

	if (presenceData.details) 
		presence.setActivity(presenceData);
	else
		presence.setActivity();
}); 