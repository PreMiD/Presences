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
    clientId: "675322225490001924",
    mediaKeys: false
}), presenceData = {
    largeImageKey: "logo"
}, customData = false;
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var subtitle;
var countryrank;
var rank;
var pp;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    customData = false;
    if (document.location.pathname == ("/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Home Page";
    }
    else if (document.location.pathname.includes("/leaderboard")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing Leaderboard";
    }
    else if (document.location.pathname.includes("/clans")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing Clans";
    }
    else if (document.location.pathname.includes("/u")) {
        user = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto > div:nth-child(1) > div:nth-child(2) > h1");
        pp = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(1) > table > tbody > tr:nth-child(3) > td.right.aligned");
        rank = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(1) > table > tbody > tr:nth-child(1) > td.right.aligned");
        subtitle = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(1) > b:nth-child(2)");
        countryrank = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(1) > table > tbody > tr:nth-child(2) > td.right.aligned");
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = user.innerText + "'s profile";
        presenceData.state = rank.innerText + " | " + pp.innerText + "pp | " + subtitle.innerText + "(" + countryrank.innerText + ")";
    }
    else if (document.location.pathname.includes("/c")) {
        title = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto.aligned > div > div > h1");
        pp = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(3) > div.ui.two.column.divided.stackable.grid > div > div:nth-child(1) > table > tbody > tr:nth-child(3) > td.right.aligned");
        rank = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(3) > div.ui.two.column.divided.stackable.grid > div > div:nth-child(1) > table > tbody > tr:nth-child(2) > td.right.aligned");
        subtitle = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto.aligned > div > div > div");
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing Clans";
        presenceData.state = title.innerText + subtitle.innerText + " | " + pp.innerText + "pp(" + rank.innerText + ")";
    }
    else if (document.location.pathname.includes("/about")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing About";
    }
    else if (document.location.pathname.includes("/doc")) {
        title = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div > div:nth-child(1) > h1");
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing Documentation";
        presenceData.state = title.innerText;
    }
    else if (document.location.pathname == ("/beatmaps")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing beatmaps";
    }
    else if (document.location.pathname.includes("/beatmaps/rank_request")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing beatmaps";
        presenceData.state = "Request beatmap ranking";
    }
    else if (document.location.pathname.includes("/friends")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing friends";
    }
    else if (document.location.pathname.includes("/settings")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing their settings";
    }
    if (!customData) {
        presence.setActivity(presenceData);
    }
}));
presence.on('iFrameData', function (data) {
    console.log(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUMsRUFBRSxZQUFZLEdBQWlCO0lBQy9CLGFBQWEsRUFBRSxNQUFNO0NBQ3RCLEVBQUUsVUFBVSxHQUFXLEtBQUssQ0FBQztBQUU5QixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoRCxJQUFJLElBQVUsQ0FBQztBQUNmLElBQUksS0FBVyxDQUFDO0FBQ2hCLElBQUksUUFBYyxDQUFDO0FBQ25CLElBQUksV0FBaUIsQ0FBQztBQUN0QixJQUFJLElBQVUsQ0FBQztBQUNmLElBQUksRUFBUSxDQUFDO0FBRWIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ25DLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFFbkIsSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3RDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO0tBRXBDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDaEUsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztLQW1CL0M7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN4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