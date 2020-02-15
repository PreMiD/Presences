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
    clientId: `676041156437737472`,
    mediaKeys: false
}), strings = presence.getStrings({
    play: `presence.playback.playing`,
    pause: `presence.playback.paused`
});
var browsingStamp = Math.floor(Date.now() / 1000);
var title;
var titleName;
var path;
var siteArray;
var fullPath;
var animeArray;
var anime;
var episode;
var code;
var season;
var types;
var type;
var parameters;
var page;
var username;
var video;
var currentTime;
var paused;
var duration;
var timestamps;
presence.on(`UpdateData`, () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: `aw`
    };
    title = document.title;
    titleName = title.slice(0, -11);
    path = document.location.pathname;
    siteArray = path.split(`/`);
    fullPath = document.URL.slice(19);
    if (document.location.hostname == `aniwatch.me`) {
        if (path == `/` || path == `/home`) {
            presenceData.startTimestamp == browsingStamp;
            presenceData.details = `Viewing home page`;
        }
        else if (path.startsWith(`/anime`)) {
            if (siteArray.length >= 4) {
                animeArray = titleName.split(` - Episode `);
                anime = animeArray[0];
                episode = animeArray[1];
                presenceData.startTimestamp = browsingStamp;
                video = document.querySelector(`body div div div.main-section section div md-content md-tabs md-tabs-content-wrapper md-tab-content div div div div div div video`);
                currentTime = video.currentTime;
                duration = video.duration;
                paused = video.paused;
                timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
                if (!isNaN(duration)) {
                    presenceData.smallImageKey = paused ? `pause` : `play`;
                    presenceData.smallImageText = paused ? (yield strings).pause : (yield strings).play;
                    presenceData.startTimestamp = timestamps[0];
                    presenceData.endTimestamp = timestamps[1];
                    presenceData.details = `Watching: [${anime}]`;
                    presenceData.state = `Episode ${episode}`;
                    if (paused) {
                        delete presenceData.startTimestamp;
                        delete presenceData.endTimestamp;
                    }
                }
                else if (isNaN(duration)) {
                    presenceData.startTimestamp = browsingStamp;
                }
            }
            else {
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = (`Browsing: [${titleName}]`);
            }
        }
        else if (path.startsWith(`/watchlist`)) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = `Viewing watchlist`;
        }
        else if (path.startsWith(`/random`)) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = `Selecting random anime`;
        }
        else if (path.startsWith(`/search`)) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.smallImageKey = `search`;
            presenceData.smallImageText = `Searching...`;
            if (titleName == `Search`) {
                presenceData.details = `Searching for anime`;
            }
            else {
                presenceData.details = `${titleName}`;
            }
        }
        else if (path.startsWith(`/watch2gether`)) {
            presenceData.startTimestamp = browsingStamp;
            if (titleName == `Watch2Gether`) {
                presenceData.details = `Creating Watch2Gether`;
                presenceData.state = `room...`;
            }
            else {
                anime = document.querySelector(`body div div div.main-section section div md-content div div div div h2 span a`).innerHTML;
                episode = document.querySelector(`body div div div section div md-content div div div div h2 span.fs-18`).innerHTML;
                code = titleName.slice(21);
                presenceData.details = `In Watch2Gether room: ${code}`;
                if (!anime) {
                    presenceData.state = `Selecting anime...`;
                }
                else {
                    video = document.querySelector(`body div div div section div md-content div div div div div video`);
                    currentTime = video.currentTime;
                    duration = video.duration;
                    paused = video.paused;
                    timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
                    if (!isNaN(duration)) {
                        presenceData.smallImageKey = paused ? `pause` : `play`;
                        presenceData.smallImageText = paused ? (yield strings).pause : (yield strings).play;
                        presenceData.startTimestamp = timestamps[0];
                        presenceData.endTimestamp = timestamps[1];
                        if (paused) {
                            delete presenceData.startTimestamp;
                            delete presenceData.endTimestamp;
                        }
                    }
                    else if (isNaN(duration)) {
                        presenceData.startTimestamp = browsingStamp;
                    }
                    presenceData.state = `Watching: [${anime}] | ${episode}`;
                }
            }
        }
        else if (path.startsWith(`/stats`)) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = `Looking at the statistics`;
        }
        else if (path.startsWith(`/faq`)) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = `Reading the FAQ`;
        }
        else if (path.startsWith(`/seasonal`)) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = `Browsing seasonal anime`;
            if (siteArray.length >= 3) {
                season = [`Winter`, `Spring`, `Summer`, `Fall`];
                presenceData.state = `${season[siteArray[2]]} ${siteArray[3]}`;
            }
        }
        else if (path.startsWith(`/airing`)) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = `Browsing currently airing anime`;
        }
        else if (path.startsWith(`/top`)) {
            types = [`popular anime`, `popular seasonals`, `popular upcomings`, `hot anime`, `best rated anime`];
            parameters = fullPath.slice(5).split(`&`);
            type = parameters[0].slice(2);
            page = parameters[1].slice(2);
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = `Browsing ${types[type]}`;
            presenceData.state = `Page ${page}`;
        }
        else if (path.startsWith(`/requests`)) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = `Browsing anime requests`;
        }
        else if (path.startsWith(`/profile`)) {
            username = titleName.slice(0, -8);
            types = [`Overview`, `Biography`, `Chronicle`, `Animelist`, `Media`, `Friends`, `Settings`];
            type = fullPath.slice(13);
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = `Looking at ${username} profile`;
            if (types[type] == undefined) {
                presenceData.state = `Overview`;
            }
            else {
                presenceData.state = `${types[type]}`;
            }
        }
        else if (path.startsWith(`/notification`) || path == `/notification/view`) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = `Viewing notifications`;
            if (path == `/notification/settings`) {
                presenceData.state = `Notification settings`;
            }
        }
        else if (path.startsWith(`/donate`)) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = `Viewing donation page`;
        }
        else if (path.startsWith(`/logout`)) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = `Logging out...`;
        }
        else if (path.startsWith(`/login`)) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = `On the login page`;
        }
        else if (path.startsWith(`/policy`)) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = `Reading the privacy policy`;
            presenceData.smallImageKey = `reading`;
            presenceData.smallImageText = `Reading...`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUMxQixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDcEMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUMsSUFBSSxDQUFDLENBQUE7QUFDL0MsSUFBSSxLQUFXLENBQUM7QUFDaEIsSUFBSSxTQUFlLENBQUM7QUFDcEIsSUFBSSxJQUFVLENBQUM7QUFDZixJQUFJLFNBQWUsQ0FBQztBQUNwQixJQUFJLFFBQWMsQ0FBQztBQUNuQixJQUFJLFVBQWdCLENBQUM7QUFDckIsSUFBSSxLQUFXLENBQUM7QUFDaEIsSUFBSSxPQUFhLENBQUM7QUFDbEIsSUFBSSxJQUFVLENBQUM7QUFDZixJQUFJLE1BQVksQ0FBQztBQUNqQixJQUFJLEtBQVcsQ0FBQztBQUNoQixJQUFJLElBQVUsQ0FBQztBQUNmLElBQUksVUFBZ0IsQ0FBQztBQUNyQixJQUFJLElBQVUsQ0FBQztBQUNmLElBQUksUUFBYyxDQUFDO0FBRW5CLElBQUksS0FBd0IsQ0FBQztBQUM3QixJQUFJLFdBQWlCLENBQUM7QUFDdEIsSUFBSSxNQUFZLENBQUM7QUFDakIsSUFBSSxRQUFjLENBQUM7QUFDbkIsSUFBSSxVQUFnQixDQUFDO0FBRXJCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUVqQyxJQUFJLFlBQVksR0FBaUI7UUFDN0IsYUFBYSxFQUFFLElBQUk7S0FDdEIsQ0FBQztJ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