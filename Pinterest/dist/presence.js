var presence = new Presence({
    clientId: "629428243061145640"
});
var user, search, title;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "pinterest"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.hostname == "help.pinterest.com") {
        presenceData.details = "Viewing Help Center";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/search/")) {
        search = document.querySelector("#HeaderContent > div > div > div > div > div > div > div > div > div > div > input");
        presenceData.details = "Searching for:";
        presenceData.state = search.value;
        presenceData.smallImageKey = "search";
        presence.setActivity(presenceData);
    }
    else if (document.querySelector("#__PWS_ROOT__ > div.App.AppBase > div.appContent > div > div > div > div:nth-child(2) > div > div > div > div > div > div > div > div > div > h5") != null ||
        document.querySelector("body > div > div.App.AppBase > div.appContent > div > div > div > div:nth-child(2) > div > div > div > div > div > div > div > div > div > h5") != null) {
        user = document.querySelector("#__PWS_ROOT__ > div.App.AppBase > div.appContent > div > div > div > div:nth-child(2) > div > div > div > div > div > div > div > div > div > h5");
        if (user == null) {
            user = document.querySelector("body > div > div.App.AppBase > div.appContent > div > div > div > div:nth-child(2) > div > div > div > div > div > div > div > div > div > h5");
        }
        presenceData.details = "Viewing user:";
        presenceData.state = user.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.querySelector("#__PWS_ROOT__ > div.App.AppBase > div.appContent > div > div > div > div > div.BrioProfileHeaderWrapper > div:nth-child(1) > div > div > div > div > div > div > div > div:nth-child(1) > h4") != null ||
        document.querySelector("body > div > div.App.AppBase > div.appContent > div > div > div > div > div.BrioProfileHeaderWrapper > div:nth-child(1) > div > div > div > div > div > div > div > div:nth-child(1) > h4")) {
        user = document.querySelector("#__PWS_ROOT__ > div.App.AppBase > div.appContent > div > div > div > div > div.BrioProfileHeaderWrapper > div:nth-child(1) > div > div > div > div > div > div > div > div:nth-child(1) > h4");
        if (user == null) {
            user = document.querySelector("body > div > div.App.AppBase > div.appContent > div > div > div > div > div.BrioProfileHeaderWrapper > div:nth-child(1) > div > div > div > div > div > div > div > div:nth-child(1) > h4");
        }
        presenceData.details = "Viewing user:";
        presenceData.state = user.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.querySelector("body > div > div.App.AppBase > div.appContent > div > div > div > div > div > div > div > div > div > div.boardHeaderWrapper > div > div > div > div:nth-child(1) > h4") != null ||
        document.querySelector("#__PWS_ROOT__ > div.App.AppBase > div.appContent > div > div > div > div > div > div > div > div > div > div.boardHeaderWrapper > div > div > div > div:nth-child(1) > h4") != null) {
        title = document.querySelector("body > div > div.App.AppBase > div.appContent > div > div > div > div > div > div > div > div > div > div.boardHeaderWrapper > div > div > div > div:nth-child(1) > h4");
        if (title == null) {
            title = document.querySelector("#__PWS_ROOT__ > div.App.AppBase > div.appContent > div > div > div > div > div > div > div > div > div > div.boardHeaderWrapper > div > div > div > div:nth-child(1) > h4");
        }
        presenceData.details = "Viewing board:";
        presenceData.state = title.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/following")) {
        presenceData.details = "Viewing their following";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/pin/")) {
        presenceData.details = "Viewing a pin";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/edit")) {
        presenceData.details = "Editting their homepage";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/settings")) {
        presenceData.details = "Viewing their settings";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.querySelector("#__PWS_ROOT__ > div.App.AppBase") != null &&
        document.querySelector("#__PWS_ROOT__ > div.App.AppBase").className ==
            "App AppBase") {
        presenceData.details = "Viewing the home page";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else {
        title = document.querySelector("head > title");
        presenceData.details = "Viewing:";
        presenceData.state = title.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBUyxFQUFFLE1BQVcsRUFBRSxLQUFVLENBQUM7QUFFdkMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxXQUFXO0tBQzNCLENBQUM7SUFDRixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztJQUM1QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLG9CQUFvQixFQUFFO1FBQ3RELFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7UUFDN0MsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBRTFCLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztRQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDMUQsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzdCLG9GQUFvRixDQUNyRixDQUFDO1FBQ0YsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztRQUN4QyxZQUFZLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFFbEMsWUFBWSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7UUFFdEMsUUFBUSxDQUFDLFdBQVcsQ0FB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