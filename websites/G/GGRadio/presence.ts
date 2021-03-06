const presence = new Presence({
  clientId: "730052820459454496"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };
  const format1 = await presence.getSetting("sFormatNoDj1");
  const format2 = await presence.getSetting("sFormatNoDj2");
  const elapsed = await presence.getSetting("tElapsed");
  const format = await presence.getSetting("sFormat");
  const info = await presence.getSetting("sInfo");
  const dj = await presence.getSetting("sDJ");

  if (elapsed) presenceData.startTimestamp = browsingStamp;

  if (document.location.pathname.includes("/player")) {
    const title = document.querySelector("#title").textContent;
    const artist = document.querySelector("#artist").textContent;
    const paused = document.querySelector("#play") !== null;
    let djType = document
      .querySelector("#presenter-text")
      .textContent.replace("Currently playing: ", "");

    if (dj) {
      presenceData.details = format
        .replace("%song%", title)
        .replace("%artist%", artist);

      if (djType == "") djType = "AutoDJ";

      presenceData.state =
        djType == "AutoDJ"
          ? "No DJ Currently Playing"
          : "Current DJ: " + djType;
    } else {
      presenceData.details = format1
        .replace("%song%", title)
        .replace("%artist%", artist);
      presenceData.state = format2
        .replace("%song%", title)
        .replace("%artist%", artist);
    }

    presenceData.smallImageKey = paused ? "pause" : "play";

    if (title == "Welcome back!") {
      presenceData.details = "Loading player...";
      delete presenceData.state;
      delete presenceData.smallImageKey;
    }
  } else {
    if (info) {
      if (document.location.pathname.includes("/downloads")) {
        presenceData.details = "Viewing the downloads";
      } else if (document.location.pathname.includes("/team")) {
        presenceData.details = "Viewing the team";
      } else if (document.location.pathname.includes("/community")) {
        const title = document.querySelector(
          "#top > div.p-body > div > div.p-body-header > div.p-title > h1"
        ).textContent;

        if (title !== "GGRadio") {
          presenceData.details = "Forums - Viewing category:";
          presenceData.state = title;
        } else {
          presenceData.details = "Forums - Browsing...";
        }
      } else if (document.location.pathname.includes("/threads")) {
        presenceData.details = "Forums - Reading thread:";
        presenceData.state = document.querySelector(
          "#top > div.p-body > div > div.p-body-header > div.p-title"
        ).textContent;
        presenceData.smallImageKey = "reading";
      } else if (document.location.pathname.includes("/members")) {
        presenceData.details = "Forums - Viewing member:";
        presenceData.state = document.querySelector(
          "#top > div.p-body > div > div.p-body-main > div > div > div > div > div > div > div.memberHeader-main > div > h1"
        ).textContent;
        presenceData.smallImageKey = "reading";
      } else if (document.location.pathname.includes("/account")) {
        presenceData.details = "Viewing their account";
        presenceData.smallImageKey = "reading";
      } else if (document.location.pathname == "/") {
        presenceData.details = "Browsing...";
      }
    } else {
      presenceData.details = "Browsing...";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
