const presence = new Presence({
    clientId: "745261937092198532"
}),

strings = presence.getStrings({
  playing: "presence.playback.playing",
  pause: "presence.playback.paused"
});

function getMillisecondsFromString(timeString: string) {
  const parsedText = timeString.split(":");
  return ((Number(parsedText[0]) * 60) + Number(parsedText[1])) * 1000;
}

function isPodcast() {
  return document.getElementsByClassName("track__podcast")[0] !== undefined
}

presence.on("UpdateData", async () => {
  let title = (document.getElementsByClassName("track__title")[0] as HTMLElement).innerText,
    progress = (document.getElementsByClassName("progress__left")[0] as HTMLElement).innerText,
    trackLength = (document.getElementsByClassName("progress__right")[0] as HTMLElement).innerText,
    startedAt = Date.now() - getMillisecondsFromString(progress),
    endAt = startedAt + getMillisecondsFromString(trackLength),
    playing = document.getElementsByClassName("player-controls__btn_pause").length == 2,
    artists

  if(isPodcast()) {
    artists = (document.getElementsByClassName("track__podcast")[0] as HTMLElement).innerText
  } else {
    artists = (document.getElementsByClassName("track__artists")[0] as HTMLElement).innerText
  }

  let presenceData: PresenceData = {
      largeImageKey: "og-image",
      smallImageKey: playing ? 'play' : 'pause',
      smallImageText: playing ? (await strings).playing : (await strings).pause,
      details: title,
      state: artists,
      startTimestamp: startedAt,
      endTimestamp: endAt
  };

  if (title == "") {
      presence.setTrayTitle(); //Clears the tray title for mac users
      presence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
  } else {
      //This will fire if you set presence details
      presence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
  }
});