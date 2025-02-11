const presence = new Presence({
    clientId: "1336362292622655569"
});

const browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
    Logo = "https://discord.do/wp-content/uploads/2023/08/AnimeciX.jpg",
    SettingsICO = "https://i.imgur.com/pUucFeP.png",
}

const observeDOMChanges = (callback: () => void) => {
    const observer = new MutationObserver(() => {
        callback();
    });

    observer.observe(document.body, { childList: true, subtree: true });
};

const updatePresence = () => {
    let presenceData: PresenceData = {
        largeImageKey: Assets.Logo,
    } as PresenceData;

    presenceData.startTimestamp = browsingTimestamp;
    presenceData.type = ActivityType.Watching;
        if (document.location.pathname === "/") {
        presenceData.details = "AnimeciX";
        presenceData.state = "Ana Sayfa görüntüleniyor";

//WATCHİNG PAGE
    } else if (document.location.pathname.includes("/titles/") && document.location.pathname.includes("/episode/")) {
        const episodeTitle = document.querySelectorAll(".t-title > .ng-star-inserted")[1]?.textContent;
        const SEInfo = document.querySelector(".episode-number")?.textContent;
        // Thumbnail
        // const animeImgElement = document.querySelector("img.media-image-el");
        const animeImg = document.querySelector<HTMLElement>("media-item-header")?.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1]

        presenceData.largeImageKey = animeImg;
        presenceData.details = episodeTitle || "Loading";
        presenceData.state = SEInfo || "Loading";

//EPİSODES PAGE
    } else if (document.location.pathname.includes("/titles/") && !document.location.pathname.includes("/episode/")) {
        const animeTitle = document.querySelector(".t-title a")?.textContent;
        // Thumbnail
        // const animeImgElement = document.querySelector("img.media-image-el");
        const animeImg = document.querySelector<HTMLElement>("media-item-header")?.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1]

        presenceData.largeImageKey = animeImg;
        presenceData.details = animeTitle || "Loading";
        presenceData.state = "Bölümler görüntüleniyor";

//BROWSE
    } else if (document.location.pathname === "/browse" && !document.location.pathname.includes("/lists/")) {
        presenceData.largeImageKey = Assets.Logo;
        presenceData.smallImageKey = Assets.Reading;
        presenceData.smallImageText = "Göz atılıyor.."
        presenceData.details = "AnimeciX";
        presenceData.state = "Göz atılıyor..";
    } else if (document.location.pathname === "/calendar") {
        presenceData.largeImageKey = Assets.Logo;
        presenceData.details = "AnimeciX";
        presenceData.state = "Takvim görüntüleniyor..";
    } else if (document.location.pathname === "/news") {
        presenceData.largeImageKey = Assets.Logo;
        presenceData.details = "AnimeciX";
        presenceData.state = "Haberler görüntüleniyor..";
    } else if (document.location.pathname.includes("/users/") ) {
        const userImg = document.querySelector<HTMLImageElement>(".header > .user-avatar.real")?.src;
        const userName = document.querySelector(".header > h1.name")?.textContent;
        presenceData.largeImageKey = Assets.Logo;
        presenceData.smallImageKey = userImg;
        presenceData.smallImageText = userName;
        presenceData.details = "Kullanıcı görüntüleniyor:";
        presenceData.state = userName || "Loading..";
    } else if (document.location.pathname === "/watchlist") {
        presenceData.largeImageKey = Assets.Logo;
        presenceData.smallImageKey = Assets.Viewing;
        presenceData.smallImageText = "Watchlist";
        presenceData.details = "AnimeciX";
        presenceData.state = "İzlenenler görüntüleniyor..";
    } else if (document.location.pathname === "/lists") {
        presenceData.largeImageKey = Assets.Logo;
        presenceData.smallImageKey = Assets.Viewing;
        presenceData.smallImageText = "İzlenecek Listesi";
        presenceData.details = "AnimeciX";
        presenceData.state = "İzleme listeleri görüntüleniyor..";
    } else if (document.location.pathname === "/lists/liked") {
        presenceData.largeImageKey = Assets.Logo;
        presenceData.smallImageKey = Assets.Viewing;
        presenceData.smallImageText = "Favoriler";
        presenceData.details = "AnimeciX";
        presenceData.state = "Favoriler görüntüleniyor..";
    } else if (document.location.pathname === "/lists/browse") {
        presenceData.largeImageKey = Assets.Logo;
        presenceData.smallImageKey = Assets.Reading;
        presenceData.smallImageText = "Browsing..";
        presenceData.details = "AnimeciX";
        presenceData.state = "Oynatma listeleri görüntüleniyor..";
    } else if (document.location.pathname.includes("/lists/") && /\d/.test(document.location.pathname)) {
        const listname = document.querySelector(".list-name")?.textContent;
        presenceData.largeImageKey = Assets.Logo;
        presenceData.smallImageKey = Assets.Reading;
        presenceData.smallImageText = listname || "Loading..";
        presenceData.details = "Liste görüntüleniyor:";
        presenceData.state = listname || "Loading..";
    } else if (document.location.pathname === "/account/settings") {
        presenceData.largeImageKey = Assets.Logo;
        presenceData.smallImageKey = Assets.SettingsICO;
        presenceData.smallImageText = "Ayarlar";
        presenceData.details = "AnimeciX";
        presenceData.state = "Ayarlar";
    } else if (document.location.pathname === "/gw-rooms") {
        presenceData.largeImageKey = Assets.Logo;
        presenceData.smallImageKey = Assets.Premiere;
        presenceData.smallImageText = "Group Watch"
        presenceData.details = "AnimeciX";
        presenceData.state = "İzleme odaları görüntüleniyor..";
    } else if (document.location.pathname === "/search/") {
        const keyword = document.querySelector(".query")?.textContent;
        presenceData.largeImageKey = Assets.Logo;
        presenceData.smallImageKey = Assets.Search;
        presenceData.smallImageText = "Aranıyor"
        presenceData.details = "Aranıyor:";
        presenceData.state = keyword;
    } else {
        presenceData.largeImageKey = Assets.Logo;
        presenceData.details = "AnimeciX";
        presenceData.state = "Sayfa görüntüleniyor.."
    }
            

    presence.setActivity(presenceData);
};

document.addEventListener('DOMContentLoaded', () => {
    updatePresence();
    observeDOMChanges(updatePresence);
});