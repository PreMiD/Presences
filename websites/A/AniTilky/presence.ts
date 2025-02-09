/// <reference types="premid" />

const presence = new Presence({
		clientId: "1124065204200820786",
	}),
	strings = presence.getStrings({
		playing: "general.playing",
		paused: "general.paused",
		browsing: "general.browsing",
	}),
	startTimestamp = Math.floor(Date.now() / 1000);

let video = {
	currentTime: 0,
	duration: 0,
	paused: true,
};

type AnimeData = {
	title: {
		tr?: string;
		romaji?: string;
		english?: string;
	};
	coverImage?: string;
};

type UserData = {
	username: string;
	avatar?: string;
};

presence.on("iFrameData", async (data: { currentTime: number; duration: number; paused: boolean }) => {
	if (!data) return;
	video = data;
});

async function getAnimeData(animeId: string): Promise<AnimeData> {
	try {
		const titleElement = document.querySelector(".anime-title");
		if (titleElement && titleElement.textContent) {
			return {
				title: { tr: titleElement.textContent.trim() }
			};
		}

		const response = await fetch(`https://backend.anitilky.xyz/api/anime/${animeId}`);
		if (!response.ok) throw new Error('API error');
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Anime verisi alınamadı:", error);
		return {
			title: { tr: "Bilinmeyen Anime" }
		};
	}
}

async function getUserData(username: string): Promise<UserData> {
	try {
		const response = await fetch(`https://backend.anitilky.xyz/api/user/profile/${username}`);
		if (!response.ok) throw new Error("API error");
		const data = await response.json();
		return {
			username: data.username || username,
			avatar: data.profileImage || "logo"
		};
	} catch (error) {
		const usernameElement = document.querySelector(".profile-username");
		const avatarElement = document.querySelector(".profile-avatar");
		
		const avatar = avatarElement ? avatarElement.getAttribute("src") : null;

		if (usernameElement?.textContent) {
			return {
				username: usernameElement.textContent.trim(),
				avatar: avatar || "logo"
			};
		}
		
		return { username, avatar: "logo" };
	}
}

let lastAnimeId: string | null = null,
	lastAnimeData: AnimeData | null = null,
	lastUsername: string | null = null,
	lastUserData: UserData | null = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo"
	};

	const baseUrl = "https://anitilky.xyz";

	// Ana sayfa kontrolü
	if (document.location.pathname === "/") {
		presenceData.details = (await strings).browsing;
		presenceData.startTimestamp = startTimestamp;
	}
	// Kendi profil sayfası kontrolü
	else if (document.location.pathname === "/profile") {
		const username = document.querySelector(".profile-username")?.textContent?.trim();
		if (username && username !== lastUsername) {
			lastUsername = username;
			lastUserData = await getUserData(username);
		}
		
		presenceData.details = "Kendi profiline bakıyor";
		presenceData.state = lastUserData?.username || username || "Profil";
		presenceData.startTimestamp = startTimestamp;
		
		if (lastUserData?.avatar && /^https?:\/\/.+\.(png|jpe?g|gif|webp)$/.test(lastUserData.avatar)) {
			presenceData.largeImageKey = lastUserData.avatar;
		}
	}
	// Başka kullanıcı profili kontrolü
	else if (document.location.pathname.startsWith("/u/")) {
		const username = document.location.pathname.split('/').pop() || '';
		
		if (username !== lastUsername) {
			lastUsername = username;
			lastUserData = await getUserData(username);
		}

		presenceData.details = "Kullanıcı profiline bakıyor";
		presenceData.state = lastUserData?.username || username;
		presenceData.startTimestamp = startTimestamp;
		
		if (lastUserData?.avatar && /^https?:\/\/.+\.(png|jpe?g|gif|webp)$/.test(lastUserData.avatar)) {
			presenceData.largeImageKey = lastUserData.avatar;
		}
		
		presenceData.buttons = [
			{
				label: "Profile Bak",
				url: `${baseUrl}/u/${username}`
			}
		];
	}
	// Anime detay sayfası kontrolü
	else if (/^\/anime\/[0-9a-f]{24}$/.test(document.location.pathname)) {
		const animeId = document.location.pathname.split('/').pop() || '';
		
		if (animeId !== lastAnimeId) {
			lastAnimeId = animeId;
			lastAnimeData = await getAnimeData(animeId);
		}

		presenceData.details = "Anime detayına bakıyor";
		presenceData.state = lastAnimeData?.title?.tr || lastAnimeData?.title?.romaji || lastAnimeData?.title?.english || "Bilinmeyen Anime";
		presenceData.startTimestamp = startTimestamp;
		
		if (lastAnimeData?.coverImage && /^https?:\/\/.+\.(png|jpe?g|gif|webp)$/.test(lastAnimeData.coverImage)) {
			presenceData.largeImageKey = lastAnimeData.coverImage;
		}
		
		presenceData.buttons = [
			{
				label: "Anime Sayfasına Git",
				url: `${baseUrl}/anime/${animeId}`
			}
		];
	}
	// Anime izleme sayfası kontrolü
	else if (/^\/watch\/[0-9a-f]{24}$/.test(document.location.pathname)) {
		const animeId = document.location.pathname.split('/').pop() || '';
		const urlParams = new URLSearchParams(window.location.search);
		const season = urlParams.get('season') || '1';
		const episode = urlParams.get('episode') || '1';
		
		if (animeId !== lastAnimeId) {
			lastAnimeId = animeId;
			lastAnimeData = await getAnimeData(animeId);
		}

		presenceData.details = lastAnimeData?.title?.tr || lastAnimeData?.title?.romaji || lastAnimeData?.title?.english || "Bilinmeyen Anime";
		presenceData.state = `Sezon ${season} Bölüm ${episode}`;
		
		if (lastAnimeData?.coverImage && /^https?:\/\/.+\.(png|jpe?g|gif|webp)$/.test(lastAnimeData.coverImage)) {
			presenceData.largeImageKey = lastAnimeData.coverImage;
		}
		
		if (video) {
			presenceData.smallImageKey = video.paused ? "pause" : "play";
			presenceData.smallImageText = video.paused 
				? (await strings).paused 
				: (await strings).playing;

			if (!video.paused && video.duration) {
				[presenceData.startTimestamp, presenceData.endTimestamp] = 
					presence.getTimestamps(
						Math.floor(video.currentTime),
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