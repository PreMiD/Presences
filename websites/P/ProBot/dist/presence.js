const presence = new Presence({
    clientId: "655050505726197781"
});
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "probot"
    };
    if (document.location.hostname == "probot.io") {
        presenceData.startTimestamp = browsingStamp;
        if (document.location.pathname.includes("/server/")) {
            presenceData.details = "Managing the settings of";
            const title = document.querySelector("#root > div > div > div.sidebar_root > div.sidebar_main > div > div.dramex2 > div > ul > li:nth-child(1) > div > div > a");
            presenceData.state = "server: " + title.innerHTML;
        }
        else if (document.location.pathname.includes("/commands")) {
            presenceData.details = "Viewing a page:";
            presenceData.state = "Commands";
        }
        else if (document.location.pathname.includes("/premium")) {
            presenceData.details = "Viewing Premium";
        }
        else if (document.location.pathname.includes("/bg")) {
            presenceData.details = "Managing the";
            presenceData.state = "profile backgrounds";
        }
        else if (document.location.pathname.includes("/id")) {
            presenceData.details = "Managing the";
            presenceData.state = "ID backgrounds";
        }
        else if (document.location.pathname.includes("/badges")) {
            presenceData.details = "Managing the";
            presenceData.state = "profile badges";
        }
        else if (document.location.pathname.includes("/xp")) {
            presenceData.details = "Viewing a page:";
            presenceData.state = "Top 100 by XP";
        }
        else if (document.location.pathname.includes("/credits")) {
            presenceData.details = "Viewing a page:";
            presenceData.state = "Richest 100 Billionaires";
        }
        else if (document.location.pathname.includes("/transactions")) {
            presenceData.details = "Viewing a page:";
            presenceData.state = "Credits Transactions";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXBELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFFBQVE7S0FDeEIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksV0FBVyxFQUFFO1FBQzdDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQzVDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ25ELFlBQVksQ0FBQyxPQUFPLEdBQUcsMEJBQTBCLENBQUM7WUFDbEQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDbEMsMEhBQTBILENBQzNILENBQUM7WUFDRixZQUFZLENBQUMsS0FBSyxHQUFHLFVBQVUsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1NBQ25EO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDM0QsWUFBWSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztZQUN6QyxZQUFZLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztTQUNqQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzFELFlBQVksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7U0FDMUM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNyRCxZQUFZLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztZQUN0QyxZQUFZLENBQUMsS0FBSyxHQUFHLHFCQUFxQixDQUFDO1NBQzVDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDckQsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7WUFDdEMsWUFBWSxDQUFDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQztTQUN2QzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3pELFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO1lBQ3RDLFlBQVksQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUM7U0FDdkM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNyRCxZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO1lBQ3pDLFlBQVksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDO1NBQ3RDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDMUQsWUFBWSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztZQUN6QyxZQUFZLENBQUMsS0FBSyxHQUFHLDBCQUEwQixDQUFDO1NBQ2pEO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDL0QsWUFBWSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztZQUN6QyxZQUFZLENBQUMsS0FBSyxHQUFHLHNCQUFzQixDQUFDO1NBQzdDO0tBQ0Y7SUFFRCxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ2hDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDeEI7U0FBTTtRQUNMLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9