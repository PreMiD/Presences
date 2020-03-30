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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUM5QyxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsd0JBQXdCO0lBQzlCLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsRUFBRTtRQUNyRSxJQUFJLFlBQVksR0FBaUI7WUFDaEMsT0FBTyxFQUFFLGdDQUFnQztZQUN6QyxhQUFhLEVBQUUsUUFBUTtTQUN2QixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNuQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQzVELElBQUksWUFBWSxHQUFpQjtZQUNoQyxPQUFPLEVBQUUsd0JBQXdCO1lBQ2pDLGFBQWEsRUFBRSxRQUFRO1NBQ3ZCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ25DO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDMUQsSUFBSSxZQUFZLEdBQWlCO1lBQ2hDLE9BQU8sRUFBRSx1QkFBdUI7WUFDaEMsYUFBYSxFQUFFLFFBQVE7U0FDdkIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDbkM7U0FBTTtRQUNOLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3RDLHFFQUFxRSxDQUNyRSxFQUNELFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNoQyxxREFBcUQsQ0FDbkMsRUFDbkIsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2xDLHNEQUFzRCxDQUNwQyxFQUNuQixTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDakMsMENBQTBDLENBQzFDLENBQUM7UUFDSCxJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFDdEIsSUFBSSxZQUFZLEdBQWlCO2dCQUNoQyxPQUFPLEVBQUUsZ0JBQWdCO2dCQUN6QixhQUFhLEVBQUUsUUFBUTtnQkFDdkIsYUFBYSxFQUFFLE9BQU87YUFDdEIsQ0FBQztZQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDbkM7YUFBTTtZQUNOLElBQUksWUFBWSxHQUFpQjtnQkFDaEMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxHQUFHLFVBQVUsQ0FBQyxTQUFTO2dCQUMzRCxLQUFLLEVBQUUsZUFBZSxHQUFHLFdBQVcsQ0FBQyxXQUFXO2dCQUNoRCxhQUFhLEVBQUUsUUFBUTtnQkFDdkIsYUFBYSxFQUFFLE1BQU07Z0JBQ3JCLGNBQWMsRUFBRSxXQUFXO2FBQzNCLENBQUM7WUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ25DO0tBQ0Q7QUFDRixDQUFDLENBQUMsQ0FBQyJ9