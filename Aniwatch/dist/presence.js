var presence = new Presence({
    clientId: `676041156437737472`
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
presence.on(`UpdateData`, async () => {
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
                    presenceData.smallImageText = paused
                        ? (await strings).pause
                        : (await strings).play;
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
                presenceData.details = `Browsing: [${titleName}]`;
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
                        presenceData.smallImageText = paused
                            ? (await strings).pause
                            : (await strings).play;
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
            types = [
                `popular anime`,
                `popular seasonals`,
                `popular upcomings`,
                `hot anime`,
                `best rated anime`
            ];
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
            types = [
                `Overview`,
                `Biography`,
                `Chronicle`,
                `Animelist`,
                `Media`,
                `Friends`,
                `Settings`
            ];
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
        else if (path.startsWith(`/notification`) ||
            path == `/notification/view`) {
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
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDbEQsSUFBSSxLQUFVLENBQUM7QUFDZixJQUFJLFNBQWMsQ0FBQztBQUNuQixJQUFJLElBQVMsQ0FBQztBQUNkLElBQUksU0FBYyxDQUFDO0FBQ25CLElBQUksUUFBYSxDQUFDO0FBQ2xCLElBQUksVUFBZSxDQUFDO0FBQ3BCLElBQUksS0FBVSxDQUFDO0FBQ2YsSUFBSSxPQUFZLENBQUM7QUFDakIsSUFBSSxJQUFTLENBQUM7QUFDZCxJQUFJLE1BQVcsQ0FBQztBQUNoQixJQUFJLEtBQVUsQ0FBQztBQUNmLElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxVQUFlLENBQUM7QUFDcEIsSUFBSSxJQUFTLENBQUM7QUFDZCxJQUFJLFFBQWEsQ0FBQztBQUVsQixJQUFJLEtBQXVCLENBQUM7QUFDNUIsSUFBSSxXQUFnQixDQUFDO0FBQ3JCLElBQUksTUFBVyxDQUFDO0FBQ2hCLElBQUksUUFBYSxDQUFDO0FBQ2xCLElBQUksVUFBZSxDQUFDO0FBRXBCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksWUFBWSxHQUFpQjtRQUMvQixhQUFhLEVBQUUsSUFBSTtLQUNwQixDQUFDO0lBRUYsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENB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