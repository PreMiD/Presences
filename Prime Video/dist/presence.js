var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "664568915325747230",
    mediaKeys: false
}), strings = presence.getStrings({
    browsing: "presence.activity.browsing",
    paused: "presence.playback.paused",
    playing: "presence.playback.playing",
}), browsingStamp = Math.floor(Date.now() / 1000), regex = RegExp("https:\\/\\/www\\.amazon\\.(.*?)\\/\\b(?:Prime-Video|gp\\/video)\\b");
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    var presenceData = { largeImageKey: "prime-video" };
    ;
    var video = document.querySelector("video");
    if (video != null) {
        browsingStamp = Math.floor(Date.now() / 1000);
        presenceData.details = document.querySelector("#dv-web-player > div > div:nth-child(1) > div > div " +
            "> div:nth-child(2) > div > div > div.scalingUiContainerBottom > div > div.controlsOverlay " +
            "> div.controlsOverlayTop > div.controlsOverlayTopMain > div.controlsOverlayTopRight > div > div.center " +
            "> div > div.title").innerText;
        presenceData.state = document.querySelector("#dv-web-player > div > div:nth-child(1) > div > div > div:nth-child(2) > div > div " +
            "> div.scalingUiContainerBottom > div > div.controlsOverlay > div.controlsOverlayTop " +
            "> div.controlsOverlayTopMain > div.controlsOverlayTopRight > div > div.center > div > div.subtitle").innerText;
        if (video.paused) {
            presenceData.smallImageKey = "paused";
            presenceData.smallImageText = (yield strings).paused;
        }
        else {
            presenceData.startTimestamp = Math.floor(Date.now() / 1000);
            presenceData.endTimestamp = Math.floor(presenceData.startTimestamp + (video.duration - video.currentTime));
            presenceData.smallImageKey = "playing";
            presenceData.smallImageText = (yield strings).playing;
        }
    }
    else {
        presenceData.details = (yield strings).browsing;
        presenceData.startTimestamp = browsingStamp;
    }
    if (!regex.test(window.location.href)) {
        presence.clearActivity();
    }
    else if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUNwQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsRUFFRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUMxQixRQUFRLEVBQUUsNEJBQTRCO0lBQ3RDLE1BQU0sRUFBRSwwQkFBMEI7SUFDbEMsT0FBTyxFQUFFLDJCQUEyQjtDQUN2QyxDQUFDLEVBRUYsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUU3QyxLQUFLLEdBQUcsTUFBTSxDQUFDLHFFQUFxRSxDQUFDLENBQUM7QUFHMUYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ2pDLElBQUksWUFBWSxHQUFpQixFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsQ0FBQztJQUFBLENBQUM7SUFDbkUsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU1QyxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7UUFDZixhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDOUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHNEQUFzRDtZQUNoRyw0RkFBNEY7WUFDNUYseUdBQXlHO1lBQ3pHLG1CQUFtQixDQUN0QixDQUFDLFNBQVMsQ0FBQztRQUNaLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDdkMscUZBQXFGO1lBQ3JGLHNGQUFzRjtZQUN0RixvR0FBb0csQ0FDdkcsQ0FBQyxTQUFTLENBQUM7UUFFWixJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDZCxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztZQUN0QyxZQUFZLENBQUMsY0FBYyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUM7U0FDeEQ7YUFBTTtZQUNILFlBQVksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDNUQsWUFBWSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzNHLFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1lBQ3ZDLFlBQVksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQztTQUN6RDtLQUNKO1NBQU07UUFDSCxZQUFZLENBQUMsT0FBTyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDaEQsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FDL0M7SUFFRCxJQUFJLENBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3BDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUM1QjtTQUNJLElBQUksWUFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7UUFDbkMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUMxQjtTQUFNO1FBQ0gsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUN0QztBQUNMLENBQUMsQ0FBQSxDQUFDLENBQUMifQ==