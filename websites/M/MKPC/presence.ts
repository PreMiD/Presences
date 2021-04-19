const presence = new Presence({
    clientId: "812176837748457483"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let user;
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };

  if (
    document.location.pathname == "/" ||
    document.location.pathname == "/index.php" ||
    document.location.pathname == "/fr.php" ||
    document.location.pathname == "/en.php"
  ) {
    presenceData.details = "Viewing home page";
  } else if (document.location.pathname == "/forum.php") {
    presenceData.details = "Viewing the Forum's menu";
    presenceData.smallImageKey = "search";
    presenceData.buttons = [
      { label: "View Forum", url: document.location.href }
    ];
  }
  const elt = document.querySelector("#compteur0 > div") as HTMLElement;
  if (elt) {
    const lap = elt.innerText.replace(/.+? /g, "");
    presenceData.details = "Lap " + lap;
    presenceData.buttons = [
      { label: "Play Game", url: "https://mkpc.malahieude.net/mariokart.php" }
    ];
    presenceData.smallImageKey = "wheel";
  } else if (document.location.pathname == "/mariokart.php") {
    presenceData.details = "browsing map's";
    presenceData.smallImageKey = "search";
  } else if (document.location.pathname == "/category.php") {
    user = document.querySelector("html > body > main > h1");
    presenceData.details = "Viewing the following category: " + user.innerHTML;
    presenceData.smallImageKey = "search";
    presenceData.buttons = [
      { label: "View category", url: document.location.href }
    ];
  } else if (document.location.pathname == "/topic.php") {
    user = document.querySelector("html > body > main > h1");
    presenceData.details = "Viewing: " + user.innerHTML;
    presenceData.smallImageKey = "search";
    presenceData.buttons = [
      { label: "View topic", url: document.location.href }
    ];
  } else if (
    document.location.pathname == "/ban-player.php" ||
    document.location.pathname == "/admin.php" ||
    document.location.pathname == "doublecomptes.php"
  ) {
    presenceData.details = "Viewing staff backend";
  } else if (document.location.pathname == "/profil.php") {
    user = document.querySelector(
      "body > main > div > div.profile-summary > h1"
    );
    presenceData.details = "Viewing: " + user.innerHTML;
    presenceData.smallImageKey = "search";
    presenceData.buttons = [
      { label: "View profile", url: document.location.href }
    ];
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
