var presence = new Presence({
    clientId: "612704158826496028"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var doodleTitle;
var homepageImage;
var resultsInfo, searchTab;
var pageInput, homepageInput;
homepageInput = document.querySelector("#tsf > div:nth-child(2) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input");
homepageImage = document.querySelector("#hplogo");
var imgInput = document.querySelector("#REsRA");
presence.on("UpdateData", async () => {
    let presenceData = {
        details: "In construction",
        state: "-",
        largeImageKey: "lg"
    };
    if ((homepageInput && homepageImage) || !document.location.pathname) {
        presenceData.state = "Home";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.details;
    }
    else if (document.location.pathname.startsWith("/doodles/")) {
        var searchURL = new URL(document.location.href);
        var doodleResult = searchURL.searchParams.get("q");
        doodleTitle = document.querySelector("#title-card > div > h2");
        if (document.location.pathname.includes("/about")) {
            presenceData.details = "Doodles";
            presenceData.state = "About";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (doodleTitle != null) {
            presenceData.details = "Viewing a doodle:";
            presenceData.state = doodleTitle.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (doodleResult && document.location.pathname == "/doodles/") {
            presenceData.details = "Searching for a doodle:";
            presenceData.state = doodleResult;
            presenceData.startTimestamp = browsingStamp;
            presenceData.smallImageKey = "search";
        }
        else {
            presenceData.details = "Current page:";
            presenceData.state = "Doodles";
            presenceData.startTimestamp = browsingStamp;
        }
    }
    else if (document.location.pathname.startsWith("/search")) {
        var searchURL = new URL(document.location.href);
        searchTab = searchURL.searchParams.get("tbm");
        resultsInfo = document.querySelector("#result-stats");
        presenceData.smallImageKey = "search";
        if (!searchTab) {
            presenceData.details = "Searching for " + homepageInput.value;
            presenceData.state = resultsInfo.textContent;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (searchTab == "isch") {
            presenceData.details = "Google Images";
            presenceData.state = "Searching for " + imgInput.value;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (searchTab == "vid") {
            pageInput = document.querySelector("#lst-ib");
            presenceData.details = "Google Videos";
            presenceData.state = "Searching for " + pageInput.value;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (searchTab == "nws") {
            pageInput = document.querySelector("#lst-ib");
            presenceData.details = "Google News";
            presenceData.state = "Searching for " + pageInput.value;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (searchTab == "bks") {
            pageInput = document.querySelector("#lst-ib");
            presenceData.details = "Google Books";
            presenceData.state = "Searching for " + pageInput.value;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (searchTab == "fin") {
            pageInput = document.querySelector("#lst-ib");
            presenceData.details = "Google Finance";
            presenceData.state = "Searching for " + pageInput.value;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (searchTab == "pers") {
            pageInput = document.querySelector("#lst-ib");
            presenceData.details = "Google Personal";
            presenceData.state = "Searching for " + pageInput.value;
            presenceData.startTimestamp = browsingStamp;
        }
    }
    presence.setActivity(presenceData);
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxXQUFnQixDQUFDO0FBRXJCLElBQUksYUFBa0IsQ0FBQztBQUV2QixJQUFJLFdBQWdCLEVBQUUsU0FBYyxDQUFDO0FBRXJDLElBQUksU0FBYyxFQUFFLGFBQWEsQ0FBQztBQUVsQyxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDckMsNkVBQTZFLENBQzdFLENBQUM7QUFFRixhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUVsRCxJQUFJLFFBQVEsR0FBUSxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRXJELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksWUFBWSxHQUFpQjtRQUNoQyxPQUFPLEVBQUUsaUJBQWlCO1FBQzFCLEtBQUssRUFBRSxHQUFHO1FBQ1YsYUFBYSxFQUFFLElBQUk7S0FDbkIsQ0FBQztJQUVGLElBQUksQ0FBQyxhQUFhLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtRQUNwRSxZQUFZLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUU1QixZQUFZLENBQUMsY0FBYyxHQUFH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