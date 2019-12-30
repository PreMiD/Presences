var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value);
            }).then(fulfilled, rejected);
      }
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
var title,
  streamer,
  largeImage = 'twitch',
  smallImageKey,
  smallImageText,
  videoTime,
  videoDuration,
  live,
  elapsed,
  oldURL,
  type,
  logging = false;
presence.on('UpdateData', () =>
  __awaiter(this, void 0, void 0, function*() {
    var elements = {
      squad: {
        users: document.querySelector(
          '.tw-align-items-center.tw-flex.tw-mg-l-1:nth-child(2)'
        ),
        user: index => {
          return document.querySelectorAll(
            '.tw-interactive.tw-link.tw-link--hover-underline-none.tw-link--inherit'
          )[index];
        }
      },
      live: {
        label: document.querySelector('.tw-channel-status-text-indicator'),
        title: document.querySelector('.tw-font-size-4.tw-line-height-body'),
        streamer: document.querySelector(
          '.tw-font-size-5.tw-white-space-nowrap'
        ),
        host: document.querySelector('.tw-c-text-overlay.tw-strong')
      },
      video: {
        title: document.querySelector('.tw-font-size-4.tw-strong'),
        streamer: document.querySelector(
          '.tw-font-size-5.tw-white-space-nowrap'
        ),
        time: document.querySelector(
          '.vod-seekbar-time-labels > p:nth-child(1)'
        ),
        duration: document.querySelector(
          '.vod-seekbar-time-labels > p:nth-child(2)'
        )
      },
      clip: {
        title: document.querySelector('.tw-font-size-4.tw-strong'),
        streamer: document.querySelector(
          '.tw-font-size-5.tw-white-space-nowrap'
        )
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
    } else if (
      (elements.live.title && elements.live.streamer && elements.live.label) ||
      elements.live.host
    ) {
      type = 'live';
    } else if (
      elements.video.title &&
      elements.video.streamer &&
      elements.video.time &&
      elements.video.duration
    ) {
      type = 'video';
    } else if (elements.clip.title && elements.clip.streamer) {
      type = 'clip';
    } else {
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
      } else if (type === 'live') {
        title = elements.live.title
          ? elements.live.title.textContent
          : `Hosting ${elements.live.host.textContent}`;
        streamer = elements.live.streamer.textContent;
        smallImageKey = 'live';
        smallImageText = (yield strings).live;
        videoTime = elapsed;
        videoDuration = undefined;
      } else if (type === 'video') {
        title = elements.video.title.textContent;
        streamer = elements.video.streamer.textContent;
        smallImageKey = video.paused ? 'pause' : 'play';
        smallImageText = video.paused
          ? (yield strings).pause
          : (yield strings).play;
        var timestamps = getElementTimestamps(
          elements.video.time.textContent,
          elements.video.duration.textContent
        );
        videoTime = timestamps[0];
        videoDuration = timestamps[1];
      } else if (type === 'clip') {
        title = elements.clip.title.textContent;
        streamer = elements.clip.streamer.textContent;
        smallImageKey = video.paused ? 'pause' : 'play';
        smallImageText = video.paused
          ? (yield strings).pause
          : (yield strings).play;
        var timestamps = getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        );
        videoTime = timestamps[0];
        videoDuration = timestamps[1];
      } else if (type === 'browsing') {
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
          streamer = document.querySelector(
            '.tw-c-text-base.tw-font-size-2.tw-strong'
          ).textContent;
        }
      }
    } catch (err) {}
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
  })
);
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
  var endTime =
    Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
  return [Math.floor(startTime / 1000), endTime];
}
function getTime(list) {
  var ret = 0;
  for (let index = list.length - 1; index >= 0; index--) {
    ret += parseInt(list[index]) * Math.pow(60, index);
  }
  return ret;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7Q0FDL0IsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNoQyxJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsSUFBSSxFQUFFLHdCQUF3QjtDQUMvQixDQUFDLENBQUM7QUFFSCxJQUFJLEtBQUssRUFDUCxRQUFRLEVBQ1IsVUFBVSxHQUFHLFFBQVEsRUFDckIsYUFBYSxFQUNiLGNBQWMsRUFDZCxTQUFTLEVBQ1QsYUFBYSxFQUNiLElBQUksRUFDSixPQUFPLEVBQ1AsTUFBTSxFQUNOLElBQUksRUFDSixPQUFPLEdBQUcsS0FBSyxDQUFDO0FBRWxCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUNuQyxJQUFJLFFBQVEsR0FBRztRQUNiLEtBQUssRUFBRTtZQUNMLEtBQUssRUFBRSxRQUFRLENBQUMsYUFBYSxDQUMzQix1REFBdUQsQ0FDeEQ7WUFDRCxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ1osT0FBTyxRQUFRLENBQUMsZ0JBQWdCLENBQzlCLHdFQUF3RSxDQUN6RSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ1gsQ0FBQztTQUNGO1FBQ0QsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUNBQW1DLENBQUM7WUFDbEUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMscUNBQXFDLENBQUM7WUFDcEUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsdUNBQXVDLENBQUM7WUFDekUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsOEJB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
