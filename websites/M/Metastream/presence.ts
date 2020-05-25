const presence = new Presence({
  clientId: "630462023003799583"
});
var strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused",
  live: "presence.activity.live"
});

function getTime(list: string[]): number {
  var ret = 0;
  for (let index = list.length - 1; index >= 0; index--) {
    ret += parseInt(list[index]) * 60 ** index;
  }
  return ret;
}

function getTimestamps(
  audioTime: string,
  audioDuration: string
): Array<number> {
  var splitAudioTime = audioTime.split(":").reverse();
  var splitAudioDuration = audioDuration.split(":").reverse();

  var parsedAudioTime = getTime(splitAudioTime);
  var parsedAudioDuration = getTime(splitAudioDuration);

  var startTime = Date.now();
  var endTime =
    Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
  return [Math.floor(startTime / 1000), endTime];
}

var elapsed, oldUrl;

presence.on("UpdateData", async () => {
  if (window.location.href !== oldUrl) {
    oldUrl = window.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  var details = undefined,
    state = undefined,
    smallImageKey = undefined,
    smallImageText = undefined,
    startTimestamp = elapsed,
    endTimestamp = undefined,
    playing = true;

  var host = window.location.hostname;
  var path = window.location.pathname;

  try {
    if (host.match("app.getmetastream.com")) {
      if (path === "/") {
        details = "Home";

        var menu_item = document.querySelector(
          ".MenuTabs__tabItem__2ny6A.MenuTabs__selected__c65wY"
        );
        if (menu_item) state = `Viewing ${menu_item.textContent}`;
      }
      if (path.match("/settings")) {
        details = "Settings";

        var setting_item = document.querySelector(
          ".SettingsMenu__tabItem__3ypki.SettingsMenu__selectedTab__OMITL"
        );
        if (setting_item) {
          state = `Viewing ${setting_item.textContent}`;
        }
      }
      if (path.match("/join")) {
        var connection_info = document.querySelector(".Connect__info__3Vwlv");
        var disconnection_info = document.querySelector(
          ".Disconnect__info__3Uejx"
        );
        var disconnection_label = document.querySelector(
          ".Disconnect__info__3Uejx > span"
        );
        var menu_header = document.querySelector(".MenuHeader__header__1SYq0");

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

          var users =
            document.querySelector(".ListOverlay__list__1epFe") ||
            document.createElement("HTMLDivElement");
          var user_button = document.querySelector(".UserItem__menuBtn__1ST9k");

          if (users.childElementCount === 1 || user_button !== null) {
            details = `Hosting (${users.childElementCount} Users)`;
          } else {
            details = `Watching (${users.childElementCount} Users)`;
          }

          var title = document.querySelector(".TitleBar__title__3VPpW");
          if (title && title.textContent !== "Metastream") {
            state = title.textContent;

            var current = document.querySelector(
              ".Timeline__time__gcvG5:nth-child(1)"
            );
            var duration = document.querySelector(
              ".Timeline__time__gcvG5:nth-child(3)"
            );
            if (current && duration) {
              var timestamps = getTimestamps(
                current.textContent,
                duration.textContent
              );
              startTimestamp = timestamps[0];
              endTimestamp = timestamps[1];
            }

            var play: SVGUseElement = document.querySelector(
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
    console.error(err);
  }

  var data: PresenceData = {
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
