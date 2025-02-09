/// <reference types="premid" />

interface AnimeData {
  title: {
    tr?: string;
    romaji?: string;
    english?: string;
  };
  coverImage?: string;
}

interface UserData {
  username: string;
  avatar?: string;
}

interface VideoData {
  current: number;
  duration: number;
  paused: boolean;
  isLive: boolean;
}

const presence = new Presence({
    clientId: "1124065204200820786"
  }),
  strings = presence.getStrings({
    play: "general.playing",
    pause: "general.paused",
    browse: "general.browsing"
  }),
  startTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
  Logo = "logo",
  DefaultAvatar = "default_avatar"
}

let videoData: VideoData = {
    current: 0,
    duration: 0,
    paused: true,
    isLive: false
  },
  lastAnimeId: string | null = null,
  lastAnimeData: AnimeData | null = null,
  lastUsername: string | null = null,
  lastUserData: UserData | null = null;

presence.on("iFrameData", async (data: VideoData) => {
  if (!data) return;
  videoData = data;
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

        const profileImage = data.profileImage || Assets.DefaultAvatar;

        return {
            username: data.username || username,
            avatar: profileImage
        };
    } catch (error) {
        const usernameElement = document.querySelector(".profile-username");
        const avatarElement = document.querySelector(".profile-avatar");
        
        const avatar = avatarElement ? avatarElement.getAttribute("src") : null;

        if (usernameElement?.textContent) {
            return {
                username: usernameElement.textContent.trim(),
                avatar: avatar || Assets.DefaultAvatar
            };
        }
        
        return { username, avatar: Assets.DefaultAvatar };
    }
}

presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        largeImageKey: Assets.Logo
    };

    const baseUrl = "https://anitilky.xyz";

    // Ana sayfa kontrolü
    if (document.location.pathname === "/") {
        presenceData.details = (await strings).browse;
        presenceData.startTimestamp = startTimestamp;
    }
    // Kendi profil sayfası kontrolü
    else if (document.location.pathname === "/profile") {
        // Kullanıcı adını URL'den almaya çalış
        const username = document.querySelector(".profile-username")?.textContent?.trim();
        if (username && username !== lastUsername) {
            lastUsername = username;
            lastUserData = await getUserData(username);
            console.log("Profile User Data:", lastUserData); // Debug için
        }
        
        presenceData.details = "Kendi profiline bakıyor";
        presenceData.state = lastUserData?.username || username || "Profil";
        presenceData.startTimestamp = startTimestamp;
        
        if (lastUserData?.avatar && /^https?:\/\/.+\.(png|jpe?g|gif|webp)$/.test(lastUserData.avatar)) {
            console.log("Setting Profile Avatar:", lastUserData.avatar); // Debug için
            presenceData.largeImageKey = lastUserData.avatar;
        } else {
            console.log("Using Default Avatar for Profile"); // Debug için
            presenceData.largeImageKey = Assets.DefaultAvatar;
        }
    }
    // Başka kullanıcı profili kontrolü
    else if (document.location.pathname.startsWith("/u/")) {
        const username = document.location.pathname.split('/').pop() || '';
        
        if (username !== lastUsername) {
            lastUsername = username;
            lastUserData = await getUserData(username);
            console.log("User Data:", lastUserData); // Debug için
        }

        presenceData.details = "Kullanıcı profiline bakıyor";
        presenceData.state = lastUserData?.username || username;
        presenceData.startTimestamp = startTimestamp;
        
        if (lastUserData?.avatar && /^https?:\/\/.+\.(png|jpe?g|gif|webp)$/.test(lastUserData.avatar)) {
            console.log("Setting Avatar:", lastUserData.avatar); // Debug için
            presenceData.largeImageKey = lastUserData.avatar;
        } else {
            console.log("Using Default Avatar"); // Debug için
            presenceData.largeImageKey = Assets.DefaultAvatar;
        }
        
        // Profil butonu ekle
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
        } else {
            presenceData.largeImageKey = Assets.Logo;
        }
        
        // Anime sayfası butonu ekle
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
        } else {
            presenceData.largeImageKey = Assets.Logo;
        }
        
        if (videoData) {
            presenceData.smallImageKey = videoData.paused ? "pause" : "play";
            presenceData.smallImageText = videoData.paused 
                ? (await strings).pause
                : (await strings).play;

            if (!videoData.paused && videoData.duration) {
                [presenceData.startTimestamp, presenceData.endTimestamp] = 
                    presence.getTimestamps(
                        Math.floor(videoData.current),
                        Math.floor(videoData.duration)
                    );
            }
        }
        
        // Anime sayfası ve bölüm butonları ekle
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