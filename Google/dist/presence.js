var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new(P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
        clientId: "612704158826496028",
        mediaKeys: false
    }),
    strings = presence.getStrings({
        play: "presence.playback.playing",
        pause: "presence.playback.paused"
    });
var pagePath = document.location.pathname;
var browsingStamp = Math.floor(Date.now() / 1000);
var doodleTitle;
var homepageImage;
var resultsInfo, searchTab;
var pageInput, homepageInput;
homepageInput = document.querySelector("#tsf > div:nth-child(2) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input");
homepageImage = document.querySelector("#hplogo");
var imgInput = document.querySelector("#REsRA");
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        details: "In construction",
        state: "-",
        largeImageKey: "lg"
    };
    if ((homepageInput && homepageImage) || !document.location.pathname) {
        presenceData.state = "Home";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.details;
    } else if (pagePath.startsWith("/doodles/")) {
        var searchURL = new URL(document.location.href);
        var doodleResult = searchURL.searchParams.get("q");
        doodleTitle = document.querySelector("#title-card > div > h2");
        if (pagePath.includes("/about")) {
            presenceData.details = "Doodles";
            presenceData.state = "About";
            presenceData.startTimestamp = browsingStamp;
        } else if (doodleTitle != null) {
            presenceData.details = "Viewing a doodle:";
            presenceData.state = doodleTitle.innerText;
            presenceData.startTimestamp = browsingStamp;
        } else if (doodleResult && pagePath == "/doodles/") {
            presenceData.details = "Searching for a doodle:";
            presenceData.state = doodleResult;
            presenceData.startTimestamp = browsingStamp;
            presenceData.smallImageKey = "search";
        } else {
            presenceData.details = "Current page:";
            presenceData.state = "Doodles";
            presenceData.startTimestamp = browsingStamp;
        }
    } else if (pagePath.startsWith("/search")) {
        var searchURL = new URL(document.location.href);
        searchTab = searchURL.searchParams.get("tbm");
        resultsInfo = document.querySelector("#result-stats");
        presenceData.smallImageKey = "search";
        if (!searchTab) {
            presenceData.details = "Searching for " + homepageInput.value;
            presenceData.state = resultsInfo.textContent;
            presenceData.startTimestamp = browsingStamp;
        } else if (searchTab == "isch") {
            presenceData.details = "Google Images";
            presenceData.state = "Searching for " + imgInput.value;
            presenceData.startTimestamp = browsingStamp;
        } else if (searchTab == "vid") {
            pageInput = document.querySelector("#lst-ib");
            presenceData.details = "Google Videos";
            presenceData.state = "Searching for " + pageInput.value;
            presenceData.startTimestamp = browsingStamp;
        } else if (searchTab == "nws") {
            pageInput = document.querySelector("#lst-ib");
            presenceData.details = "Google News";
            presenceData.state = "Searching for " + pageInput.value;
            presenceData.startTimestamp = browsingStamp;
        } else if (searchTab == "bks") {
            pageInput = document.querySelector("#lst-ib");
            presenceData.details = "Google Books";
            presenceData.state = "Searching for " + pageInput.value;
            presenceData.startTimestamp = browsingStamp;
        } else if (searchTab == "fin") {
            pageInput = document.querySelector("#lst-ib");
            presenceData.details = "Google Finance";
            presenceData.state = "Searching for " + pageInput.value;
            presenceData.startTimestamp = browsingStamp;
        } else if (searchTab == "pers") {
            pageInput = document.querySelector("#lst-ib");
            presenceData.details = "Google Personal";
            presenceData.state = "Searching for " + pageInput.value;
            presenceData.startTimestamp = browsingStamp;
        }
    } else if (pagePath.startsWith("/adsense")) {
        var pt = pagePath.replace("/adsense/")
        presenceData.details = "Google Adsense";
        function state(state) {
            presenceData.state = state
        };
        if (pt.startsWith("start/")) {
            state("Homepage")
        } 
        else if (pt.startsWith("start/solutions")) {
            state("Solutions")
        } 
        else if (pt.startsWith("start/solutions/auto-ads/")) {
            state("Solutions - Auto Ads")
        } 
        else if (pt.startsWith("start/solutions/responsive-ads/")) {
            state("Solutions - Responsive Ads")
        } 
        else if (pt.startsWith("start/success-stories/")) {
            state("Success Stories")
        } 
        else if (pt.startsWith("start/resources/")) {
            state("Resources")
        } 
        else if (pt.startsWith("signup/new/lead")) {
            state("Sign-up")
        } 
        else if (pt.inclues("/home") || pt.includes("/new")) {
            state("Viewing income and stats")
        } 
        else if (pt.includes("/myads/sites") || pt.includes("/myads/units")) {
            state("Viewing custom ads & sites")
        } 
        else if (pt.includes("/main/myads-viewall-channels")) {
            state("Viewing custom channels")
        } 
        else if (pt.includes("/main/myads-viewall-url-channels")) {
            state("Viewing URL Channels")
        } 
        else if (pt.includes("/main/admob")) {
            state("Viewing AdMob configuration")
        } 
        else if (pt.includes("/sites/my-sites/new")) {
            state("Adding a site")
        } 
        else if (pt.includes("/sites/my-sites")) {
            state("Viewing sites")
        } 
        else if (pt.includes("/main/viewreports")) {
            state("Viewing reports")
        } 
        else if (pt.includes("/payments")) {
            state("Viewing payments")
        } 
        else if (pt.includes("/main/accountInformation")) {
            state("Account - Information")
        } 
        else if (pt.includes("/main/personal-settings")) {
            state("Account - Settings")
        } 
        else if (pt.includes("/main/messages")) {
            state("Viewing messages")
        } 
        else if (pt.includes("/new/localized-terms")) {
            state("Viewing Terms of Service")
        }


    }
    presence.setActivity(presenceData);
}));

function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDaEIsQ0FBQyxFQUNGLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzdCLElBQUksRUFBRSwyQkFBMkI7SUFDakMsS0FBSyxFQUFFLDBCQUEwQjtDQUNqQyxDQUFDLENBQUM7QUFFSixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxJQUFJLFdBQWdCLENBQUM7QUFFckIsSUFBSSxhQUFrQixDQUFDO0FBRXZCLElBQUksV0FBZ0IsRUFBRSxTQUFjLENBQUM7QUFFckMsSUFBSSxTQUFjLEVBQUUsYUFBYSxDQUFDO0FBRWxDLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNyQyw2RUFBNkUsQ0FDN0UsQ0FBQztBQUVGLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRWxELElBQUksUUFBUSxHQUFRLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFckQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ3BDLElBQUksWUFBWSxHQUFpQjtRQUNoQyxPQUFPLEVBQUUsaUJBQWlCO1FBQzFCLEtBQUssRUFBRSxHQUFHO1FBQ1YsYUFBYSxFQUFFLElBQUk7S0FDbkIsQ0FBQztJQUVGLElBQUksQ0FBQyxhQUFhLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtRQUNwRSxZQUFZLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztR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