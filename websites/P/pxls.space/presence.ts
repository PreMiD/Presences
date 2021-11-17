const startTimestamp = Math.floor(Date.now() / 1000),
  presence = new Presence({
    clientId: "785958064192749600"
  });
presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "logo",
    startTimestamp
  };
  if (document.location.hostname === "pxls.space") {
    data.state = `Canvas: ${
      document.getElementById("current-pixel-count").innerHTML
    }`;
    data.details = `All time: ${
      document.getElementById("alltime-pixel-count").innerHTML
    }`;
    presence.setActivity(data);
  }
});
