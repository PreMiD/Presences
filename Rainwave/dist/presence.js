var presence = new Presence({
    clientId: "618233809481236491"
});
const timeElapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    if (document.location.pathname.startsWith("/pages/playback_history")) {
        const presenceData = {
            details: "Looking at playback history...",
            largeImageKey: "rainwv"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/forums")) {
        const presenceData = {
            details: "Browsing the forums...",
            largeImageKey: "rainwv"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/api4")) {
        const presenceData = {
            details: "Looking at the API...",
            largeImageKey: "rainwv"
        };
        presence.setActivity(presenceData);
    }
    else {
        const stationName = document.querySelector("a.station.selected_station > div.station_details > div.station_name"), songName = document.querySelector("div.song.now_playing > div.song_content > div.title"), artistName = document.querySelector("div.song.now_playing > div.song_content > div.artist"), playCheck = document.querySelector("div#r4_audio_player.unselectable.playing");
        if (playCheck == null) {
            const presenceData = {
                details: "Not listening.",
                largeImageKey: "rainwv",
                smallImageKey: "pause"
            };
            presence.setActivity(presenceData);
        }
        else {
            const presenceData = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDLEVBQUU7UUFDcEUsTUFBTSxZQUFZLEdBQWlCO1lBQ2pDLE9BQU8sRUFBRSxnQ0FBZ0M7WUFDekMsYUFBYSxFQUFFLFFBQVE7U0FDeEIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUMzRCxNQUFNLFlBQVksR0FBaUI7WUFDakMsT0FBTyxFQUFFLHdCQUF3QjtZQUNqQyxhQUFhLEVBQUUsUUFBUTtTQUN4QixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3pELE1BQU0sWUFBWSxHQUFpQjtZQUNqQyxPQUFPLEVBQUUsdUJBQXVCO1lBQ2hDLGFBQWEsRUFBRSxRQUFRO1NBQ3hCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO1NBQU07UUFDTCxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUN0QyxxRUFBcUUsQ0FDdEUsRUFDRCxRQUFRLEdBQ04sUUFBUSxDQUFDLGFBQWEsQ0FDcEIscURBQXFELENBQ3BDLEVBQ3JCLFVBQVUsR0FDUixRQUFRLENBQUMsYUFBYSxDQUNwQixzREFBc0QsQ0FDckMsRUFDckIsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2hDLDBDQUEwQyxDQUMzQyxDQUFDO1FBQ0osSUFBSSxTQUFTLElBQUksSUFBSSxFQUFFO1lBQ3JCLE1BQU0sWUFBWSxHQUFpQjtnQkFDakMsT0FBTyxFQUFFLGdCQUFnQjtnQkFDekIsYUFBYSxFQUFFLFFBQVE7Z0JBQ3ZCLGFBQWEsRUFBRSxPQUFPO2FBQ3ZCLENBQUM7WUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO2FBQU07WUFDTCxNQUFNLFlBQVksR0FBaUI7Z0JBQ2pDLE9BQU8sRUFBRSxRQUFRLENBQUMsU0FBUyxHQUFHLE1BQU0sR0FBRyxVQUFVLENBQUMsU0FBUztnQkFDM0QsS0FBSyxFQUFFLGVBQWUsR0FBRyxXQUFXLENBQUMsV0FBVztnQkFDaEQsYUFBYSxFQUFFLFFBQVE7Z0JBQ3ZCLGFBQWEsRUFBRSxNQUFNO2dCQUNyQixjQUFjLEVBQUUsV0FBVzthQUM1QixDQUFDO1lBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQztLQUNGO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==