var presence = new Presence({
  clientId: "701914032541794386"
});

var time = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
  let data = {
      largeImageKey: "meetlogo"
    },
    path = document.location.pathname.toLowerCase();
  if (path === "/") {
    data.details = "Initial page";
    data.state = "Just waiting";
    data.startTimestamp = time;
    presence.setActivity(data);
  } else {
    data.smallImageKey = "vcall";
    data.details = "Watching";
    data.state = "In a meeting";
    data.startTimestamp = time;
    presence.setActivity(data);
  }
});
