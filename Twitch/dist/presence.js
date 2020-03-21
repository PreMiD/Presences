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
    clientId: '607754656453623843'
});
var strings = presence.getStrings({
    play: 'presence.playback.playing',
    pause: 'presence.playback.paused',
    live: 'presence.activity.live'
});
var title, streamer, largeImage = 'twitch', smallImageKey, smallImageText, videoTime, videoDuration, live, elapsed, oldURL, type, logging = false;
presence.on('UpdateData', () => __awaiter(this, void 0, void 0, function* () {
    var elements = {
        squad: {
            users: document.querySelector('.tw-align-items-center.tw-flex.tw-mg-l-1:nth-child(2)'),
            user: index => {
                return document.querySelectorAll('.tw-interactive.tw-link.tw-link--hover-underline-none.tw-link--inherit')[index];
            }
        },
        live: {
            label: document.querySelector('.video-player .tw-channel-status-text-indicator'),
            title: document.querySelector('.tw-font-size-4.tw-line-height-body'),
            streamer: document.querySelector('.tw-font-size-5.tw-white-space-nowrap'),
            host: document.querySelector('.tw-c-text-overlay.tw-strong')
        },
        video: {
            title: document.querySelector('.tw-font-size-4.tw-strong'),
            streamer: document.querySelector('.tw-font-size-5.tw-white-space-nowrap'),
            time: document.querySelector('.vod-seekbar-time-labels > p:nth-child(1)'),
            duration: document.querySelector('.vod-seekbar-time-labels > p:nth-child(2)')
        },
        clip: {
            title: document.querySelector('.tw-font-size-4.tw-strong'),
            streamer: document.querySelector('.tw-font-size-5.tw-white-space-nowrap')
        }
    };
    if (window.location.href !== oldURL) {
        oldURL = window.location.href;
        elapsed = Math.floor(Date.now() / 1000);
    }
    var video = document.querySelector('video');
    var squad = document.querySelector('.squad-stream-top-bar__container');
    if (squad) {
        type = 'squad';
    }
    else if ((elements.live.title && elements.live.streamer && elements.live.label) ||
        elements.live.host) {
        type = 'live';
    }
    else if (elements.video.title &&
        elements.video.streamer &&
        elements.video.time &&
        elements.video.duration) {
        type = 'video';
    }
    else if (elements.clip.title && elements.clip.streamer) {
        type = 'clip';
    }
    else {
        type = 'browsing';
    }
    if (logging) {
        console.log(`Type: ${type}`);
        console.log(`Video Time: ${video ? video.currentTime : 0}`);
        console.log(`Video Duration: ${video ? video.duration : 0}`);
    }
    try {
        if (type === 'squad') {
            var users = [];
            var user_path = elements.squad.users;
            for (var index = 0; index <= user_path.children.length - 1; index++) {
                users = users.concat(elements.squad.user(index).textContent);
            }
            title = 'Squad Stream';
            streamer = users.join(', ');
            smallImageKey = 'live';
            smallImageText = (yield strings).live;
            videoTime = elapsed;
            videoDuration = undefined;
        }
        else if (type === 'live') {
            title = elements.live.title
                ? elements.live.title.textContent
                : `Hosting ${elements.live.host.textContent}`;
            streamer = elements.live.streamer.textContent;
            smallImageKey = 'live';
            smallImageText = (yield strings).live;
            videoTime = elapsed;
            videoDuration = undefined;
        }
        else if (type === 'video') {
            title = elements.video.title.textContent;
            streamer = elements.video.streamer.textContent;
            smallImageKey = video.paused ? 'pause' : 'play';
            smallImageText = video.paused
                ? (yield strings).pause
                : (yield strings).play;
            var timestamps = getElementTimestamps(elements.video.time.textContent, elements.video.duration.textContent);
            videoTime = timestamps[0];
            videoDuration = timestamps[1];
        }
        else if (type === 'clip') {
            title = elements.clip.title.textContent;
            streamer = elements.clip.streamer.textContent;
            smallImageKey = video.paused ? 'pause' : 'play';
            smallImageText = video.paused
                ? (yield strings).pause
                : (yield strings).play;
            var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            videoTime = timestamps[0];
            videoDuration = timestamps[1];
        }
        else if (type === 'browsing') {
            var location = window.location.pathname;
            title = 'Browsing';
            streamer = undefined;
            smallImageKey = undefined;
            smallImageText = undefined;
            videoTime = undefined;
            videoDuration = undefined;
            var user = location.match('/(\\S*)/(\\S*)');
            var user_header = document.querySelector('.tw-bold.tw-font-size-2');
            if (elements.live.streamer && user && user_header) {
                streamer = elements.live.streamer.textContent + "'s " + user[2];
            }
            if (location.match('/directory')) {
                streamer = 'Categories';
            }
            if (location.match('/directory/all')) {
                streamer = 'Live';
            }
            if (location.match('/directory/following')) {
                title = 'Browsing Following';
                streamer = 'Overview';
            }
            if (location.match('/directory/following/live')) {
                streamer = 'Live';
            }
            if (location.match('/directory/following/videos')) {
                streamer = 'Videos';
            }
            if (location.match('/directory/following/hosts')) {
                streamer = 'Hosts';
            }
            if (location.match('/directory/following/games')) {
                streamer = 'Categories';
            }
            if (location.match('/directory/following/channels')) {
                streamer = 'Channels';
            }
            if (location.match('/directory/game')) {
                title = 'Browsing Game';
                streamer = document.querySelector('.tw-c-text-base.tw-font-size-2.tw-strong').textContent;
            }
        }
    }
    catch (err) { }
    var data = {
        details: title,
        state: streamer,
        largeImageKey: largeImage,
        smallImageKey: smallImageKey,
        smallImageText: smallImageText,
        startTimestamp: videoTime,
        endTimestamp: videoDuration
    };
    if (video && video.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
    }
    if (title !== null && streamer !== null) {
        presence.setActivity(data, video ? !video.paused : true);
        presence.setTrayTitle(title);
    }
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function getElementTimestamps(audioTime, audioDuration) {
    var splitAudioTime = audioTime.split(':').reverse();
    var splitAudioDuration = audioDuration.split(':').reverse();
    var parsedAudioTime = getTime(splitAudioTime);
    var parsedAudioDuration = getTime(splitAudioDuration);
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function getTime(list) {
    var ret = 0;
    for (let index = list.length - 1; index >= 0; index--) {
        ret += parseInt(list[index]) * Math.pow(60, index);
    }
    return ret;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDaEMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLElBQUksRUFBRSx3QkFBd0I7Q0FDL0IsQ0FBQyxDQUFDO0FBRUgsSUFBSSxLQUFLLEVBQ1AsUUFBUSxFQUNSLFVBQVUsR0FBRyxRQUFRLEVBQ3JCLGFBQWEsRUFDYixjQUFjLEVBQ2QsU0FBUyxFQUNULGFBQWEsRUFDYixJQUFJLEVBQ0osT0FBTyxFQUNQLE1BQU0sRUFDTixJQUFJLEVBQ0osT0FBTyxHQUFHLEtBQUssQ0FBQztBQUVsQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFDbkMsSUFBSSxRQUFRLEdBQUc7UUFDYixLQUFLLEVBQUU7WUFDTCxLQUFLLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FDM0IsdURBQXVELENBQ3hEO1lBQ0QsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNaLE9BQU8sUUFBUSxDQUFDLGdCQUFnQixDQUM5Qix3RUFBd0UsQ0FDekUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNYLENBQUM7U0FDRjtRQUNELElBQUksRUFBRTtZQUNKLEtBQUssRUFBRSxRQUFRLENBQUMsYUFBYSxDQUMzQixpREFBaUQsQ0FDbEQ7WUFDRCxLQUFLLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxxQ0FBcUMsQ0FBQztZQUNwRSxRQUFRLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyx1Q0FBdUMsQ0FBQztZQUN6RSxJQUFJLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyw4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