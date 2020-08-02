const presence = new Presence({
  clientId: "701914032541794386"
});

const time = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "meetlogo"
    },
    path = document.location.pathname.toLowerCase();
  if (path === "/") {
    presenceData.details = "Initial page";
    presenceData.state = "Just waiting";
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  } else {
    const text = "textContent" in document.body ? "textContent" : "innerText";
    document.title = document.getElementsByTagName("span")[30][text];
    presenceData.smallImageKey = "vcall";
    presenceData.details = "In a meeting";
    presenceData.state = document.title + " user(s) in the room";
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  }
});
