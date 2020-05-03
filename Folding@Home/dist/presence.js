var presence = new Presence({
    clientId: "704385469856612523"
});
let cpuUsage, contributingProject;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    if (document.location.hostname == "127.0.0.1") {
        cpuUsage = document.querySelector("div.ui-progressbar-value.ui-widget-header.ui-corner-left");
        contributingProject = document.querySelector("a.sbSelector");
        presenceData.details = "Contributing to: " + contributingProject.innerText;
        presenceData.state = "Project Progress: " + cpuUsage.innerText;
    }
    else {
        presenceData.details = "Can't read page";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksUUFBYSxFQUFFLG1CQUF3QixDQUFDO0FBRTVDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBQ0EsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxXQUFXLEVBQUU7UUFDL0MsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQy9CLDBEQUEwRCxDQUMzRCxDQUFDO1FBQ0YsbUJBQW1CLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUU3RCxZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQztRQUMzRSxZQUFZLENBQUMsS0FBSyxHQUFHLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7S0FDaEU7U0FBTTtRQUNMLFlBQVksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7S0FDMUM7SUFFRCxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ2hDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDeEI7U0FBTTtRQUNMLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9