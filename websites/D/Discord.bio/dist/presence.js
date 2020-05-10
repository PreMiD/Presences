const presence = new Presence({
    clientId: "642728621596999690"
});
let browsingStamp = Math.floor(Date.now() / 1000), lastPlaybackState, playback;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    if (lastPlaybackState != playback) {
        lastPlaybackState = playback;
        browsingStamp = Math.floor(Date.now() / 1000);
    }
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname == "/") {
        presenceData.details = "Browsing in mainpage...";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/profiles") {
        presenceData.details = "Browsing through";
        presenceData.state = "top upvoted profiles...";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/plans") {
        presenceData.details = "Browsing through";
        presenceData.state = "Premium plans";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/customise") {
        presenceData.details = "Edit profile";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/p/")) {
        const nameofprofile = document.location.pathname.split("/");
        presenceData.details = "Viewing profile";
        presenceData.state = "dsc.bio/" + nameofprofile[2];
        presence.setActivity(presenceData);
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUMvQyxpQkFBaUIsRUFDakIsUUFBUSxDQUFDO0FBRVgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxNQUFNO0tBQ3RCLENBQUM7SUFFRixJQUFJLGlCQUFpQixJQUFJLFFBQVEsRUFBRTtRQUNqQyxpQkFBaUIsR0FBRyxRQUFRLENBQUM7UUFDN0IsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQy9DO0lBRUQsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7SUFFNUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDckMsWUFBWSxDQUFDLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQztRQUNqRCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxXQUFXLEVBQUU7UUFDcEQsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUMxQyxZQUFZLENBQUMsS0FBSyxHQUFHLHlCQUF5QixDQUFDO1FBQy9DLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFFBQVEsRUFBRTtRQUNqRCxZQUFZLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBQzFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDO1FBQ3JDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFlBQVksRUFBRTtRQUNyRCxZQUFZLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztRQUN0QyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDckQsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVELFlBQVksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7UUFDekMsWUFBWSxDQUFDLEtBQUssR0FBRyxVQUFVLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25ELFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7SUFDRCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQyxDQUFDIn0=