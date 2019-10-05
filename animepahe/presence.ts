// Note: Developer has been working on a new website design for ages, 
//       maybe at some point he'll finish it and this will need updating.

let presence = new Presence({
    clientId: "629355416714739732", // Contact if you want me to edit the discord assets/keys/whatever
    mediaKeys: false
}),
    strings = presence.getStrings({
        play: "presence.playback.playing",
        pause: "presence.playback.paused"
});

let iframe_response = {
    paused: true,
    duration: 0,
    current_time: 0
};

presence.on("iFrameData", data => {
    iframe_response = data;
})

presence.on("UpdateData", async () => {
    const path = document.location.pathname;
    let presenceData: presenceData = {
        largeImageKey: "animepahe",
        details: "loading",
        state: "animepahe"
    }
    if (!path.includes('anime')) {
        presenceData.smallImageKey = "presence_browsing_home";
        presenceData.smallImageText = "Home";
        presenceData.details = "Browsing Latest Releases";
        presenceData.state = "animepahe";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    } else if (path == "/anime") {
        presenceData.smallImageKey = "presence_browsing_all";
        presenceData.smallImageText = "Anime";
        presenceData.details = "Browsing A-Z List";
        presenceData.state = "animepahe";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    } else if (!path.split("anime/")[1].includes('/')) {
        let type: string;

        for (let info of document.querySelector("div.col-sm-4.anime-info").children) { // Not uniform info order... ugh
            if (info.children[0].textContent == "Type:") info.children[1].textContent == "TV" ?
            type = "Season" :
            type = info.children[1].textContent;
        }

        presenceData.smallImageKey = "presence_browsing_season";
        presenceData.smallImageText = type;
        presenceData.details = `${document.getElementsByClassName("title-wrapper")[0].children[1].textContent}`;
        presenceData.state = `Viewing ${type}`;
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
    if (path.split('/')[1] == "play") {
        let timestamps = getTimestamps(
            Math.floor(iframe_response.current_time),
            Math.floor(iframe_response.duration)
        );
        let movie: boolean = document.querySelector("body > section > article > div > div > div.theatre-info > div.anime-status > a").textContent == "Movie";
        presenceData.smallImageKey = `presence_playback_${iframe_response.paused ? "paused" : "playing"}`;
        presenceData.smallImageText = iframe_response.paused ? (await strings).pause : (await strings).play;
        presenceData.details = `Watching ${!movie ? `E${
            document.querySelector("#episodeMenu").textContent.split('Episode ')[1].replace(/^\s+|\s+$/g, '')
        } of `: ''}${
            document.querySelector("body > section > article > div > div > div.theatre-info > h1 > a").textContent
        }`;
        if (!iframe_response.paused) {
            presenceData.state = `${(await strings).play}`
            presenceData.startTimestamp = timestamps[0],
            presenceData.endTimestamp = timestamps[1]
        } else {
            presenceData.startTimestamp = null;
            presenceData.state = `${(await strings).pause} - ${getTimestamp(iframe_response.current_time)}`
        }
        presence.setActivity(presenceData, true);
    } else {
        presence.setActivity(presenceData, false);
    } 
});

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(videoTime: number, videoDuration: number) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}


function getTimestamp(time) {
    let {
        sec,
        min,
        hrs
    } = getTimesFromMs(time);
    return hrs > 0 ? hrs + ":" + min + ":" + sec : min + ":" + sec;
}

function getTimesFromMs(ms) {
    const p60 = x => Math.floor(x % 60);
    let sec = p60(ms) < 10 ? "0" + p60(ms) : p60(ms),
        min = p60(ms / 60) <= 0 ? 0 : p60(ms / 60),
        hrs = p60(ms / 60 / 60);
    return {
        hrs: hrs,
        sec: sec,
        min: min
    };
}