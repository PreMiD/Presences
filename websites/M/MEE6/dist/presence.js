var presence = new Presence({
    clientId: "632002763483512843"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var title;
var search;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    if (document.location.hostname == "mee6.xyz") {
        presenceData.startTimestamp = browsingStamp;
        if (document.location.pathname.includes("/leaderboard/")) {
            title = document.querySelector("#app-mount > div > div > div > div.leaderboardHeader > div.leaderboardHeaderGuildInfo > div.leaderboardGuildName");
            presenceData.details = "Viewing leaderboard of server:";
            presenceData.state = title.innerText;
        }
        else if (document.querySelector(".pluginTitle") != null) {
            title = document.querySelector(".pluginTitle");
            presenceData.details = "Dashboard - Editing plugin:";
            presenceData.state = title.innerText;
            presenceData.smallImageKey = "writing";
        }
        else if (document.location.pathname.includes("/dashboard/")) {
            title = document.querySelector(".subHeaderMenuListItem.selected");
            presenceData.details = "Dashboard - Viewing tab:";
            presenceData.state = title.innerText;
        }
        else if (document.location.pathname.includes("/premium")) {
            presenceData.details = "Reading about premium";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname == "/") {
            presenceData.details = "Viewing the homepage";
        }
    }
    else if (document.location.hostname == "help.mee6.xyz") {
        title = document.querySelector("head > title");
        search = document.querySelector("body > header > div.csh-wrapper > form > span > input");
        presenceData.startTimestamp = browsingStamp;
        if (search.value != "") {
            presenceData.details = "Helpdesk searching for:";
            presenceData.state = search.value;
            presenceData.smallImageKey = "searching";
        }
        else if (title.innerText == "MEE6 Helpdesk") {
            presenceData.details = "Browsing the helpdesk";
        }
        else {
            presenceData.details = "Helpdesk viewing:";
            presenceData.state = title.innerText.replace(" | MEE6 Helpdesk", "");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksS0FBVSxDQUFDO0FBQ2YsSUFBSSxNQUFXLENBQUM7QUFFaEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxNQUFNO0tBQ3RCLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFVBQVUsRUFBRTtRQUM1QyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUN4RCxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDNUIsa0hBQWtILENBQ25ILENBQUM7WUFDRixZQUFZLENBQUMsT0FBTyxHQUFHLGdDQUFnQyxDQUFDO1lBQ3hELFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztTQUN0QzthQUFNLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDekQsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDL0MsWUFBWSxDQUFDLE9BQU8sR0FBRyw2QkFBNkIsQ0FBQztZQUNyRCxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFDckMsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7U0FDeEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUM3RCxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBQ2xFLFlBQVksQ0FBQyxPQUFPLEdBQUcsMEJBQTBCLENBQUM7WUFDbEQsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1NBQ3RDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDMUQsWUFBWSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQztZQUMvQyxZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztTQUN4QzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1lBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7U0FDL0M7S0FDRjtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksZUFBZSxFQUFFO1FBQ3hELEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM3Qix1REFBdUQsQ0FDeEQsQ0FBQztRQUNGLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQzVDLElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQUU7WUFDdEIsWUFBWSxDQUFDLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQztZQUNqRCxZQUFZLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDbEMsWUFBWSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7U0FDMUM7YUFBTSxJQUFJLEtBQUssQ0FBQyxTQUFTLElBQUksZUFBZSxFQUFFO1lBQzdDLFlBQVksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUM7U0FDaEQ7YUFBTTtZQUNMLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7WUFDM0MsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNyRSxZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztTQUN4QztLQUNGO0lBRUQsSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtRQUNoQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3hCO1NBQU07UUFDTCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==