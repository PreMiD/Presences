var presence = new Presence({
    clientId: "634299110782140416"
});
var pageTitle;
presence.on("UpdateData", async () => {
    let data = {
        largeImageKey: "hepboat"
    };
    if (document.location.pathname.startsWith("/guilds/")) {
        pageTitle = document.querySelector(".panel-heading").textContent;
        if (pageTitle.startsWith(" Guild Weekly Message Throughput")) {
            pageTitle = "Guild Stats";
        }
        else if (pageTitle.startsWith(" Guild Banner")) {
            pageTitle = "Guild Info";
        }
        var guildName = document.querySelector("#side-menu > li.active-guild.active > a > div");
        data.details = pageTitle;
        if (guildName) {
            data.state = guildName.getAttribute("data-original-title");
        }
        data.startTimestamp = Date.now();
        presence.setActivity(data);
    }
    else {
        data.details = "Dashboard";
        data.startTimestamp = Date.now();
        presence.setActivity(data);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksU0FBUyxDQUFDO0FBRWQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxJQUFJLEdBQWlCO1FBQ3ZCLGFBQWEsRUFBRSxTQUFTO0tBQ3pCLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNyRCxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUNqRSxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsa0NBQWtDLENBQUMsRUFBRTtZQUM1RCxTQUFTLEdBQUcsYUFBYSxDQUFDO1NBQzNCO2FBQU0sSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQ2hELFNBQVMsR0FBRyxZQUFZLENBQUM7U0FDMUI7UUFFRCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNwQywrQ0FBK0MsQ0FDaEQsQ0FBQztRQUVGLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ3pCLElBQUksU0FBUyxFQUFFO1lBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLHFCQUFxQixDQUFDLENBQUM7U0FDNUQ7UUFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVqQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzVCO1NBQU07UUFDTCxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVqQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzVCO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==