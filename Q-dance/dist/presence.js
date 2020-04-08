var presence = new Presence({
    clientId: "619768959717343242"
}), strings = presence.getStrings({
    live: "presence.activity.live"
});
var elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const data = {
        largeImageKey: "qdance-logo"
    };
    var radioCheck = document.querySelector("svg.audioplayer-controls__icon--play")
        ? false
        : true;
    if (radioCheck) {
        var song = document.querySelector(".audioplayer-nowplaying__track")
            .textContent;
        var artist = document.querySelector(".audioplayer-nowplaying__artist")
            .textContent;
        (data.details = song),
            (data.state = artist),
            (data.smallImageKey = "live"),
            (data.smallImageText = (await strings).live);
        if (elapsed === null) {
            elapsed = Math.floor(Date.now() / 1000);
        }
        data.startTimestamp = elapsed;
        presence.setActivity(data);
    }
    else {
        elapsed = null;
        presence.clearActivity();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsd0JBQXdCO0NBQy9CLENBQUMsQ0FBQztBQUVMLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRTVDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sSUFBSSxHQUFpQjtRQUN6QixhQUFhLEVBQUUsYUFBYTtLQUM3QixDQUFDO0lBRUYsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDckMsc0NBQXNDLENBQ3ZDO1FBQ0MsQ0FBQyxDQUFDLEtBQUs7UUFDUCxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ1QsSUFBSSxVQUFVLEVBQUU7UUFDZCxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdDQUFnQyxDQUFDO2FBQ2hFLFdBQVcsQ0FBQztRQUNmLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUNBQWlDLENBQUM7YUFDbkUsV0FBVyxDQUFDO1FBQ2YsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNuQixDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1lBQ3JCLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7WUFDN0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDcEIsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7UUFDOUIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM1QjtTQUFNO1FBQ0wsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNmLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUMxQjtBQUNILENBQUMsQ0FBQyxDQUFDIn0=