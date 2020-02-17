var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let presence = new Presence({
    clientId: "629355416714739732",
    mediaKeys: false
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
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    const path = document.location.pathname;
    let presenceData = {
        largeImageKey: "animepahe",
        details: "loading",
        state: "animepahe"
    };
    if (!path.includes('anime')) {
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
    else if (!path.split("anime/")[1].includes('/')) {
        let type;
        for (let info of document.querySelector("div.col-sm-4.anime-info").children) {
            if (info.children[0].textContent == "Type:")
                info.children[1].textContent == "TV" ?
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
        let timestamps = getTimestamps(Math.floor(iframe_response.current_time), Math.floor(iframe_response.duration));
        let movie = document.querySelector("body > section > article > div > div > div.theatre-info > div.anime-status > a").textContent == "Movie";
        presenceData.smallImageKey = `presence_playback_${iframe_response.paused ? "paused" : "playing"}`;
        presenceData.smallImageText = iframe_response.paused ? (yield strings).pause : (yield strings).play;
        presenceData.details = `Watching ${!movie ? `E${document.querySelector("#episodeMenu").textContent.split('Episode ')[1].replace(/^\s+|\s+$/g, '')} of ` : ''}${document.querySelector("body > section > article > div > div > div.theatre-info > h1 > a").textContent}`;
        if (!iframe_response.paused) {
            presenceData.state = `${(yield strings).play}`;
            presenceData.startTimestamp = timestamps[0],
                presenceData.endTimestamp = timestamps[1];
        }
        else {
            presenceData.startTimestamp = null;
            presenceData.state = `${(yield strings).pause} - ${getTimestamp(iframe_response.current_time)}`;
        }
        presence.setActivity(presenceData, true);
    }
    else {
        presence.setActivity(presenceData, false);
    }
}));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFHQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsRUFDRSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUMxQixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDeEMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxlQUFlLEdBQUc7SUFDbEIsTUFBTSxFQUFFLElBQUk7SUFDWixRQUFRLEVBQUUsQ0FBQztJQUNYLFlBQVksRUFBRSxDQUFDO0NBQ2xCLENBQUM7QUFFRixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsRUFBRTtJQUM3QixlQUFlLEdBQUcsSUFBSSxDQUFDO0FBQzNCLENBQUMsQ0FBQyxDQUFBO0FBRUYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ2pDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBQ3hDLElBQUksWUFBWSxHQUFpQjtRQUM3QixhQUFhLEVBQUUsV0FBVztRQUMxQixPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsV0FBVztLQUNyQixDQUFBO0lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDekIsWUFBWSxDQUFDLGFBQWEsR0FBRyx3QkFBd0IsQ0FBQztRQUN0RCxZQUFZLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztRQUNyQyxZQUFZLENBQUMsT0FBTyxHQUFHLDBCQUEwQixDQUFDO1FBQ2xELFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO1FBQ2pDLFlBQVksQ0FBQyxjQUFjLEdB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