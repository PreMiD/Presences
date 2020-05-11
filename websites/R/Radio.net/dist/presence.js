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
        case "p":
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
        case "search":
            browsingStamp = 0;
            const results = document.querySelector("h1").innerText.match(/\d+/g)[0];
            presenceData.details = new URLSearchParams(window.location.search).get("q");
            presenceData.state = `${results} results`;
            presenceData.smallImageKey = "search";
            presenceData.smallImageText = (await strings).search;
            break;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsTUFBTSxFQUFFLDZCQUE2QjtJQUNyQyxRQUFRLEVBQUUsNEJBQTRCO0NBQ3ZDLENBQUMsQ0FBQztBQUVMLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNsQixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7QUFFdEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxNQUFNLFlBQVksR0FBaUI7UUFDakMsT0FBTyxFQUFFLFdBQVc7UUFDcEIsYUFBYSxFQUFFLFVBQVU7S0FDMUIsQ0FBQztJQUVGLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ2YsS0FBSyxHQUFHLENBQUM7UUFDVCxLQUFLLEdBQUc7WUFDTixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLElBQUksYUFBYSxJQUFJLENBQUM7Z0JBQzNDLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQ3BDLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3ZDLHVCQUF1QixDQUNULENBQUM7WUFDakIsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQWdCLENBQUM7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