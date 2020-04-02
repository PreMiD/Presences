var presence = new Presence({
    clientId: '607754656453623843'
});
var strings = presence.getStrings({
    play: 'presence.playback.playing',
    pause: 'presence.playback.paused',
    live: 'presence.activity.live'
});
var title, streamer, largeImage = 'twitch', smallImageKey, smallImageText, videoTime, videoDuration, live, elapsed, oldURL, type, logging = false;
presence.on('UpdateData', async () => {
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
        moderator: {
            title: document.querySelector('.tw-c-text-overlay.tw-font-size-5'),
            streamer: document.querySelector('p > a.tw-interactive.tw-link.tw-link--button.tw-link--overlay')
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
    else if (elements.moderator.title && elements.moderator.streamer) {
        type = 'moderator';
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
            smallImageText = (await strings).live;
            videoTime = elapsed;
            videoDuration = undefined;
        }
        else if (type === 'live' || type === 'moderator') {
            if (type !== 'moderator') {
                title = elements.live.title
                    ? elements.live.title.textContent
                    : `Hosting ${elements.live.host.textContent}`;
                streamer = elements.live.streamer.textContent;
            }
            if (window.location.pathname.match('/moderator')) {
                title = elements.moderator.title.textContent;
                streamer = `Moderating ${elements.moderator.streamer.textContent}`;
            }
            smallImageKey = 'live';
            smallImageText = (await strings).live;
            videoTime = elapsed;
            videoDuration = undefined;
        }
        else if (type === 'video') {
            title = elements.video.title.textContent;
            streamer = elements.video.streamer.textContent;
            smallImageKey = video.paused ? 'pause' : 'play';
            smallImageText = video.paused
                ? (await strings).pause
                : (await strings).play;
            var timestamps = getElementTimestamps(elements.video.time.textContent, elements.video.duration.textContent);
            videoTime = timestamps[0];
            videoDuration = timestamps[1];
        }
        else if (type === 'clip') {
            title = elements.clip.title.textContent;
            streamer = elements.clip.streamer.textContent;
            smallImageKey = video.paused ? 'pause' : 'play';
            smallImageText = video.paused
                ? (await strings).pause
                : (await strings).play;
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
        ret += parseInt(list[index]) * 60 ** index;
    }
    return ret;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDaEMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLElBQUksRUFBRSx3QkFBd0I7Q0FDL0IsQ0FBQyxDQUFDO0FBRUgsSUFBSSxLQUFLLEVBQ1AsUUFBUSxFQUNSLFVBQVUsR0FBRyxRQUFRLEVBQ3JCLGFBQWEsRUFDYixjQUFjLEVBQ2QsU0FBUyxFQUNULGFBQWEsRUFDYixJQUFJLEVBQ0osT0FBTyxFQUNQLE1BQU0sRUFDTixJQUFJLEVBQ0osT0FBTyxHQUFHLEtBQUssQ0FBQztBQUVsQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLFFBQVEsR0FBRztRQUNiLEtBQUssRUFBRTtZQUNMLEtBQUssRUFBRSxRQUFRLENBQUMsYUFBYSxDQUMzQix1REFBdUQsQ0FDeEQ7WUFDRCxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ1osT0FBTyxRQUFRLENBQUMsZ0JBQWdCLENBQzlCLHdFQUF3RSxDQUN6RSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ1gsQ0FBQztTQUNGO1FBQ0QsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQzNCLGlEQUFpRCxDQUNsRDtZQUNELEtBQUssRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLHFDQUFxQyxDQUFDO1lBQ3BFLFFBQVEsRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLHVDQUF1QyxDQUFDO1lBQ3pFLElBQUksRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLDhCQUE4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