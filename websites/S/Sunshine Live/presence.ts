var presence = new Presence({
  clientId: "624914025247146000"
});
presence.on("UpdateData", () => {
  let paused = true;
  const children = document.getElementById(
    "audioPlayer-controls-buttons"
  ).children;
  console.log(children);
  for (let i = 0; i < children.length; i++) {
    console.log(children[i].id);
    if (children[i].id == "stopButton") {
      paused = false;
    }
  }

  const presenceData: PresenceData = {
    largeImageKey: "lg",
    smallImageKey: paused ? "pause" : "play",
    smallImageText: paused ? "Pausiert" : "Spielt",
    details:
      "Channel: " +
      document.getElementsByClassName("trackInfos-stream")[0].textContent,
    state:
      document.getElementsByClassName("trackInfos-artist")[0].textContent +
      " - " +
      document.getElementsByClassName("trackInfos-title")[0].textContent
  };
  presence.setActivity(presenceData);
});
