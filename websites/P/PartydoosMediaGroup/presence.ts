const presence = new Presence({
    clientId: "671918505267822594"
  }),
  strings = presence.getStrings({
    browsing: "presence.activity.browsing"
  });

let oldUrl: string, elapsed: number;

const data: PresenceData = {
  largeImageKey: "pmg"
};

function setObject(path: string) {
  switch (path) {
    case "": {
      return {
        details: "Browsing"
      };
    }

    case "/privacy.html": {
      return {
        details: "Viewing",
        state: "Privacy and Terms of Service"
      };
    }
  }
}

presence.on("UpdateData", async () => {
  const string = (await strings).browsing,
    host = location.host,
    path = location.pathname.replace(/\/$/, ""),
    detailsObj = setObject(path);

  if (oldUrl !== host) {
    oldUrl = host;
    elapsed = Math.floor(Date.now() / 1000);
  }

  if (elapsed) {
    data.startTimestamp = elapsed;
  }

  data.details = detailsObj.details;
  data.state = detailsObj.state;

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
