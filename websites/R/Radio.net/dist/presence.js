const presence = new Presence({
    clientId: "634124614544392193"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    search: "presence.activity.searching",
    browsing: "presence.activity.browsing"
});
var lastPath = "";
var browsingStamp = 0;
presence.on("UpdateData", async () => {
    const path = window.location.pathname.split("/").slice(1);
    const presenceData = {
        details: "Radio.net",
        largeImageKey: "logo_big"
    };
    switch (path[0]) {
        case "s":
        case "p": {
            if (path[1] != lastPath || browsingStamp == 0)
                browsingStamp = Date.now() / 1000;
            const playerIcon = document.querySelector(".player__animate-icon");
            const name = document.querySelector("h1");
            const info = document.querySelector("div.player__song");
            const status = document.querySelector(".player__info-wrap");
            if (playerIcon.style.display != "none") {
                presenceData.details = name.innerText;
                presenceData.state = info.innerText;
                presenceData.smallImageText = (await strings).play;
                presenceData.smallImageKey = "play";
                presenceData.startTimestamp = browsingStamp;
                if (path[0] == "p") {
                    const start = document.querySelector(".player__timing-wrap > span:nth-child(1)").innerText
                        .split(":")
                        .reverse();
                    const end = document.querySelector(".player__timing-wrap > span:nth-child(3)").innerText
                        .split(":")
                        .reverse();
                    if (start.length > 0) {
                        presenceData.startTimestamp -= parseInt(start[0]) * 60;
                    }
                    if (start.length > 1) {
                        presenceData.startTimestamp -= parseInt(start[0]) * 60 * 60;
                    }
                    if (start.length > 2) {
                        presenceData.startTimestamp -= parseInt(start[0]) * 60 * 60 * 24;
                    }
                    presenceData.endTimestamp = presenceData.startTimestamp;
                    if (end.length > 0) {
                        presenceData.endTimestamp += parseInt(start[0]) * 60;
                    }
                    if (end.length > 1) {
                        presenceData.endTimestamp += parseInt(start[0]) * 60 * 60;
                    }
                    if (end.length > 2) {
                        presenceData.endTimestamp += parseInt(start[0]) * 60 * 60 * 24;
                    }
                }
            }
            else {
                browsingStamp = 0;
                presenceData.details = name.innerText;
                presenceData.smallImageText = (await strings).pause;
                presenceData.smallImageKey = "pause";
                if (status.style.display != "none") {
                    const adlength = status.innerText.match(/\d+/g)
                        ? parseInt(status.innerText.match(/\d+/g)[0])
                        : 0;
                    if (adlength > 0) {
                        presenceData.state = "Currently watching an ad";
                        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
                        presenceData.endTimestamp = presenceData.startTimestamp + adlength;
                    }
                    else {
                        presenceData.state = status.innerText;
                    }
                }
            }
            break;
        }
        case "search": {
            browsingStamp = 0;
            const results = document.querySelector("h1").innerText.match(/\d+/g)[0];
            presenceData.details = new URLSearchParams(window.location.search).get("q");
            presenceData.state = `${results} results`;
            presenceData.smallImageKey = "search";
            presenceData.smallImageText = (await strings).search;
            break;
        }
        case "genre":
        case "topic":
        case "country":
        case "city":
        case "local-stations":
        case "top-stations":
            browsingStamp = 0;
            presenceData.details = document.querySelector("h1").innerText;
            presenceData.smallImageKey = "reading";
            presenceData.smallImageText = (await strings).browsing;
            break;
        case "profile":
        case "recents":
        case "favorites":
            browsingStamp = 0;
            presenceData.details = document.title;
            break;
        case "iphone":
        case "ipad":
        case "android":
        case "windowsphone":
        case "blackberry":
            browsingStamp = 0;
            presenceData.details = document.title;
            break;
        default:
            presence.setTrayTitle();
            presence.setActivity();
            return;
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsTUFBTSxFQUFFLDZCQUE2QjtJQUNyQyxRQUFRLEVBQUUsNEJBQTRCO0NBQ3ZDLENBQUMsQ0FBQztBQUVMLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNsQixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7QUFFdEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxNQUFNLFlBQVksR0FBaUI7UUFDakMsT0FBTyxFQUFFLFdBQVc7UUFDcEIsYUFBYSxFQUFFLFVBQVU7S0FDMUIsQ0FBQztJQUVGLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ2YsS0FBSyxHQUFHLENBQUM7UUFDVCxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBRVIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxJQUFJLGFBQWEsSUFBSSxDQUFDO2dCQUMzQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztZQUNwQyxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUN2Qyx1QkFBdUIsQ0FDVCxDQUFDO1lBQ2pCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxD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