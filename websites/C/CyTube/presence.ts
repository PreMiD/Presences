const presence = new Presence({
    clientId: "653639828826750976" // Contact if you want me to edit the discord assets/keys/whatever
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

function getTimes(time: number): Record<string, number> {
  let seconds = Math.round(time),
    minutes = Math.floor(seconds / 60);

  seconds -= minutes * 60;

  const hours = Math.floor(minutes / 60);

  minutes -= hours * 60;

  return {
    sec: seconds,
    min: minutes,
    hrs: hours
  };
}

function lessTen(digit: number): string {
  return digit < 10 ? "0" : "";
}

function getTimestamp(time: number): string {
  const { sec, min, hrs } = getTimes(time);

  return hrs > 0
    ? `${hrs}:${lessTen(min)}${min}:${lessTen(sec)}${sec}`
    : `${min}:${lessTen(sec)}${sec}`;
}

interface Match {
  display: string;
  imageKey: string;
}

interface MatchList {
  [key: string]: Match;
}

const matches: MatchList = {
  youtube: { display: "YouTube", imageKey: "cytube_service_yt" },
  googlevideo: { display: "YouTube", imageKey: "cytube_service_yt" },

  "docs.google": { display: "Google Drive", imageKey: "cytube_service_gd" },
  googleusercontent: {
    display: "Google Drive",
    imageKey: "cytube_service_gd"
  },

  appspot: { display: "Google Cloud", imageKey: "cytube_service_gc" },
  blogspot: { display: "Google Cloud", imageKey: "cytube_service_gc" },

  dropbox: { display: "Dropbox", imageKey: "cytube_service_dbx" },

  amazonaws: { display: "Amazon AWS", imageKey: "cytube_service_aws" },

  soundcloud: { display: "Soundcloud", imageKey: "cytube_service_sc" },

  discordapp: { display: "Discord", imageKey: "cytube_service_dc" },

  "vimeo-prod-": { display: "Vimeo", imageKey: "cytube_service_ve" }
};

function service(service: string): Match {
  let returnMatch: Match = {
    display: "Unknown Service",
    imageKey: "cytube_service_uk"
  };

  Object.keys(matches).forEach((key) => {
    service.includes(key) && (returnMatch = matches[key]);
  });

  return returnMatch;
}

class VideoData {
  audio = false;
  paused = true;
  duration = 0;
  currentTime = 0;
  site: string;
}

let iFrameResponse = new VideoData();

presence.on("iFrameData", (data: VideoData) => {
  iFrameResponse = data;
});

presence.on("UpdateData", async () => {
  const path = document.location.pathname,
    presenceData: PresenceData = {
      largeImageKey: "cytube_logo",
      details: "loading",
      state: "CyTube"
    },
    translate = {
      pause: (await strings).pause,
      play: (await strings).play
    };

  async function setVideo(data: VideoData) {
    const currentService: Match = service(data.site);

    presenceData.details = `Watching ${document
      .getElementById("currenttitle")
      .textContent.replace("Currently Playing:", "")}
            - ${currentService.display}`;

    presenceData.largeImageKey = currentService.imageKey;

    [presenceData.startTimestamp, presenceData.endTimestamp] =
      presence.getTimestamps(
        Math.floor(data.currentTime),
        Math.floor(data.duration)
      );

    if (data.paused) {
      presenceData.startTimestamp = null;
      presenceData.smallImageKey = "presence_playback_paused";
      presenceData.smallImageText = `${translate.pause} - ${getTimestamp(
        data.currentTime
      )}`;
    } else {
      presenceData.smallImageKey = "presence_playback_playing";
      presenceData.smallImageText = translate.play;
    }
  }

  if (path.includes("/r/")) {
    const container = !(
        document.body.className.includes("chatOnly") ||
        !document.getElementById("videowrap")
      ),
      [room] = path.split("r/"),
      motd: string = document.getElementById("motd").textContent;

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

        if (iFrameResponse?.site) setVideo(iFrameResponse);
      } else {
        const video = document
          .getElementById("videowrap")
          .querySelector("video");

        setVideo({
          audio: false,
          currentTime: video.currentTime,
          duration: video.duration,
          paused: video.paused,
          site: video.src
        });
      }
    }
  } else if (path === "/") {
    presenceData.details = "On Homepage";
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (path.includes("/account/")) {
    presenceData.details = "Managing Account";
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (path === "/contact") {
    presenceData.details = "Contacting Support";
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  }
  presence.setActivity(presenceData, true);
});
