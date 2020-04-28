var presence = new Presence({
    clientId: "612704158826496028"
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
    const presenceData = {
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
        searchURL = new URL(document.location.href);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELElBQUksV0FBZ0IsQ0FBQztBQUVyQixJQUFJLGFBQWtCLENBQUM7QUFFdkIsSUFBSSxXQUFnQixFQUFFLFNBQWMsQ0FBQztBQUVyQyxJQUFJLFNBQWMsRUFBRSxhQUFhLENBQUM7QUFFbEMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3BDLDZFQUE2RSxDQUM5RSxDQUFDO0FBRUYsYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFbEQsSUFBSSxRQUFRLEdBQVEsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVyRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLFlBQVksR0FBaUI7UUFDakMsT0FBTyxFQUFFLGlCQUFpQjtRQUMxQixLQUFLLEVBQUUsR0FBRztRQUNWLGFBQWEsRUFBRSxJQUFJO0tBQ3BCLENBQUM7SUFFRixJQUFJLENBQUMsYUFBYSxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7UUFDbkUsWUFBWSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7UUFFNUIsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFFNUMsT0FBTyxZQUFZLENBQUMsT0FBTyxDQUFDO0tBQzdCO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFV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