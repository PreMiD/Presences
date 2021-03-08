const presence = new Presence({
  clientId: "658230518520741915"
}),
  startsTime = Math.floor(Date.now() / 1000),
  getStrings = async () =>
    presence.getStrings(
      {
        play: "general.playing",
        pause: "general.paused",
        browse: "general.browsing",
        viewMovie: "general.buttonViewMovie",
        viewEpisode: "general.buttonViewEpisode",
        viewPage: "general.viewPage",
        viewSeries: "general.buttonViewSeries",
    }, await presence.getSetting('lang'));

let oldLang: string = null,
    strings = getStrings(),
    currentTime: number, 
    duration: number, 
    paused: boolean, 
    playback: boolean,
    currentTimeS: number, 
    durationS: number, 
    pausedS: boolean, 
    title: string = "Loading...";

presence.on("iFrameData", (data: IFrameData) => {
  playback = (data.iframe_video?.duration || data.iframe_audio?.duration) !== undefined ? true : false;
  if (playback) {
    currentTime = data.iframe_video?.currentTime;
    duration = data.iframe_video?.duration;
    paused = data.iframe_video?.paused;
    title = data.iframe_audio?.title;
    currentTimeS = data.iframe_audio?.currentTime;
    durationS = data.iframe_audio?.duration;
    pausedS = data.iframe_audio?.paused;
  }
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "bbc_logo"
  },
    path = document.location.pathname,
    newLang = await presence.getSetting("lang"),
    IPlayer: IPlayerData = await presence.getPageletiable("__IPLAYER_REDUX_STATE__"),
    soundData: SoundData = await presence.getPageletiable("__PRELOADED_STATE__"),
    buttonsE = await presence.getSetting("buttons");

  if (!oldLang){
    oldLang = newLang;
  } else if (oldLang !== newLang){
    oldLang = newLang;
    strings = getStrings();
  }

  if (path.includes("/iplayer")) {
    presenceData.largeImageKey = "bbciplayer_logo";
    presenceData.details = (await strings).browse;

    if (path.includes("/iplayer/episode")){
      if (!duration) {
        if (IPlayer.channel?.onAir){
          presenceData.details = IPlayer.channel.title;
          presenceData.state = "Live";
          
          presenceData.smallImageKey = "live";
        } else if (!IPlayer.channel) {
          presenceData.details = (await strings).viewPage;
          presenceData.state = (IPlayer.episode || IPlayer.header).title;
  
          presenceData.startTimestamp = startsTime;
        }
      } else {
        const timestamps = presence.getTimestamps(currentTime, duration);
  
        presenceData.details = (IPlayer.episode || IPlayer.header).title;
        presenceData.state = (document.querySelector(
          '[class="typo typo--skylark play-cta__subtitle"]'
          ) || document.querySelector(
            '[class="typo typo--bold play-cta__title typo--skylark"]'
        ))?.textContent  || IPlayer.episode.labels?.category || "Animation";
  
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];
  
        presenceData.smallImageKey = paused ? "pause" : "play";
        presenceData.smallImageText = paused ? (await strings).pause : (await strings).play;
  
        if (IPlayer.relatedEpisodes?.count){
          presenceData.buttons = [
            {
              label: (await strings).viewEpisode,
              url: `https://www.bbc.co.uk/iplayer/episode/${document.location.pathname.split("/")[3]}`
            },
            {
              label: (await strings).viewSeries,
              url: `https://www.bbc.co.uk/iplayer/episode/${IPlayer.relatedEpisodes.episodes[0].episode.id}`
            }
          ]
        } else {
          presenceData.buttons = [
            {
              label: presenceData.state.toLocaleLowerCase().includes("film") ? (await strings).viewMovie : (await strings).viewEpisode,
              url: `https://www.bbc.co.uk/iplayer/episode/${document.location.pathname.split("/")[3]}`
            }
          ]
        }
  
        if (paused || !duration) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }
      }
    }
  } else if (path === "/iplayer") {
    presenceData.largeImageKey = "bbciplayer_logo";
    presenceData.details = (await strings).browse;

    presenceData.smallImageKey = "reading";
  } else if (path.includes("/sounds")){
    presenceData.largeImageKey = "bbcsounds_logo";
    presenceData.details = (await strings).browse;

    if (path.includes("/play/")){
      const timestamps = presence.getTimestamps(currentTimeS, durationS),
            isLive = path.includes("live:");

      presenceData.details = "Listening to:";

      if (isLive){
        presenceData.state = soundData.modules.data[0].data[0].network.short_title;
        presenceData.smallImageKey = "live";
      } else {
        presenceData.state = title;        
        presenceData.smallImageKey = (pausedS || !durationS) ? "pause" : "play";
      }

      presenceData.smallImageText = (pausedS || !durationS) ? (await strings).pause : (await strings).play;
      
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      presenceData.buttons = [{
          label: "Listen",
          url: `https://www.bbc.co.uk/sounds/play/${document.URL.split("/")[5]}`
      }];

      if (paused || isLive){
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    }
  }

  if (!buttonsE) delete presenceData.buttons

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});

interface IPlayerData {
  episode?: {
    title: string
    subtitle: string
    labels?: {
      category: string
    }
  }
  relatedEpisodes?: {
    count: number
    episodes: {
      episode: {
        id: string
        title: string
        subtile: string
        labels?: {
          category: string
        }
      }
    }[]
  }
  channel?: {
    title: string
    onAir: boolean
  }
  header?: {
    title: string
  }
}

interface BuutonI {
  ariaLabel: string
}

interface IFrameData {
  iframe_video: {
    duration: number
    currentTime: number
    paused: boolean
  }
  iframe_audio: {
    duration: number
    currentTime: number
    paused: boolean
    title: string
  }
}

interface SoundData {
   modules: {
     data: {
       data: {
         network: {
           short_title: string
         }
       }[]
     }[]
   }
}
