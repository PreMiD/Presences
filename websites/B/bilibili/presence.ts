const presence = new Presence({ clientId: "639591760791732224" }),
  browsingStamp = Math.floor(Date.now() / 1000),
  urlpath = document.location.pathname.split("/");

let uploader: HTMLElement,
  uploaderName: string,
  uploaderLink: string,
  title: HTMLElement,
  video: HTMLVideoElement,
  videoPaused: boolean,
  currentTime: number,
  duration: number,
  timestamps: number[];

const multiUploader = document.querySelector("div.members-info");

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "bb"
  };

  async function getTimestamps() {
    video = document.querySelector("bwp-video");
    if (!video) {
      video = document.querySelector("video");
      videoPaused = video.paused;
      timestamps = presence.getTimestampsfromMedia(video);
    } else {
      const playerButton = document.querySelector(
        ".bilibili-player-video-btn-start"
      );
      videoPaused =
        playerButton.classList.contains("video-state-pause") === true;
      (currentTime = presence.timestampFromFormat(
        document.querySelector(".bilibili-player-video-time-now").textContent
      )),
        (duration = presence.timestampFromFormat(
          document.querySelector(".bilibili-player-video-time-total")
            .textContent
        )),
        (timestamps = presence.getTimestamps(currentTime, duration));
    }

    [presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;

    presenceData.smallImageKey = videoPaused ? "pause" : "play";

    if (videoPaused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
  }

  switch (document.location.hostname) {
    case "www.bilibili.com": {
      switch (urlpath[1]) {
        case "video": {
          getTimestamps();

          if (multiUploader !== null) {
            uploader = document.querySelector(
              "#member-container > div:nth-child(1) > div > a"
            );
            uploaderName = `${uploader.textContent} + ${
              document.getElementsByClassName("up-card").length
            } more`;
          } else {
            uploader = document.querySelector("a.username");
            uploaderName = uploader.textContent;
          }

          uploaderLink = uploader.getAttribute("href");
          title = document.querySelector("#viewbox_report > h1");

          presenceData.details = title.getAttribute("title");
          presenceData.state = uploaderName;
          presenceData.buttons = [
            {
              label: "Watch Video", // getString() later
              url: `https://www.bilibili.com/video/${urlpath[2]}`
            },
            {
              label: "View Space", // getString() later
              url: `https:${uploaderLink}`
            }
          ];
          break;
        }
        default: {
          presenceData.startTimestamp = browsingStamp;
          break;
        }
      }
      break;
    }
    case "space.bilibili.com": {
      uploader = document.querySelector("#h-name");

      presenceData.details = "User's space";
      presenceData.state = `${uploader.textContent} | UID:${urlpath[1]}`;
      presenceData.buttons = [
        {
          label: "View Space", // getString() later
          url: `https://space.bilibili.com/${urlpath[1]}`
        }
      ];
      break;
    }
  }

  presence.setActivity(presenceData);
});
