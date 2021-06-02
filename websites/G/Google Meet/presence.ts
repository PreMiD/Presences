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
    const users = (document.querySelector(".wnPUne") ?? document.querySelector(".uGOf1d")).innerHTML;
    presenceData.smallImageKey = "vcall";
    presenceData.details = "In a meeting";
    presenceData.state = users + " users in the room";
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  }
});
