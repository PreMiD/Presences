const presence = new Presence({
    clientId: "653639828826750976" // Contact if you want me to edit the discord assets/keys/whatever
  }),
  strings = presence.getStrings({
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

function getTimesFromMs(ms): Record<string, number> {
  const floor = Math.floor(ms % 60);
  const sec = floor < 10 ? 0 + floor : floor,
    min = floor / 60 <= 0 ? 0 : floor / 60,
    hrs = floor / 60 / 60;
  return {
    hrs: hrs,
    sec: sec,
    min: min
  };
}

function getTimestamp(time): string {
  const { sec, min, hrs } = getTimesFromMs(time);
  return hrs > 0 ? hrs + ":" + min + ":" + sec : min + ":" + sec;
}

interface Match {
  display: string;
  image_key: string;
}

interface MatchList {
  [key: string]: Match;
}

const matches: MatchList = {
  youtube: {
    display: "YouTube",
    image_key: "cytube_service_yt"
  },
  googlevideo: {
    display: "YouTube",
    image_key: "cytube_service_yt"
  },
  "docs.google": {
    display: "Google Drive",
    image_key: "cytube_service_gd"
  },
  googleusercontent: {
    display: "Google Drive",
    image_key: "cytube_service_gd"
  },
  appspot: {
    display: "Google Cloud",
    image_key: "cytube_service_gc"
  },
  blogspot: {
    display: "Google Cloud",
    image_key: "cytube_service_gc"
  },
  dropbox: {
    display: "Dropbox",
    image_key: "cytube_service_dbx"
  },
  amazonaws: {
    display: "Amazon AWS",
    image_key: "cytube_service_aws"
  },
  soundcloud: {
    display: "Soundcloud",
    image_key: "cytube_service_sc"
  },
  discordapp: {
    display: "Discord",
    image_key: "cytube_service_dc"
  },
  "vimeo-prod-": {
    display: "Vimeo",
    image_key: "cytube_service_ve"
  }
};

function service(service: string): Match {
  let return_match: Match = {
    display: "Unknown Service",
    image_key: "cytube_service_uk"
  };

  Object.keys(matches).forEach((key) => {
    if (service.includes(key)) return_match = matches[key];
  });

  return return_match;
}
class VideoData {
  audio = false;
  paused = true;
  duration = 0;
  current_time = 0;
  site = undefined;
}

let iframe_response = new VideoData();

presence.on("iFrameData", (data) => {
  iframe_response = data;
});

presence.on("UpdateData", async () => {
  const path = document.location.pathname;
  const presenceData: PresenceData = {
    largeImageKey: "cytube_logo",
    details: "loading",
    state: "CyTube"
  };

  const translate = {
    pause: (await strings).pause,
    play: (await strings).play
  };

  async function set_video(data: VideoData): Promise<any> {
    const current_service: Match = service(data.site);

    presenceData.details = `Watching ${document
      .getElementById("currenttitle")
      .textContent.replace("Currently Playing:", "")}
            - ${current_service.display}`;

    presenceData.largeImageKey = current_service.image_key;

    const timestamps = getTimestamps(
      Math.floor(data.current_time),
      Math.floor(data.duration)
    );

    if (data.paused) {
      presenceData.startTimestamp = null;
      presenceData.smallImageKey = "presence_playback_paused";
      presenceData.smallImageText = `${translate.pause} - ${getTimestamp(
        data.current_time
      )}`;
    } else {
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];
      presenceData.smallImageKey = "presence_playback_playing";
      presenceData.smallImageText = translate.play;
    }
  }

  if (path.includes("/r/")) {
    const container = !(
      document.body.className.includes("chatOnly") ||
      !document.getElementById("videowrap")
    );
    const active_content: boolean = iframe_response.site;
    const room: string = path.split("r/")[1];
    const motd: string = document.getElementById("motd").textContent;

    presenceData.state = `${motd} - /r/${room}`;
    if (!container) {
      presenceData.details = "Chatting";
      presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    } else {
      if (!document.getElementById("videowrap").querySelector("video")) {
        presenceData.details = "Waiting to Start";
        presenceData.smallImageKey = "presence_playback_waiting";
        presenceData.smallImageText = "Waiting";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);

        if (active_content) set_video(iframe_response);
      } else {
        const video = document
          .getElementById("videowrap")
          .querySelector("video");
        set_video({
          audio: false,
          current_time: video.currentTime,
          duration: video.duration,
          paused: video.paused,
          site: video.src
        });
      }
    }
  } else if (path == "/") {
    presenceData.details = "On Homepage";
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (path.includes("/account/")) {
    presenceData.details = "Managing Account";
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (path == "/contact") {
    presenceData.details = "Contacting Support";
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  }
  presence.setActivity(presenceData, true);
});
