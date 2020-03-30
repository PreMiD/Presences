var presence = new Presence({
    clientId: "647973934603567130",
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    reading: "presence.playback.reading",
  });

var browsingStamp = Math.floor(Date.now() / 1000);

var user: any;
var title: any;
var replace: any;
var search: any;

presence.on("UpdateData", async () => {
  let presenceData: presenceData = {
    largeImageKey: "bahamut",
  };

  if (document.location.hostname == "forum.gamer.com.tw") {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing home page";
    } else if (document.querySelector(".BH-menu") !== null) {
      if (document.location.pathname.includes("A.php")) {
        var title = document
          .querySelector("div.BH-menu > ul.BH-menuE > li > a[title]")
          .getAttribute("title");
        presenceData.details = title;
        presenceData.state = "首頁";
        presence.setActivity(presenceData);
        presenceData.smallImageKey = "reading";
      }
      if (document.location.pathname.includes("B.php")) {
        var title = document
          .querySelector("div.BH-menu > ul.BH-menuE > li > a[title]")
          .getAttribute("title");
        presenceData.details = title;
        presenceData.state = "列表";
        presence.setActivity(presenceData);
        presenceData.smallImageKey = "reading";
      }
      if (document.location.pathname.includes("C.php")) {
        var title = document
          .querySelector("div.BH-menu > ul.BH-menuE > li > a[title]")
          .getAttribute("title");
        var header_title = document.getElementsByClassName(
          "c-post__header__title"
        )[0].innerHTML;
        presenceData.details = title;
        presenceData.state = header_title;
        presence.setActivity(presenceData);
        presenceData.smallImageKey = "reading";
      }
    }
  }
  if (presenceData.details == null) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing site:";
    presenceData.state = "巴哈姆特";
    presence.setActivity(presenceData);
  } else {
    presence.setActivity(presenceData);
  }
});

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(videoTime: number, videoDuration: number) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
