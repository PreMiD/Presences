var presence = new Presence({
    clientId: "620839311629221889"
});
var elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let data = {
        largeImageKey: "gartic-logo"
    };
    var path = document.location.pathname;
    var gameLink = document.location.pathname.split("/")[1].match(/^\d/)
        ? true
        : false;
    if (path == "/") {
        data.details = "Viewing the Homepage";
        data.startTimestamp = elapsed;
    }
    else if (path == "/rooms") {
        data.details = "Viewing Rooms";
        data.startTimestamp = elapsed;
    }
    else if (gameLink || path == "/room") {
        var inSetup = document.querySelector(".infosUsers") ? true : false;
        if (inSetup) {
            var players = document.querySelector(".infosRoom li:last-child span strong").textContent;
            data.details = "Setting up Info to Join";
            data.state = "Players: " + players;
            data.startTimestamp = elapsed;
        }
        else {
            var user = document.querySelector(".you .nick").textContent;
            var points = document.querySelector(".you .points").textContent;
            var lobby = document.querySelector("title").innerText;
            data.details = user + " - " + points.split("pts")[0].trim() + " points";
            data.state = "Lobby: " + lobby.split("-")[0];
            data.startTimestamp = elapsed;
        }
    }
    else {
        data.details = "Somewhere on-site";
        data.startTimestamp = elapsed;
    }
    presence.setActivity(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRTVDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksSUFBSSxHQUFpQjtRQUN4QixhQUFhLEVBQUUsYUFBYTtLQUM1QixDQUFDO0lBRUYsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDdEMsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDbkUsQ0FBQyxDQUFDLElBQUk7UUFDTixDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ1QsSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFO1FBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7UUFDdEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7S0FDOUI7U0FBTSxJQUFJLElBQUksSUFBSSxRQUFRLEVBQUU7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7UUFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7S0FDOUI7U0FBTSxJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksT0FBTyxFQUFFO1FBQ3ZDLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ25FLElBQUksT0FBTyxFQUFFO1lBQ1osSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDbkMsc0NBQXNDLENBQ3RDLENBQUMsV0FBVyxDQUFDO1lBQ2QsSUFBSSxDQUFDLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQztZQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsR0FBRyxPQUFPLENBQUM7WUFDbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7U0FDOUI7YUFBTTtZQUNOLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQzVELElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQ2hFLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ3RELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLFNBQVMsQ0FBQztZQUN4RSxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO1NBQzlCO0tBQ0Q7U0FBTTtRQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7UUFDbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7S0FDOUI7SUFDRCxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzVCLENBQUMsQ0FBQyxDQUFDIn0=