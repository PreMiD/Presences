const presence = new Presence({
    clientId: "749977202275123362"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "radiot"
  };
  if (document.location.hostname === "www.radio-suomi.com") {
    if (document.location.pathname === "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "🌐 Etusivulla";
    } else if (document.querySelector(".song-name")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = `📻 ${
        document.querySelector(".mdc-typography--display1").textContent
      }`;
      presenceData.state = `🎵 ${
        document.querySelector(".song-name").textContent
      }`;
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = `📻 ${
        document.querySelector(".mdc-typography--display1").textContent
      }`;
      presenceData.state = "🎵 Ei saatavilla";
    }
  }
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
