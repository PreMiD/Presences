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
  for (let index = list.length - 1; index >= 0; index--) {
    ret += parseInt(list[index]) * 60 ** index;
  }
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

  let details = undefined,
    state = undefined,
    smallImageKey = undefined,
    smallImageText = undefined,
    startTimestamp = elapsed,
    endTimestamp = undefined,
    playing = true;

  const host = window.location.hostname,
    path = window.location.pathname;

  try {
    if (host.match("app.getmetastream.com")) {
      if (path === "/") {
        details = "Home";

        const menu_item = document.querySelector(
          ".MenuTabs__tabItem__2ny6A.MenuTabs__selected__c65wY"
        );
        if (menu_item) state = `Viewing ${menu_item.textContent}`;
      }
      if (path.match("/settings")) {
        details = "Settings";

        const setting_item = document.querySelector(
          ".SettingsMenu__tabItem__3ypki.SettingsMenu__selectedTab__OMITL"
        );
        if (setting_item) {
          state = `Viewing ${setting_item.textContent}`;
        }
      }
      if (path.match("/join")) {
        const connection_info = document.querySelector(".Connect__info__3Vwlv"),
          disconnection_info = document.querySelector(
            ".Disconnect__info__3Uejx"
          ),
          disconnection_label = document.querySelector(
            ".Disconnect__info__3Uejx > span"
          ),
          menu_header = document.querySelector(".MenuHeader__header__1SYq0");

        if (connection_info) {
          details = "Connecting...";
        } else if (disconnection_info) {
          details = "Disconnected";

          if (disconnection_label) {
            state = disconnection_label.textContent;
          }
        } else if (menu_header) {
          details = "Setting up...";
        } else {
          smallImageKey = "live";
          smallImageText = (await strings).live;

          const users =
              document.querySelector(".ListOverlay__list__1epFe") ||
              document.createElement("HTMLDivElement"),
            user_button = document.querySelector(".UserItem__menuBtn__1ST9k");

          if (users.childElementCount === 1 || user_button !== null) {
            details = `Hosting (${users.childElementCount} Users)`;
          } else {
            details = `Watching (${users.childElementCount} Users)`;
          }

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
              const timestamps = getTimestamps(
                current.textContent,
                duration.textContent
              );
              startTimestamp = timestamps[0];
              endTimestamp = timestamps[1];
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
    details: details,
    state: state,
    largeImageKey: "metastream",
    smallImageKey: smallImageKey,
    smallImageText: smallImageText,
    startTimestamp: startTimestamp,
    endTimestamp: endTimestamp
  };

  presence.setActivity(data, playing);
});
