var presence = new Presence({
    clientId: "613786642800705569"
});
const timeElapsed = Math.floor(Date.now() / 1000);
let songName, presenceState;
presence.on("UpdateData", async () => {
    songName = document.querySelector("html > body > div#information.objectSettings.touchableOff > font#programInformationText.objectSettings.touchableOff");
    presenceState = document.querySelector("html > body > font#dateTextField.objectSettings.touchableOff");
    if (songName.innerText.length < 1) {
        const presenceData = {
            details: "Not tuned in.",
            largeImageKey: "jsrl",
            smallImageKey: "pause"
        };
        presence.setActivity(presenceData);
    }
    else {
        const presenceData = {
            details: songName.firstChild.textContent,
            state: presenceState.innerText,
            largeImageKey: "jsrl",
            smallImageKey: "live",
            startTimestamp: timeElapsed
        };
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksUUFBUSxFQUFFLGFBQWEsQ0FBQztBQUU1QixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDL0IscUhBQXFILENBQ3RILENBQUM7SUFDRixhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDcEMsOERBQThELENBQy9ELENBQUM7SUFDRixJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNqQyxNQUFNLFlBQVksR0FBaUI7WUFDakMsT0FBTyxFQUFFLGVBQWU7WUFDeEIsYUFBYSxFQUFFLE1BQU07WUFDckIsYUFBYSxFQUFFLE9BQU87U0FDdkIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTTtRQUNMLE1BQU0sWUFBWSxHQUFpQjtZQUNqQyxPQUFPLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXO1lBQ3hDLEtBQUssRUFBRSxhQUFhLENBQUMsU0FBUztZQUM5QixhQUFhLEVBQUUsTUFBTTtZQUNyQixhQUFhLEVBQUUsTUFBTTtZQUNyQixjQUFjLEVBQUUsV0FBVztTQUM1QixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztBQUNILENBQUMsQ0FBQyxDQUFDIn0=