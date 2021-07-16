const presence = new Presence({
  clientId: "608065709741965327"
});

interface LangStrings {
  play: string;
  pause: string;
  browse: string;
  reading: string;
  viewManga: string;
  watchEpisode: string;
  viewSeries: string;
  manga: string;
  chapter: string;
  page: string;
}

async function getStrings(): Promise<LangStrings> {
  return presence.getStrings(
    {
      play: "presence.playback.playing",
      pause: "presence.playback.paused",
      browse: "presence.activity.browsing",
      reading: "presence.activity.reading",
      viewManga: "general.viewManga",
      watchEpisode: "general.buttonViewEpisode",
      viewSeries: "general.buttonViewSeries",
      manga: "general.manga",
      chapter: "general.chapter",
      page: "general.page"
    },
    await presence.getSetting("lang").catch(() => "en")
  );
}

let strings: Promise<LangStrings> = getStrings(),
  oldLang: string = null,
  lastPlaybackState = null,
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
  iFrameVideoData: {
    iFrameVideo: boolean;
    currTime: number;
    dur: number;
    paused: boolean;
  };
}

presence.on("iFrameData", (data: iFrameData) => {
  playback = data.iFrameVideoData !== null ? true : false;

  if (playback) {
    ({
      iFrameVideo,
      currTime: currentTime,
      dur: duration,
      paused
    } = data.iFrameVideoData);
  }
});

presence.on("UpdateData", async () => {
  const newLang = await presence.getSetting("lang").catch(() => "en");
  if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  const presenceData: PresenceData = {
    largeImageKey: "lg"
  };

  if (!playback && document.location.pathname.includes("/manga")) {
    if (document.location.pathname.includes("/read")) {
      const title = document.querySelector(".chapter-header a").innerHTML,
        [currChapter] = document
          .querySelector(".chapter-header")
          .innerHTML.split("</a>")[1]
          .split("\n"),
        lastPage = document.querySelector(".images").children.length,
        currPage =
          document.querySelector(".first-page-number").innerHTML === ""
            ? "1"
            : document.querySelector(".first-page-number").innerHTML;

      presenceData.details = title;
      presenceData.state = `${(await strings).reading} ${currChapter}`;
      presenceData.startTimestamp = browsingStamp;
      presenceData.smallImageKey = "book_open";
      presenceData.smallImageText = `${
        (await strings).page
      } ${currPage}/${lastPage}`;
      presenceData.buttons = [
        {
          label: `Read ${(await strings).chapter}`,
          url: document.location.toString()
        }
      ];
    } else if (document.location.pathname.includes("/volumes")) {
      const [, title] = document
        .querySelector(".ellipsis")
        .innerHTML.split("&gt;");

      presenceData.details = (await strings).viewManga;
      presenceData.state = title;
      presenceData.buttons = [
        {
          label: `View ${(await strings).manga}`,
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
      series: HTMLElement,
      seriesLink,
      episode,
      epName,
      seasonregex,
      seasonName;
    if (document.location.hostname.startsWith("beta")) {
      seriesLink =
        document.location.origin +
        document.querySelector(".show-title-link").getAttribute("href");
      episode = document.querySelector(
        ".c-heading.c-heading--xs.c-heading--family-type-one.title"
      ).innerHTML;
      [, epName] = episode.match(/.* - (.*)/);
      epName = epName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      seasonregex = new RegExp(`(.*) ${epName} -`);
      [, seasonName] = document.title.match(seasonregex);
      videoTitle = seasonName;
    } else {
      series = document.querySelector(".ellipsis .text-link");
      videoTitle = series.innerText;
      seriesLink = series.getAttribute("href");
      const episod = document.querySelectorAll("#showmedia_about_media h4"),
        epName = document.querySelector("h4#showmedia_about_name");
      episode = `${episod[1].innerHTML} - ${epName.innerHTML}`;
    }
    const [, endTimestamp] = presence.getTimestamps(
      Math.floor(currentTime),
      Math.floor(duration)
    );
    presenceData.smallImageKey = paused ? "pause" : "play";
    presenceData.smallImageText = paused
      ? (await strings).pause
      : (await strings).play;
    presenceData.endTimestamp = endTimestamp;

    presence.setTrayTitle(
      paused ? "" : videoTitle !== null ? videoTitle : "Title not found..."
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
        },
        {
          label: (await strings).viewSeries,
          url: seriesLink
        }
      ];
      presence.setActivity(presenceData, !paused);
    }
  }
});
