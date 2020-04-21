let presence = new Presence({
  clientId: "701863684728946799"
});

var elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  var presenceData = {
    largeImageKey: "irentae",
    startTimestamp: elapsed,
    details: window.location.href.slice(24)
  };

  if (window.location.href == "http://angusnicneven.com/") {
    presenceData.details = "/index";
  }

  presence.setTrayTitle("Terminal 00 - " + presenceData.details);
  presence.setActivity(presenceData);
});
