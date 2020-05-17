var presence = new Presence({
  clientId: "266624760782258186"
});

var browsingStamp = Math.floor(Date.now() / 1000);

var title: Element;

presence.on("UpdateData", async () => {
  var presenceData: presenceData = {
    largeImageKey: "skyra"
  };

  if (document.location.hostname === "skyra.pw") {
    presenceData.startTimestamp = browsingStamp;

    if (document.location.pathname.includes("/guilds/")) {
      presenceData.details = "Managing server settings";
      title = document.querySelector("[data-premid='server-title']");
      presenceData.state = "server: " + title.textContent;
      presenceData.smallImageKey = "writing";
    } else if (document.location.pathname.includes("/music/")) {
      presenceData.details = "Spinning the turntables";
      title = document.querySelector("[data-premid='music-title']");

      if (title !== null) {
        presenceData.state = "Currently Playing: " + title.textContent;
      }

      presenceData.smallImageKey = "play";
    } else if (document.location.pathname === "/commands") {
      presenceData.details = "Browsing Skyra's commands";
      presenceData.smallImageKey = "reading";
    } else {
      presenceData.details = "Checking out Skyra";
      presenceData.smallImageKey = "reading";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
