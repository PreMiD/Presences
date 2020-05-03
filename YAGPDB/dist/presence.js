var presence = new Presence({
    clientId: "633795089600348160"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var title;
var search;
presence.on("UpdateData", async () => {
    const presenceData = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksS0FBVSxDQUFDO0FBQ2YsSUFBSSxNQUFXLENBQUM7QUFFaEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxRQUFRO0tBQ3hCLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFlBQVksRUFBRTtRQUM5QyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1QyxJQUFJLFFBQVEsQ0FBQyxHQUFHLElBQUksWUFBWSxFQUFFO1lBQ2hDLFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7U0FDL0M7YUFBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLElBQUksc0JBQXNCLEVBQUU7WUFDakQsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztTQUMvQzthQUFNLElBQUksUUFBUSxDQUFDLEdBQUcsSUFBSSxtQkFBbUIsRUFBRTtZQUM5QyxZQUFZLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFDO1NBQ3BEO2FBQU0sSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLDZCQUE2QixDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3pFLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFDOUQsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztZQUNsRCxZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztZQUN2QyxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFDckMsSUFBSSxLQUFLLENBQUMsU0FBUyxJQUFJLGtCQUFrQixFQUFFO2dCQUN6QyxZQUFZLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO2dCQUMxQyxZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztnQkFDdkMsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDO2FBQzNCO1NBQ0Y7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUMxRCxZQUFZLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFDO1NBQ3BEO0tBQ0Y7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGlCQUFpQixFQUFFO1FBQzFELEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM3QiwrVEFBK1QsQ0FDaFUsQ0FBQztRQUNGLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQzVDLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtZQUNuQixJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRSxFQUFFO2dCQUN0QixZQUFZLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDO2dCQUM3QyxZQUFZLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ2xDLFlBQVksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDO2FBQzFDO2lCQUFNO2dCQUNMLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUNBQW1DLENBQUM7Z0JBQzNELFlBQVksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDO2FBQzFDO1NBQ0Y7YUFBTSxJQUFJLEtBQUssQ0FBQyxTQUFTLElBQUksZUFBZSxFQUFFO1lBQzdDLFlBQVksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUM7U0FDaEQ7YUFBTTtZQUNMLFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO1lBQ3ZDLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzlELFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1NBQ3hDO0tBQ0Y7SUFFRCxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ2hDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDeEI7U0FBTTtRQUNMLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9