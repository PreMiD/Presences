{
    const presence = new Presence({
        clientId: "610850440266907648"
    });
    const strings = presence.getStrings({
        play: "presence.playback.playing",
        pause: "presence.playback.paused"
    });
    presence.on("UpdateData", async () => {
        if (location.pathname.startsWith("/music/listen") &&
            document.querySelector(".now-playing-info-wrapper")) {
            const title = document.querySelector("#currently-playing-title")
                .textContent;
            const artist = document.querySelector("#player-artist").textContent ||
                document
                    .querySelector("#music-content > div.g-content.view-transition > div > table > tbody > tr.song-row.currently-playing > td:nth-child(1) > span")
                    .textContent.split(" - ")[1];
            const album = document.querySelector(".player-album").textContent ||
                document
                    .querySelector("#music-content > div.g-content.view-transition > div > table > tbody > tr.song-row.currently-playing > td:nth-child(1) > span")
                    .textContent.split(" - ")[0];
            const isPlaying = !!document.querySelector("#player-bar-play-pause.playing");
            const presenceData = {
                details: title,
                state: `${artist} - ${album}`,
                largeImageKey: "gpm",
                smallImageKey: isPlaying ? "play" : "pause",
                smallImageText: isPlaying ? (await strings).play : (await strings).pause
            };
            if (!document.hidden) {
                const elapsed = document.querySelector("#time_container_current")
                    .textContent;
                presenceData.startTimestamp =
                    Math.floor(Date.now() / 1000) - getTimesec(elapsed).elapsedSec;
            }
            if (isPlaying) {
                presence.setTrayTitle(title);
            }
            else {
                delete presenceData.startTimestamp;
            }
            presence.setActivity(presenceData);
        }
    });
    function getTimesec(elapsedString = "00:00", durationString = "00:00", separator = ":") {
        const elapsed = elapsedString.split(separator);
        const duration = durationString.split(separator);
        let elapsedSec, durationSec;
        switch (elapsed.length) {
            case 3: {
                elapsedSec =
                    parseInt(elapsed[0]) * 60 * 60 +
                        parseInt(elapsed[1]) * 60 +
                        parseInt(elapsed[2]);
                break;
            }
            case 2: {
                elapsedSec = parseInt(elapsed[0]) * 60 + parseInt(elapsed[1]);
                break;
            }
            case 1: {
                elapsedSec = parseInt(elapsed[0]);
                break;
            }
        }
        switch (duration.length) {
            case 3: {
                durationSec =
                    parseInt(duration[0]) * 60 * 60 +
                        parseInt(duration[1]) * 60 +
                        parseInt(duration[2]);
                break;
            }
            case 2: {
                durationSec = parseInt(duration[0]) * 60 + parseInt(duration[1]);
                break;
            }
            case 1: {
                durationSec = parseInt(duration[0]);
                break;
            }
        }
        return { elapsedSec: elapsedSec, durationSec: durationSec };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNFLE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO1FBQzVCLFFBQVEsRUFBRSxvQkFBb0I7S0FDL0IsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUNsQyxJQUFJLEVBQUUsMkJBQTJCO1FBQ2pDLEtBQUssRUFBRSwwQkFBMEI7S0FDbEMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDbkMsSUFDRSxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUM7WUFDN0MsUUFBUSxDQUFDLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQyxFQUNuRDtZQUNBLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsMEJBQTBCLENBQUM7aUJBQzdELFdBQVcsQ0FBQztZQUNmLE1BQU0sTUFBTSxHQUNWLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxXQUFXO2dCQUNwRCxRQUFRO3FCQUNMLGFBQWEsQ0FDWiwrSEFBK0gsQ0FDaEk7cUJBQ0EsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLEtBQUssR0FDVCxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFdBQVc7Z0JBQ25ELFFBQVE7cUJBQ0wsYUFBYSxDQUNaLCtIQUErSCxDQUNoSTtxQkFDQSxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWpDLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUN4QyxnQ0FBZ0MsQ0FDakMsQ0FBQztZQUVGLE1BQU0sWUFBWSxH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