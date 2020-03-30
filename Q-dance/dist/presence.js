var presence = new Presence({
    clientId: "619768959717343242"
}), strings = presence.getStrings({
    live: "presence.activity.live"
});
var elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let data = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsd0JBQXdCO0NBQzlCLENBQUMsQ0FBQztBQUVKLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRTVDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksSUFBSSxHQUFpQjtRQUN4QixhQUFhLEVBQUUsYUFBYTtLQUM1QixDQUFDO0lBRUYsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDdEMsc0NBQXNDLENBQ3RDO1FBQ0EsQ0FBQyxDQUFDLEtBQUs7UUFDUCxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ1IsSUFBSSxVQUFVLEVBQUU7UUFDZixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdDQUFnQyxDQUFDO2FBQ2pFLFdBQVcsQ0FBQztRQUNkLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUNBQWlDLENBQUM7YUFDcEUsV0FBVyxDQUFDO1FBQ2QsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1lBQ3JCLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7WUFDN0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QyxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDckIsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7UUFDOUIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMzQjtTQUFNO1FBQ04sT0FBTyxHQUFHLElBQUksQ0FBQztRQUNmLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUN6QjtBQUNGLENBQUMsQ0FBQyxDQUFDIn0=