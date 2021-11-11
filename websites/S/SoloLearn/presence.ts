const presence = new Presence({
    clientId: "668173626775830529"
  }),
  strings = presence.getStrings({
    browsing: "presence.activity.browsing"
  }),
  getElement = (query: string): string | undefined => {
    return document.querySelector(query)?.textContent.trimStart().trimEnd();
  },
  stripCourse = (course: string | undefined): string | undefined => {
    return course
      ?.replace("Tutorial", "")
      .replace("Fundamentals", "")
      .trimEnd();
  };

let elapsed = Math.floor(Date.now() / 1000),
  prevUrl = document.location.href;

const statics = {
  "/User/Login": {
    details: "Logging In..."
  },
  "/User/Register": {
    details: "Registering..."
  },
  "/User/Logout": {
    details: "Logging Out..."
  },
  "/User/Edit": {
    details: "Editing Profile..."
  },
  "/Courses/": {
    details: "Browsing...",
    state: "Courses"
  },
  "/Features/": {
    details: "Viewing...",
    state: "Features"
  },
  "/Contact/": {
    details: "Viewing...",
    state: "Contact"
  },
  "/Terms-of-Use/": {
    details: "Viewing...",
    state: "Terms of Use"
  },
  "/faq/": {
    details: "Viewing...",
    state: "FAQ"
  }
};

presence.on("UpdateData", async () => {
  const { host } = location,
    path = location.pathname.replace(/\/?$/, "/"),
    showBrowsing = await presence.getSetting("browse"),
    showCourses = await presence.getSetting("course"),
    showCodes = await presence.getSetting("code"),
    showTimestamps = await presence.getSetting("timestamp");

  let data: PresenceData = {
    largeImageKey: "sololearn",
    startTimestamp: elapsed
  };

  if (document.location.href !== prevUrl) {
    prevUrl = document.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  if (showBrowsing) {
    if (host === "www.sololearn.com") {
      for (const [k, v] of Object.entries(statics))
        if (path.match(k)) data = { ...data, ...v };

      if (path === "/") {
        presenceData.details = "Browsing...";
        data.state = "Home";
      }

      if (path.includes("/Codes/")) {
        presenceData.details = "Browsing Code Playground...";
        data.state = getElement(".tab.active");
      }

      if (path.includes("/Discuss/")) {
        presenceData.details = "Browsing Discussions...";
        data.state = getElement(".tab.active");

        if (document.querySelector(".post")) {
          presenceData.details = "Browsing Discussion...";
          data.state = getElement(".detailsWrapper > .header");
        }
      }

      if (path.includes("/Leaderboard/")) {
        presenceData.details = "Browsing Leaderboard...";
        data.state = stripCourse(getElement(".nameTitle"));
      }

      if (path.includes("/Blog/")) {
        presenceData.details = "Browsing Blogs...";

        if (document.querySelector(".post")) {
          presenceData.details = "Browsing Blog...";
          data.state = getElement(".articleTitle");
        }
      }

      if (path.includes("/Course/")) {
        presenceData.details = "Browsing Course...";
        data.state = getElement(".courseDescription > h1");
      }

      if (path.includes("/Profile/")) {
        presenceData.details = "Browsing Profile...";

        const course = getElement(".course .name");
        data.state = getElement(".user .name");
        data.state += course ? ` (${stripCourse(course)})` : "";
      }
    }
  }

  if (showCourses) {
    if (path.includes("/Play/")) {
      presenceData.details = `Learning ${stripCourse(
        document.querySelector(".content > .icon").alt
      )}`;
      data.state = getElement(".title");
    }
  }

  if (showCodes) {
    if (host === "code.sololearn.com") {
      presenceData.details = "Viewing Code...";
      data.state = `${getElement(".codeName")} (${getElement(
        ".tab-box.active"
      )})`;
    }
  }

  if (presenceData.details) {
    if (presenceData.details.match("(Browsing|Viewing)")) {
      data.smallImageKey = "reading";
      data.smallImageText = (await strings).browsing;
    }
    if (!showTimestamps) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    presence.setActivity(data);
  } else presence.setActivity();
});
