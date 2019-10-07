var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "630896385889271819",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var typing;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {};
    if (document.location.pathname.includes("/videocall/")) {
        presenceData.largeImageKey = "messenger";
        presenceData.startTimestamp = browsingStamp;
        user = document.querySelector("#u_0_0 > div.r30xiam5.m0q0jmkx.alrytcbg.hp5uecnq.g2121wdl > div > div:nth-child(5) > div > div > div > div > div.prklkq8o.t7elcel3.sd0tyowg.ocjcko58.p3f4w9ai.f5zavhip.foed1vyy > div > div > div.ocjcko58.foed1vyy > div > p");
        console.log(document.querySelector("#u_0_0 > div.r30xiam5.m0q0jmkx.alrytcbg.hp5uecnq.g2121wdl > div > div:nth-child(5) > div > div > div > div > div.prklkq8o.t7elcel3.sd0tyowg.ocjcko58.p3f4w9ai.f5zavhip.foed1vyy > div > div > div.ocjcko58.foed1vyy > div > p"));
        if (user == null || user.innerText == null) {
            presenceData.details = "In a video call or";
            user = "user not found.";
            presenceData.smallImageKey = "videocall";
        }
        else {
            presenceData.details = "In call with:";
            user = user.innerText;
            presenceData.smallImageKey = "call";
        }
        presenceData.state = user;
    }
    else if (document.location.pathname.includes("/t/")) {
        presenceData.largeImageKey = "messenger";
        presenceData.startTimestamp = browsingStamp;
        user = document.querySelector('._3oh-');
        typing = document.querySelector("body > div > div > div > div:nth-child(2) > span > div._20bp > div._4_j4 > div._4rv3._7og6 > div > div._7kpk > div > div > div:nth-child(1) > div > div > div > div > div > div > span > span");
        if (typing == null) {
            presenceData.details = "Reading messages from:";
            presenceData.smallImageKey = "reading";
        }
        else {
            presenceData.details = "Writing to:";
            presenceData.smallImageKey = "writing";
        }
        presenceData.state = user.innerText;
    }
    else if (document.location.pathname.includes("/new")) {
        presenceData.largeImageKey = "messenger";
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Composing a new message";
        presenceData.smallImageKey = "writing";
    }
    else if (document.location.pathname.includes("/about")) {
        presenceData.largeImageKey = "messenger";
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the about page";
    }
    presence.setActivity(presenceData);
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQyxFQUNGLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzVCLElBQUksRUFBRSwyQkFBMkI7SUFDakMsS0FBSyxFQUFFLDBCQUEwQjtDQUNsQyxDQUFDLENBQUM7QUFFSCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBQyxJQUFJLENBQUMsQ0FBQztBQUVoRCxJQUFJLElBQVUsQ0FBQztBQUVmLElBQUksTUFBWSxDQUFDO0FBRWpCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUduQyxJQUFJLFlBQVksR0FBaUIsRUFDaEMsQ0FBQztJQUdGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1FBQ3RELFlBQVksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDO1FBQ3pDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQzVDLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLCtOQUErTixDQUFDLENBQUM7UUFDL1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLCtOQUErTixDQUFDLENBQUMsQ0FBQztRQUNyUSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFDMUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztZQUM1QyxJQUFJLEdBQUcsaUJBQWlCLENBQUM7WUFDekIsWUFBWSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7U0FDMUM7YUFBTTtZQUNMLFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO1lBQ3ZDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3RCLFlBQVksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1NBQ3JDO1FBQ0QsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7S0FDM0I7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQztRQUNwRCxZQUFZLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQztRQUN6QyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1QyxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywrTEFBK0wsQ0FBQyxDQUFDO1FBQ2pPLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtZQUNsQixZQUFZLENBQUMsT0FBTyxHQUFHLHdCQUF3QixDQUFDO1lBQ2hELFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1NBQ3hDO2FBQU07WUFDTCxZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQztZQUNyQyxZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztTQUN4QztRQUNELFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUNyQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3RELFlBQVksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDO1FBQ3pDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUM7UUFDakQsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7S0FDeEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN4RCxZQUFZLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQztRQUN6QyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLHdCQUF3QixDQUFDO0tBQ2pEO0lBRUQsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUVyQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBUUgsU0FBUyxhQUFhLENBQUMsU0FBaUIsRUFBRSxhQUFxQjtJQUMvRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDL0MsQ0FBQyJ9