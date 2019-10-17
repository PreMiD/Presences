var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: '607754656453623843',
    mediaKeys: true
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
            label: document.querySelector('.player-streamstatus__label'),
            title: document.querySelector('.tw-font-size-4.tw-line-height-body'),
            streamer: document.querySelector('.tw-font-size-5.tw-white-space-nowrap'),
            host: document.querySelector('.tw-c-text-overlay.tw-strong')
        },
        video: {
            title: document.querySelector('.tw-font-size-4.tw-strong'),
            streamer: document.querySelector('.tw-font-size-5.tw-white-space-nowrap'),
            time: document.querySelector('div.player-seek__time-container > span:nth-child(1)'),
            duration: document.querySelector('span.player-seek__time.player-seek__time--total')
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
    var video = document.querySelector('div.player-video > video');
    var squad = document.querySelector('.squad-stream-top-bar__container');
    if (squad) {
        type = 'squad';
    }
    else if ((elements.live.title && elements.live.label) ||
        elements.live.host) {
        type = 'live';
    }
    else if (elements.video.title) {
        type = 'video';
    }
    else if (elements.clip.title) {
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
            if (user && user_header) {
                streamer = user[1] + "'s " + user[2];
            }
            if (elements.live.streamer) {
                streamer = elements.live.streamer.textContent;
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
presence.on('MediaKeys', (key) => {
    switch (key) {
        case 'pause':
            var pause = document.querySelector('div.player-buttons-left > button');
            if (pause)
                pause.click();
            break;
    }
});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLElBQUk7Q0FDaEIsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNoQyxJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsSUFBSSxFQUFFLHdCQUF3QjtDQUMvQixDQUFDLENBQUM7QUFFSCxJQUFJLEtBQUssRUFDUCxRQUFRLEVBQ1IsVUFBVSxHQUFHLFFBQVEsRUFDckIsYUFBYSxFQUNiLGNBQWMsRUFDZCxTQUFTLEVBQ1QsYUFBYSxFQUNiLElBQUksRUFDSixPQUFPLEVBQ1AsTUFBTSxFQUNOLElBQUksRUFDSixPQUFPLEdBQUcsS0FBSyxDQUFDO0FBRWxCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUNuQyxJQUFJLFFBQVEsR0FBRztRQUNiLEtBQUssRUFBRTtZQUNMLEtBQUssRUFBRSxRQUFRLENBQUMsYUFBYSxDQUMzQix1REFBdUQsQ0FDeEQ7WUFDRCxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ1osT0FBTyxRQUFRLENBQUMsZ0JBQWdCLENBQzlCLHdFQUF3RSxDQUN6RSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ1gsQ0FBQztTQUNGO1FBQ0QsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsNkJBQTZCLENBQUM7WUFDNUQsS0FBSyxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMscUNBQXFDLENBQUM7WUFDcEUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsMkJBQTJCLENBQUM7WUFDN0QsSUFBSSxFQUFFLFFB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