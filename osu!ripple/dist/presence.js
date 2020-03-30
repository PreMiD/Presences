var presence = new Presence({ clientId: "688752009079160852" }), presenceData = { largeImageKey: "logo" }, customData = false;
var browsingStamp = Math.floor(Date.now() / 1000);
var url;
var title;
var subtitle;
var user;
var mode;
var pp;
var rank;
presence.on("UpdateData", async () => {
    customData = false;
    if (document.location.pathname == "/") {
        presenceData.details = "Home Page";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/login")) {
        presenceData.details = "Logging in";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/register")) {
        presenceData.details = "Regitstering account";
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
                        presenceData.state =
                            rank.innerText + " | " + pp.innerText + "pp(Relax)";
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
                        presenceData.state =
                            rank.innerText + " | " + pp.innerText + "pp(Relax)";
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
                        presenceData.state =
                            rank.innerText + " | " + pp.innerText + "pp(Relax)";
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
});
presence.on("iFrameData", function (data) {
    console.log(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLEVBQzlELFlBQVksR0FBaUIsRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLEVBQ3RELFVBQVUsR0FBWSxLQUFLLENBQUM7QUFDN0IsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDbEQsSUFBSSxHQUFRLENBQUM7QUFDYixJQUFJLEtBQVUsQ0FBQztBQUNmLElBQUksUUFBYSxDQUFDO0FBQ2xCLElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxJQUFTLENBQUM7QUFDZCxJQUFJLEVBQU8sQ0FBQztBQUNaLElBQUksSUFBUyxDQUFDO0FBRWQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUduQixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtRQUN0QyxZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUNuQyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUM1QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3pELFlBQVksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1FBQ3BDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0tBQzVDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDNUQsWUFBWSxDQUFDLE9BQU8sR0FBRyxz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