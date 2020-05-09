var presence = new Presence({ clientId: "688752009079160852" }), presenceData = { largeImageKey: "logo" }, customData = false;
var browsingStamp = Math.floor(Date.now() / 1000);
var title;
var user;
var pp;
var rank;
var url;
var mode;
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
        url = new URL(document.location.href);
        mode = parseInt(url.searchParams.get("mode"));
        switch (mode) {
            case 1:
                url = new URL(document.location.href);
                mode = parseInt(url.searchParams.get("relax"));
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
                url = new URL(document.location.href);
                mode = parseInt(url.searchParams.get("relax"));
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
                url = new URL(document.location.href);
                mode = parseInt(url.searchParams.get("relax"));
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
        url = new URL(document.location.href);
        mode = parseInt(url.searchParams.get("mode"));
        switch (mode) {
            case 1:
                url = new URL(document.location.href);
                mode = parseInt(url.searchParams.get("relax"));
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
                url = new URL(document.location.href);
                mode = parseInt(url.searchParams.get("relax"));
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
                url = new URL(document.location.href);
                mode = parseInt(url.searchParams.get("relax"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLEVBQzdELFlBQVksR0FBaUIsRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLEVBQ3RELFVBQVUsR0FBRyxLQUFLLENBQUM7QUFDckIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDbEQsSUFBSSxLQUFVLENBQUM7QUFDZixJQUFJLElBQVMsQ0FBQztBQUNkLElBQUksRUFBTyxDQUFDO0FBQ1osSUFBSSxJQUFTLENBQUM7QUFDZCxJQUFJLEdBQVEsQ0FBQztBQUNiLElBQUksSUFBWSxDQUFDO0FBRWpCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFHbkIsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDckMsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7UUFDbkMsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FDN0M7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN4RCxZQUFZLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztRQUNwQyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUM3QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQzNELFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7UUFDOUMsWUFB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