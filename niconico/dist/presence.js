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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNDLE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO1FBQzdCLFFBQVEsRUFBRSxvQkFBb0I7S0FDOUIsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUNuQyxJQUFJLEVBQUUsMkJBQTJCO1FBQ2pDLEtBQUssRUFBRSwwQkFBMEI7UUFDakMsSUFBSSxFQUFFLHdCQUF3QjtLQUM5QixDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtRQUNwQyxRQUFRLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDMUIsS0FBSyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUN4QixJQUNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztvQkFDdkMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUMzQztvQkFDRCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFdBQVcsQ0FBQztvQkFFaEUsTUFBTSxZQUFZLEdBQ2pCLFFBQVEsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUM7d0JBQy9DLFFBQVEsQ0FBQyxhQUFhLENBQUMsMEJBQTBCLENBQUM7d0JBQ2xELElBQUksQ0FBQztvQkFDTixJQUFJLEtBQUssQ0FBQztvQkFDVixJQUFJLFlBQVksRUFBRTt3QkFDakIsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJOzRCQUN6RCxBQUQwRDs0QkFFMUQsWUFBWSxDQUFDLFdBQVc7eUJBQ3hCLENBQUM7cUJBQ0Y7eUJBQU07d0JBQ04sS0FBSyxHQUFHLGNBQWMsQ0FBQztxQkFDdkI7b0JBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUVwRCxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO29CQUVqRSxNQUFNLEtBQUssR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FDckQsb0JBQW9CLENBQ3BCLENBQUM7b0JBQ0YsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBRWpELE1BQU0sWUFBWSxHQUFpQjt3QkFDbEMsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsS0FBSyxFQUFFLEdBQUcsS0FBSyxNQUFNLE9BQU8sRUFBRTt3QkFDOUIsYUFBYSxFQUFFLFVBQVU7d0JBQ3pCLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTzt3QkFDM0MsY0FBYyxFQUFFLFNBQVM7NEJBQ3hCLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsSUFBSTs0QkFDdEIsQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxLQUFLO3dCQUN4QixjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsVUFBVTtxQkFDMUQsQ0FBQztvQkFFRixJQUFJLFNBQVMsRUFBRTt3QkFDZCxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUM3Qjt5QkFBTTt3QkFDTixPQUFPLFlBQVksQ0FBQyxjQUFjLENBQUM7cUJBQ25DO29CQUVELFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQ25DO2dCQUNELE1BQU07YUFDTjtZQUVELEtBQUssbUJBQW1CLENBQUM7WUFDekIsS0FBSyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUM5QyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDO3lCQUM1RCxXQUFXLENBQUM7b0JBQ2QsTUFBTSxZQUFZLEdBQ2pCLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0NBQXNDLENBQUM7d0JBQzlELFFBQVEsQ0FBQyxhQUFhLENBQUMsb0NBQW9DLENBQUMsQ0FBQztvQkFDOUQsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQztvQkFDdkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUVsRCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNyQyx3Q0FBd0MsQ0FDeEMsQ0FBQyxXQUFXLENBQUM7b0JBRWQsTUFBTSxZQUFZLEdBQWlCO3dCQUNsQyxPQUFPLEVBQUUsS0FBSzt3QkFDZCxLQUFLLEVBQUUsR0FBRyxLQUFLLE1BQU0sTUFBTSxFQUFFO3dCQUM3QixhQUFhLEVBQUUsVUFBVTt3QkFDekIsYUFBYSxFQUFFLE1BQU07d0JBQ3JCLGNBQWMsRUFBRSxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsSUFBSTt3QkFDcEMsY0FBYyxFQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVO3FCQUMvRCxDQUFDO29CQUVGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQ25DO3FCQUFNO29CQUNOLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTTthQUNOO1lBRUQsS0FBSyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUM5QyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQztvQkFDM0QsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDbkMsNkNBQTZDLENBQzdDLENBQUMsV0FBVyxDQUFDO29CQUNkLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFFbkQsTUFBTSxZQUFZLEdBQWlCO3dCQUNsQyxPQUFPLEVBQUUsS0FBSzt3QkFDZCxLQUFLLEVBQUUsR0FBRyxLQUFLLE1BQU0sT0FBTyxFQUFFO3dCQUM5QixhQUFhLEVBQUUsVUFBVTtxQkFDekIsQ0FBQztvQkFFRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUNuQztxQkFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUNyRCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQztvQkFDM0QsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxXQUFXLENBQUM7b0JBQ2pFLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFFbkQsTUFBTSxZQUFZLEdBQWlCO3dCQUNsQyxPQUFPLEVBQUUsS0FBSzt3QkFDZCxLQUFLLEVBQUUsR0FBRyxLQUFLLE1BQU0sT0FBTyxFQUFFO3dCQUM5QixhQUFhLEVBQUUsVUFBVTtxQkFDekIsQ0FBQztvQkFFRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUNuQztxQkFBTTtvQkFDTixRQUFRLENBQUMsYUFBYSxFQUFFLENBQUM7aUJBQ3pCO2dCQUNELE1BQU07YUFDTjtZQUVEO2dCQUNDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDekIsTUFBTTtTQUNQO0lBQ0YsQ0FBQyxDQUFDLENBQUM7SUFFSCxTQUFTLFVBQVUsQ0FDbEIsZ0JBQXdCLE9BQU8sRUFDL0IsaUJBQXlCLE9BQU8sRUFDaEMsWUFBb0IsR0FBRztRQUV2QixNQUFNLE9BQU8sR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFakQsSUFBSSxVQUFrQixFQUFFLFdBQW1CLENBQUM7UUFFNUMsUUFBUSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsVUFBVTtvQkFDVCxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7d0JBQzlCLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO3dCQUN6QixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLE1BQU07YUFDTjtZQUNELEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsVUFBVSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5RCxNQUFNO2FBQ047WUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNQLFVBQVUsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLE1BQU07YUFDTjtTQUNEO1FBRUQsUUFBUSxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ3hCLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsV0FBVztvQkFDVixRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7d0JBQy9CLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO3dCQUMxQixRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLE1BQU07YUFDTjtZQUNELEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsV0FBVyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRSxNQUFNO2FBQ047WUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNQLFdBQVcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLE1BQU07YUFDTjtTQUNEO1FBRUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxDQUFDO0lBQzdELENBQUM7Q0FDRCJ9