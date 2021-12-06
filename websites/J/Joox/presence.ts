const presence = new Presence({
  clientId: "715116675346989096"
});

presence.on("UpdateData", async () => {
  const player = Array.from(document.querySelectorAll("i")).find((x) =>
    ["playerIcon playerIcon--play", "playerIcon playerIcon--pause"].includes(
      x.className
    )
  );

  if (player) {
    const paused = player.className.includes("pause") === false,
      currentSong = Array.from(document.querySelectorAll("div")).find(
        (x) =>
          x.children.length === 2 &&
          x.children[0].tagName === "B" &&
          x.children[1].tagName === "SPAN"
      ),
      title = currentSong.children[0].textContent,
      author = currentSong.children[1].textContent,
      audioTime = document.querySelector("#currentTime").textContent,
      audioDuration =
        document.querySelector("#currentTime").nextSibling.textContent,
      timestamps = presence.getTimestamps(
        presence.timestampFromFormat(audioTime),
        presence.timestampFromFormat(audioDuration)
      ),
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
