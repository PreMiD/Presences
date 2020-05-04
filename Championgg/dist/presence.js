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
        presence.setActivity(presenceData);
    }
    else if (path === "/statistics/") {
        presenceData.details = "Statistics";
        presenceData.state = "Viewing win rates";
        presenceData.startTimestamp = time;
        presence.setActivity(presenceData);
    }
    else if (path.startsWith("/matchup")) {
        presenceData.details = "Analysing matchup";
        presenceData.state = "Preparing to fight";
        presenceData.startTimestamp = time;
        presence.setActivity(presenceData);
    }
    else if (path.startsWith("/champion")) {
        const name = path.replace("/champion/", "");
        presenceData.details = "Checking Runes";
        presenceData.state = name;
        presenceData.startTimestamp = time;
        presence.setActivity(presenceData);
    }
    else if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXpDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksWUFBWSxHQUFpQjtRQUM3QixhQUFhLEVBQUUsWUFBWTtLQUM5QixDQUFDO0lBQ0EsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdEQsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO1FBQ2QsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFDdEMsWUFBWSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQztRQUN6QyxZQUFZLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUNuQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBR3RDO1NBQ0ksSUFBSSxJQUFJLEtBQUssY0FBYyxFQUFFO1FBQzlCLFlBQVksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1FBQ3BDLFlBQVksQ0FBQyxLQUFLLEdBQUcsbUJBQW1CLENBQUM7UUFDekMsWUFBWSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDbkMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUV0QztTQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNsQyxZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO1FBQzNDLFlBQVksQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUM7UUFDMUMsWUFBWSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDbkMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUV0QztTQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBQztRQUNwQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDO1FBQ3hDLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQzFCLFlBQVksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ25DLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FFcEM7U0FDSSxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ25DLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDeEI7U0FBTTtRQUNMLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9
