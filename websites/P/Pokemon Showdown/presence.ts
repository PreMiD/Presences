var presence = new Presence({
  clientId: "619984959247220750"
});

var elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: presenceData = {
    largeImageKey: "showdown-logo"
  };

  var path = document.location.pathname;
  if (path == "/") {
    data.details = "Viewing Homepage";
    elapsed = null;
  } else if (path.startsWith("/teambuilder")) {
    data.details = "Building a Team";
    elapsed = null;
  } else if (path.startsWith("/ladder")) {
    data.details = "Viewing a Ladder";
    elapsed = null;
  } else if (path.includes("battle")) {
    var title = document.querySelector("a.roomtab i.text").textContent;
    var users = document.querySelector("a.roomtab.button.cur span").textContent;
    data.details = title;
    data.state = users;
    if (elapsed == null) {
      elapsed = Math.floor(Date.now() / 1000);
    }
    data.startTimestamp = elapsed;
  } else {
    data.details = "Somewhere on-site";
    elapsed = null;
  }
  presence.setActivity(data);
});
