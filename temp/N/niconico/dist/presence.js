{
    const presence = new Presence({
        clientId: "609220157910286346"
    });
    const strings = presence.getStrings({
        play: "presence.playback.playing",
        pause: "presence.playback.paused",
        live: "presence.activity.live"
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNFLE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO1FBQzVCLFFBQVEsRUFBRSxvQkFBb0I7S0FDL0IsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUNsQyxJQUFJLEVBQUUsMkJBQTJCO1FBQ2pDLEtBQUssRUFBRSwwQkFBMEI7UUFDakMsSUFBSSxFQUFFLHdCQUF3QjtLQUMvQixDQUFDLENBQUM7SUFFSCxTQUFTLFVBQVUsQ0FDakIsYUFBYSxHQUFHLE9BQU8sRUFDdkIsY0FBYyxHQUFHLE9BQU8sRUFDeEIsU0FBUyxHQUFHLEdBQUc7UUFFZixNQUFNLE9BQU8sR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFakQsSUFBSSxVQUFrQixFQUFFLFdBQW1CLENBQUM7UUFFNUMsUUFBUSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ3RCLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ04sVUFBVTtvQkFDUixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7d0JBQzlCLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO3dCQUN6QixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLE1BQU07YUFDUDtZQUNELEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ04sVUFBVSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxD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