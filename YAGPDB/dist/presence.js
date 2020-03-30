var presence = new Presence({
    clientId: "633795089600348160"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var replace;
var search;
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "logo_y"
    };
    if (document.location.hostname == "yagpdb.xyz") {
        presenceData.startTimestamp = browsingStamp;
        if (document.URL == "yagpdb.xyz") {
            presenceData.details = "Viewing the homepage";
        }
        else if (document.URL == "yagpdb.xyz/#features") {
            presenceData.details = "Viewing the features";
        }
        else if (document.URL == "yagpdb.xyz/#about") {
            presenceData.details = "Viewing the about section";
        }
        else if (document.querySelector("#main-content > header > h2") !== null) {
            title = document.querySelector("#main-content > header > h2");
            presenceData.details = "Control Panel - Editing:";
            presenceData.smallImageKey = "writing";
            presenceData.state = title.innerText;
            if (title.innerText == "News and updates") {
                presenceData.details = "Reading the news";
                presenceData.smallImageKey = "reading";
                delete presenceData.state;
            }
        }
        else if (document.location.pathname.includes("/manage/")) {
            presenceData.details = "Viewing the Control Panel";
        }
    }
    else if (document.location.hostname == "docs.yagpdb.xyz") {
        title = document.querySelector("head > title");
        search = document.querySelector("#__GITBOOK__ROOT__ > div > div.reset-3c756112--bodyContent-2f98451b > div > div.reset-3c756112--backdrop-1322b68a--sheetBackdrop-457fd54f > div > div.reset-3c756112--sheetHeader-2187bd71--small-2783b5d4 > div.reset-3c756112--sheetHeaderInner-96159b50 > div > div > div.reset-3c756112--inputInnerSizer-756c9114 > input");
        presenceData.startTimestamp = browsingStamp;
        if (search !== null) {
            if (search.value != "") {
                presenceData.details = "Docs searching for:";
                presenceData.state = search.value;
                presenceData.smallImageKey = "searching";
            }
            else {
                presenceData.details = "Docs going to search something up";
                presenceData.smallImageKey = "searching";
            }
        }
        else if (title.innerText == "MEE6 Helpdesk") {
            presenceData.details = "Browsing the helpdesk";
        }
        else {
            presenceData.details = "Docs viewing:";
            presenceData.state = title.innerText.replace(" - YAGPDB", "");
            presenceData.smallImageKey = "reading";
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxJQUFTLENBQUM7QUFDZCxJQUFJLEtBQVUsQ0FBQztBQUNmLElBQUksT0FBWSxDQUFDO0FBQ2pCLElBQUksTUFBVyxDQUFDO0FBRWhCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksWUFBWSxHQUFpQjtRQUNoQyxhQUFhLEVBQUUsUUFBUTtLQUN2QixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxZQUFZLEVBQUU7UUFDL0MsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDNUMsSUFBSSxRQUFRLENBQUMsR0FBRyxJQUFJLFlBQVksRUFBRTtZQUNqQyxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO1NBQzlDO2FBQU0sSUFBSSxRQUFRLENBQUMsR0FBRyxJQUFJLHNCQUFzQixFQUFFO1lBQ2xELFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7U0FDOUM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLElBQUksbUJBQW1CLEVBQUU7WUFDL0MsWUFBWSxDQUFDLE9BQU8sR0FBRywyQkFBMkIsQ0FBQztTQUNuRDthQUFNLElBQUksUUFBUSxDQUFDLGFB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