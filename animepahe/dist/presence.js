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