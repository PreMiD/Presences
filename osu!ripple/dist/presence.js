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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLEVBQzdELFlBQVksR0FBaUIsRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLEVBQ3RELFVBQVUsR0FBWSxLQUFLLENBQUM7QUFDOUIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDbEQsSUFBSSxHQUFRLENBQUM7QUFDYixJQUFJLEtBQVUsQ0FBQztBQUNmLElBQUksUUFBYSxDQUFDO0FBQ2xCLElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxJQUFTLENBQUM7QUFDZCxJQUFJLEVBQU8sQ0FBQztBQUNaLElBQUksSUFBUyxDQUFDO0FBRWQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUduQixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtRQUNyQyxZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUNuQyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUM3QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3hELFlBQVksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1FBQ3BDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0tBQzdDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDM0QsWUFBWSxDQUFDLE9BQU8sR0FBRyxz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