var presence = new Presence({
    clientId: "689724677274337290"
});
const timeElapsed = Math.floor(Date.now() / 1000);
let songName, albumName, artistName;
presence.on("UpdateData", async () => {
    songName = document.querySelector("span#cardTitle.card-title.playerText.truncate");
    albumName = document.querySelector("p#cardAlbum.playerText.truncate");
    artistName = document.querySelector("p#cardArtist.playerText.truncate");
    if (albumName.innerText == "Press the Play button to start the radio") {
        const presenceData = {
            details: "Not tuned in.",
            largeImageKey: "clouds",
            smallImageKey: "pause"
        };
        presence.setActivity(presenceData);
    }
    else {
        const presenceData = {
            details: songName.innerText,
            state: artistName.innerText + " - " + albumName.innerText,
            largeImageKey: "clouds",
            smallImageKey: "live",
            startTimestamp: timeElapsed
        };
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksUUFBUSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUM7QUFFcEMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQy9CLCtDQUErQyxDQUNoRCxDQUFDO0lBQ0YsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUN0RSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0lBQ3hFLElBQUksU0FBUyxDQUFDLFNBQVMsSUFBSSwwQ0FBMEMsRUFBRTtRQUNyRSxNQUFNLFlBQVksR0FBaUI7WUFDakMsT0FBTyxFQUFFLGVBQWU7WUFDeEIsYUFBYSxFQUFFLFFBQVE7WUFDdkIsYUFBYSxFQUFFLE9BQU87U0FDdkIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTTtRQUNMLE1BQU0sWUFBWSxHQUFpQjtZQUNqQyxPQUFPLEVBQUUsUUFBUSxDQUFDLFNBQVM7WUFDM0IsS0FBSyxFQUFFLFVBQVUsQ0FBQyxTQUFTLEdBQUcsS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTO1lBQ3pELGFBQWEsRUFBRSxRQUFRO1lBQ3ZCLGFBQWEsRUFBRSxNQUFNO1lBQ3JCLGNBQWMsRUFBRSxXQUFXO1NBQzVCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==