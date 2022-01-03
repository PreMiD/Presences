const presence = new Presence({
    clientId: "827892428266274857"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

let video = {
  current: 0,
  duration: 0,
  paused: true,
  title: "Unknown",
  channel: "Unknown",
  url: <string>null
};

presence.on("UpdateData", async function () {
  const setting = {
      timeElapsed: await presence.getSetting<boolean>("timeElapsed"),
      moreDetails: await presence.getSetting<boolean>("moreDetails"),
      showButtons: await presence.getSetting<boolean>("showButtons"),
      privacy: await presence.getSetting<boolean>("privacy"),
      logo: await presence.getSetting<number>("logo")
    },
    presenceData: PresenceData = {
      largeImageKey: setting.logo === 0 ? "logo" : "logo2"
    },
    urlpath = window.location.pathname.split("/");

  if (setting.timeElapsed) presenceData.startTimestamp = browsingTimestamp;

  if (!urlpath[1]) presenceData.details = "Home";
  else if (urlpath[1] === "rooms") {
    if (urlpath[2]) {
      presenceData.details = setting.privacy
        ? "In Room"
        : document.querySelector("div.roomName.noselect").textContent;
      if (!setting.privacy) {
        if (setting.moreDetails && video) {
          presenceData.details = video.title;
          presenceData.state = video.channel;

          presenceData.endTimestamp = presence.getTimestamps(
            Math.floor(video.current),
            Math.floor(video.duration)
          )[1];
        } else {
          presenceData.state = document.querySelector(
            "div.userCount.noselect"
          ).textContent;
        }
      }

      if (setting.showButtons) {
        presenceData.buttons = [
          {
            label: "Join Room",
            url: window.location.href
          }
        ];

        if (!setting.privacy && video.url) {
          presenceData.buttons.push({
            label: "Watch Video",
            url: video.url
          });
        }
      }
    } else presenceData.details = "Browsing Rooms";
  } else presenceData.details = "Other";

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});

presence.on(
  "iFrameData",
  (data: {
    current: number;
    duration: number;
    paused: boolean;
    title: string;
    channel: string;
    url: string;
  }) => {
    video = data;
  }
);
