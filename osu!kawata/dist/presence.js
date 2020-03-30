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
presence.on("UpdateData", async () => {
    customData = false;
    if (document.location.pathname == "/") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Home Page";
    }
    else if (document.location.pathname.includes("/leaderboard")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing Leaderboard";
        var url = new URL(document.location.href);
        var mode = parseInt(url.searchParams.get("mode"));
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
        var url = new URL(document.location.href);
        var mode = parseInt(url.searchParams.get("mode"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixZQUFZLEdBQWlCO0lBQzVCLGFBQWEsRUFBRSxNQUFNO0NBQ3JCLEVBQ0QsVUFBVSxHQUFZLEtBQUssQ0FBQztBQUU3QixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUNsRCxJQUFJLElBQVMsQ0FBQztBQUNkLElBQUksS0FBVSxDQUFDO0FBQ2YsSUFBSSxRQUFhLENBQUM7QUFDbEIsSUFBSSxXQUFnQixDQUFDO0FBQ3JCLElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxFQUFPLENBQUM7QUFFWixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBRW5CLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQ3RDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO0tBQ25DO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDL0QsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztRQUU5QyxJQUFJLEdBQUcsR0FBUSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLElBQUksSUFBSSxHQUFXLFFBQVEsQ0FBQyxHQUFHLENBQUMs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