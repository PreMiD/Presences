const presence = new Presence({
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
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function getTimesFromMs(ms) {
    const floor = Math.floor(ms % 60);
    const sec = floor < 10 ? 0 + floor : floor, min = floor / 60 <= 0 ? 0 : floor / 60, hrs = floor / 60 / 60;
    return {
        hrs: hrs,
        sec: sec,
        min: min
    };
}
function getTimestamp(time) {
    const { sec, min, hrs } = getTimesFromMs(time);
    return hrs > 0 ? hrs + ":" + min + ":" + sec : min + ":" + sec;
}
presence.on("iFrameData", (data) => {
    iframe_response = data;
});
presence.on("UpdateData", async () => {
    const path = document.location.pathname;
    const presenceData = {
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
        for (const info of document.querySelector("div.col-sm-4.anime-info")
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
        const timestamps = getTimestamps(Math.floor(iframe_response.current_time), Math.floor(iframe_response.duration));
        const movie = document.querySelector("body > section > article > div > div > div.theatre-info > div.anime-status > a").textContent == "Movie";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxlQUFlLEdBQUc7SUFDcEIsTUFBTSxFQUFFLElBQUk7SUFDWixRQUFRLEVBQUUsQ0FBQztJQUNYLFlBQVksRUFBRSxDQUFDO0NBQ2hCLENBQUM7QUFPRixTQUFTLGFBQWEsQ0FDcEIsU0FBaUIsRUFDakIsYUFBcUI7SUFFckIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxTQUFTLGNBQWMsQ0FBQyxFQUFFO0lBQ3hCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLE1BQU0sR0FBRyxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFDeEMsR0FBRyxHQUFHLEtBQUssR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQ3RDLEdBQUcsR0FB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