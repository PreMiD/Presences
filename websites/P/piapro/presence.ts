var presence = new Presence({
  clientId: "641416608790609942"
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

var browsingStamp = Math.floor(Date.now() / 1000);

var search: any;
var min: number, sec: number, time: number;
var min2: number, sec2: number, time2: number;
var paused: any, timestamps: any;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "pia"
  };

  if (document.location.hostname == "piapro.jp") {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing home page";
    } else if (document.location.pathname.includes("/html5_player_popup/")) {
      min = parseInt(
        document
          .querySelector(
            "#jp_container_1 > div > div.jp-gui > div.jp-interface > div.jp-current-time"
          )
          .textContent.split(":")[0]
      );
      sec = parseInt(
        document
          .querySelector(
            "#jp_container_1 > div > div.jp-gui > div.jp-interface > div.jp-current-time"
          )
          .textContent.split(":")[1]
      );
      min = min * 60;
      time = min + sec;

      min2 = parseInt(
        document
          .querySelector(
            "#jp_container_1 > div > div.jp-gui > div.jp-interface > div.jp-duration"
          )
          .textContent.split(":")[0]
      );
      sec2 = parseInt(
        document
          .querySelector(
            "#jp_container_1 > div > div.jp-gui > div.jp-interface > div.jp-duration"
          )
          .textContent.split(":")[1]
      );
      min2 = min2 * 60;
      time2 = min2 + sec2;
      if (
        !document
          .querySelector("#jp_container_1")
          .className.includes("jp-state-playing")
      ) {
        paused = true;
      } else {
        paused = false;
      }

      timestamps = getTimestamps(time, time2);
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = "Playing";

      presenceData.details =
        document.querySelector("body > header > h1").textContent;
      presenceData.state = document.querySelector(
        "body > header > div > p.artist"
      ).textContent;

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = "Paused";
      }
    } else if (document.location.pathname.includes("/t/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details =
        "Viewing " +
        document
          .querySelector("head > title")
          .textContent.split("|")[1]
          .split("「")[0] +
        ":";
      presenceData.state = document.querySelector(
        "#main > div.cd_works-whole.illust > div.cd_works-mainclm > h1"
      ).textContent;
    } else if (document.location.pathname.includes("/music")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing the";
      presenceData.state = "music category";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/illust")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing the";
      presenceData.state = "illustrations category";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/text")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing the";
      presenceData.state = "text category";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/search/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Searching for:";
      search = document.querySelector("#keyword");
      presenceData.state = search.value;
      presenceData.smallImageKey = "search";
    } else if (document.querySelector("#user_prof > p:nth-child(2)") !== null) {
      presenceData.details = "Viewing user:";
      presenceData.state = document.querySelector(
        "#user_prof > p:nth-child(2)"
      ).textContent;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/collabo/")) {
      presenceData.details = "Viewing collab:";
      presenceData.state =
        document.querySelector("#main_name > h2").textContent;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/collabo_list/")) {
      presenceData.details = "Viewing collab list";
      presenceData.startTimestamp = browsingStamp;
    } else if (
      document.location.pathname.includes("/pages/official_collabo/")
    ) {
      presenceData.details = "Viewing official collab:";
      presenceData.state = document.querySelector(
        "#main > div.static_path > span"
      ).textContent;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/official_collabo/")) {
      presenceData.details = "Viewing official collab list";
      presenceData.startTimestamp = browsingStamp;
    }
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
