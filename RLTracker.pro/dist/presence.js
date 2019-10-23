var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "636659890927960064",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var replace;
var search;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "rlt"
    };
    if (document.location.pathname == "/") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the home page";
    }
    else if (document.location.pathname.includes("/profiles/search")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Searching a profile";
        presenceData.smallImageKey = "search";
    }
    else if (document.location.pathname.includes("/profiles/")) {
        presenceData.startTimestamp = browsingStamp;
        title = document.querySelector("#rip_col > div.fav_no_category.main_box.main_stats_box > h4");
        presenceData.details = "Viewing stats of:";
        presenceData.state = title.innerText.split("Last update")[0];
    }
    else if (document.location.pathname.includes("/trades")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing trades";
    }
    else if (document.location.pathname.includes("live_tracker")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the live tracker";
    }
    else if (document.location.pathname.includes("/prices")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the price changes";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQyxFQUNGLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzVCLElBQUksRUFBRSwyQkFBMkI7SUFDakMsS0FBSyxFQUFFLDBCQUEwQjtDQUNsQyxDQUFDLENBQUM7QUFFSCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBQyxJQUFJLENBQUMsQ0FBQztBQUVoRCxJQUFJLElBQVUsQ0FBQztBQUNmLElBQUksS0FBVyxDQUFDO0FBQ2hCLElBQUksT0FBYSxDQUFDO0FBQ2xCLElBQUksTUFBWSxDQUFDO0FBRWpCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUduQyxJQUFJLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLEtBQUs7S0FDckIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQ3JDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUM7S0FDaEQ7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1FBQ2xFLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7UUFDN0MsWUFBWSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7S0FDdkM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUM1RCxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1QyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyw2REFBNkQsQ0FBQyxDQUFDO1FBQzlGLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7UUFDM0MsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM5RDtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ3pELFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7S0FDekM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUM5RCxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLDBCQUEwQixDQUFDO0tBQ25EO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDekQsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRywyQkFBMkIsQ0FBQztLQUNwRDtJQUVELElBQUksWUFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7UUFDaEMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtLQUN2QjtTQUFNO1FBQ0wsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztBQUVILENBQUMsQ0FBQSxDQUFDLENBQUM7QUFRSCxTQUFTLGFBQWEsQ0FBQyxTQUFpQixFQUFFLGFBQXFCO0lBQy9ELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMvQyxDQUFDIn0=