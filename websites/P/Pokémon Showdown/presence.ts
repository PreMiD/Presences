const presence = new Presence({
  clientId: "808762003476709406"
});

let elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "logo"
    },
    path = document.location.pathname;
  if (path == "/") {
    delete data.buttons;
    data.details = "Viewing Homepage";
    elapsed = null;
  } else if (path.startsWith("/teambuilder")) {
    delete data.buttons;
    data.details = "Building a Team";
    elapsed = null;
  } else if (path.startsWith("/ladder")) {
    delete data.buttons;
    data.details = "Viewing a Ladder";
    elapsed = null;
  } else if (path.includes("battle")) {
    const title = document.querySelector("a.roomtab i.text").textContent,
      users = document.querySelector("a.roomtab.button.cur span").textContent;
    data.details = title;
    data.state = users;
    data.buttons = [
      {
              label: "Spectate",
              url: document.baseURI
          }
      ];
    if (elapsed == null) {
      elapsed = Math.floor(Date.now() / 1000);
    }
    data.startTimestamp = elapsed;
  } else {
    delete data.buttons;
    data.details = "Somewhere on-site";
    elapsed = null;
  }
  presence.setActivity(data);
});
