{
    const presence = new Presence({
        clientId: "611012705306017792"
    });
    const strings = presence.getStrings({
        play: "presence.playback.playing",
        pause: "presence.playback.paused"
    });
    presence.on("UpdateData", async () => {
        if (location.pathname.startsWith("/animestore/sc_d_pc") &&
            document.querySelector("#video")) {
            const video = document.querySelector("#video");
            const title = document.querySelector(".backInfoTxt1").textContent;
            const episode = document.querySelector(".backInfoTxt2").textContent;
            const epName = document.querySelector(".backInfoTxt3").textContent;
            const isPlaying = !video.paused;
            const elapsedSec = Math.floor(video.currentTime);
            const presenceData = {
                details: `${title} - ${episode}`,
                state: epName,
                largeImageKey: "danime",
                smallImageKey: isPlaying ? "play" : "pause",
                smallImageText: isPlaying
                    ? (await strings).play
                    : (await strings).pause,
                startTimestamp: Math.floor(Date.now() / 1000) - elapsedSec
            };
            if (isPlaying) {
                presence.setTrayTitle(title);
            }
            else {
                delete presenceData.startTimestamp;
            }
            presence.setActivity(presenceData);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNDLE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO1FBQzdCLFFBQVEsRUFBRSxvQkFBb0I7S0FDOUIsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUNuQyxJQUFJLEVBQUUsMkJBQTJCO1FBQ2pDLEtBQUssRUFBRSwwQkFBMEI7S0FDakMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDcEMsSUFDQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQztZQUNuRCxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUMvQjtZQUNELE1BQU0sS0FBSyxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQ2xFLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQ3BFLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsV0FBVyxDQUFDO1lBRW5FLE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNoQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUVqRCxNQUFNLFlBQVksR0FBaUI7Z0JBQ2xDLE9BQU8sRUFBRSxHQUFHLEtBQUssTUFBTSxPQUFPLEVBQUU7Z0JBQ2hDLEtBQUssRUFBRSxNQUFNO2dCQUNiLGFBQWEsRUFBRSxRQUFRO2dCQUN2QixhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU87Z0JBQzNDLGNBQWMsRUFBRSxTQUFTO29CQUN4QixDQUFDLENBQUMsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLElBQUk7b0JBQ3RCLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsS0FBSztnQkFDeEIsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLFVBQVU7YUFDMUQsQ0FBQztZQUVGLElBQUksU0FBUyxFQUFFO2dCQUNkLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDN0I7aUJBQU07Z0JBQ04sT0FBTyxZQUFZLENBQUMsY0FBYyxDQUFDO2FBQ25DO1lBRUQsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNuQztJQUNGLENBQUMsQ0FBQyxDQUFDO0NBQ0gifQ==