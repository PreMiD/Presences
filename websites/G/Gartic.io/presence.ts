const presence = new Presence({
    clientId: "808668919635247104"
  }),
  elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "logo"
    },
    path = document.location.pathname;
  if (path === "/") {
    presenceData.details = "Viewing the Homepage";
    data.startTimestamp = elapsed;
  } else if (path === "/rooms") {
    presenceData.details = "Viewing Rooms";
    data.startTimestamp = elapsed;
  } else if (
    document.location.pathname.split("/")[1].match(/^\d/)
      ? true
      : false || path === "/room"
  ) {
    if (document.querySelector(".infosUsers") ? true : false) {
      presenceData.details = "Setting up Info to Join";
      data.state = `Players: ${
        document.querySelector(".infosRoom li:last-child span strong")
          .textContent
      }`;
      data.startTimestamp = elapsed;
    } else {
      presenceData.details = `${
        document.querySelector(".you .nick").textContent
      } - ${document
        .querySelector(".you .points")
        .textContent.split("pts")[0]
        .trim()} points`;
      data.state = `Lobby: ${
        document.querySelector("title").textContent.split("-")[0]
      }`;
      data.startTimestamp = elapsed;
    }
  } else {
    presenceData.details = "Somewhere on-site";
    data.startTimestamp = elapsed;
  }
  presence.setActivity(data);
});
