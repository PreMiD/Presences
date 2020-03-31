{
    const presence = new Presence({
        clientId: "609220157910286346"
    });
    const strings = presence.getStrings({
        play: "presence.playback.playing",
        pause: "presence.playback.paused",
        live: "presence.activity.live"
    });
    presence.on("UpdateData", async () => {
        switch (location.hostname) {
            case "www.nicovideo.jp": {
                if (location.pathname.startsWith("/watch/") &&
                    document.querySelector(".VideoPlayer video")) {
                    const title = document.querySelector(".VideoTitle").textContent;
                    const ownerElement = document.querySelector(".ChannelInfo-pageLink") ||
                        document.querySelector(".VideoOwnerInfo-pageLink") ||
                        null;
                    let owner;
                    if (ownerElement) {
                        [, owner] = ownerElement.textContent.match(/(.+) さん$/) || [
                            ,
                            ownerElement.textContent
                        ];
                    }
                    else {
                        owner = "Deleted User";
                    }
                    const [videoId] = location.pathname.match(/..\d+$/);
                    const isPlaying = !!document.querySelector(".PlayerPauseButton");
                    const video = document.querySelector(".VideoPlayer video");
                    const elapsedSec = Math.floor(video.currentTime);
                    const presenceData = {
                        details: title,
                        state: `${owner} - ${videoId}`,
                        largeImageKey: "niconico",
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
                break;
            }
            case "live.nicovideo.jp":
            case "live2.nicovideo.jp": {
                if (location.pathname.startsWith("/watch/lv")) {
                    const title = document.querySelector("[class^='___title___']")
                        .textContent;
                    const ownerElement = document.querySelector("[class^='___channel-name-anchor___']") ||
                        document.querySelector("[class^='___group-name-anchor___']");
                    const owner = ownerElement.textContent;
                    const [liveId] = location.pathname.match(/lv\d+/);
                    const elapsed = document.querySelector("span[class^='___elapsed-time___'] span").textContent;
                    const presenceData = {
                        details: title,
                        state: `${owner} - ${liveId}`,
                        largeImageKey: "niconico",
                        smallImageKey: "live",
                        smallImageText: (await strings).live,
                        startTimestamp: Math.floor(Date.now() / 1000) - getTimesec(elapsed).elapsedSec
                    };
                    presence.setActivity(presenceData);
                }
                else {
                    presence.clearActivity();
                }
                break;
            }
            case "seiga.nicovideo.jp": {
                if (location.pathname.startsWith("/seiga/im")) {
                    const title = document.querySelector(".title").textContent;
                    const owner = document.querySelector("#ko_watchlist_header.user .user_name strong").textContent;
                    const [seigaId] = location.pathname.match(/im\d+/);
                    const presenceData = {
                        details: title,
                        state: `${owner} - ${seigaId}`,
                        largeImageKey: "niconico"
                    };
                    presence.setActivity(presenceData);
                }
                else if (location.pathname.startsWith("/watch/mg")) {
                    const title = document.querySelector(".title").textContent;
                    const owner = document.querySelector(".author_name").textContent;
                    const [mangaId] = location.pathname.match(/mg\d+/);
                    const presenceData = {
                        details: title,
                        state: `${owner} - ${mangaId}`,
                        largeImageKey: "niconico"
                    };
                    presence.setActivity(presenceData);
                }
                else {
                    presence.clearActivity();
                }
                break;
            }
            default:
                presence.clearActivity();
                break;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNFLE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO1FBQzVCLFFBQVEsRUFBRSxvQkFBb0I7S0FDL0IsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUNsQyxJQUFJLEVBQUUsMkJBQTJCO1FBQ2pDLEtBQUssRUFBRSwwQkFBMEI7UUFDakMsSUFBSSxFQUFFLHdCQUF3QjtLQUMvQixDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtRQUNuQyxRQUFRLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDekIsS0FBSyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUN2QixJQUNFLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztvQkFDdkMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUM1QztvQkFDQSxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFdBQVcsQ0FBQztvQkFFaEUsTUFBTSxZQUFZLEdBQ2hCLFFBQVEsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUM7d0JBQy9DLFFBQVEsQ0FBQyxhQUFhLENBQUMsMEJBQTBCLENBQUM7d0JBQ2xELElBQUksQ0FBQztvQkFDUCxJQUFJLEtBQUssQ0FBQztvQkFDVixJQUFJLFlBQVksRUFBRTt3QkFDaEIsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJOzRCQUN4RCxBQUR5RDs0QkFFekQsWUFBWSxDQUFDLFdBQVc7eUJBQ3pCLENBQUM7cUJBQ0g7eUJBQU07d0JBQ0wsS0FBSyxHQUFHLGNBQWMsQ0FBQztxQkFDeEI7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