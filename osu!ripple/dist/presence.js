var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({ clientId: "688752009079160852", mediaKeys: false }), presenceData = { largeImageKey: "logo" }, customData = false;
var browsingStamp = Math.floor(Date.now() / 1000);
var url;
var title;
var subtitle;
var user;
var mode;
var pp;
var rank;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    customData = false;
    if (document.location.pathname == ("/")) {
        presenceData.details = "Home Page";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/login")) {
        presenceData.details = "Regitstering account";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/register")) {
        presenceData.details = "Logging in";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/u")) {
        user = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto > div:nth-child(1) > div:nth-child(2) > h1");
        presenceData.startTimestamp = browsingStamp;
        var url = new URL(document.location.href);
        var mode = parseInt(url.searchParams.get("mode"));
        switch (mode) {
            case 1:
                var url = new URL(document.location.href);
                var mode = parseInt(url.searchParams.get("relax"));
                switch (mode) {
                    case 1:
                        rank = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto > div.magic.table.floating.right > div > h1:nth-child(6)");
                        pp = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(6) > table > tbody > tr:nth-child(3) > td.right.aligned");
                        presenceData.details = user.innerText + "'s Taiko profile";
                        presenceData.state = rank.innerText + " | " + pp.innerText + "pp(Relax)";
                        break;
                    default:
                        rank = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto > div.magic.table.floating.right > div > h1:nth-child(2)");
                        pp = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(2) > table > tbody > tr:nth-child(1) > td.right.aligned");
                        presenceData.details = user.innerText + "'s Taiko profile";
                        presenceData.state = rank.innerText + " | " + pp.innerText + "pp";
                        break;
                }
                break;
            case 2:
                var url = new URL(document.location.href);
                var mode = parseInt(url.searchParams.get("relax"));
                switch (mode) {
                    case 1:
                        rank = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto > div.magic.table.floating.right > div > h1:nth-child(7)");
                        pp = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(7) > table > tbody > tr:nth-child(1) > td.right.aligned");
                        presenceData.details = user.innerText + "'s Catch profile";
                        presenceData.state = rank.innerText + " | " + pp.innerText + "pp(Relax)";
                        break;
                    default:
                        rank = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto > div.magic.table.floating.right > div > h1:nth-child(3)");
                        pp = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(3) > table > tbody > tr:nth-child(1) > td.right.aligned");
                        presenceData.details = user.innerText + "'s Catch profile";
                        presenceData.state = rank.innerText + " | " + pp.innerText + "pp";
                        break;
                }
                break;
            case 3:
                rank = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto > div.magic.table.floating.right > div > h1:nth-child(4)");
                pp = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(4) > table > tbody > tr:nth-child(1) > td.right.aligned");
                presenceData.details = user.innerText + "'s Mania profile";
                presenceData.state = rank.innerText + " | " + pp.innerText + "pp";
                break;
            default:
                var url = new URL(document.location.href);
                var mode = parseInt(url.searchParams.get("relax"));
                switch (mode) {
                    case 1:
                        rank = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto > div.magic.table.floating.right > div > h1:nth-child(5)");
                        pp = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(5) > table > tbody > tr:nth-child(3) > td.right.aligned");
                        presenceData.details = user.innerText + "'s Standard profile";
                        presenceData.state = rank.innerText + " | " + pp.innerText + "pp(Relax)";
                        break;
                    default:
                        rank = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(1) > table > tbody > tr:nth-child(1) > td.right.aligned");
                        pp = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(1) > table > tbody > tr:nth-child(3) > td.right.aligned");
                        presenceData.details = user.innerText + "'s Standard profile";
                        presenceData.state = rank.innerText + " | " + pp.innerText + "pp";
                        break;
                }
                break;
        }
    }
    else if (document.location.pathname.includes("/leaderboard")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing Leaderboard";
        var url = new URL(document.location.href);
        var mode = parseInt(url.searchParams.get("mode"));
        switch (mode) {
            case 1:
                var url = new URL(document.location.href);
                var mode = parseInt(url.searchParams.get("relax"));
                switch (mode) {
                    case 1:
                        presenceData.state = "osu!taiko | Relax";
                        break;
                    default:
                        presenceData.state = "osu!taiko";
                        break;
                }
                break;
            case 2:
                var url = new URL(document.location.href);
                var mode = parseInt(url.searchParams.get("relax"));
                switch (mode) {
                    case 1:
                        presenceData.state = "osu!catch | Relax";
                        break;
                    default:
                        presenceData.state = "osu!catch";
                        break;
                }
                break;
            case 3:
                presenceData.state = "osu!mania";
                break;
            default:
                var url = new URL(document.location.href);
                var mode = parseInt(url.searchParams.get("relax"));
                switch (mode) {
                    case 1:
                        presenceData.state = "osu!standard | Relax";
                        break;
                    default:
                        presenceData.state = "osu!standard";
                        break;
                }
                break;
        }
    }
    else if (document.location.pathname.includes("/b/")) {
        title = document.querySelector("body > div.ui.full.height.main.wrapper > div.huge.heading.dropped > div > h1");
        presenceData.details = "Looking at the beatmap:";
        presenceData.state = title.innerText;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/beatmaps/rank_request")) {
        presenceData.details = "Request beatmap ranking";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/donate")) {
        presenceData.details = "Donate";
        presenceData.state = "What are you waiting for?";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/settings")) {
        presenceData.details = "Browsing their settings";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/friends")) {
        presenceData.details = "Browsing their friends";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/changelog")) {
        presenceData.details = "Checking changelog";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/team")) {
        presenceData.details = "Viewing osu!ripple team";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/about")) {
        presenceData.details = "Viewing about";
        presenceData.state = "Welcome to Ripple.";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/doc")) {
        presenceData.details = "Viewing Documentation";
        presenceData.state = "Home Page";
        presenceData.startTimestamp = browsingStamp;
        title = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div > div:nth-child(1) > h1");
        if (title !== null)
            presenceData.details = "Viewing Documentation";
        presenceData.state = title.innerText;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/login")) {
        presenceData.details = "Regitstering account";
        presenceData.startTimestamp = browsingStamp;
    }
    if (document.location.hostname == "vinse.ripple.moe") {
        presenceData.details = "Browsing Multiplayer history";
        presenceData.startTimestamp = browsingStamp;
    }
    if (document.location.hostname == "fokabot.ripple.moe") {
        presenceData.details = "Viewing Documentation";
        presenceData.state = "FokaBot Commands";
        presenceData.startTimestamp = browsingStamp;
    }
    if (document.location.hostname == "support.ripple.moe") {
        presenceData.details = "Ripple Support";
        presenceData.startTimestamp = browsingStamp;
    }
    if (document.location.hostname == "status.ripple.moe") {
        presenceData.details = "Checking server status";
        presenceData.startTimestamp = browsingStamp;
    }
    if (document.location.hostname == "blog.ripple.moe") {
        title = document.querySelector("head > title");
        presenceData.details = "Reading Blog";
        presenceData.state = title.innerText;
        presenceData.startTimestamp = browsingStamp;
    }
    if (!customData) {
        presence.setActivity(presenceData);
    }
}));
presence.on('iFrameData', function (data) { console.log(data); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxFQUFDLFFBQVEsRUFBQyxvQkFBb0IsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBRSxZQUFZLEdBQWlCLEVBQUMsYUFBYSxFQUFDLE1BQU0sRUFBQyxFQUFFLFVBQVUsR0FBVyxLQUFLLENBQUM7QUFDOUosSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEQsSUFBSSxHQUFTLENBQUM7QUFDZCxJQUFJLEtBQVcsQ0FBQztBQUNoQixJQUFJLFFBQWMsQ0FBQztBQUNuQixJQUFJLElBQVUsQ0FBQztBQUNmLElBQUksSUFBVSxDQUFDO0FBQ2YsSUFBSSxFQUFRLENBQUM7QUFDYixJQUFJLElBQVUsQ0FBQztBQUdmLFFBQVEsQ0FBQyxFQUFFLENBRVQsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUV2QixVQUFVLEdBQUcsS0FBSyxDQUFDO0lBR25CLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsRUFDdEM7UUFDRSxZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUNuQyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUM3QztTQUNJLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUNyRDtRQUNFLFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7UUFDOUMsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FDN0M7U0FDSSxJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENB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