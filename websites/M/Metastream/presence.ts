const presence = new Presence({
    clientId: "630462023003799583"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
  });

function getTime(list: string[]): number {
  let ret = 0;
  for (let index = list.length - 1; index >= 0; index--)
    ret += parseInt(list[index]) * 60 ** index;

  return ret;
}

function getTimestamps(
  audioTime: string,
  audioDuration: string
): Array<number> {
  const splitAudioTime = audioTime.split(":").reverse(),
    splitAudioDuration = audioDuration.split(":").reverse(),
    parsedAudioTime = getTime(splitAudioTime),
    parsedAudioDuration = getTime(splitAudioDuration),
    startTime = Date.now(),
    endTime =
      Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
  return [Math.floor(startTime / 1000), endTime];
}

let elapsed: number, oldUrl: string;

presence.on("UpdateData", async () => {
  if (window.location.href !== oldUrl) {
    oldUrl = window.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  let details,
    state,
    smallImageKey,
    smallImageText,
    startTimestamp = elapsed,
    endTimestamp,
    playing = true;

  const host = window.location.hostname,
    path = window.location.pathname;

  try {
    if (host.match("app.getmetastream.com")) {
      if (path === "/") {
        details = "Home";

        const menuItem = document.querySelector(
          ".MenuTabs__tabItem__2ny6A.MenuTabs__selected__c65wY"
        );
        if (menuItem) state = `Viewing ${menuItem.textContent}`;
      }
      if (path.match("/settings")) {
        details = "Settings";

        const settingItem = document.querySelector(
          ".SettingsMenu__tabItem__3ypki.SettingsMenu__selectedTab__OMITL"
        );
        if (settingItem) state = `Viewing ${settingItem.textContent}`;
      }
      if (path.match("/join")) {
        const connectionInfo = document.querySelector(".Connect__info__3Vwlv"),
          disconnectionInfo = document.querySelector(
            ".Disconnect__info__3Uejx"
          ),
          disconnecctionLabel = document.querySelector(
            ".Disconnect__info__3Uejx > span"
          ),
          menuHeader = document.querySelector(".MenuHeader__header__1SYq0");

        if (connectionInfo) details = "Connecting...";
        else if (disconnectionInfo) {
          details = "Disconnected";

          if (disconnecctionLabel) state = disconnecctionLabel.textContent;
        } else if (menuHeader) details = "Setting up...";
        else {
          smallImageKey = "live";
          smallImageText = (await strings).live;

          const users =
              document.querySelector(".ListOverlay__list__1epFe") ||
              document.createElement("HTMLDivElement"),
            userButton = document.querySelector(".UserItem__menuBtn__1ST9k");

          if (users.childElementCount === 1 || userButton !== null)
            details = `Hosting (${users.childElementCount} Users)`;
          else details = `Watching (${users.childElementCount} Users)`;

          const title = document.querySelector(".TitleBar__title__3VPpW");
          if (title && title.textContent !== "Metastream") {
            state = title.textContent;

            const current = document.querySelector(
                ".Timeline__time__gcvG5:nth-child(1)"
              ),
              duration = document.querySelector(
                ".Timeline__time__gcvG5:nth-child(3)"
              );
            if (current && duration) {
              [startTimestamp, endTimestamp] = getTimestamps(
                current.textContent,
                duration.textContent
              );
            }

            const play: SVGUseElement = document.querySelector(
              ".PlaybackControls__button__Q0pbe > svg > use"
            );
            if (play) {
              if (play.href.baseVal.endsWith("pause")) {
                smallImageKey = "play";
                smallImageText = (await strings).play;
                playing = true;
              } else {
                smallImageKey = "pause";
                smallImageText = (await strings).pause;
                playing = false;
              }
            }
          }
        }
      }
    }
  } catch (err) {
    presence.error(err);
  }

  const data: PresenceData = {
    details,
    state,
    largeImageKey: "metastream",
    smallImageKey,
    smallImageText,
    startTimestamp,
    endTimestamp
  };

  presence.setActivity(data, playing);
});
