var presence = new Presence({
    clientId: "629428243061145640"
});
var item, user, search, title;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let presenceData = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBUyxFQUFFLElBQVMsRUFBRSxNQUFXLEVBQUUsS0FBVSxDQUFDO0FBRWxELElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksWUFBWSxHQUFpQjtRQUMvQixhQUFhLEVBQUUsV0FBVztLQUMzQixDQUFDO0lBQ0YsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7SUFDNUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxvQkFBb0IsRUFBRTtRQUN0RCxZQUFZLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDO1FBQzdDLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQztRQUUxQixPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzFELE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM3QixvRkFBb0YsQ0FDckYsQ0FBQztRQUNGLFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7UUFDeEMsWUFBWSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBRWxDLFlBQVksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1FBRXRDLFFBQVEsQ0FB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