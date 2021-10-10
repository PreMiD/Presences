const presence = new Presence({
  clientId: "691325899307483197"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    route = document.location.pathname.split("/");

  if (document.location.pathname === "/") presenceData.details = "Home";
  else if (document.location.pathname.includes("/dashboard")) {
    presenceData.details = "Dashboard";
    presenceData.state = "Choosing a server...";
  } else if (document.location.pathname.includes("/server/")) {
    presenceData.details = `Edit a server : ${
      document.querySelector(".title").textContent
    }`;
    if (!route[3]) presenceData.state = "Main";
    else presenceData.state = document.querySelector("a.is-active").textContent;
  } else if (document.location.pathname.includes("/status")) {
    presenceData.details = "Status";
    presenceData.state = "Watching current status of Koya";
  } else if (document.location.pathname.includes("/commands")) {
    presenceData.details = "Commands";
    presenceData.state = document.querySelector(
      "a.cat-toggle.is-active"
    ).textContent;
  } else if (document.location.pathname.includes("/premium")) {
    presenceData.details = "Premium";
    presenceData.state = "Watching premium page";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presenceData.state ??= "Navigating...";
    presence.setActivity(presenceData);
  }
});
