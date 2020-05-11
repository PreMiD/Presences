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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNFLE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO1FBQzVCLFFBQVEsRUFBRSxvQkFBb0I7S0FDL0IsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUNsQyxJQUFJLEVBQUUsMkJBQTJCO1FBQ2pDLEtBQUssRUFBRSwwQkFBMEI7S0FDbEMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDbkMsSUFDRSxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQztZQUNuRCxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUNoQztZQUNBLE1BQU0sS0FBSyxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQ2xFLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQ3BFLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsV0FBVyxDQUFDO1lBRW5FLE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNoQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUVqRCxNQUFNLFlBQVksR0FBaUI7Z0JBQ2pDLE9BQU8sRUFBRSxHQUFHLEtBQUssTUFBTSxPQUFPLEVBQUU7Z0JBQ2hDLEtBQUssRUFBRSxNQUFNO2dCQUNiLGFBQWEsRUFBRSxRQUFRO2dCQUN2QixhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU87Z0JBQzNDLGNBQWMsRUFBRSxTQUFTO29CQUN2QixDQUFDLENBQUMsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLElBQUk7b0JBQ3RCLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsS0FBSztnQkFDekIsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLFVBQVU7YUFDM0QsQ0FBQztZQUVGLElBQUksU0FBUyxFQUFFO2dCQUNiLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUI7aUJBQU07Z0JBQ0wsT0FBTyxZQUFZLENBQUMsY0FBYyxDQUFDO2FBQ3BDO1lBRUQsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQztJQUNILENBQUMsQ0FBQyxDQUFDO0NBQ0oifQ==