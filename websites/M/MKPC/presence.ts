const presence = new Presence({
    clientId: "812176837748457483"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let user;
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (
    document.location.pathname == "/" ||
    document.location.pathname == "/index.php" ||
    document.location.pathname == "/fr.php" ||
    document.location.pathname == "/en.php"
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing home page";
  } else if (document.location.pathname == "/forum.php") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the forum's menu";
    presenceData.smallImageKey = "search";
  } else if (document.location.pathname == "index.php") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing home page";
  }
  const elt = document.querySelector("#compteur0 > div") as HTMLElement;
  if (elt) {
    const lap = elt.innerText.replace(/.+? /g, "");
    presenceData.details = "On: Lap " + lap;
    presenceData.buttons = [
      { label: "Play Game", url: "https://mkpc.malahieude.net/mariokart.php" }
    ];
  } else if (document.location.pathname == "/mariokart.php") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "browsing map's";
    presenceData.smallImageKey = "search";
  } else if (document.location.pathname == "/category.php") {
    presenceData.startTimestamp = browsingStamp;
    user = document.querySelector("html > body > main > h1");
    presenceData.details = "Viewing the following category: " + user.innerHTML;
    presenceData.smallImageKey = "search";
  } else if (document.location.pathname == "/topic.php") {
    presenceData.startTimestamp = browsingStamp;
    user = document.querySelector("html > body > main > h1");
    presenceData.details = "Viewing: " + user.innerHTML;
    presenceData.smallImageKey = "search";
  } else if (document.location.pathname == "/profil.php") {
    presenceData.startTimestamp = browsingStamp;
    user = document.querySelector("html > body > main > h1");
    presenceData.details = "Viewing: " + user.innerHTML;
    presenceData.smallImageKey = "search";
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
