var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "645028677033132033",
    
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var replace;
var search;
var language;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "plex"
    };
    language = window.navigator.language;
    if (document.location.hostname == "app.plex.tv") {
        if (document.querySelector("#plex > div:nth-child(7) > div > div > video") !== null || document.querySelector("#plex > div:nth-child(7) > div > div > audio") !== null) {
            var currentTime, duration, paused, timestamps, video;
            video = document.querySelector("#plex > div:nth-child(7) > div > div > video") || document.querySelector("#plex > div:nth-child(7) > div > div > audio");
            currentTime = video.currentTime;
            duration = video.duration;
            paused = video.paused;
            timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
            presenceData.smallImageKey = paused ? "pause" : "play";
            presenceData.smallImageText = paused ? (yield strings).pause : (yield strings).play;
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            user = document.querySelector("#plex > div:nth-child(7) > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(2) > a") || document.querySelector("#plex > div:nth-child(7) > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(2) > div > div > a") || document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH.AudioVideoFullPlayer-hideControls-3B1pWE > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > a") || document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > a") || document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > a") || document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH.AudioVideoFullPlayer-hideControls-3B1pWE > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div.ControlsContainer-controlsContainer-1Wn7vp > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > span:nth-child(1)") || document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH.AudioVideoFullPlayer-hideControls-3B1pWE > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > a") || document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > a") || document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div:nth-child(2) > div > div > div.PlayerControls-controls-e59abb.PlayerControls-hasLandscapePoster-23Gat5 > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div.PlayerControlsMetadata-container-2wqMfv > a");
            title = document.querySelector("#plex > div:nth-child(7) > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(2) > span > a") || document.querySelector("#plex > div:nth-child(7) > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(2) > div > div > span") || document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH.AudioVideoFullPlayer-hideControls-3B1pWE > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > span") || document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > span") || document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > span") || document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH.AudioVideoFullPlayer-hideControls-3B1pWE > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div.AudioVideoInfoBar-container-2ewFys > div:nth-child(1)") || document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH.AudioVideoFullPlayer-hideControls-3B1pWE > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > span") || document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div.AudioVideoFullPlayer-fullPlayer-3bJyOR.AudioVideoFullPlayer-isVideo-1aASwH > div.AudioVideoFullPlayer-bottomBar-2yixi6.AudioVideoFullPlayer-bar-dDYeoN > div > div > div.PlayerControls-controls-e59abb > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div > span") || document.querySelector("#plex > div.AudioVideoPlayerView-container-kWiFsz > div > div:nth-child(2) > div > div > div.PlayerControls-controls-e59abb.PlayerControls-hasLandscapePoster-23Gat5 > div.PlayerControls-buttonGroupLeft-3vLk-g.PlayerControls-buttonGroup-4L6Pw- > div.PlayerControlsMetadata-container-2wqMfv > span");
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
        else if (document.URL == "https://app.plex.tv/" || document.URL == "https://app.plex.tv/desktop" || document.URL == "https://app.plex.tv/desktop#") {
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
            presenceData.state = search.textContent.split("\"")[1].replace("\"", "");
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
        else if (document.URL.includes("content.playlists") && document.querySelector("#content > div > div > div:nth-child(2) > div > div > div:nth-child(3) > span") !== null) {
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
}));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFBO0FBRUYsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUMsSUFBSSxDQUFDLENBQUE7QUFFL0MsSUFBSSxJQUFVLENBQUE7QUFDZCxJQUFJLEtBQVcsQ0FBQTtBQUNmLElBQUksT0FBYSxDQUFBO0FBQ2pCLElBQUksTUFBWSxDQUFBO0FBQ2hCLElBQUksUUFBYSxDQUFBO0FBRWpCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUduQyxJQUFJLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLE1BQU07S0FDdEIsQ0FBQTtJQUVELFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztJQUtyQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWEsRUFBRTtRQUMvQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsOENBQThDLENBQUMsS0FBSyxJQUFJLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyw4Q0FBOEMsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUN0SyxJQUFJLFdBQWlCLEVBQUUsUUFBYyxFQUFFLE1BQVksRUFBRSxVQUFnQixFQUFFLEtBQXdCLENBQUE7WUFDL0YsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsOENBQThDLENBQUMsSUFBSSxR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