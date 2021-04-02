const presence = new Presence({
    clientId: "827663128216600618"
})

const startTimestamp = Date.now();
let last_update = Date.now();
let start_time = 0, end_time = 0;
presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        largeImageKey: "logo",
        smallImageKey: "heart",
        startTimestamp: startTimestamp
    };

    presenceData.details = "Browsing...";

    const currentPath = document.location.pathname;
    switch(currentPath) {
        case "/":
            presenceData.state = "Home";
            break;

        case "/all/":
            presenceData.state = "All Animes";
            break;

        case "/genres/":
            presenceData.state = "Genres";
            break;

        case "/newest/":
            presenceData.state = "Latest Animes";
            break;

        case "/airing/":
            presenceData.state = "Airing Animes";
            break;
    }
    if(currentPath.includes("/episodes/")) {
        const animeTitle = document.querySelector(".episode-overview-type-link").textContent;
        const episodeTitle = document.querySelector(".episode-overview-title-type").textContent;
        const episodeNumber = episodeTitle.substring("Episode ".length, episodeTitle.indexOf(" -"));
        const paused = (document.querySelector(".episode-video") as HTMLMediaElement).paused;

        const playerTime = document.querySelector(".episode-video-controls-time");
        if(playerTime != null) {
            let start = playerTime.textContent.substring(0, playerTime.textContent.indexOf("/"));
            if(start != null) {
                start_time = 0;
                if(start.length > "00:00".length) {
                    start_time += parseInt(start.substring(0, start.indexOf(":"))) * 1000 * 60 * 60;
                    start = start.substring(start.indexOf(":") + ":".length);
                }
                start_time += parseInt(start.substring(0, start.indexOf(":"))) * 1000 * 60;
                start = start.substring(start.indexOf(":") + ":".length);
                start_time += parseInt(start) * 1000;
            }

            let end = playerTime.textContent.substring(playerTime.textContent.indexOf("/") + "/".length);
            if(end != null) {
                end_time = 0;
                if(end.length > "00:00".length) {
                    end_time += parseInt(end.substring(0, end.indexOf(":"))) * 1000 * 60 * 60;
                    end = end.substring(end.indexOf(":") + ":".length);
                }
                end_time += parseInt(end.substring(0, end.indexOf(":"))) * 1000 * 60;
                end = end.substring(end.indexOf(":") + ":".length);
                end_time += parseInt(end) * 1000;
            }
        } else {
            start_time += paused === false ? (Date.now() - last_update) : 0;
        }

        presenceData.details = "Watching...";
        presenceData.state = "EP" + episodeNumber + " - " + animeTitle;
        if(paused === false) {
            presenceData.endTimestamp = Date.now() + (end_time - start_time);
        } else {
            delete presenceData.startTimestamp;
        }

        presenceData.smallImageKey = paused ? "pause" : "play";
        presenceData.buttons = [
            {
                label: "Watch",
                url: document.location.href
            }
        ];
    } else if(currentPath.startsWith("/animes/")) {
        const animeTitle = document.querySelector(".anime-overview-title").textContent;
        presenceData.state = "Anime: " + animeTitle;
    }

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }

    last_update = Date.now();
});