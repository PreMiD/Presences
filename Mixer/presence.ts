const presence = new Presence({
  clientId: '607362931180699648',
  mediaKeys: true
});
const strings = presence.getStrings({
  play: 'presence.playback.playing',
  pause: 'presence.playback.paused',
  live: 'presence.activity.live'
});

// The synced variable determines whether or not the presence should stay on or should stay out of sync (disappear after one minute).

var oldUrl, elapsed, state;

presence.on('UpdateData', async () => {
  var title,
    streamer,
    smallImageKey,
    smallImageText,
    videoTime,
    videoDuration,
    synced;

  const videoElements: NodeListOf<HTMLVideoElement> = document.querySelectorAll(
    '.spectre-player'
  );
  var videoElement: HTMLVideoElement = document.querySelector("video");

  if (videoElements.length > 1) {
    state = 'clip';
  } else if (videoElements.length === 1) {
    const buttonElements: HTMLElement = document.querySelector(
      '.bui-tabs-bordered'
    );
    if (buttonElements) {
      state = 'video';
    } else {
      state = 'live';
    }
  } else {
    state = null;
  }

  if (oldUrl !== window.location.href) {
    oldUrl = window.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  title = document.querySelector('.title .wrapper');
  streamer = document.querySelector('h2.layout-row.layout-align-start-center');

  if (title === null && streamer === null) {
    state = null;
  } else {
    title = stripText(title, 'Title', state ? true : false);
    streamer = stripText(streamer, 'Streamer', state ? true : false);
  }

  switch (state) {
    case 'live':
      smallImageKey = 'live';
      smallImageText = (await strings).live;
      videoTime = elapsed;
      break;

    case 'video':
      smallImageKey = 'play';
      smallImageText = (await strings).play;
      var timestamps = getTimestamps(
        Math.floor(videoElement.currentTime),
        Math.floor(videoElement.duration)
      );
      videoTime = timestamps[0];
      videoDuration = timestamps[1];
      break;

    case 'clip':
      title = 'Watching a clip...';
      smallImageKey = 'play';
      smallImageText = (await strings).play;
      var timestamps = getTimestamps(
        Math.floor(videoElement.currentTime),
        Math.floor(videoElement.duration)
      );
      videoTime = timestamps[0];
      videoDuration = timestamps[1];
      break;

    default:
      title = 'Browsing...';
      streamer =
        window.location.pathname !== '/'
          ? window.location.pathname
              .split('/')
              .map((path, index) => {
                if (index !== 1)
                  return capitalize(path).replace(/[\[{()}\]]/g, '');
              })
              .join(' ')
          : 'Home';
      break;
  }

  var data: presenceData = {
    details: title,
    state: streamer,
    largeImageKey: 'mixer',
    smallImageKey: smallImageKey,
    smallImageText: smallImageText,
    startTimestamp: videoTime,
    endTimestamp: videoDuration
  };

  if (state && videoElement && videoElement.paused) {
    delete data.startTimestamp;
    delete data.endTimestamp;
    data.smallImageKey = 'pause';
    data.smallImageText = (await strings).pause;
  }

  presence.setActivity(data, synced && !videoElement.paused);
});

presence.on('MediaKeys', (key: string) => {
  if (state) {
    switch (key) {
      case 'pause':
        var video: HTMLVideoElement = document.querySelector('.light-player');
        video.paused ? video.play() : video.pause();
        break;
    }
  }
});

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function stripText(element: HTMLElement, id: string = 'None', log: boolean) {
  if (element && element.firstChild) {
    return element.firstChild.textContent;
  } else {
    if (log)
      console.log(
        '%cMixer%cERROR%c An error occurred while stripping data off the page. Please contact Alanexei on the PreMiD Discord server, and send him a screenshot of this error. ID: ' +
          id,
        'font-weight: 800; padding: 2px 5px; color: white; border-radius: 25px 0 0 25px; background: #596cae;',
        'font-weight: 800; padding: 2px 5px; color: white; border-radius: 0 25px 25px 0; background: #ff5050;',
        'color: unset;'
      );
    return null;
  }
}

function getTimestamps(videoTime: number, videoDuration: number) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
