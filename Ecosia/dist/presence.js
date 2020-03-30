var browsingStamp = Math.floor(Date.now() / 1000);
var presence = new Presence({
    clientId: "629653820405710848"
});
presence.on("UpdateData", () => {
    var urlParams = new URLSearchParams(window.location.search);
    var presenceData = {
        largeImageKey: "lg"
    };
    if (document.location.pathname == "/") {
        presenceData.details = "Home";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.startsWith("/search") &&
        urlParams.has("q")) {
        presenceData.details = "Searching for " + urlParams.get("q");
        presenceData.state = document.getElementsByClassName("result-count")[0].textContent;
        presenceData.startTimestamp = browsingStamp;
        presenceData.smallImageKey = "search";
    }
    else if (document.location.pathname.startsWith("/images") &&
        urlParams.has("q")) {
        presenceData.details = "Ecosia Images";
        presenceData.state = "Searching for " + urlParams.get("q");
        presenceData.startTimestamp = browsingStamp;
        presenceData.smallImageKey = "search";
    }
    else if (document.location.pathname.startsWith("/news") &&
        urlParams.has("q")) {
        presenceData.details = "Ecosia News";
        presenceData.state = "Searching for " + urlParams.get("q");
        presenceData.startTimestamp = browsingStamp;
        presenceData.smallImageKey = "search";
    }
    else if (document.location.pathname.startsWith("/videos") &&
        urlParams.has("q")) {
        presenceData.details = "Ecosia Videos";
        presenceData.state = "Searching for " + urlParams.get("q");
        presenceData.startTimestamp = browsingStamp;
        presenceData.smallImageKey = "search";
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUNsRCxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUNILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM5QixJQUFJLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVELElBQUksWUFBWSxHQUFpQjtRQUNoQyxhQUFhLEVBQUUsSUFBSTtLQUNuQixDQUFDO0lBQ0YsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDdEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDOUIsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FDNUM7U0FBTSxJQUNOLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7UUFDaEQsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDakI7UUFDRCxZQUFZLENBQUMsT0FBTyxHQUFHLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0QsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQ25ELGNBQWMsQ0FDZCxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUNqQixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1QyxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztLQUN0QztTQUFNLElBQ04sUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztRQUNoRCxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUNqQjtRQUNELFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzRCxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1QyxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztLQUN0QztTQUFNLElBQ04sUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztRQUM5QyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUNqQjtRQUNELFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO1FBQ3JDLFlBQVksQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzRCxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1QyxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztLQUN0QztTQUFNLElBQ04sUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztRQUNoRCxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUNqQjtRQUNELFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzRCxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1QyxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztLQUN0QztJQUNELFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDcEMsQ0FBQyxDQUFDLENBQUMifQ==