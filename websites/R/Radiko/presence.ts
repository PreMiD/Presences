const presence = new Presence({
    clientId: "736620343279484959"
  }),
  _preStrings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  });

function generateArgs (args: string[]) {
  type ArgReturn = {
    mode: string
    radioStation?: string
  }

  const mode = args[0];
  let ret: ArgReturn;
  switch (mode) {
    case 'live':
      ret = {
        mode: 'live',
        radioStation: args[1]
      };
      break;
  
    default:
      ret = {
        mode: 'index'
      };
      break;
  }

  return ret;
}

presence.on('UpdateData', async () => {
  // code
  const preStrings = await _preStrings,
    defURL = document.URL.toString(),
    urlArgs = defURL.substring(
      defURL.startsWith('http://') ? 'http://'.length : 'https://'.length
    ),
    args = generateArgs(urlArgs.split('/').filter(url => url !== '#!').slice(1)),
    state: PresenceData = {
      details: 'Radiko',
      // state: 'Searching radio.',
      largeImageKey: 'largeimage',
      smallImageKey: 'largeimage',
      // smallImageText: preStrings.browsing
    };

  // Mode apabila tidak melakukan apapun
  if (args.mode === 'index') {
    state.state = 'Idle';
    state.smallImageText = preStrings.browsing;
  }
  // Mode ketika sedang membuka saluran radio
  else if (args.mode === 'live') {
    state.state = `Listening to ${args.radioStation} radio.`;
    state.smallImageText = preStrings.browsing;
  }

  presence.setActivity(state);
});
