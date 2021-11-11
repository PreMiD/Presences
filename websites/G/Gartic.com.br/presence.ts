const presence = new Presence({
    clientId: "808757125747966032"
  }),
  elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "logo"
  };
  if (document.location.pathname.split("/")[1].match(/^\d/) ? true : false) {
    presenceData.details = `${
      document.querySelector("div.user.proprio .dados span").textContent
    } - ${document
      .querySelector("div.user.proprio .dados pre")
      .textContent.split("pontos")[0]
      .trim()} points`;
    data.state = `Lobby: ${
      document.querySelector("title").textContent.split("-")[0]
    }`;
    data.startTimestamp = elapsed;
  } else presenceData.details = "Not in-game";

  presence.setActivity(data);
});
