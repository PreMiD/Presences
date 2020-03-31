var presence = new Presence({
    clientId: "634299110782140416"
});
presence.on("UpdateData", async () => {
    let data = {
        largeImageKey: "hepboat"
    };
    if (document.location.pathname.startsWith("/guilds/")) {
        var pageTitle = document.querySelector(".panel-heading").textContent;
        if (pageTitle.startsWith(" Guild Weekly Message Throughput")) {
            var pageTitle = "Guild Stats";
        }
        else if (pageTitle.startsWith(" Guild Banner")) {
            var pageTitle = "Guild Info";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksSUFBSSxHQUFpQjtRQUN2QixhQUFhLEVBQUUsU0FBUztLQUN6QixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDckQsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUNyRSxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsa0NBQWtDLENBQUMsRUFBRTtZQUM1RCxJQUFJLFNBQVMsR0FBRyxhQUFhLENBQUM7U0FDL0I7YUFBTSxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDaEQsSUFBSSxTQUFTLEdBQUcsWUFBWSxDQUFDO1NBQzlCO1FBRUQsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDcEMsK0NBQStDLENBQ2hELENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUN6QixJQUFJLFNBQVMsRUFBRTtZQUNiLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFakMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM1QjtTQUFNO1FBQ0wsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFakMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM1QjtBQUNILENBQUMsQ0FBQyxDQUFDIn0=