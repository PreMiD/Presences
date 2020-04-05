var presence = new Presence({
    clientId: "675322225490001924"
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
var url;
var mode;
presence.on("UpdateData", async () => {
    customData = false;
    if (document.location.pathname == "/") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Home Page";
    }
    else if (document.location.pathname.includes("/leaderboard")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing Leaderboard";
        url = new URL(document.location.href);
        mode = parseInt(url.searchParams.get("mode"));
        switch (mode) {
            case 1:
                presenceData.state = "Taiko";
                break;
            case 2:
                presenceData.state = "Catch the Beat";
                break;
            case 3:
                presenceData.state = "osu!mania";
                break;
            default:
                presenceData.state = "osu! standard";
                break;
        }
    }
    else if (document.location.pathname.includes("/clans")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing Clans";
        url = new URL(document.location.href);
        mode = parseInt(url.searchParams.get("mode"));
        switch (mode) {
            case 1:
                presenceData.state = "osu!taiko";
                break;
            case 2:
                presenceData.state = "osu!catch";
                break;
            case 3:
                presenceData.state = "osu!mania";
                break;
            default:
                presenceData.state = "osu!standard";
                break;
        }
    }
    else if (document.location.pathname.includes("/register")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Registering account";
    }
    else if (document.location.pathname.includes("/u")) {
        user = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto > div:nth-child(1) > div:nth-child(2) > h1");
        pp = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(1) > table > tbody > tr:nth-child(3) > td.right.aligned");
        rank = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(1) > table > tbody > tr:nth-child(1) > td.right.aligned");
        subtitle = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(1) > b:nth-child(2)");
        countryrank = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(1) > table > tbody > tr:nth-child(2) > td.right.aligned");
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = user.innerText + "'s profile";
        presenceData.state =
            rank.innerText +
                " | " +
                pp.innerText +
                "pp | " +
                subtitle.innerText +
                "(" +
                countryrank.innerText +
                ")";
    }
    else if (document.location.pathname.includes("/c")) {
        title = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto.aligned > div > div > h1");
        pp = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(3) > div.ui.two.column.divided.stackable.grid > div > div:nth-child(1) > table > tbody > tr:nth-child(3) > td.right.aligned");
        rank = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(3) > div.ui.two.column.divided.stackable.grid > div > div:nth-child(1) > table > tbody > tr:nth-child(2) > td.right.aligned");
        subtitle = document.querySelector("body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto.aligned > div > div > div");
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing Clans";
        presenceData.state =
            title.innerText +
                subtitle.innerText +
                " | " +
                pp.innerText +
                "pp(" +
                rank.innerText +
                ")";
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
    else if (document.location.pathname == "/beatmaps") {
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
});
presence.on("iFrameData", function (data) {
    console.log(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixZQUFZLEdBQWlCO0lBQzNCLGFBQWEsRUFBRSxNQUFNO0NBQ3RCLEVBQ0QsVUFBVSxHQUFZLEtBQUssQ0FBQztBQUU5QixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUNsRCxJQUFJLElBQVMsQ0FBQztBQUNkLElBQUksS0FBVSxDQUFDO0FBQ2YsSUFBSSxRQUFhLENBQUM7QUFDbEIsSUFBSSxXQUFnQixDQUFDO0FBQ3JCLElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxFQUFPLENBQUM7QUFDWixJQUFJLEdBQVEsQ0FBQztBQUNiLElBQUksSUFBWSxDQUFDO0FBRWpCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFFbkIsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDckMsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7S0FDcEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUM5RCxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO1FBRTlDLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RD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