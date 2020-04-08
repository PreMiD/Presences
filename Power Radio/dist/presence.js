var presence = new Presence({
    clientId: "640617785696976906"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "ppower"
    };
    if (document.querySelector("#pauseButtoni").className == "fa fa-pause") {
        user = document.querySelector("#infocontainer > div:nth-child(2) > p");
        title = document.querySelector("#infocontainer > div:nth-child(3) > p");
        presenceData.details = user.textContent;
        presenceData.state = title.textContent;
        presenceData.smallImageKey = "play";
        presenceData.smallImageText = "playing";
    }
    if (presenceData.details == null) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing...";
        presence.setActivity(presenceData);
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxLQUFVLENBQUM7QUFFZixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFFBQVE7S0FDeEIsQ0FBQztJQUNGLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxTQUFTLElBQUksYUFBYSxFQUFFO1FBQ3RFLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHVDQUF1QyxDQUFDLENBQUM7UUFDdkUsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsdUNBQXVDLENBQUMsQ0FBQztRQUN4RSxZQUFZLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDeEMsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1FBQ3BDLFlBQVksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO0tBQ3pDO0lBRUQsSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtRQUNoQyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQztRQUNyQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO1NBQU07UUFDTCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==