const presence = new Presence({
  clientId: "624914025247146000"
});
presence.on("UpdateData", () => {
  let paused = true;
  const { children } = document.getElementById("audioPlayer-controls-buttons");
  for (; i < children.length; i++)
    if (children[0].id === "stopButton") paused = false;

  presence.setActivity({
    largeImageKey: "lg",
    smallImageKey: paused ? "pause" : "play",
    smallImageText: paused ? "Pausiert" : "Spielt",
    details: `Channel: ${
      document.getElementsByClassName("trackInfos-stream")[0].textContent
    }`,
    state: `${
      document.getElementsByClassName("trackInfos-artist")[0].textContent
    } - ${document.getElementsByClassName("trackInfos-title")[0].textContent}`
  });
});
