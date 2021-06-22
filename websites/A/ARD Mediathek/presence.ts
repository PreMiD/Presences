let elapsed = Math.floor(Date.now() / 1000),
  prevUrl = document.location.href;

const presence = new Presence({
    clientId: "853718947412967474"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "general.browsing",
    browsingThrough: "discord.browseThrough",
    buttonWatchVideo: "general.buttonWatchVideo",
    buttonWatchStream: "general.buttonWatchStream"
  });

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "ard_mediathek"
    },
    path = location.pathname.replace(/\/?$/, "/");

  if (document.location.href !== prevUrl) {
    prevUrl = document.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  if (path.startsWith("/video/") || path.startsWith("/live/")) {
    // Streaming
    const videoTitle = document.querySelector(
        ".H2-sc-1h18a06-3.fZOeKY"
      ).innerHTML,
      video: HTMLVideoElement = document.querySelector(
        ".ardplayer-mediacanvas"
      ),
      timestamps = presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );

    if (path.startsWith("/live/")) {
      // Livestream
      const mediathekLivechannel = document.title
          .replace(/Livestream \| ARD-Mediathek/, "")
          .replace(/ Livestream national \| ARD-Mediathek/g, ""),
        channelLinkA = document.querySelector(".LogoLink-pae2yt-13.eOVFv");
      if (channelLinkA !== null) {
        presenceData.largeImageKey = channelLinkA
          .getAttribute("href")
          .replace(/\//g, "");
      } else {
        // 3sat or KiKa or DeutscheWelle (speciality due to inconsistency in website -.-)
        const channelLinkIMG = document
          .querySelector(".src__Box-sc-1sbtrzs-0.Column-wbrv0h-1.llCdnS.hkXjQv")
          .children[0].children[0].getAttribute("src");
        if (channelLinkIMG === "/images/KdbelgIm.svg")
          presenceData.largeImageKey = "3sat";
        else if (channelLinkIMG === "/images/siBNbNWW.svg")
          presenceData.largeImageKey = "deutschewelle";
        else presenceData.largeImageKey = "kika";
      }

      presenceData.smallImageKey = "live";
      presenceData.smallImageText = "Live";
      presenceData.details = `${mediathekLivechannel} Live`;
      presenceData.state = videoTitle;
      presenceData.startTimestamp = elapsed;
      presenceData.buttons = [
        { label: (await strings).buttonWatchStream, url: prevUrl }
      ];
    } else if (path.startsWith("/video/")) {
      // Video-on-demand
      presenceData.largeImageKey = "ard_mediathek";
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = (await strings).play;
      presenceData.details = videoTitle;

      const videoDateDIV = document.querySelector(".Line-epbftj-1.dgMIUj");
      presenceData.state = `${
        videoDateDIV.children[0].innerHTML
      } from ${videoDateDIV.innerHTML.substring(
        0,
        videoDateDIV.innerHTML.indexOf("∙") - 1
      )}`;

      [, presenceData.endTimestamp] = timestamps;
      presenceData.buttons = [
        { label: (await strings).buttonWatchVideo, url: prevUrl }
      ];
    }

    // Player paused ?
    if (video.paused) {
      presenceData.smallImageKey = "pause";
      presenceData.smallImageText = (await strings).pause;
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
  } else {
    presenceData.smallImageKey = "reading";
    presenceData.smallImageText = (await strings).browsingThrough;
    presenceData.details = (await strings).browsing;
    presenceData.startTimestamp = elapsed;
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
