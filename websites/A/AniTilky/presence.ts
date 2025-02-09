declare class Presence {
    constructor(presenceOptions: { clientId: string });
    getTimestamps(start: number, end: number): [number, number];
    setActivity(data?: PresenceData): void;
    on(event: string, callback: Function): void;
    getStrings(strings: { playing: string; paused: string; browsing: string }): Promise<{ playing: string; paused: string; browsing: string }>;
}

interface PresenceData {
    details?: string;
    state?: string;
    startTimestamp?: number;
    endTimestamp?: number;
    largeImageKey?: string;
    smallImageKey?: string;
    smallImageText?: string;
    buttons?: Array<{
        label: string;
        url: string;
    }>;
}

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

const presence = new Presence({
    clientId: "1124065204200820786"
}),
strings = presence.getStrings({
    playing: "general.playing",
    paused: "general.paused",
    browsing: "general.browsing"
}),
startTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
    Logo = "logo",
    DefaultAvatar = "logo"
}

interface IFrameData {
    duration: number;
    currentTime: number;
    paused: boolean;
}

let video: IFrameData;
let lastAnimeId: string | null = null;
let lastAnimeData: AnimeData | null = null;
let lastUsername: string | null = null;
let lastUserData: UserData | null = null;

presence.on("iFrameData", async (data: IFrameData) => {
    if (!data) return;
    video = data;
});

async function getAnimeData(animeId: string): Promise<AnimeData> {
    try {
        // Sayfa içindeki başlığı almayı deneyelim
        const titleElement = document.querySelector(".anime-title");
        if (titleElement && titleElement.textContent) {
            return {
                title: { tr: titleElement.textContent.trim() }
            };
        }

        // Başlık bulunamadıysa API'den almayı deneyelim
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
        if (!response.ok) throw new Error('API error');
        const data = await response.json();
        console.log("API Response:", data); // Debug için

        // API'den gelen profil resmini doğrudan kullan
        const profileImage = data.profileImage || Assets.DefaultAvatar;
        console.log("Profile Image:", profileImage); // Debug için

        return {
            username: data.username || username,
            avatar: profileImage
        };
    } catch (error) {
        console.error("Kullanıcı verisi alınamadı:", error);
        // Sayfa içinden kullanıcı bilgilerini almayı deneyelim
        const usernameElement = document.querySelector(".profile-username");
        const avatarElement = document.querySelector(".profile-avatar");
        
        let avatar = null;
        if (avatarElement) {
            avatar = avatarElement.getAttribute("src");
            console.log("DOM Avatar:", avatar); // Debug için
        }

        if (usernameElement?.textContent) {
            return {
                username: usernameElement.textContent.trim(),
                avatar: avatar || Assets.DefaultAvatar
            };
        }
        return {
            username: username,
            avatar: Assets.DefaultAvatar
        };
    }
}

presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        largeImageKey: Assets.Logo
    };

    const baseUrl = "https://anitilky.xyz";

    // Ana sayfa kontrolü
    if (document.location.pathname === "/") {
        presenceData.details = (await strings).browsing;
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