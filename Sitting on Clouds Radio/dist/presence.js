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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUM3QyxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsd0JBQXdCO0NBQy9CLENBQUMsRUFDRixRQUFRLEVBQ1IsU0FBUyxFQUNULFVBQVUsQ0FBQztBQUViLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUMvQiwrQ0FBK0MsQ0FDaEQsQ0FBQztJQUNGLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDdEUsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0NBQWtDLENBQUMsQ0FBQztJQUN4RSxJQUFJLFNBQVMsQ0FBQyxTQUFTLElBQUksMENBQTBDLEVBQUU7UUFDckUsSUFBSSxZQUFZLEdBQWlCO1lBQy9CLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLGFBQWEsRUFBRSxRQUFRO1lBQ3ZCLGFBQWEsRUFBRSxPQUFPO1NBQ3ZCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO1NBQU07UUFDTCxJQUFJLFlBQVksR0FBaUI7WUFDL0IsT0FBTyxFQUFFLFFBQVEsQ0FBQyxTQUFTO1lBQzNCLEtBQUssRUFBRSxVQUFVLENBQUMsU0FBUyxHQUFHLEtBQUssR0FBRyxTQUFTLENBQUMsU0FBUztZQUN6RCxhQUFhLEVBQUUsUUFBUTtZQUN2QixhQUFhLEVBQUUsTUFBTTtZQUNyQixjQUFjLEVBQUUsV0FBVztTQUM1QixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztBQUNILENBQUMsQ0FBQyxDQUFDIn0=