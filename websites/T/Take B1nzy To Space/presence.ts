const presence = new Presence({
    clientId: "735314055861895288"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000), // Time Ratelimited
  path = document.location; // Website URL

/* When Website Updates */
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "icon"
  };

  /* Update Presence */
  if (path.hostname === "takeb1nzyto.space") {
    presenceData.startTimestamp = browsingTimestamp;
    presenceData.details = `Playing ${
      document.querySelector("#song").textContent
    }`;
    presenceData.state = `Ratelimited for ${
      document.querySelector("#ratelimited-time").textContent
    }s`;
    presence.setActivity(presenceData);
  }
});
