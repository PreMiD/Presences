const presence = new Presence({
    clientId: "668173626775830529"
  }),
  strings = presence.getStrings({
    browsing: "presence.activity.browsing"
  }),
  getElement = (query: string): string | undefined => {
    const element = document.querySelector(query);
    return element?.textContent.trimStart().trimEnd();
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
  const host = location.host,
    path = location.pathname.replace(/\/?$/, "/"),
    showBrowsing = await presence.getSetting("browse"),
    showCourses = await presence.getSetting("course"),
    showCodes = await presence.getSetting("code"),
    showTimestamps = await presence.getSetting("timestamp");

  let data: PresenceData = {
    details: undefined,
    state: undefined,
    largeImageKey: "sololearn",
    smallImageKey: undefined,
    smallImageText: undefined,
    startTimestamp: elapsed,
    endTimestamp: undefined
  };

  if (document.location.href !== prevUrl) {
    prevUrl = document.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  if (showBrowsing) {
    if (host === "www.sololearn.com") {
      for (const [k, v] of Object.entries(statics)) {
        if (path.match(k)) {
          data = { ...data, ...v };
        }
      }

      if (path === "/") {
        data.details = "Browsing...";
        data.state = "Home";
      }

      if (path.includes("/Codes/")) {
        data.details = "Browsing Code Playground...";
        data.state = getElement(".tab.active");
      }

      if (path.includes("/Discuss/")) {
        data.details = "Browsing Discussions...";
        data.state = getElement(".tab.active");

        if (document.querySelector(".post")) {
          data.details = "Browsing Discussion...";
          data.state = getElement(".detailsWrapper > .header");
        }
      }

      if (path.includes("/Leaderboard/")) {
        data.details = "Browsing Leaderboard...";
        data.state = stripCourse(getElement(".nameTitle"));
      }

      if (path.includes("/Blog/")) {
        data.details = "Browsing Blogs...";

        if (document.querySelector(".post")) {
          data.details = "Browsing Blog...";
          data.state = getElement(".articleTitle");
        }
      }

      if (path.includes("/Course/")) {
        data.details = "Browsing Course...";
        data.state = getElement(".courseDescription > h1");
      }

      if (path.includes("/Profile/")) {
        data.details = "Browsing Profile...";

        const course = getElement(".course .name");
        data.state = getElement(".user .name");
        data.state += course ? ` (${stripCourse(course)})` : "";
      }
    }
  }

  if (showCourses) {
    if (path.includes("/Play/")) {
      const icon: HTMLImageElement = document.querySelector(".content > .icon");
      data.details = `Learning ${stripCourse(icon.alt)}`;
      data.state = getElement(".title");
    }
  }

  if (showCodes) {
    if (host === "code.sololearn.com") {
      data.details = "Viewing Code...";
      data.state = `${getElement(".codeName")} (${getElement(
        ".tab-box.active"
      )})`;
    }
  }

  if (data.details) {
    if (data.details.match("(Browsing|Viewing)")) {
      data.smallImageKey = "reading";
      data.smallImageText = (await strings).browse;
    }
    if (!showTimestamps) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    presence.setActivity(data);
  } else {
    presence.setActivity();
  }
});
