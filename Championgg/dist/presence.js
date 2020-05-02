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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXpDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksWUFBWSxHQUFpQjtRQUM3QixhQUFhLEVBQUUsWUFBWTtLQUM5QixDQUFDO0lBRUEsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdEQsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO1FBQ2QsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFDdEMsWUFBWSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQztRQUN6QyxZQUFZLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztLQUV0QztTQUNJLElBQUksSUFBSSxLQUFLLGNBQWMsRUFBRTtRQUM5QixZQUFZLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztRQUNwQyxZQUFZLENBQUMsS0FBSyxHQUFHLG1CQUFtQixDQUFDO1FBQ3pDLFlBQVksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0tBRXRDO1NBQ0ksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ2xDLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7UUFDM0MsWUFBWSxDQUFDLEtBQUssR0FBRyxvQkFBb0IsQ0FBQztRQUMxQyxZQUFZLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztLQUV0QztTQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBQztRQUNwQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDO1FBQ3hDLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQzFCLFlBQVksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0tBRXBDO1NBQ0ksSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtRQUNuQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3hCO1NBQU07UUFDTCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==
