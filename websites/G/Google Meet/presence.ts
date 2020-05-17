const presence = new Presence({
  clientId: "701914032541794386"
});

const time = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
  const presenceData: presenceData = {
      largeImageKey: "meetlogo"
    },
    path = document.location.pathname.toLowerCase();
  if (path === "/") {
    presenceData.details = "Initial page";
    presenceData.state = "Just waiting";
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  } else {
    presenceData.smallImageKey = "vcall";
    presenceData.details = "Watching";
    presenceData.state = "In a meeting";
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  }
});
