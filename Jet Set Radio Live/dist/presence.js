var presence = new Presence({
    clientId: "613786642800705569"
});
let timeElapsed = Math.floor(Date.now() / 1000), strings = presence.getStrings({
    pause: "presence.playback.paused",
    live: "presence.playback.live"
}), songName, presenceState;
presence.on("UpdateData", async () => {
    songName = document.querySelector("html > body > div#information.objectSettings.touchableOff > font#programInformationText.objectSettings.touchableOff");
    presenceState = document.querySelector("html > body > font#dateTextField.objectSettings.touchableOff");
    if (songName.innerText.length < 1) {
        let presenceData = {
            details: "Not tuned in.",
            largeImageKey: "jsrl",
            smallImageKey: "pause"
        };
        presence.setActivity(presenceData);
    }
    else {
        let presenceData = {
            details: songName.firstChild.textContent,
            state: presenceState.innerText,
            largeImageKey: "jsrl",
            smallImageKey: "live",
            startTimestamp: timeElapsed
        };
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUM5QyxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLElBQUksRUFBRSx3QkFBd0I7Q0FDOUIsQ0FBQyxFQUNGLFFBQVEsRUFDUixhQUFhLENBQUM7QUFFZixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDaEMscUhBQXFILENBQ3JILENBQUM7SUFDRixhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDckMsOERBQThELENBQzlELENBQUM7SUFDRixJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNsQyxJQUFJLFlBQVksR0FBaUI7WUFDaEMsT0FBTyxFQUFFLGVBQWU7WUFDeEIsYUFBYSxFQUFFLE1BQU07WUFDckIsYUFBYSxFQUFFLE9BQU87U0FDdEIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDbkM7U0FBTTtRQUNOLElBQUksWUFBWSxHQUFpQjtZQUNoQyxPQUFPLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXO1lBQ3hDLEtBQUssRUFBRSxhQUFhLENBQUMsU0FBUztZQUM5QixhQUFhLEVBQUUsTUFBTTtZQUNyQixhQUFhLEVBQUUsTUFBTTtZQUNyQixjQUFjLEVBQUUsV0FBVztTQUMzQixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNuQztBQUNGLENBQUMsQ0FBQyxDQUFDIn0=