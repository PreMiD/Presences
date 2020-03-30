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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksSUFBSSxHQUFpQjtRQUN4QixhQUFhLEVBQUUsU0FBUztLQUN4QixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDdEQsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUNyRSxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsa0NBQWtDLENBQUMsRUFBRTtZQUM3RCxJQUFJLFNBQVMsR0FBRyxhQUFhLENBQUM7U0FDOUI7YUFBTSxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDakQsSUFBSSxTQUFTLEdBQUcsWUFBWSxDQUFDO1NBQzdCO1FBRUQsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDckMsK0NBQStDLENBQy9DLENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUN6QixJQUFJLFNBQVMsRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1NBQzNEO1FBQ0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFakMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMzQjtTQUFNO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFakMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMzQjtBQUNGLENBQUMsQ0FBQyxDQUFDIn0=