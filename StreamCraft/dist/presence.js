var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "611670021986320394",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);
var gameName;
var videoTitle, streamer;
if (lastPlaybackState != playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
}
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "lg"
    };
    var video = document.querySelector("div.player-wrap > div.player-box > div > video");
    if (!document.location.pathname || document.location.pathname == "/") {
        presenceData.details = "Home";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.state;
    }
    else if (document.location.pathname == "/games") {
        presenceData.details = "Games";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.state;
    }
    else if (document.location.pathname == "/ranking") {
        presenceData.details = "Rankings";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.state;
    }
    else if (document.location.pathname.includes("/gamelists/")) {
        gameName = document.querySelector("body > div > div.wrap.list-wrap > div.game-title > h1");
        presenceData.details = "Games";
        presenceData.state = gameName.innerText;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (video !== null && document.location.pathname.startsWith("/user/")) {
        videoTitle = document.querySelector("div.channel > div.others > div.player-footer > div.video-info > h1.title");
        streamer = document.querySelector("div.side-bar > div.anchor-bar.sider-tab > p.nick-bar > span");
        presence.setTrayTitle(videoTitle.innerText);
        presenceData.details = videoTitle.innerText;
        presenceData.state = streamer.innerText;
        presenceData.startTimestamp = browsingStamp;
        presenceData.smallImageKey = "live";
    }
    else {
        presenceData.details = "Browsing...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.state;
    }
    presence.setActivity(presenceData);
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQ3hCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQyxFQUVGLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzVCLElBQUksRUFBRSwyQkFBMkI7SUFDakMsS0FBSyxFQUFFLDBCQUEwQjtDQUNsQyxDQUFDLENBQUM7QUFFSCxJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQztBQUM3QixJQUFJLFFBQVEsQ0FBQztBQUNiLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hELElBQUksUUFBYyxDQUFDO0FBQ25CLElBQUksVUFBZ0IsRUFBRSxRQUFjLENBQUM7QUFFckMsSUFBRyxpQkFBaUIsSUFBSSxRQUFRLEVBQUU7SUFFOUIsaUJBQWlCLEdBQUcsUUFBUSxDQUFBO0lBQzVCLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBQyxJQUFJLENBQUMsQ0FBQTtDQUU5QztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUVuQyxJQUFJLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLElBQUk7S0FDcEIsQ0FBQztJQUVGLElBQUksS0FBSyxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUFDLGdEQUFnRCxDQUFDLENBQUM7SUFFdkcsSUFBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtRQUVuRSxZQUFZLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUM5QixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUU1QyxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7S0FFM0I7U0FBTSxJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFFBQVEsRUFBRTtRQUVoRCxZQUFZLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUMvQixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUU1QyxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7S0FFM0I7U0FBTSxJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFVBQVUsRUFBRTtRQUVsRCxZQUFZLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUNsQyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUU1QyxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7S0FFM0I7U0FBTSxJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUU1RCxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1FBRTNGLFlBQVksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQy9CLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUN4QyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUU3QztTQUFNLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFFNUUsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsMEVBQTBFLENBQUMsQ0FBQztRQUNoSCxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyw2REFBNkQsQ0FBQyxDQUFDO1FBRWpHLFFBQVEsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQztRQUM1QyxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFDeEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDNUMsWUFBWSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7S0FFckM7U0FBTTtRQUVMLFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO1FBQ3JDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBRTVDLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQztLQUUzQjtJQUVELFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7QUFHckMsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQU9ILFNBQVMsYUFBYSxDQUFDLFNBQWlCLEVBQUUsYUFBcUI7SUFDN0QsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENBQUMifQ==