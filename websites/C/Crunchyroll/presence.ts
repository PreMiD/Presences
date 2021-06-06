const presence = new Presence({
    clientId: "608065709741965327"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browse: "presence.activity.browsing",
    reading: "presence.activity.reading",
    viewManga: "general.viewManga",
    watchEpisode: "general.buttonViewEpisode",
    manga: "general.manga"
  });

let lastPlaybackState = null,
  playback: boolean,
  browsingStamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState !== playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}

let iFrameVideo: boolean,
  currentTime: number,
  duration: number,
  paused: boolean;

interface iFrameData {
  iframe_video: {
    iFrameVideo: boolean;
    currTime: number;
    dur: number;
    paused: boolean;
  };
}

presence.on("iFrameData", (data: iFrameData) => {
  playback = data.iframe_video !== null ? true : false;

  if (playback) {
    iFrameVideo = data.iframe_video.iFrameVideo;
    currentTime = data.iframe_video.currTime;
    duration = data.iframe_video.dur;
    paused = data.iframe_video.paused;
  }
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "lg"
  };

  if (!playback && document.location.pathname.includes("/manga")) {
    if (document.location.pathname.includes("/read")) {
      const title = document.querySelector(".chapter-header a").innerHTML,
        currChapter = document
          .querySelector(".chapter-header")
          .innerHTML.split("</a>")[1]
          .split("\n")[0],
        lastPage = document.querySelector(".images").children.length,
        currPage =
          document.querySelector(".first-page-number").innerHTML === ""
            ? "1"
            : document.querySelector(".first-page-number").innerHTML;

      presenceData.details = title;
      presenceData.state = `${(await strings).reading} ${currChapter}`;
      presenceData.startTimestamp = browsingStamp;
      presenceData.smallImageKey = "book_open";
      presenceData.smallImageText = `Page ${currPage}/${lastPage}`;
      presenceData.buttons = [
        {
          label: "Read Chapter",
          url: document.location.toString()
        }
      ];
    } else if (document.location.pathname.includes("/volumes")) {
      const title = document
        .querySelector(".ellipsis")
        .innerHTML.split("&gt;")[1];

      presenceData.details = (await strings).viewManga;
      presenceData.state = title;
      presenceData.buttons = [
        {
          label: "View " + (await strings).manga,
          url: document.location.toString()
        }
      ];
    } else {
      presenceData.details = (await strings).browse;
      presenceData.startTimestamp = browsingStamp;

      delete presenceData.state;
      delete presenceData.smallImageKey;
    }

    presence.setActivity(presenceData);
  }

  if (!playback && !document.location.pathname.includes("/manga")) {
    presenceData.details = (await strings).browse;
    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData, true);
  }

  if (iFrameVideo !== false && !isNaN(duration)) {
    let videoTitle,
    type,
    episode,
    season;
    if (document.location.hostname.startsWith("beta")) {
      const episodeid = document.location.pathname.match(/watch\/(.*)\/.*/),
      url = `https://beta-api.crunchyroll.com/cms/v2/US/M3/-/objects/${episodeid[1]}?Signature=A58Y6P76n7z72bcueov582lZiJcWCoJ-~AKn4y6khza30izYCquaIvRH9lhX6mY2goJpCyc9c74mI4QdWwYna8kfHUMiZmgD3ofvSGyZX88XTiR~nSVfNmBmRiGpPAR1MkRYe3pFWbAHOqPMNB89EKCg1Ho~LdecTbuQ3seOMip9QYYH6Z8T0GCFJlOxS3sMKT0hPak~nYHrj4La-IEmAe6PwbSxg59j3iIB7u8ft020CIkel68O~PjPL~MSot1eU7GZMGVQAkAOnKoZFLt~H2KeFQdHzsfp8Ns39jKNcvMwQ9BGU8XlEWQTBCNrWOycnTvafvBCPqFYXWMiTtiNXg__&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9iZXRhLWFwaS5jcnVuY2h5cm9sbC5jb20vY21zL3Y~L1VTL00zLy0vKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYyMzA5MDU0M319fV19&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA`,
      obj = await (await fetch(url)).json(),
      metadata = await obj.items[0],
      episod = `E${metadata.episode_metadata.episode_number} - ${metadata.title}`;

      type = metadata.episode_metadata.is_dubbed === true ? " (Dub)" : " (Sub)";
      videoTitle = metadata.episode_metadata.series_title + type;
      season = `S${metadata.episode_metadata.season_number}`;
      episode = season + episod;
    } else {
      videoTitle = document.querySelector(".ellipsis .text-link span").innerHTML;
      const episod = document.querySelectorAll("#showmedia_about_media h4"),
        epName = document.querySelector("h4#showmedia_about_name");
      episode = `${episod[1].innerHTML} - ${epName.innerHTML}`;
    }
    const timestamps = presence.getTimestamps(
      Math.floor(currentTime),
      Math.floor(duration)
    );
    presenceData.smallImageKey = paused ? "pause" : "play";
    presenceData.smallImageText = paused
      ? (await strings).pause
      : (await strings).play;
    presenceData.endTimestamp = timestamps[1];

    presence.setTrayTitle(
      paused
        ? ""
        : videoTitle !== null
        ? videoTitle
        : "Title not found..."
    );

    presenceData.details =
      videoTitle !== null ? videoTitle : "Title not found...";
    presenceData.state = episode;

    if (paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    if (videoTitle !== null) {
      presenceData.buttons = [
        {
          label: (await strings).watchEpisode,
          url: document.location.toString()
        }
      ];
      presence.setActivity(presenceData, !paused);
    }
  }
});
