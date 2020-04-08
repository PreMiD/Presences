var presence = new Presence({
    clientId: "645028677033132033"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var language = window.navigator.language;
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";
function PMD_error(message) {
    console.log("%cPreMiD%cERROR%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;", "color: unset;");
}
function getTranslation(stringName) {
    switch (stringName) {
        case "HomePage":
            switch (language) {
                case "nl":
                    return "Bekijkt de startpagina";
                    break;
                case "de":
                    return "Ist auf der Startseite";
                    break;
                default:
                    return "Viewing home page";
                    break;
            }
            break;
        case "News":
            switch (language) {
                case "nl":
                    return "Bladeren door het niews";
                    break;
                case "de":
                    return "Sieht sich News an";
                    break;
                default:
                    return "Browsing news";
                    break;
            }
            break;
        case "WebShows":
            switch (language) {
                case "nl":
                    return "Bladeren door alle shows";
                    break;
                case "de":
                    return "Sieht sich Shows an";
                    break;
                default:
                    return "Browsing shows";
                    break;
            }
            break;
        case "Podcasts":
            switch (language) {
                case "nl":
                    return "Bladeren door podcasts";
                    break;
                case "de":
                    return "Sieht sich Podcasts an";
                    break;
                default:
                    return "Browsing podcasts";
                    break;
            }
            break;
        case "Music":
            switch (language) {
                case "nl":
                    return "Bladeren door muziek";
                    break;
                case "de":
                    return "Sieht sich Musik an";
                    break;
                default:
                    return "Browsing music";
                    break;
            }
            break;
        case "Search":
            switch (language) {
                case "nl":
                    return "Zoekt naar:";
                    break;
                case "de":
                    return "Sucht nach:";
                    break;
                default:
                    return "Searching for:";
                    break;
            }
            break;
        case "Library":
            switch (language) {
                case "nl":
                    return "Bekijkt bibliotheek:";
                    break;
                case "de":
                    return "Ist in der Bibliothek:";
                    break;
                default:
                    return "Viewing library:";
                    break;
            }
            break;
        case "Collection":
            switch (language) {
                case "nl":
                    return "Bekijkt collectie:";
                    break;
                case "de":
                    return "Ist in der Kollektion";
                    break;
                default:
                    return "Viewing collection:";
                    break;
            }
            break;
        case "Playlist":
            switch (language) {
                case "nl":
                    return "Bekijkt afspeellijst:";
                    break;
                case "de":
                    return "Ist in der Playlist";
                    break;
                default:
                    return "Viewing playlist:";
                    break;
            }
            break;
        default:
            PMD_error("Unknown StringName please contact the Developer of this presence!\nYou can contact him/her in the PreMiD Discord (discord.gg/premid)");
            return "Unknown stringName";
            break;
    }
}
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var search;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "plex"
    };
    if (document.location.hostname == "app.plex.tv") {
        if (document.querySelector("#plex > div:nth-child(7) > div > div > video") !==
            null ||
            document.querySelector("#plex > div:nth-child(7) > div > div > audio") !==
                null) {
            var currentTime, duration, paused, timestamps, video;
            video =
                document.querySelector("#plex > div:nth-child(7) > div > div > video") ||
                    document.querySelector("#plex > div:nth-child(7) > div > div > audio");
            currentTime = video.currentTime;
            duration = video.duration;
            paused = video.paused;
            timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
            presenceData.smallImageKey = paused ? "pause" : "play";
            presenceData.smallImageText = paused
                ? (await strings).pause
                : (await strings).play;
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            user =
                document.querySelector("#plex > div:nth-child(7) > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(2) > a") ||
                    document.querySelector("#plex > div:nth-child(7) > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(2) > div > div > a") ||
                    document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH.AudioVideoFullPlayer-hideControls-3B1pWE > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > a") ||
                    document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > a") ||
                    document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > a") ||
                    document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH.AudioVideoFullPlayer-hideControls-3B1pWE > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div.ControlsContainer-controlsContainer-1Wn7vp > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > span:nth-child(1)") ||
                    document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH.AudioVideoFullPlayer-hideControls-3B1pWE > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > a") ||
                    document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > a") ||
                    document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div:nth-child(2) > div > div > div.PlayerControls-controls-e59abb.PlayerControls-hasLandscapePoster-23Gat5 > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div.PlayerControlsMetadata-container-2wqMfv > a");
            title =
                document.querySelector("#plex > div:nth-child(7) > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(2) > span > a") ||
                    document.querySelector("#plex > div:nth-child(7) > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(2) > div > div > span") ||
                    document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH.AudioVideoFullPlayer-hideControls-3B1pWE > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > span") ||
                    document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > span") ||
                    document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > span") ||
                    document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH.AudioVideoFullPlayer-hideControls-3B1pWE > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div.AudioVideoInfoBar-container-2ewFys > div:nth-child(1)") ||
                    document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH.AudioVideoFullPlayer-hideControls-3B1pWE > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > span") ||
                    document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > span") ||
                    document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div:nth-child(2) > div > div > div.PlayerControls-controls-e59abb.PlayerControls-hasLandscapePoster-23Gat5 > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div.PlayerControlsMetadata-container-2wqMfv > span");
            presenceData.details = user.textContent;
            if (title) {
                title = (title.textContent || "").split("—");
                presenceData.state = title[1] || title[0];
                if (title.length > 1) {
                    var chapterNumber = title[0].replace("·", "-");
                    presenceData.state = `${chapterNumber} - ${presenceData.state}`;
                }
            }
            if (paused) {
                delete presenceData.startTimestamp;
                delete presenceData.endTimestamp;
            }
        }
        else if (document.URL == "https://app.plex.tv/" ||
            document.URL == "https://app.plex.tv/desktop" ||
            document.URL == "https://app.plex.tv/desktop#") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = getTranslation("HomePage");
        }
        else if (document.URL.includes("/tv.plex.provider.webshows")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = getTranslation("WebShows");
        }
        else if (document.URL.includes("/tv.plex.provider.news")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = getTranslation("News");
        }
        else if (document.URL.includes("/tv.plex.provider.podcasts")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = getTranslation("Podcasts");
        }
        else if (document.URL.includes("/tv.plex.provider.music")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = getTranslation("Music");
        }
        else if (document.URL.includes("/search")) {
            search = document.querySelector("#content > div > div > div:nth-child(2) > div > div:nth-child(2) > span");
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = getTranslation("Search");
            presenceData.state = search.textContent.split('"')[1].replace('"', "");
            presenceData.smallImageKey = "search";
        }
        else if (document.URL.includes("/com.plexapp.plugins.library")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = getTranslation("Library");
            presenceData.state = document.querySelector("#content > div > div > div:nth-child(2) > div > div > div > a > div").textContent;
        }
        else if (document.URL.includes("content.collections")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = getTranslation("Collection");
            presenceData.state = document.querySelector("#content > div > div > div:nth-child(2) > div > div > div:nth-child(3) > span").textContent;
        }
        else if (document.URL.includes("content.playlists") &&
            document.querySelector("#content > div > div > div:nth-child(2) > div > div > div:nth-child(3) > span") !== null) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = getTranslation("Playlist");
            presenceData.state = document.querySelector("#content > div > div > div:nth-child(2) > div > div > div:nth-child(3) > span").textContent;
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7QUFVekMsU0FBUyxhQUFhLENBQ3BCLFNBQWlCLEVBQ2pCLGFBQXFCO0lBRXJCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRUQsSUFBSSxZQUFZLEdBQUcsbURBQW1ELENBQUM7QUFNdkUsU0FBUyxTQUFTLENBQUMsT0FBZTtJQUNoQyxPQUFPLENBQUMsR0FBRyxDQUNULG9CQUFvQixHQUFHLE9BQU8sRUFDOUIsWUFBWSxHQUFHLG9EQUFvRCxFQUNuRSxZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLGVBQWUsQ0FDaEIsQ0FBQztBQUNKLENBQUM7QUFNRCxTQUFTLGNBQWMsQ0FBQyxVQUFrQjtJQUN4QyxRQUFRLFVBQVUsRUFBRTtRQUNsQixLQUFLLFVBQVU7WUFDYixRQUFRLFFBQVEsRUFBRTtnQkFDaEIsS0FBSyxJQUFJO29CQUNQLE9BQU8sd0JBQXdCLENBQUM7b0JBQ2hDLE1BQU07Z0JBQ1IsS0FBSyxJQUFJO29CQUNQLE9BQU8sd0JBQXdCLENBQUM7b0JBQ2hDLE1BQU07Z0JBQ1I7b0JBQ0UsT0FBTyxtQkFBbUIsQ0FBQztvQkFDM0IsTUFBTTthQUNUO1lBQ0QsTUFBTTtRQUNSLEtBQUssTUFBTTtZQUNULFFBQVEsUUFBUSxFQUFFO2dCQUNoQixLQUFLLElBQUk7b0JBQ1AsT0FBTyx5QkFBeUIsQ0FBQztvQkFDakMsTUFBTTtnQkFDUixLQUFLLElBQUk7b0JBQ1AsT0FBTyxvQkFBb0IsQ0FBQztvQkFDNUIsTUFBTTtnQkFDUjtvQkFDRSxPQUFPLGVBQWUsQ0FBQztvQkFDdkIsTUFBTTthQUNUO1lBQ0QsTUFBTTtRQUNSLEtBQUssVUFBVTtZQUNiLFFBQVEsUUFBUSxFQUFFO2dCQUNoQixLQUFLLElBQUk7b0JBQ1AsT0FBTywwQkFBMEIsQ0FBQztvQkFDbEMsTUFBTTtnQkFDUixLQUFLLElBQUk7b0JBQ1AsT0FBTyxxQkFBcUIsQ0FBQztvQkFDN0IsTUFBTTtnQkFDUjtvQkFDRSxPQUFPLGdCQUFnQixDQUFDO29CQUN4QixNQUFNO2FBQ1Q7WUFDRCxNQUFNO1FBQ1IsS0FBSyxVQUFVO1lBQ2IsUUFBUSxRQUFRLEVBQUU7Z0JBQ2hCLEtBQUssSUFBSTtvQkFDUCxPQUFPLHdCQUF3QixDQUFDO29CQUNoQyxNQUFNO2dCQUNSLEtBQUssSUFBSTtvQkFDUCxPQUFPLHdCQUF3QixDQUFDO29CQUNoQyxNQUFNO2dCQUNSO29CQUNFLE9BQU8sbUJBQW1CLENBQUM7b0JBQzNCLE1BQU07YUFDVDtZQUNELE1BQU07UUFDUixLQUFLLE9BQU87WUFDVixRQUFRLFFBQVEsRUFBRTtnQkFDaEIsS0FBSyxJQUFJO29CQUNQLE9BQU8sc0JBQXNCLENBQUM7b0JBQzlCLE1BQU07Z0JBQ1IsS0FBSyxJQUFJO29CQUNQLE9BQU8scUJBQXFCLENBQUM7b0JBQzdCLE1BQU07Z0JBQ1I7b0JBQ0UsT0FBTyxnQkFBZ0IsQ0FBQztvQkFDeEIsTUFBTTthQUNUO1lBQ0QsTUFBTTtRQUNSLEtBQUssUUFBUTtZQUNYLFFBQVEsUUFBUSxFQUFFO2dCQUNoQixLQUFLLElBQUk7b0JBQ1AsT0FBTyxhQUFhLENBQUM7b0JBQ3JCLE1BQU07Z0JBQ1IsS0FBSyxJQUFJO29CQUNQLE9BQU8sYUFBYSxDQUFDO29CQUNyQixNQUFNO2dCQUNSO29CQUNFLE9BQU8sZ0JBQWdCLENBQUM7b0JBQ3hCLE1BQU07YUFDVDtZQUNELE1BQU07UUFDUixLQUFLLFNBQVM7WUFDWixRQUFRLFFBQVEsRUFBRTtnQkFDaEIsS0FBSyxJQUFJO29CQUNQLE9BQU8sc0JBQXNCLENBQUM7b0JBQzlCLE1BQU07Z0JBQ1IsS0FBSyxJQUFJO29CQUNQLE9BQU8sd0JBQXdCLENBQUM7b0JBQ2hDLE1BQU07Z0JBQ1I7b0JBQ0UsT0FBTyxrQkFBa0IsQ0FBQztvQkFDMUIsTUFBTTthQUNUO1lBQ0QsTUFBTTtRQUNSLEtBQUssWUFBWTtZQUNmLFFBQVEsUUFBUSxFQUFFO2dCQUNoQixLQUFLLElBQUk7b0JBQ1AsT0FBTyxvQkFBb0IsQ0FBQztvQkFDNUIsTUFBTTtnQkFDUixLQUFLLElBQUk7b0JBQ1AsT0FBTyx1QkFBdUIsQ0FBQztvQkFDL0IsTUFBTTtnQkFDUjtvQkFDRSxPQUFPLHFCQUFxQixDQUFDO29CQUM3QixNQUFNO2FBQ1Q7WUFDRCxNQUFNO1FBQ1IsS0FBSyxVQUFVO1lBQ2IsUUFBUSxRQUFRLEVBQUU7Z0JBQ2hCLEtBQUssSUFBSTtvQkFDUCxPQUFPLHVCQUF1QixDQUFDO29CQUMvQixNQUFNO2dCQUNSLEtBQUssSUFBSTtvQkFDUCxPQUFPLHFCQUFxQixDQUFDO29CQUM3QixNQUFNO2dCQUNSO29CQUNFLE9BQU8sbUJBQW1CLENBQUM7b0JBQzNCLE1BQU07YUFDVDtZQUNELE1BQU07UUFDUjtZQUNFLFNBQVMsQ0FDUCxzSUFBc0ksQ0FDdkksQ0FBQztZQUNGLE9BQU8sb0JBQW9CLENBQUM7WUFDNUIsTUFBTTtLQUNUO0FBQ0gsQ0FBQztBQUVELElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxLQUFVLENBQUM7QUFDZixJQUFJLE1BQVcsQ0FBQztBQUVoQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLE1BQU07S0FDdEIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYSxFQUFFO1FBQy9DLElBQ0UsUUFBUSxDQUFDLGFBQWEsQ0FBQyw4Q0FBOEMsQ0FBQztZQUNwRSxJQUFJO1lBQ04sUUFBUSxDQUFDLGFBQWEsQ0FBQyw4Q0FBOEMsQ0FBQztnQkFDcEUsSUFBSSxFQUNOO1lBQ0EsSUFBSSxXQUFnQixFQUNsQixRQUFhLEVBQ2IsTUFBVyxFQUNYLFVBQWUsRUFDZixLQUF1QixDQUFDO1lBQzFCLEtBQUs7Z0JBQ0gsUUFBUSxDQUFDLGFBQWEsQ0FDcEIsOENBQThDLENBQy9DO29CQUNELFFBQVEsQ0FBQyxhQUFhLENBQUMsOENBQThDLENBQUMsQ0FBQztZQUN6RSxXQUFXLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztZQUNoQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUMxQixNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUN0QixVQUFVLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzFFLFlBQVksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUN2RCxZQUFZLENBQUMsY0FBYyxHQUFHLE1BQU07Z0JBQ2xDLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsS0FBSztnQkFDdkIsQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDekIsWUFBWSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUMsWUFBWSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSTtnQkFDRixRQUFRLENBQUMsYUFBYSxDQUNwQiwrR0FBK0csQ0FDaEg7b0JBQ0QsUUFBUSxDQUFDLGFBQWEsQ0FDcEIscUhBQXFILENBQ3RIO29CQUNELFFBQVEsQ0FBQyxhQUFhLENBQ3BCLHdZQUF3WSxDQUN6WTtvQkFDRCxRQUFRLENBQUMsYUFBYSxDQUNwQiwrVkFBK1YsQ0FDaFc7b0JBQ0QsUUFBUSxDQUFDLGFBQWEsQ0FDcEIsMlRBQTJULENBQzVUO29CQUNELFFBQVEsQ0FBQyxhQUFhLENBQ3BCLG1jQUFtYyxDQUNwYztvQkFDRCxRQUFRLENBQUMsYUFBYSxDQUNwQix3WUFBd1ksQ0FDelk7b0JBQ0QsUUFBUSxDQUFDLGFBQWEsQ0FDcEIsK1ZBQStWLENBQ2hXO29CQUNELFFBQVEsQ0FBQyxhQUFhLENBQ3BCLHNTQUFzUyxDQUN2UyxDQUFDO1lBQ0osS0FBSztnQkFDSCxRQUFRLENBQUMsYUFBYSxDQUNwQixzSEFBc0gsQ0FDdkg7b0JBQ0QsUUFBUSxDQUFDLGFBQWEsQ0FDcEIsd0hBQXdILENBQ3pIO29CQUNELFFBQVEsQ0FBQyxhQUFhLENBQ3BCLDJZQUEyWSxDQUM1WTtvQkFDRCxRQUFRLENBQUMsYUFBYSxDQUNwQixrV0FBa1csQ0FDblc7b0JBQ0QsUUFBUSxDQUFDLGFBQWEsQ0FDcEIsOFRBQThULENBQy9UO29CQUNELFFBQVEsQ0FBQyxhQUFhLENBQ3BCLGlVQUFpVSxDQUNsVTtvQkFDRCxRQUFRLENBQUMsYUFBYSxDQUNwQiwyWUFBMlksQ0FDNVk7b0JBQ0QsUUFBUSxDQUFDLGFBQWEsQ0FDcEIsa1dBQWtXLENBQ25XO29CQUNELFFBQVEsQ0FBQyxhQUFhLENBQ3BCLHlTQUF5UyxDQUMxUyxDQUFDO1lBQ0osWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ3hDLElBQUksS0FBSyxFQUFFO2dCQUNULEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM3QyxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFDLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3BCLElBQUksYUFBYSxHQUFXLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN2RCxZQUFZLENBQUMsS0FBSyxHQUFHLEdBQUcsYUFBYSxNQUFNLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDakU7YUFDRjtZQUVELElBQUksTUFBTSxFQUFFO2dCQUNWLE9BQU8sWUFBWSxDQUFDLGNBQWMsQ0FBQztnQkFDbkMsT0FBTyxZQUFZLENBQUMsWUFBWSxDQUFDO2FBQ2xDO1NBQ0Y7YUFBTSxJQUNMLFFBQVEsQ0FBQyxHQUFHLElBQUksc0JBQXNCO1lBQ3RDLFFBQVEsQ0FBQyxHQUFHLElBQUksNkJBQTZCO1lBQzdDLFFBQVEsQ0FBQyxHQUFHLElBQUksOEJBQThCLEVBQzlDO1lBQ0EsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7WUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDbkQ7YUFBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLDRCQUE0QixDQUFDLEVBQUU7WUFDOUQsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7WUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDbkQ7YUFBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLEVBQUU7WUFDMUQsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7WUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDL0M7YUFBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLDRCQUE0QixDQUFDLEVBQUU7WUFDOUQsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7WUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDbkQ7YUFBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFDLEVBQUU7WUFDM0QsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7WUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDaEQ7YUFBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzNDLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM3Qix5RUFBeUUsQ0FDMUUsQ0FBQztZQUNGLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hELFlBQVksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN2RSxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztTQUN2QzthQUFNLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsOEJBQThCLENBQUMsRUFBRTtZQUNoRSxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztZQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNqRCxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3pDLHFFQUFxRSxDQUN0RSxDQUFDLFdBQVcsQ0FBQztTQUNmO2FBQU0sSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO1lBQ3ZELFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3BELFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDekMsK0VBQStFLENBQ2hGLENBQUMsV0FBVyxDQUFDO1NBQ2Y7YUFBTSxJQUNMLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDO1lBQzFDLFFBQVEsQ0FBQyxhQUFhLENBQ3BCLCtFQUErRSxDQUNoRixLQUFLLElBQUksRUFDVjtZQUNBLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2xELFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDekMsK0VBQStFLENBQ2hGLENBQUMsV0FBVyxDQUFDO1NBQ2Y7S0FDRjtJQUVELElBQUksWUFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7UUFDaEMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN4QjtTQUFNO1FBQ0wsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztBQUNILENBQUMsQ0FBQyxDQUFDIn0=