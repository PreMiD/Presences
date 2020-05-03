const presence = new Presence({
  clientId: "691669470057594940"
});

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "logo"
  };

  if (document.location.pathname === "/") {
    presenceData.details = "Home";
  } else if (document.location.pathname.includes("/web/")) {
    presenceData.details = `Playing on server : ${
      document.querySelector("#room-stats-hud").textContent
    }`;
    presenceData.state =
      `Player :${
        !document.querySelector("#tag").nodeValue
          ? ""
          : ` [${document.querySelector("#tag").nodeValue}]`
      } ${
        !document.querySelector("#name").nodeValue
          ? "no nick"
          : document.querySelector("#name").nodeValue
      }` + ` | ${document.querySelector("#stats-hud").textContent}`;
    presenceData.startTimestamp = Date.now();
  } else {
    presenceData.details = document.querySelector(".alt-page h1").textContent;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    if (presenceData.state == null) presenceData.state = "Navigating...";
    presence.setActivity(presenceData);
  }
});
