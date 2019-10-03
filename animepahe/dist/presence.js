var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
    }
    else if (path == "/anime") {
        presenceData.smallImageKey = "presence_browsing_all";
        presenceData.smallImageText = "Anime";
        presenceData.details = "Browsing Complete A-Z List";
        presenceData.state = "animepahe";
    }
    else if (!path.split("anime/")[1].includes('/')) {
        presenceData.smallImageKey = "presence_browsing_season";
        presenceData.smallImageText = "Season";
        presenceData.details = `${document.getElementsByClassName("title-wrapper")[0].children[1].textContent}`;
        presenceData.state = "Viewing Season";
    }
    else {
        presenceData.smallImageKey = "presence_playback_paused";
    }
    presence.setActivity(presenceData, false);
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQ3hCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDbkIsQ0FBQyxFQUNFLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzFCLElBQUksRUFBRSwyQkFBMkI7SUFDakMsS0FBSyxFQUFFLDBCQUEwQjtDQUN4QyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFDakMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDeEMsSUFBSSxZQUFZLEdBQWlCO1FBQzdCLGFBQWEsRUFBRSxXQUFXO1FBQzFCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEtBQUssRUFBRSxXQUFXO0tBQ3JCLENBQUE7SUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUN6QixZQUFZLENBQUMsYUFBYSxHQUFHLHdCQUF3QixDQUFDO1FBQ3RELFlBQVksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDO1FBQ3JDLFlBQVksQ0FBQyxPQUFPLEdBQUcsMEJBQTBCLENBQUM7UUFDbEQsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7S0FDcEM7U0FBTSxJQUFJLElBQUksSUFBSSxRQUFRLEVBQUU7UUFDekIsWUFBWSxDQUFDLGFBQWEsR0FBRyx1QkFBdUIsQ0FBQztRQUNyRCxZQUFZLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztRQUN0QyxZQUFZLENBQUMsT0FBTyxHQUFHLDRCQUE0QixDQUFDO1FBQ3BELFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO0tBQ3BDO1NBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQy9DLFlBQVksQ0FBQyxhQUFhLEdBQUcsMEJBQTBCLENBQUM7UUFDeEQsWUFBWSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUM7UUFDdkMsWUFBWSxDQUFDLE9BQU8sR0FBRyxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDeEcsWUFBWSxDQUFDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQztLQUN6QztTQUFNO1FBQ0gsWUFBWSxDQUFDLGFBQWEsR0FBRywwQkFBMEIsQ0FBQztLQUMzRDtJQUVELFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzlDLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFPSCxTQUFTLGFBQWEsQ0FBQyxTQUFpQixFQUFFLGFBQXFCO0lBQzNELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNuRCxDQUFDIn0=