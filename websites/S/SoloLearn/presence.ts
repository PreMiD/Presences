var presence = new Presence({
  clientId: "668173626775830529"
});
var strings = presence.getStrings({
  browsing: "presence.activity.browsing"
});

const getElement = (selector: string): string => {
  const element = document.querySelector(selector);

  if (element) {
    return element.textContent;
  }
};

var oldUrl, elapsed;

var data: presenceData = {
  largeImageKey: "sololearn"
};

presence.on("UpdateData", async () => {
  var browsing = (await strings).browsing;
  const static = {
    "/": {
      details: "Browsing",
      state: "Homepage"
    },
    "/User/Login": {
      details: "Logging in..."
    },
    "/User/Register": {
      details: "Registering..."
    },
    "/User/Edit": {
      details: "Editing profile..."
    },
    "/Features": {
      details: "Browsing",
      state: "Features"
    },
    "/Contact": {
      details: "Browsing",
      state: "Contact"
    },
    "/Terms-of-Use": {
      details: "Browsing",
      state: "Terms of Use"
    },
    "/faq": {
      details: "Browsing",
      state: "FAQ"
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

  if (path.match("/Certificate")) {
    data.details = "Viewing Certificate";
  }

  const play = path.match("/Play/(.*)");
  if (play) {
    data.details = "Learning";

    var course = play[1];
    course = course.replace(/Plus/g, "+");

    data.state = course;
  }

  if (path.match("/Profile")) {
    data.details = "Viewing Profile";

    const name = getElement(".name");
    const course = getElement("div.course .name");

    if (name) {
      if (course) {
        data.state = `${name} | ${course}`;
      } else {
        data.state = name;
      }
    }
  }

  if (path.match("/Course")) {
    data.details = "Viewing Course";

    const name = getElement(".courseDescription > h1");
    if (name) {
      data.state = name;
    }
  }

  if (path.match("/Courses")) {
    data.details = "Viewing Courses";
  }

  if (path.match("/Codes")) {
    data.details = "Viewing Codes";

    const tab = getElement(".tab.active");
    if (tab) {
      data.state = tab;
    }
  }

  if (host.match("code.sololearn.com")) {
    data.details = "Viewing Code";

    const name = getElement(".codeName");
    if (name) {
      data.state = name;
    }
  }

  if (path.match("/Discuss")) {
    data.details = "Viewing Discussions";

    const name = getElement(".question .header");
    if (name) {
      data.details = "Viewing Discussion";
      data.state = name;
    }

    const tab = getElement(".tab.active");
    if (tab) {
      data.state = tab;
    }
  }

  if (path.match("/Leaderboard")) {
    data.details = "Viewing Leaderboard";

    const type = getElement(".nameTitle");
    if (type) {
      data.state = type;
    }
  }

  if (path.match("/Blog")) {
    data.details = "Viewing Blog";

    const name = getElement(".articleTitle");
    if (name) {
      data.state = name;
    }
  }

  if (data !== null && data.details !== undefined) {
    data.smallImageKey = data.details.match("(Viewing|Browsing)")
      ? "reading"
      : null;
    data.smallImageText = data.details.match("(Viewing|Browsing)")
      ? browsing
      : null;

    presence.setActivity(data);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
