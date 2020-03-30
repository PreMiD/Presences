var presence = new Presence({
    clientId: "620444226324529177"
});
var elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let data = {
        largeImageKey: "sparklin-logo"
    };
    var path = window.location.href;
    if (path.includes("masterofthegrid")) {
        data.details = "Playing Master of the Grid";
        data.startTimestamp = elapsed;
    }
    else if (path.includes("bombparty")) {
        if (path.includes("play")) {
            var channel = document.querySelector(".ChannelName").textContent;
            data.details = "Playing BombParty";
            data.state = channel;
            data.startTimestamp = elapsed;
        }
        else {
            data.details = "BombParty Home";
            data.startTimestamp = elapsed;
        }
    }
    else if (path.includes("deathroulette")) {
        if (path.includes("play")) {
            var channel = document.querySelector(".ChannelName").textContent;
            data.details = "Playing Death Roulette";
            data.state = channel;
            data.startTimestamp = elapsed;
        }
        else {
            data.details = "Death Roulette Home";
            data.startTimestamp = elapsed;
        }
    }
    else if (path.includes("popsauce")) {
        if (path.includes("play")) {
            var channel = document.querySelector(".ChannelName").textContent;
            data.details = "Playing PopSauce";
            data.state = channel;
            data.startTimestamp = elapsed;
        }
        else {
            data.details = "PopSauce Home";
            data.startTimestamp = elapsed;
        }
    }
    else if (path.includes("guesswhat")) {
        var playCheck = document.querySelector(".rooms h1") ? false : true;
        if (playCheck) {
            var chan = document.querySelector(".room-name").textContent;
            var channel = chan.charAt(0).toUpperCase() + chan.slice(1);
            data.details = "Playing Guess What";
            data.state = channel;
            data.startTimestamp = elapsed;
        }
        else {
            data.details = "Guess What Home";
            delete data.state;
            data.startTimestamp = elapsed;
        }
    }
    else if (path.includes("frenzy")) {
        data.details = "Playing Daily Frenzy";
        data.startTimestamp = elapsed;
    }
    else {
        data.details = "Somewhere on-site";
        data.startTimestamp = elapsed;
    }
    presence.setActivity(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRTVDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksSUFBSSxHQUFpQjtRQUN4QixhQUFhLEVBQUUsZUFBZTtLQUM5QixDQUFDO0lBRUYsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFFaEMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7UUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQztRQUM1QyxJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztLQUM5QjtTQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUN0QyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDMUIsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxXQUFXLENBQUM7WUFDakUsSUFBSSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztZQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztZQUNyQixJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztTQUM5QjthQUFNO1lBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztZQUNoQyxJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztTQUM5QjtLQUNEO1NBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1FBQzFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMxQixJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztZQUNqRSxJQUFJLENBQUMsT0FBTyxHQUFHLHdCQUF3QixDQUFDO1lBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO1NBQzlCO2FBQU07WUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDO1lBQ3JDLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO1NBQzlCO0tBQ0Q7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDckMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzFCLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7WUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7WUFDckIsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7U0FDOUI7YUFBTTtZQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO1lBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO1NBQzlCO0tBQ0Q7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDdEMsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDbkUsSUFBSSxTQUFTLEVBQUU7WUFDZCxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLFdBQVcsQ0FBQztZQUM1RCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztZQUNwQyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztZQUNyQixJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztTQUM5QjthQUFNO1lBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztZQUNqQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDbEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7U0FDOUI7S0FDRDtTQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO1FBQ3RDLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO0tBQzlCO1NBQU07UUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO1FBQ25DLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO0tBQzlCO0lBQ0QsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM1QixDQUFDLENBQUMsQ0FBQyJ9