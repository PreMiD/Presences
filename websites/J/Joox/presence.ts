const presence = new Presence({
  clientId: "715116675346989096"
});

function getTime(list: string[]): number {
  let ret = 0;
  for (let index = list.length - 1; index >= 0; index--)
    ret += parseInt(list[index]) * 60 ** index;

  return ret;
}

function getTimestamps(
  audioTime: string,
  audioDuration: string
): Array<number> {
  const splitAudioTime = audioTime.split(":").reverse(),
    splitAudioDuration = audioDuration.split(":").reverse(),
    parsedAudioTime = getTime(splitAudioTime),
    parsedAudioDuration = getTime(splitAudioDuration),
    startTime = Date.now(),
    endTime =
      Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
  return [Math.floor(startTime / 1000), endTime];
}

presence.on("UpdateData", async () => {
  const player = document
    .querySelector(
      "#__next > sc-kgoBCf.bxQECy > div.sc-kGXeez.gsplsd > div.sc-htpNat.XpRxm > div.sc-jAaTju.bjlsCh > div.sc-gzVnrw.jgaZgQ > button.sc-jDwBTQ.frbSYQ > i"
    )
    .getAttribute("class");

  if (player) {
    const paused = player.includes("pause") === false,
      title = document.querySelector(
        "#__next >  div.sc-kgoBCf.bxQECy > div.sc-kGXeez.gsplsd > div.sc-htpNat.XpRxm > div > div.sc-kpOJdX.YCPsB > b > a"
      ).textContent,
      author = document.querySelector(
        "#__next >  div.sc-kgoBCf.bxQECy > div.sc-kGXeez.gsplsd > div.sc-htpNat.XpRxm > div > div.sc-kpOJdX.YCPsB > span"
      ).textContent,
      audioTime = document.querySelector("#currentTime").textContent,
      audioDuration = document.querySelector(
        "#__next > div.sc-kgoBCf.bxQECy > div.sc-kGXeez.gsplsd > div.sc-EHOje.nuMkL > small.sc-gzVnrw sc-htoDjs.guSSOC"
      ).textContent,
      timestamps = getTimestamps(audioTime, audioDuration),
      data: PresenceData = {
        details: title,
        state: author,
        largeImageKey: "icon",
        smallImageKey: paused ? "pause" : "playing",
        smallImageText: paused ? "Paused" : "Playing",
        startTimestamp: timestamps[0],
        endTimestamp: timestamps[1]
      };

    if (paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    if (title !== null && author !== null) presence.setActivity(data, !paused);
  } else presence.clearActivity();
});
