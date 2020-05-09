var presence = new Presence({
  clientId: "671918505267822594"
});
var strings = presence.getStrings({
  browsing: "presence.activity.browsing"
});

var oldUrl, elapsed;

var data: presenceData = {
  largeImageKey: "pmg"
};

presence.on("UpdateData", async () => {
  var string = (await strings).browsing;
  const static = {
    "": {
      details: "Browsing"
    },
    "/privacy.html": {
      details: "Viewing",
      state: "Privacy and Terms of Service"
    }
  };

  const host = location.host;
  const path = location.pathname.replace(/\/$/, "");

  if (oldUrl !== host) {
    oldUrl = host;
    elapsed = Math.floor(Date.now() / 1000);
  }

  if (elapsed) {
    data.startTimestamp = elapsed;
  }

  if (path in static) {
    data = { ...data, ...static[path] };
  }

  if (data.details !== undefined) {
    if (data.details.match("(Viewing|Browsing)")) {
      data.smallImageKey = "reading";
      data.smallImageText = string;
    }

    presence.setActivity(data);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
