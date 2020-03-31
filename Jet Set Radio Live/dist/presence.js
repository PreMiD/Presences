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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUM3QyxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLElBQUksRUFBRSx3QkFBd0I7Q0FDL0IsQ0FBQyxFQUNGLFFBQVEsRUFDUixhQUFhLENBQUM7QUFFaEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQy9CLHFIQUFxSCxDQUN0SCxDQUFDO0lBQ0YsYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3BDLDhEQUE4RCxDQUMvRCxDQUFDO0lBQ0YsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDakMsSUFBSSxZQUFZLEdBQWlCO1lBQy9CLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLGFBQWEsRUFBRSxNQUFNO1lBQ3JCLGFBQWEsRUFBRSxPQUFPO1NBQ3ZCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO1NBQU07UUFDTCxJQUFJLFlBQVksR0FBaUI7WUFDL0IsT0FBTyxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVztZQUN4QyxLQUFLLEVBQUUsYUFBYSxDQUFDLFNBQVM7WUFDOUIsYUFBYSxFQUFFLE1BQU07WUFDckIsYUFBYSxFQUFFLE1BQU07WUFDckIsY0FBYyxFQUFFLFdBQVc7U0FDNUIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9