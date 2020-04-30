let presence = new Presence({
    clientId: "705212564669202443"
  });
  
  let elapsed = Math.floor(Date.now() / 1000);
  
  presence.on("UpdateData", async () => {
    let presenceData = {
      largeImageKey: "logo",
      startTimestamp: elapsed,
      details: location.href.split(location.host)[1]
    };
  
    if (
      location.pathname === "/" ||
      location.href.split(location.host)[1].toLowerCase() === "/index.html"
    ) {
      presenceData.details = "/index";
    }
  
    presence.setTrayTitle("Wired Sound For Wired People - " + presenceData.details);
    presence.setActivity(presenceData);
  });
  