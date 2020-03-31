var presence = new Presence({
    clientId: "609364070684033044"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var title;
var actionURL = new URL(document.location.href);
var title2URL = new URL(document.location.href);
presence.on("UpdateData", async () => {
    let presenceData = {
        details: "Unknown page",
        largeImageKey: "lg"
    };
    title = document.querySelector("h1#firstHeading");
    var actionResult = actionURL.searchParams.get("action");
    var title2Result = title2URL.searchParams.get("title");
    if (document.location.pathname == "/wiki/Main_Page") {
        presenceData.state = "Main Page | Home";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.details;
    }
    else if (title && document.location.pathname.includes("/wiki/")) {
        presenceData.details = "Reading about:";
        presenceData.state = title.innerText;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (actionResult == "history" &&
        title2Result &&
        document.location.pathname.includes("/w/")) {
        presenceData.details = "Viewing revision history of:";
        if (title2Result.includes("_")) {
            presenceData.state = title2Result.replace(/_/g, " ");
        }
        else {
            presenceData.state = title2Result;
        }
        presenceData.startTimestamp = browsingStamp;
    }
    else if (actionResult == "edit" &&
        title2Result &&
        document.location.pathname.includes("/w/")) {
        presenceData.details = "Editing a page:";
        if (title2Result.includes("_")) {
            presenceData.state = title2Result.replace(/_/g, " ");
        }
        else {
            presenceData.state = title2Result;
        }
        presenceData.startTimestamp = browsingStamp;
    }
    presence.setActivity(presenceData);
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxLQUFVLENBQUM7QUFFZixJQUFJLFNBQVMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hELElBQUksU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFaEQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxZQUFZLEdBQWlCO1FBQy9CLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLGFBQWEsRUFBRSxJQUFJO0tBQ3BCLENBQUM7SUFFRixLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBRWxELElBQUksWUFBWSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hELElBQUksWUFBWSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXZELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksaUJBQWlCLEVBQUU7UUFDbkQsWUFBWSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQztRQUV4QyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUU1QyxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUM7S0FDN0I7U0FBTSxJQUFJLEtBQUssSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDakUsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztRQUV4QyxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFFckMsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FDN0M7U0FBTSxJQUNMLFlBQVksSUFBSSxTQUFTO1FBQ3pCLFlBQVk7UUFDWixRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQzFDO1FBQ0EsWUFBWSxDQUFDLE9BQU8sR0FBRyw4QkFBOEIsQ0FBQztRQUV0RCxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDOUIsWUFBWSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN0RDthQUFNO1lBQ0wsWUFBWSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7U0FDbkM7UUFFRCxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUM3QztTQUFNLElBQ0wsWUFBWSxJQUFJLE1BQU07UUFDdEIsWUFBWTtRQUNaLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFDMUM7UUFDQSxZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO1FBRXpDLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM5QixZQUFZLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3REO2FBQU07WUFDTCxZQUFZLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztTQUNuQztRQUVELFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0tBQzdDO0lBRUQsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUMsQ0FBQztBQU9ILFNBQVMsYUFBYSxDQUFDLFNBQWlCLEVBQUUsYUFBcUI7SUFDN0QsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENBQUMifQ==