const presence = new Presence({
    clientId: "760591393281277983"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  }),
  media: MediaObj = {
    // anyone is welcome to suggest more metadata via GH issues
    time: null,
    length: null,
    state: "stopped",
    loop: null,
    repeat: null,
    filename: null,
    title: null,
    album: null,
    artist: null,
    track_number: null,
    showName: null,
    seasonNumber: null,
    episodeNumber: null
  };
let isShow = false,
  isSong = false,
  prev: string,
  elapsed: number,
  i: number;

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now(),
    endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

function setLoop(f: Function, ms: number): number {
  f();
  return setInterval(f, ms);
}

function decodeReq(entity: Element): string {
  // decoding HTML entities the stackoverflow way
  const txt = document.createElement("textarea");
  txt.innerHTML = entity.textContent;
  return txt.value;
}

function getTag(
  collection: HTMLCollectionOf<Element>,
  tagName: string
): Element {
  for (const tag of collection) {
    if (tag.getAttribute("name") === tagName) return tag;
  }
}

presence.on("UpdateData", async () => {
  if (
    document.querySelector(".footer") &&
    document.querySelector(".footer").textContent.includes("VLC")
  ) {
    const data: PresenceData = {
        largeImageKey: "vlc"
      },
      timestamps = getTimestamps(Number(media.time), Number(media.length));

    if (media.state !== prev) {
      prev = media.state;
      elapsed = Math.floor(Date.now() / 1000);
    }

    if (media.state == "playing" || media.state == "paused") {
      if (isSong) {
        if (media.title && media.album && media.title == media.album) {
          media.album = null;
        }
        data.details =
          (media.title
            ? media.title
            : media.track_number
            ? "Track N°" + media.track_number
            : "A song") + (media.album ? " on " + media.album : "");
        media.artist
          ? (data.state = "by " + media.artist)
          : media.filename
          ? (data.state = media.filename)
          : delete data.state;
      } else if (isShow) {
        media.showName
          ? (data.details = media.showName)
          : media.title
          ? (data.details = media.title)
          : media.filename
          ? (data.details = media.filename)
          : (data.details = "some TV");
        data.state = "S" + media.seasonNumber + "E" + media.episodeNumber;
      } else {
        media.showName
          ? (data.details = media.showName)
          : media.title
          ? (data.details = media.title)
          : media.filename
          ? (data.details = media.filename)
          : (data.details = "something");
        media.seasonNumber
          ? (data.state = "season " + media.seasonNumber)
          : media.episodeNumber
          ? (data.state = "episode " + media.episodeNumber)
          : delete data.state;
      }

      if (data.details && data.details.length > 100)
        data.details = data.details.substring(0, 127);
      if (data.state && data.state.length > 100)
        data.state = data.state.substring(0, 127);

      data.smallImageKey =
        media.state === "paused"
          ? "pause"
          : media.loop === "true" && media.repeat === "false"
          ? "repeat"
          : media.repeat === "true" && media.loop === "false"
          ? "repeat-one"
          : media.state === "playing"
          ? "play"
          : "pause";

      data.smallImageText =
        media.state === "paused"
          ? (await strings).pause
          : media.loop === "true" && media.repeat === "false"
          ? "All on loop"
          : media.repeat === "true" && media.loop === "false"
          ? "On loop"
          : media.state === "playing"
          ? (await strings).play
          : (await strings).pause;

      data.startTimestamp = timestamps[0];
      data.endTimestamp = timestamps[1];

      if (media.state == "playing") {
        presence.setActivity(data, true);
      } else {
        delete data.startTimestamp;
        delete data.endTimestamp;
        presence.setActivity(data, false);
      }
    } else if (media.state == "stopped") {
      data.details = "standby";
      delete data.state;
      delete data.smallImageKey;
      delete data.smallImageText;
      data.startTimestamp = elapsed;
      delete data.endTimestamp;

      presence.setActivity(data, false);
    }
  }
});

const getStatus = setLoop(function () {
  if (
    document.querySelector(".footer") &&
    document.querySelector(".footer").textContent.includes("VLC")
  ) {
    const req = new XMLHttpRequest();
    // jquery sucks!!!

    req.onload = function (): void {
      if (req.readyState === req.DONE) {
        if (req.status === 200) {
          if (i > 0) i = 0;

          req.responseXML.getElementsByTagName("state")[0].textContent.length >
          0
            ? (media.state =
                req.responseXML.getElementsByTagName("state")[0].textContent)
            : (media.state = "stopped");

          if (media.state !== "stopped") {
            media.time =
              req.responseXML.getElementsByTagName("time")[0].textContent;
            media.length =
              req.responseXML.getElementsByTagName("length")[0].textContent;
            media.loop =
              req.responseXML.getElementsByTagName("loop")[0].textContent;
            media.repeat =
              req.responseXML.getElementsByTagName("repeat")[0].textContent;
          } else {
            media.time = null;
            media.length = null;
            media.loop = null;
            media.repeat = null;
          }

          if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
            const collection = req.responseXML.getElementsByTagName("info");

            // basically the same thing but with a Firefox workaround because it's annoying

            getTag(collection, "filename")
              ? (media.filename = decodeReq(getTag(collection, "filename")))
              : (media.filename = null);
            getTag(collection, "title")
              ? (media.title = decodeReq(getTag(collection, "title")))
              : (media.title = null);
            getTag(collection, "showName")
              ? (media.showName = decodeReq(getTag(collection, "showName")))
              : (media.showName = null);

            if (getTag(collection, "artist") || getTag(collection, "album")) {
              isSong = true;
              getTag(collection, "artist")
                ? (media.artist = decodeReq(getTag(collection, "artist")))
                : (media.artist = null);
              getTag(collection, "album")
                ? (media.album = decodeReq(getTag(collection, "album")))
                : (media.album = null);
            } else {
              isSong = false;
              media.artist = null;
              media.album = null;
            }

            getTag(collection, "track_number")
              ? (media.track_number = decodeReq(
                  getTag(collection, "track_number")
                ))
              : (media.track_number = null);

            if (
              getTag(collection, "seasonNumber") &&
              getTag(collection, "episodeNumber")
            ) {
              isShow = true;
              media.seasonNumber = decodeReq(
                getTag(collection, "seasonNumber")
              );
              media.episodeNumber = decodeReq(
                getTag(collection, "episodeNumber")
              );
            } else {
              isShow = false;
              media.seasonNumber = null;
              media.episodeNumber = null;
            }
          } else {
            req.responseXML.getElementsByName("filename")[0]
              ? (media.filename = decodeReq(
                  req.responseXML.getElementsByName("filename")[0]
                ))
              : (media.filename = null);
            req.responseXML.getElementsByName("title")[0]
              ? (media.title = decodeReq(
                  req.responseXML.getElementsByName("title")[0]
                ))
              : (media.title = null);
            req.responseXML.getElementsByName("showName")[0]
              ? (media.showName = decodeReq(
                  req.responseXML.getElementsByName("showName")[0]
                ))
              : (media.showName = null);

            if (
              req.responseXML.getElementsByName("artist")[0] ||
              req.responseXML.getElementsByName("album")[0]
            ) {
              isSong = true;
              req.responseXML.getElementsByName("artist")[0]
                ? (media.artist = decodeReq(
                    req.responseXML.getElementsByName("artist")[0]
                  ))
                : (media.artist = null);
              req.responseXML.getElementsByName("album")[0]
                ? (media.album = decodeReq(
                    req.responseXML.getElementsByName("album")[0]
                  ))
                : (media.album = null);
            } else {
              isSong = false;
              media.artist = null;
              media.album = null;
            }

            req.responseXML.getElementsByName("track_number")[0]
              ? (media.track_number = decodeReq(
                  req.responseXML.getElementsByName("track_number")[0]
                ))
              : (media.track_number = null);

            if (
              req.responseXML.getElementsByName("seasonNumber")[0] &&
              req.responseXML.getElementsByName("episodeNumber")[0]
            ) {
              isShow = true;
              media.seasonNumber = decodeReq(
                req.responseXML.getElementsByName("seasonNumber")[0]
              );
              media.episodeNumber = decodeReq(
                req.responseXML.getElementsByName("episodeNumber")[0]
              );
            } else {
              isShow = false;
              media.seasonNumber = null;
              media.episodeNumber = null;
            }
          }
        } else {
          i++;
          if (i > 4) {
            i = 0;

            clearInterval(getStatus);
            media.state = "stopped";
            alert(
              "Something went wrong with the request, please contact ririxi#2721 at https://discord.premid.app with the following infos (RES: " +
                req.status +
                " / S: " +
                req.readyState +
                ")"
            );
          }
        }
      }
    };

    req.onerror = function (): void {
      media.state = "stopped";
    };

    req.open(
      "GET",
      document.location.protocol +
        "//" +
        document.location.hostname +
        ":" +
        (document.location.port ? document.location.port : "") +
        "/requests/status.xml",
      true
    );
    req.send();
  }
}, (navigator.userAgent.toLowerCase().indexOf("firefox") > -1 ? 5 : 2) * 1000);

interface MediaObj {
  time?: string;
  length?: string;
  state?: string;
  loop?: string;
  repeat?: string;
  filename?: string;
  title?: string;
  album?: string;
  artist?: string;
  track_number?: string;
  showName?: string;
  seasonNumber?: string;
  episodeNumber?: string;
}
