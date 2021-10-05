const presence = new Presence({
    clientId: "730897382937591848"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "fivem",
      startTimestamp: browsingTimestamp
    },
    { pathname } = document.location,
    { hostname } = document.location;

  if (hostname === "fivem.net" || hostname === "www.fivem.net") {
    presenceData.details = "Viewing:";
    if (pathname === "/") presenceData.state = "Home Page";
  } else if (
    hostname === "docs.fivem.net" ||
    hostname === "www.docs.fivem.net"
  ) {
    presenceData.details = "Viewing documentation:";
    if (pathname.startsWith("/docs/")) {
      presenceData.state = document.querySelector(
        "body > div > div > div > main > div > h1:nth-child(1)"
      ).textContent;
    }
  } else if (
    hostname === "servers.fivem.net" ||
    hostname === "www.servers.fivem.net"
  ) {
    presenceData.details = "Viewing server:";
    if (pathname.startsWith("/servers/detail/")) {
      presenceData.state = document.querySelector(
        "body > app-root > div > div.app-root > servers > app-servers-detail > div.info.one-info > h1"
      ).textContent;
    } else if (pathname === "/servers")
      presenceData.details = "Seaching for a server";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
