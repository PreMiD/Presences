var presence = new Presence({
    clientId: "618233809481236491"
});
let timeElapsed = Math.floor(Date.now() / 1000), strings = presence.getStrings({
    live: "presence.activity.live",
    pause: "presence.playback.paused"
});
presence.on("UpdateData", async () => {
    if (document.location.pathname.startsWith("/pages/playback_history")) {
        let presenceData = {
            details: "Looking at playback history...",
            largeImageKey: "rainwv"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/forums")) {
        let presenceData = {
            details: "Browsing the forums...",
            largeImageKey: "rainwv"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/api4")) {
        let presenceData = {
            details: "Looking at the API...",
            largeImageKey: "rainwv"
        };
        presence.setActivity(presenceData);
    }
    else {
        let stationName = document.querySelector("a.station.selected_station > div.station_details > div.station_name"), songName = document.querySelector("div.song.now_playing > div.song_content > div.title"), artistName = document.querySelector("div.song.now_playing > div.song_content > div.artist"), playCheck = document.querySelector("div#r4_audio_player.unselectable.playing");
        if (playCheck == null) {
            let presenceData = {
                details: "Not listening.",
                largeImageKey: "rainwv",
                smallImageKey: "pause"
            };
            presence.setActivity(presenceData);
        }
        else {
            let presenceData = {
                details: songName.innerText + " by " + artistName.innerText,
                state: "Listening on " + stationName.textContent,
                largeImageKey: "rainwv",
                smallImageKey: "live",
                startTimestamp: timeElapsed
            };
            presence.setActivity(presenceData);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUM3QyxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsd0JBQXdCO0lBQzlCLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsRUFBRTtRQUNwRSxJQUFJLFlBQVksR0FBaUI7WUFDL0IsT0FBTyxFQUFFLGdDQUFnQztZQUN6QyxhQUFhLEVBQUUsUUFBUTtTQUN4QixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQzNELElBQUksWUFBWSxHQUFpQjtZQUMvQixPQUFPLEVBQUUsd0JBQXdCO1lBQ2pDLGFBQWEsRUFBRSxRQUFRO1NBQ3hCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDekQsSUFBSSxZQUFZLEdBQWlCO1lBQy9CLE9BQU8sRUFBRSx1QkFBdUI7WUFDaEMsYUFBYSxFQUFFLFFBQVE7U0FDeEIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTTtRQUNMLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3BDLHFFQUFxRSxDQUN0RSxFQUNELFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUMvQixxREFBcUQsQ0FDcEMsRUFDbkIsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2pDLHNEQUFzRCxDQUNyQyxFQUNuQixTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDaEMsMENBQTBDLENBQzNDLENBQUM7UUFDSixJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFDckIsSUFBSSxZQUFZLEdBQWlCO2dCQUMvQixPQUFPLEVBQUUsZ0JBQWdCO2dCQUN6QixhQUFhLEVBQUUsUUFBUTtnQkFDdkIsYUFBYSxFQUFFLE9BQU87YUFDdkIsQ0FBQztZQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTTtZQUNMLElBQUksWUFBWSxHQUFpQjtnQkFDL0IsT0FBTyxFQUFFLFFBQVEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxHQUFHLFVBQVUsQ0FBQyxTQUFTO2dCQUMzRCxLQUFLLEVBQUUsZUFBZSxHQUFHLFdBQVcsQ0FBQyxXQUFXO2dCQUNoRCxhQUFhLEVBQUUsUUFBUTtnQkFDdkIsYUFBYSxFQUFFLE1BQU07Z0JBQ3JCLGNBQWMsRUFBRSxXQUFXO2FBQzVCLENBQUM7WUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO0tBQ0Y7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9