interface LangStrings {
  play: string;
  pause: string;
  episode: string;
  browse: string;
  searchFor: string;
  watchVideo: string;
  watchEpisode: string;
  watchMovie: string;
}

const presence = new Presence({
    clientId: "809748404963770398"
  }),
  getStrings = async (): Promise<LangStrings> =>
    presence.getStrings(
      {
        play: "general.playing",
        pause: "general.paused",
        browse: "general.browsing",
        episode: "general.episode",
        searchFor: "general.searchFor",
        watchVideo: "general.buttonWatchVideo",
        watchMovie: "general.buttonViewMovie",
        watchEpisode: "general.buttonViewEpisode"
    }, await presence.getSetting('lang')), 
    browsingStamp = Math.floor(Date.now() / 1000);
      
let strings: Promise<LangStrings> = getStrings(),
    oldLang: string = null;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "iqiyi_logo",
      details: (await strings).browse,
      smallImageKey: "search",
      smallImageText: (await strings).browse,
      startTimestamp: browsingStamp
    },
    newLang = await presence.getSetting("lang"),
    showButtons: boolean = await presence.getSetting("buttons"),
    searchQuery: boolean = await presence.getSetting("searchQuery");
  
  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  if (document.location.pathname.includes('/play') || document.location.pathname.includes("/intl-common/")){

      const data = {
          title: (document.querySelector('h1 a') || document.querySelector('title'))?.textContent,
          ep: (document.querySelector('h1') || document.querySelector(".topice-source-list-item.item-active"))?.textContent.replace(document.querySelector('h1 a')?.textContent || "", '')
      },

      URLItem: string = JSON.parse(document.querySelectorAll('script[type="application/ld+json"]')[1]?.innerHTML || "{}")[0]?.itemListElement[0]?.item ?? document.URL,
      video: HTMLVideoElement = document.querySelector('video'),
      isMovie = URLItem.includes('movie'),
      isVShow = URLItem.includes('variety-show'),
      isVShowToo = document.location.pathname.includes("/intl-common/"),
      isTrial = document.querySelector('.iqp-player-g.iqp-player .iqp-tip-stream .iqp-txt-vip')?.textContent !== undefined,
      lastestEp: string[] = document.querySelector('div.broken-line')?.nextSibling?.nextSibling?.nextSibling?.textContent?.match(/[1-9]?[0-9]?[0-9]/g),
      contentEp: string[] = isVShowToo ?  data.ep.match(/([1-9]?[0-9]?[0-9]? ?\([1-9]?[0-9]\))/g) : data.ep.match(/[1-9]?[0-9]?[0-9]/g),
      isPreview = (lastestEp && contentEp && !isVShow && !isVShowToo) ? parseInt(contentEp[0], 10) > parseInt(lastestEp[0], 10) : data.ep.toLowerCase().includes("preview");

      if (!data.ep && !isVShow && isMovie) data.ep = "Movie";
      if (isVShowToo) { 

          if (contentEp?.length){
              data.ep = `${(await strings).episode} ${contentEp[0].match(/.+?(?=\()/g)[0]} ${contentEp[0].includes("(") ? `- ${contentEp[0].match(/(\([1-9]?[0-9]\))/g)[0]}` : "Variety show"}`;
          } else {
              data.ep = `Variety show`;
          }

          data.title = data.title.match(/.+?(?=\s{2})/g)[0];
      }
      if (isVShow && !isVShowToo) data.ep = "Variety show";
      if (!isVShow && !isVShowToo && !isMovie && contentEp !== null) data.ep = `${(await strings).episode} ${contentEp[0]}`;
      else if (!isVShow && !isVShowToo && !isMovie) data.ep = "Highlight";

      if (isTrial && !isPreview) data.ep = `${data.ep} (Trial)`;

      if (video !== null && !Number.isNaN(Number(video.duration))){
          const timestamps: number[] = presence.getTimestampsfromMedia(video);

          if (isPreview && !isMovie) data.ep = `${data.ep} preview`;
          else if (video.duration < 270 && !isMovie && !isPreview && !isTrial) data.ep = "Highlight";

          presenceData.details = data.title;
          presenceData.state = data.ep;

          presenceData.smallImageKey = video.paused ? "pause" : "play";
          presenceData.smallImageText = video.paused ? (await strings).pause : (await strings).play;

          presenceData.startTimestamp = timestamps[0];
          presenceData.endTimestamp = timestamps[1];

          if (showButtons){
              presenceData.buttons = [{
                  label: isVShow ? (await strings).watchVideo : isMovie ? (await strings).watchMovie : (await strings).watchEpisode,
                  url: `https://www.iq.com/play/${document.URL.split("?")[0].split("/")[4]}`
              }];
          } else delete presenceData.buttons;

          if (video.paused){
              delete presenceData.startTimestamp;
              delete presenceData.endTimestamp;
          }
      } else {
          presenceData.details = "Looking at:";
          presenceData.state = data.title;
          presenceData.startTimestamp = browsingStamp;
      }

  } else if (document.location.pathname.includes('/search')){
      const searchQuery_ = decodeURI(document.location.search.replace('?query=', '')),
      result = document.querySelector('div.has-result')?.textContent.match(/[0-9]?[0-9]?[0-9]?[0-9]/)[0];

      presenceData.details = `${(await strings).searchFor} ${searchQuery ? searchQuery_  : "( Hidden )"}`;
      presenceData.startTimestamp = browsingStamp;
      presenceData.smallImageKey = "search";

    if (result){
      presenceData.state = `${result} matching ${parseInt(result, 10) > 1 ? "results" : "result"}`;
    } else {
      presenceData.state = `No matching result`;
    }
  }

  presence.setActivity(presenceData);
});
