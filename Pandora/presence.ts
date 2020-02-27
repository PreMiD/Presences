const presence = new Presence({
  clientId: '608109837657702566',
  mediaKeys: true
});
const strings = presence.getStrings({
  play: 'presence.playback.playing',
  pause: 'presence.playback.paused'
});

var state;

presence.on('UpdateData', async () => {
  var title, artist, smallImageKey, smallImageText, audioTime, audioDuration;

  var audioElement: HTMLAudioElement = document.querySelector(
    'audio:last-child'
  );
  audioElement === null
    ? (audioElement = document.querySelector('audio'))
    : null;

  var audioBar: HTMLElement = document.querySelector(
    '.Tuner__Audio__NowPlayingHitArea'
  );

  audioElement && audioBar ? (state = 'music') : (state = null);

  switch (state) {
    case 'music':
      title = document.querySelector('.Tuner__Audio__TrackDetail__title');
      artist = document.querySelector('.Tuner__Audio__TrackDetail__artist');

      if (title === null && artist === null) {
        return;
      } else {
        title = stripText(title, 'Title');
        artist = stripText(artist, 'Title');
      }

      smallImageKey = 'play';
      smallImageText = (await strings).play;
      var timestamps = getTimestamps(
        Math.floor(audioElement.currentTime),
        Math.floor(audioElement.duration)
      );
      audioTime = timestamps[0];
      audioDuration = timestamps[1];
      break;

    default:
      title = 'Browsing...';
      break;
  }

  var data: presenceData = {
    details: title,
    state: artist,
    largeImageKey: 'pandora',
    smallImageKey: smallImageKey,
    smallImageText: smallImageText,
    startTimestamp: audioTime,
    endTimestamp: audioDuration
  };

  if (state && audioElement && audioElement.paused) {
    delete data.startTimestamp;
    delete data.endTimestamp;
    data.smallImageKey = 'pause';
    data.smallImageText = (await strings).pause;
  }

  presence.setActivity(data, audioElement ? !audioElement.paused : true);
});

presence.on('MediaKeys', (key: string) => {
  if (state) {
    switch (key) {
      case 'pause':
        var pauseButton: HTMLButtonElement = document.querySelector(
          '.Tuner__Control__Play__Button'
        );
        pauseButton.click();
        break;
      case 'nextTrack':
        var nextButton: HTMLButtonElement = document.querySelector(
          '.Tuner__Control__Skip__Button'
        );
        nextButton.click();
        break;
    }
  }
});

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function stripText(
  element: HTMLElement,
  id: string = 'None',
  log: boolean = true
) {
  if (element && element.firstChild) {
    return element.firstChild.textContent;
  } else {
    if (log)
      console.log(
        '%cPandora%cERROR%c An error occurred while stripping data off the page. Please contact Alanexei on the PreMiD Discord server, and send him a screenshot of this error. ID: ' +
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
