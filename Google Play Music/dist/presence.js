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
        else {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNDLE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO1FBQzdCLFFBQVEsRUFBRSxvQkFBb0I7S0FDOUIsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUNuQyxJQUFJLEVBQUUsMkJBQTJCO1FBQ2pDLEtBQUssRUFBRSwwQkFBMEI7S0FDakMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDcEMsSUFDQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUM7WUFDN0MsUUFBUSxDQUFDLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQyxFQUNsRDtZQUNELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsMEJBQTBCLENBQUM7aUJBQzlELFdBQVcsQ0FBQztZQUNkLE1BQU0sTUFBTSxHQUNYLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxXQUFXO2dCQUNwRCxRQUFRO3FCQUNOLGFBQWEsQ0FDYiwrSEFBK0gsQ0FDL0g7cUJBQ0EsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixNQUFNLEtBQUssR0FDVixRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFdBQVc7Z0JBQ25ELFFBQVE7cUJBQ04sYUFBYSxDQUNiLCtIQUErSCxDQUMvSDtxQkFDQSxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRS9CLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUN6QyxnQ0FBZ0MsQ0FDaEMsQ0FBQztZQUVGLE1BQU0sWUFBWSxH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