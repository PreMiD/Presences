let presence = new Presence({
    clientId: "629355416714739732"
}), strings = presence.getStrings({
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
});
presence.on("UpdateData", async () => {
    const path = document.location.pathname;
    let presenceData = {
        largeImageKey: "animepahe",
        details: "loading",
        state: "animepahe"
    };
    if (!path.includes("anime")) {
        presenceData.smallImageKey = "presence_browsing_home";
        presenceData.smallImageText = "Home";
        presenceData.details = "Browsing Latest Releases";
        presenceData.state = "animepahe";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
    else if (path == "/anime") {
        presenceData.smallImageKey = "presence_browsing_all";
        presenceData.smallImageText = "Anime";
        presenceData.details = "Browsing A-Z List";
        presenceData.state = "animepahe";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
    else if (!path.split("anime/")[1].includes("/")) {
        let type;
        for (let info of document.querySelector("div.col-sm-4.anime-info")
            .children) {
            if (info.children[0].textContent == "Type:")
                info.children[1].textContent == "TV"
                    ? (type = "Season")
                    : (type = info.children[1].textContent);
        }
        presenceData.smallImageKey = "presence_browsing_season";
        presenceData.smallImageText = type;
        presenceData.details = `${document.getElementsByClassName("title-wrapper")[0].children[1]
            .textContent}`;
        presenceData.state = `Viewing ${type}`;
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
    if (path.split("/")[1] == "play") {
        let timestamps = getTimestamps(Math.floor(iframe_response.current_time), Math.floor(iframe_response.duration));
        let movie = document.querySelector("body > section > article > div > div > div.theatre-info > div.anime-status > a").textContent == "Movie";
        presenceData.smallImageKey = `presence_playback_${iframe_response.paused ? "paused" : "playing"}`;
        presenceData.smallImageText = iframe_response.paused
            ? (await strings).pause
            : (await strings).play;
        presenceData.details = `Watching ${!movie
            ? `E${document
                .querySelector("#episodeMenu")
                .textContent.split("Episode ")[1]
                .replace(/^\s+|\s+$/g, "")} of `
            : ""}${document.querySelector("body > section > article > div > div > div.theatre-info > h1 > a").textContent}`;
        if (!iframe_response.paused) {
            presenceData.state = `${(await strings).play}`;
            (presenceData.startTimestamp = timestamps[0]),
                (presenceData.endTimestamp = timestamps[1]);
        }
        else {
            presenceData.startTimestamp = null;
            presenceData.state = `${(await strings).pause} - ${getTimestamp(iframe_response.current_time)}`;
        }
        presence.setActivity(presenceData, true);
    }
    else {
        presence.setActivity(presenceData, false);
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function getTimestamp(time) {
    let { sec, min, hrs } = getTimesFromMs(time);
    return hrs > 0 ? hrs + ":" + min + ":" + sec : min + ":" + sec;
}
function getTimesFromMs(ms) {
    const p60 = x => Math.floor(x % 60);
    let sec = p60(ms) < 10 ? "0" + p60(ms) : p60(ms), min = p60(ms / 60) <= 0 ? 0 : p60(ms / 60), hrs = p60(ms / 60 / 60);
    return {
        hrs: hrs,
        sec: sec,
        min: min
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosSUFBSSxlQUFlLEdBQUc7SUFDckIsTUFBTSxFQUFFLElBQUk7SUFDWixRQUFRLEVBQUUsQ0FBQztJQUNYLFlBQVksRUFBRSxDQUFDO0NBQ2YsQ0FBQztBQUVGLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxFQUFFO0lBQ2hDLGVBQWUsR0FBRyxJQUFJLENBQUM7QUFDeEIsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUN4QyxJQUFJLFlBQVksR0FBaUI7UUFDaEMsYUFBYSxFQUFFLFdBQVc7UUFDMUIsT0FBTyxFQUFFLFNBQVM7UUFDbEIsS0FBSyxFQUFFLFdBQVc7S0FDbEIsQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzVCLFlBQVksQ0FBQyxhQUFhLEdBQUcsd0JBQXdCLENBQUM7UUFDdEQsWUFBWSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7UUFDckMsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztRQUNsRCxZQUFZLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztRQUNqQyxZQUFZLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFB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