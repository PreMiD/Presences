var presence = new Presence({
    clientId: "704385469856612523"
});
let cpuUsage, contributingProject;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    if (document.location.hostname == "client.foldingathome.org") {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksUUFBYSxFQUFFLG1CQUF3QixDQUFDO0FBRTVDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBQ0YsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSwwQkFBMEIsRUFBRTtRQUM1RCxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDL0IsMERBQTBELENBQzNELENBQUM7UUFDRixtQkFBbUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRTdELFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDO1FBQzNFLFlBQVksQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQztLQUNoRTtTQUFNO1FBQ0wsWUFBWSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztLQUMxQztJQUVELElBQUksWUFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7UUFDaEMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN4QjtTQUFNO1FBQ0wsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztBQUNILENBQUMsQ0FBQyxDQUFDIn0=