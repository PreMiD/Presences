const presence = new Presence({
    clientId: '736620343279484959'
  }),
  _preStrings = presence.getStrings({
    play: 'presence.playback.playing',
    pause: 'presence.playback.paused',
    browsing: 'presence.activity.browsing'
  });

presence.on('UpdateData', async () => {
  // code
  const preStrings = await _preStrings,
    streamPlayer = document.getElementById('stream-player') as HTMLElement,
    whenPlayerIsOn = streamPlayer.style.display,
    state: PresenceData = {
      // details: 'Radiko',
      // state: 'Searching radio.',
      // smallImageKey: 'largeimage',
      // smallImageText: preStrings.browsing
      largeImageKey: 'largeimage'
    };

  // console.log(whenPlayerIsOn);
  // Apabila idling
  if (!whenPlayerIsOn || whenPlayerIsOn === 'none') {
    state.details = 'Idling';
    state.smallImageKey = 'largeimage';
    state.smallImageText = preStrings.browsing;
  }
  // Apabila lagi putar lagu
  else if (whenPlayerIsOn === 'block') {
    const _showTitle = document.querySelector(
      'a.slick-slide:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)'
    ) as HTMLElement,
      showTitle = _showTitle.textContent,
      defURL = document.querySelector('a.slick-slide:nth-child(1)').getAttribute('href')
        .split('/').slice(-1)[0]
      ;

    state.details = 'Listening to radio.';
    state.state = `${defURL} | ${showTitle}`;
    state.smallImageKey = 'largeimage';
    state.smallImageText = preStrings.play;
  }

  presence.setActivity(state);
});
