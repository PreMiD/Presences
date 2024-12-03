const presence = new Presence({ clientId: "1165759293576982578" });

let cachedTime = 0;

export function adjustTimeError(time: number, acceptableError: number): number {
    if (Math.abs(time - cachedTime) > acceptableError) cachedTime = time;
    return cachedTime;
}

presence.on("UpdateData", async () => {
    const { pathname, href } = document.location,
        ogTitle = document
            .querySelector('meta[property="og:title"]')
            ?.getAttribute("content"),
        video = document.querySelector("video");

    let animeTitle = "",
        episodeNumber = "",
        releaseTitle = "";

    if (ogTitle) {
    
        const match = ogTitle.match(/(.*)\s*\|\s*(.*)/);
                
        if (match && match[2]) {
            episodeNumber = match[1];
            releaseTitle = match[1];
            animeTitle = match[3] || match[2];
        } else {
            releaseTitle = ogTitle;
        }
    }

    const presenceData: PresenceData = {
        largeImageKey: "https://i.imgur.com/HrvpNEc.png",
        type: ActivityType.Watching,
    };

    const PATHS = {
        MAIN_PAGE: "/",
        CATALOG: "/anime/catalog/",
        SCHEDULE: "/anime/schedule",
        LATEST_VIDEOS: "/media/videos/latest/",
        LATEST_EPISODES: "/anime/releases/latest/",
        FAVORITES: "/me/favorites/",
        COLLECTIONS: "/me/collections/",
        FRANCHISES: "/anime/franchises/",
        GENRES: "/anime/genres/",
        TORRENTS: "/anime/torrents/",
        RULES: "/rules",
        API_DOCS: "/api/docs/v1",
        RELEASE_EPISODES: /\/anime\/releases\/release\/[^/]+\/episodes/,
        RELEASE_FRANCHISES: /\/anime\/releases\/release\/[^/]+\/franchises/,
        RELEASE_MEMBERS: /\/anime\/releases\/release\/[^/]+\/members/,
        RELEASE_TORRENTS: /\/anime\/releases\/release\/[^/]+\/torrents/,
        WATCH_EPISODE: /\/anime\/video\/episode\//,
    };

    switch (true) {
        case !!document.querySelector("input[autofocus]"):
            presenceData.state = "Ищет аниме";
            break;
        case pathname === PATHS.MAIN_PAGE:
            presenceData.state = "На главной странице";
            presenceData.buttons = [{ label: "Сайт", url: href }];
            break;
        case pathname === PATHS.CATALOG:
            presenceData.state = "Смотрит каталог релизов";
            break;
        case pathname === PATHS.SCHEDULE:
            presenceData.state = "Просматривает расписание выхода эпизодов";
            break;
        case pathname === PATHS.LATEST_VIDEOS:
            presenceData.state = "Смотрит новые видео";
            break;
        case pathname === PATHS.LATEST_EPISODES:
            presenceData.state = "Смотрит новые эпизоды";
            break;
        case pathname === PATHS.FAVORITES:
            presenceData.state = "Просматривает избранное";
            break;
        case pathname === PATHS.COLLECTIONS:
            presenceData.state = "Смотрит коллекции";
            break;
        case pathname === PATHS.FRANCHISES:
            presenceData.state = "Смотрит франшизы аниме";
            break;
        case pathname === PATHS.GENRES:
            presenceData.state = "Смотрит жанры аниме";
            break;
        case pathname === PATHS.TORRENTS:
            presenceData.state = "Смотрит торренты аниме";
            break;
        case pathname === PATHS.RULES:
            presenceData.state = "Читает правила";
            break;
        case pathname === PATHS.API_DOCS:
            presenceData.state = "Смотрит API-документацию";
            break;
        case PATHS.RELEASE_EPISODES.test(pathname):
            presenceData.details = releaseTitle;
            presenceData.state = "Смотрит эпизоды релиза";
            break;
        case PATHS.RELEASE_FRANCHISES.test(pathname):
            presenceData.details = releaseTitle;
            presenceData.state = "Смотрит связанное с релизом";
            break;
        case PATHS.RELEASE_MEMBERS.test(pathname):
            presenceData.details = releaseTitle;
            presenceData.state = "Смотрит участников релиза";
            break;
        case PATHS.RELEASE_TORRENTS.test(pathname):
            presenceData.details = releaseTitle;
            presenceData.state = "Смотрит торренты релиза";
            break;
        case PATHS.WATCH_EPISODE.test(pathname):
            presenceData.details = animeTitle;
            presenceData.state = `${episodeNumber}`;
            presenceData.buttons = [{ label: "Смотреть эпизод", url: href }];
            if (video) {
                const { paused, duration } = video,
                    [start, end] = presence.getTimestampsfromMedia(video);

                presenceData.startTimestamp = adjustTimeError(start, 0.75);
                presenceData.endTimestamp = adjustTimeError(end, 0.75);
                presenceData.smallImageKey =
                    paused || isNaN(Number(duration)) ? Assets.Pause : Assets.Play;
                presenceData.smallImageText =
                    paused || isNaN(Number(duration)) ? "На паузе" : "Воспроизводится";
            }
            break;
    }

    if (!presenceData.details) presenceData.details = "AniLibria";

    presence.setActivity(presenceData.details ? presenceData : null);
});
