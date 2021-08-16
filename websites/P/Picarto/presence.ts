const presence = new Presence({
    clientId: "630771716058120192"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  presenceData: PresenceData = {
    largeImageKey: "logo"
  },
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const video = document.getElementsByClassName("mistvideo-video"),
    time = document.getElementsByClassName("mistvideo-currentTime")[0]
      .textContent;
  if (video[0] && !isNaN(presence.timestampFromFormat(time))) {
    const title = document.querySelector(
        "#channel-page > section > section > main > div > div.styled__ChannelLeftContent-sf47ty-1.FBOTx > div.scrollbar-container.styled__ChannelContent-sf47ty-2.bYRWNT.ps > div.styled__StreamTabWrapper-sf47ty-27.qmuRk > div.styled__ChannelBottomContent-sf47ty-5.kkyoeB > div.FlexCol-sc-1y959hh-0.styled__ChannelHeader-sf47ty-4.gxSgjV.dbXdlh > div.FlexRow-sc-1j9kiqj-0.styled__ChannelHeaderTop-sf47ty-22.dFXswc.kRGjEe > span"
      ),
      uploader = document.getElementsByClassName("mistvideo-streamer")[0],
      playorpause = document
        .getElementsByClassName("mistvideo-play")[0]
        .getAttribute("data-state");
    presenceData.details = title.textContent;
    presenceData.state = uploader.textContent;
    presenceData.largeImageKey = "logo";
    presenceData.smallImageKey = playorpause.includes("paused")
      ? "pause"
      : "play";
    presenceData.smallImageText = playorpause.includes("paused")
      ? (await strings).pause
      : (await strings).play;
    presenceData.startTimestamp = browsingStamp;

    presence.setTrayTitle(
      playorpause.includes("paused") ? "" : title.textContent
    );

    if (playorpause.includes("paused")) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
  } else {
    console.log("Browsing");
    const pageData: PresenceData = {
      details: "Browsing..",
      largeImageKey: "logo"
    };
    presence.setActivity(pageData);
  }
});
