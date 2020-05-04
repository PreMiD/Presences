var presence = new Presence({
    clientId: "704756386860499089"
});
var time = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    var presenceData = {
        largeImageKey: "championgg"
    };
    var path = document.location.pathname.toLowerCase();
    if (path === "/") {
        presenceData.details = "Initial page";
        presenceData.state = "Viewing champions";
        presenceData.startTimestamp = time;
    }
    else if (path === "/statistics/") {
        presenceData.details = "Statistics";
        presenceData.state = "Viewing win rates";
        presenceData.startTimestamp = time;
    }
    else if (path.startsWith("/matchup")) {
        presenceData.details = "Analysing matchup";
        presenceData.state = "Preparing to fight";
        presenceData.startTimestamp = time;
    }
    else if (path.startsWith("/champion")) {
        const name = path.replace("/champion/", "");
        presenceData.details = "Checking Runes";
        presenceData.state = name;
        presenceData.startTimestamp = time;
    }
    else if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXpDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksWUFBWSxHQUFpQjtRQUMvQixhQUFhLEVBQUUsWUFBWTtLQUM1QixDQUFDO0lBRUYsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEQsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO1FBQ2hCLFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO1FBQ3RDLFlBQVksQ0FBQyxLQUFLLEdBQUcsbUJBQW1CLENBQUM7UUFDekMsWUFBWSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7S0FDcEM7U0FBTSxJQUFJLElBQUksS0FBSyxjQUFjLEVBQUU7UUFDbEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7UUFDcEMsWUFBWSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQztRQUN6QyxZQUFZLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztLQUNwQztTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUN0QyxZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO1FBQzNDLFlBQVksQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUM7UUFDMUMsWUFBWSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7S0FDcEM7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDdkMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztRQUN4QyxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUMxQixZQUFZLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztLQUNwQztTQUFNLElBQUksWUFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7UUFDdkMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN4QjtTQUFNO1FBQ0wsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztBQUNILENBQUMsQ0FBQyxDQUFDIn0=