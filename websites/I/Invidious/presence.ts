const presence = new Presence({
  clientId: "761617743593209869"
});

function getTime() {
  const time = document
    .getElementsByClassName("vjs-current-time-display")[0]
    .textContent.split(":")
    .map((n) => Number(n));
  if (time.length === 3) {
    return Date.now() - (time[0] * 3600 + time[1] * 60 + time[2]) * 1000;
  } else {
    return Date.now() - (time[0] * 60 + time[1]) * 1000;
  }
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "icon",
    smallImageKey: document.getElementsByClassName("vjs-playing")[0] ? "play" : "pause",
    details: document.getElementsByTagName("h1")[0].textContent.trim(),
    state: document.getElementById("channel-name").textContent
  };

  if (presenceData.smallImageKey === "play")
    presenceData.startTimestamp = getTime();

  if (document.location.pathname !== "/watch") {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  };
});
