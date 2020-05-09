const presence = new Presence({
    clientId: "691575527190036480"
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    function searchQuery() {
        return document.getElementById("sb_form_q");
    }
    function queryResults() {
        return document.getElementsByClassName("sb_count")[0];
    }
    function setTimestamp() {
        return Math.floor(Date.now() / 1000);
    }
    async function handleFormatting(settingName) {
        const setting = await presence.getSetting(settingName);
        return setting.replace("%search%", searchQuery().value);
    }
    if (document.URL === "https://www.bing.com/" ||
        document.URL === "https://www.bing.com" ||
        document.location.href.includes("/?cc=") ||
        document.location.href.includes("/?FORM=Z9FD1")) {
        presenceData.details = await presence.getSetting("homepageMessage");
        presenceData.startTimestamp = setTimestamp();
    }
    else if (document.location.href.includes("/account/general")) {
        presenceData.details = await presence.getSetting("settingsMessage");
        presenceData.startTimestamp = setTimestamp();
    }
    else if (document.location.href.includes("?q=")) {
        presenceData.startTimestamp = setTimestamp();
        presenceData.smallImageKey = "search";
        if (document.location.href.includes("/images/")) {
            presenceData.details = await handleFormatting("imageSearch");
        }
        else if (document.location.href.includes("/videos/")) {
            presenceData.details = await handleFormatting("videoSearch");
        }
        else if (document.location.href.includes("/news/")) {
            presenceData.details = await handleFormatting("newsSearch");
        }
        else {
            presenceData.details = await handleFormatting("standardSearch");
            presenceData.state = queryResults().innerText;
        }
    }
    if (presenceData.details === null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBS0YsU0FBUyxXQUFXO1FBQ2xCLE9BQU8sUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQXFCLENBQUM7SUFDbEUsQ0FBQztJQUtELFNBQVMsWUFBWTtRQUNuQixPQUFPLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQWdCLENBQUM7SUFDdkUsQ0FBQztJQUtELFNBQVMsWUFBWTtRQUNuQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFNRCxLQUFLLFVBQVUsZ0JBQWdCLENBQUMsV0FBbUI7UUFDakQsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELElBQ0UsUUFBUSxDQUFDLEdBQUcsS0FBSyx1QkFBdUI7UUFDeEMsUUFBUSxDQUFDLEdBQUcsS0FBSyxzQkFBc0I7UUFDdkMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUN4QyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQy9DO1FBQ0EsWUFBWSxDQUFDLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNwRSxZQUFZLENBQUMsY0FBYyxHQUFHLFlBQVksRUFBRSxDQUFDO0tBQzlDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFBRTtRQUM5RCxZQUFZLENBQUMsT0FBTyxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3BFLFlBQVksQ0FBQyxjQUFjLEdBQUcsWUFBWSxFQUFFLENBQUM7S0FDOUM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNqRCxZQUFZLENBQUMsY0FBYyxHQUFHLFlBQVksRUFBRSxDQUFDO1FBQzdDLFlBQVksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1FBRXRDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQy9DLFlBQVksQ0FBQyxPQUFPLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUM5RDthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3RELFlBQVksQ0FBQyxPQUFPLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUM5RDthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3BELFlBQVksQ0FBQyxPQUFPLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUM3RDthQUFNO1lBQ0wsWUFBWSxDQUFDLE9BQU8sR0FBRyxNQUFNLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDaEUsWUFBWSxDQUFDLEtBQUssR0FBRyxZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUM7U0FDL0M7S0FDRjtJQUVELElBQUksWUFBWSxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7UUFDakMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN4QjtTQUFNO1FBQ0wsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztBQUNILENBQUMsQ0FBQyxDQUFDIn0=