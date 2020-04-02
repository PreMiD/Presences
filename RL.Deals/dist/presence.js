var presence = new Presence({
    clientId: "636600375067279370"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var replace;
var search;
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "rldeal"
    };
    if (document.URL.includes("#faq")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the FAQ";
    }
    else if (document.URL.includes("#how-to-trade")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing how to trade";
    }
    else if (document.URL.includes("#about-us")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Reading about RL.Deals";
        presenceData.smallImageKey = "reading";
    }
    else if (document.URL.includes("#trading") ||
        document.location.pathname == "/") {
        title = document.querySelector("#root > div > div > div:nth-child(1) > div:nth-child(1) > div > div > h5");
        user = document.querySelector("#root > div > div > div:nth-child(3) > div:nth-child(1) > div > div > h5");
        replace = document.querySelector("#root > div > div > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > ul > li:nth-child(1) > div > div > div > div > span");
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Trading...";
        if (replace !== null) {
            presenceData.state =
                title.innerText
                    .replace("(", "")
                    .replace(")", "")
                    .replace("Items", "item(s)") +
                    " for " +
                    replace.innerText +
                    " " +
                    user.innerText.replace("Items)", "") +
                    " total item(s))";
        }
        else {
            presenceData.state =
                title.innerText
                    .replace("(", "")
                    .replace(")", "")
                    .replace("Items", "item(s)") +
                    " for " +
                    user.innerText.replace("Items)", "") +
                    " total item(s))";
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxJQUFTLENBQUM7QUFDZCxJQUFJLEtBQVUsQ0FBQztBQUNmLElBQUksT0FBWSxDQUFDO0FBQ2pCLElBQUksTUFBVyxDQUFDO0FBRWhCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksWUFBWSxHQUFpQjtRQUMvQixhQUFhLEVBQUUsUUFBUTtLQUN4QixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNqQyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO0tBQzFDO1NBQU0sSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRTtRQUNqRCxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO0tBQy9DO1NBQU0sSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUM3QyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLHdCQUF3QixDQUFDO1FBQ2hELFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO0tBQ3hDO1NBQU0sSUFDTCxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDakMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUNqQztRQUNBLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM1QiwwRUFBMEUsQ0FDM0UsQ0FBQztRQUNGLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUMzQiwwRUFBMEUsQ0FDM0UsQ0FBQztRQUNGLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM5QixrSUFBa0ksQ0FDbkksQ0FBQztRQUNGLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1FBQ3BDLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtZQUNwQixZQUFZLENBQUMsS0FBSztnQkFDaEIsS0FBSyxDQUFDLFNBQVM7cUJBQ1osT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7cUJBQ2hCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO3FCQUNoQixPQUFPLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQztvQkFDOUIsT0FBTztvQkFDUCxPQUFPLENBQUMsU0FBUztvQkFDakIsR0FBRztvQkFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO29CQUNwQyxpQkFBaUIsQ0FBQztTQUNyQjthQUFNO1lBQ0wsWUFBWSxDQUFDLEtBQUs7Z0JBQ2hCLEtBQUssQ0FBQyxTQUFTO3FCQUNaLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO3FCQUNoQixPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztxQkFDaEIsT0FBTyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7b0JBQzlCLE9BQU87b0JBQ1AsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztvQkFDcEMsaUJBQWlCLENBQUM7U0FDckI7S0FDRjtJQUVELElBQUksWUFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7UUFDaEMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN4QjtTQUFNO1FBQ0wsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztBQUNILENBQUMsQ0FBQyxDQUFDO0FBT0gsU0FBUyxhQUFhLENBQUMsU0FBaUIsRUFBRSxhQUFxQjtJQUM3RCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQyJ9