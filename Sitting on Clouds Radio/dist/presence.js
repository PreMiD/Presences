var presence = new Presence({
    clientId: "689724677274337290"
});
let timeElapsed = Math.floor(Date.now() / 1000), strings = presence.getStrings({
    live: "presence.playback.live"
}), songName, albumName, artistName;
presence.on("UpdateData", async () => {
    songName = document.querySelector("span#cardTitle.card-title.playerText.truncate");
    albumName = document.querySelector("p#cardAlbum.playerText.truncate");
    artistName = document.querySelector("p#cardArtist.playerText.truncate");
    if (albumName.innerText == "Press the Play button to start the radio") {
        let presenceData = {
            details: "Not tuned in.",
            largeImageKey: "clouds",
            smallImageKey: "pause"
        };
        presence.setActivity(presenceData);
    }
    else {
        let presenceData = {
            details: songName.innerText,
            state: artistName.innerText + " - " + albumName.innerText,
            largeImageKey: "clouds",
            smallImageKey: "live",
            startTimestamp: timeElapsed
        };
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUM5QyxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsd0JBQXdCO0NBQzlCLENBQUMsRUFDRixRQUFRLEVBQ1IsU0FBUyxFQUNULFVBQVUsQ0FBQztBQUVaLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNoQywrQ0FBK0MsQ0FDL0MsQ0FBQztJQUNGLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDdEUsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0NBQWtDLENBQUMsQ0FBQztJQUN4RSxJQUFJLFNBQVMsQ0FBQyxTQUFTLElBQUksMENBQTBDLEVBQUU7UUFDdEUsSUFBSSxZQUFZLEdBQWlCO1lBQ2hDLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLGFBQWEsRUFBRSxRQUFRO1lBQ3ZCLGFBQWEsRUFBRSxPQUFPO1NBQ3RCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ25DO1NBQU07UUFDTixJQUFJLFlBQVksR0FBaUI7WUFDaEMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxTQUFTO1lBQzNCLEtBQUssRUFBRSxVQUFVLENBQUMsU0FBUyxHQUFHLEtBQUssR0FBRyxTQUFTLENBQUMsU0FBUztZQUN6RCxhQUFhLEVBQUUsUUFBUTtZQUN2QixhQUFhLEVBQUUsTUFBTTtZQUNyQixjQUFjLEVBQUUsV0FBVztTQUMzQixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNuQztBQUNGLENBQUMsQ0FBQyxDQUFDIn0=