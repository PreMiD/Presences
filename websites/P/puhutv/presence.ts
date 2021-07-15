const presence = new Presence({
    clientId: "628341182581440531"
  }),
  strings: any = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

presence.on("UpdateData", async () => {
  const category = document.querySelector(
    "#widget_serie_contents_3 > section > div > div > div.category-main-content-right > header > h1 > strong"
  ) as HTMLElement;

  if (
    document.location.pathname == "/" ||
    !document.location.pathname ||
    (category && category.innerHTML != "")
  ) {
    presence.setActivity({
      largeImageKey: "puhu-logo",
      startTimestamp: Math.floor(Date.now() / 1000),
      details: "Geziniyor...",
      state: category && category.innerHTML ? category.innerHTML : "Ana Sayfa"
    });
  } else {
    const video = document.querySelector(
      "#dyg_player_dogusPlayer_html5_api"
    ) as HTMLVideoElement;

    if (!video) return;
    else {
      const title = document.querySelector(
          "#widget_video_detail_3 > section.hero.hero--video-detay.hero--subpages > header > div > div.video-detay-header-content > h1 > a"
        ),
        episode =
          title &&
          document.querySelector(
            "#widget_video_detail_3 > section.hero.hero--video-detay.hero--subpages > header > div > div.video-detay-header-content > h1"
          )
            ? document
                .querySelector(
                  "#widget_video_detail_3 > section.hero.hero--video-detay.hero--subpages > header > div > div.video-detay-header-content > h1"
                )
                .innerHTML.replace(title.outerHTML + " ", "")
            : null,
        timestamps = getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        );

      if (!title || title.innerHTML == "") return;

      const data: { [k: string]: any } = {
        largeImageKey: "puhu-logo",
        details: title.innerHTML,
        state:
          episode != ""
            ? episode
            : `${
                document.querySelector(
                  "#widget_serie_detail_tab_5 > section > div > div > div > div.kunye-content-left > div:nth-child(3)"
                )
                  ? (
                      document.querySelector(
                        "#widget_serie_detail_tab_5 > section > div > div > div > div.kunye-content-left > div:nth-child(3)"
                      ) as any
                    ).innerText.replace("\n", ": ")
                  : null
              }`,
        smallImageKey: video.paused ? "paused" : "playing",
        smallImageText: video.paused
          ? (await strings).pause
          : (await strings).play
      };

      if (!isNaN(timestamps[0]) && !isNaN(timestamps[1])) {
        data.startTimestamp = timestamps[0];
        data.endTimestamp = timestamps[1];
      }
      if (video.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }

      presence.setActivity(data);
    }
  }
});
