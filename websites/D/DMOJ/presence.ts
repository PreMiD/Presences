const presence = new Presence({
    clientId: "754070047193956492"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "dmoj"
  };

  // HOME
  if (document.location.pathname == "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing home page";
    presenceData.smallImageKey = "home";
    presenceData.smallImageText = "Home";
  } else if (document.location.pathname.includes("/post/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing post:";
    presenceData.state = document.querySelector(
      "body > div > main > h2"
    ).textContent;
    presenceData.smallImageKey = "home";
    presenceData.smallImageText = "Home";
  }

  // PROBLEM
  else if (document.location.pathname.includes("/problems")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing problems";
    presenceData.smallImageKey = "problem";
    presenceData.smallImageText = "Problem";
  } else if (
    document.location.pathname.includes("/problem/") &&
    document.location.pathname.includes("/submit")
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Submitting to problem:";
    presenceData.state = document.querySelector(
      "body > div > main > h2 > a"
    ).textContent;
    presenceData.smallImageKey = "submit";
    presenceData.smallImageText = "Submission";
  } else if (
    document.location.pathname.includes("/problem/") &&
    document.location.pathname.includes("/resubmit")
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Submitting to problem:";
    presenceData.state = document.querySelector(
      "body > div > main > h2 > a"
    ).textContent;
    presenceData.smallImageKey = "submit";
    presenceData.smallImageText = "Submission";
  } else if (
    document.location.pathname.includes("/problem/") &&
    document.location.pathname.includes("/editorial")
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing editorial for problem:";
    presenceData.state = document.querySelector(
      "body > div > main > h2 > a"
    ).textContent;
    presenceData.smallImageKey = "problem";
    presenceData.smallImageText = "Problem";
  } else if (
    document.location.pathname.includes("/problem/") &&
    document.location.pathname.includes("/submissions")
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing submissions to problem:";
    presenceData.state = document.querySelectorAll(
      "body > div > main > div > div > h2 > a"
    )[-1].textContent;
    presenceData.smallImageKey = "submit";
    presenceData.smallImageText = "Submission";
  } else if (
    document.location.pathname.includes("/problem/") &&
    document.location.pathname.includes("/rank/")
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing best submissions to problem:";
    presenceData.state = document.querySelector(
      "body > div > main > div > div > h2 > a"
    ).textContent;
    presenceData.smallImageKey = "submit";
    presenceData.smallImageText = "Submission";
  } else if (
    document.location.pathname.includes("/problem/") &&
    document.location.pathname.includes("/tickets/new")
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Reporting issue for problem:";
    presenceData.state = document.querySelector(
      "body > div > main > h2 > a"
    ).textContent;
    presenceData.smallImageKey = "report";
    presenceData.smallImageText = "Report";
  } else if (document.location.pathname.includes("/problem/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing problem:";
    if (
      document.querySelector(".pi-value").textContent.split("\n", 2)[1] == "1 "
    ) {
      presenceData.state = `${
        document.querySelector("body > div > main > div > h2").textContent
      } (${
        document.querySelector(".pi-value").textContent.split("\n", 2)[1]
      }point)`;
    } else {
      presenceData.state = `${
        document.querySelector("body > div > main > div > h2").textContent
      } (${
        document
          .querySelector(".pi-value")
          .textContent.split("\n", 2)[1]
          .split(" ", 2)[0]
      } points)`;
    }

    presenceData.smallImageKey = "problem";
    presenceData.smallImageText = "Problem";
  } else if (document.location.pathname.includes("/submissions/user")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing submissions by user:";
    if (
      document.querySelector("body > div > main > div > div > h2")
        .textContent != "All my submissions"
    ) {
      presenceData.state = document.querySelector(
        "body > div > main > div > div > h2 > a"
      ).textContent;
    } else {
      presenceData.state = document.querySelector(
        "body > nav > div > span > ul > li > a > span > span > b"
      ).textContent;
    }
    presenceData.smallImageKey = "user";
    presenceData.smallImageText = "User";
  } else if (document.location.pathname.includes("/submissions")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing submissions";
    presenceData.smallImageKey = "submit";
    presenceData.smallImageText = "Submission";
  } else if (document.location.pathname.includes("/submission/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = `Viewing submission of problem: ${
      document.querySelector("body > div > main > h2 > a").textContent
    }`;
    presenceData.state = `By user: ${
      document.querySelectorAll("body > div > main > h2 > a")[1].textContent
    }`;
    presenceData.smallImageKey = "user";
    presenceData.smallImageText = "User";
  } else if (document.location.pathname.includes("/src/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = `Viewing submission source of problem: ${
      document.querySelector("body > div > main > h2 > a").textContent
    }`;
    presenceData.state = `By user: ${
      document.querySelectorAll("body > div > main > h2 > a")[1].textContent
    }`;
    presenceData.smallImageKey = "user";
    presenceData.smallImageText = "User";
  } else if (
    document.location.pathname.includes("/organization/") &&
    document.location.pathname.includes("/users")
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing members in organization:";
    presenceData.state = document
      .querySelector("body > div > main > h2")
      .textContent.split(" Members")[0];
    presenceData.smallImageKey = "organization";
    presenceData.smallImageText = "Organization";
  } else if (document.location.pathname.includes("/users")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing leaderboard";
    presenceData.smallImageKey = "user";
    presenceData.smallImageText = "User";
  } else if (
    document.location.pathname.includes("/user/") &&
    document.location.pathname.includes("/solved")
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing problems solved by user:";
    if (document.querySelector(".tabs > h2").textContent != "My account") {
      presenceData.state = `${
        document.querySelector(".tabs > h2").textContent.split(" ")[1]
      } (Rank #${
        document
          .querySelectorAll(".user-sidebar > div")[2]
          .textContent.split("#", 2)[1]
      })`;
    } else {
      presenceData.state = `${
        document.querySelector(
          "body > nav > div > span > ul > li > a > span > span > b"
        ).textContent
      } (Rank #${
        document
          .querySelectorAll(".user-sidebar > div")[2]
          .textContent.split("#", 2)[1]
      })`;
    }
    presenceData.smallImageKey = "user";
    presenceData.smallImageText = "User";
  } else if (document.location.pathname.includes("/user")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing user:";
    if (document.querySelector(".tabs > h2").textContent != "My account") {
      presenceData.state = `${
        document.querySelector(".tabs > h2").textContent.split(" ")[1]
      } (Rank #${
        document
          .querySelectorAll(".user-sidebar > div")[2]
          .textContent.split("#", 2)[1]
      })`;
    } else {
      presenceData.state = `${
        document.querySelector(
          "body > nav > div > span > ul > li > a > span > span > b"
        ).textContent
      } (Rank #${
        document
          .querySelectorAll(".user-sidebar > div")[2]
          .textContent.split("#", 2)[1]
      })`;
    }
    presenceData.smallImageKey = "user";
    presenceData.smallImageText = "User";
  } else if (document.location.pathname.includes("/edit/profile")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Editing profile";
    presenceData.smallImageKey = "user";
    presenceData.smallImageText = "User";
  } else if (document.location.pathname.includes("/organizations")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing organizations";
    presenceData.smallImageKey = "organization";
    presenceData.smallImageText = "Organization";
  } else if (document.location.pathname.includes("/organization/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing organization:";
    presenceData.state = document.querySelector(
      "body > div > main > h2"
    ).textContent;
    presenceData.smallImageKey = "organization";
    presenceData.smallImageText = "Organization";
  }

  // CONTESTS
  else if (document.location.pathname.includes("/contests")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing contests";
    presenceData.smallImageKey = "contest";
    presenceData.smallImageText = "Contest";
  } else if (
    document.location.pathname.includes("/contest/") &&
    document.location.pathname.includes("/stats")
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing statistics of contest:";
    presenceData.state = document.querySelector(".tabs > h2").textContent;
    presenceData.smallImageKey = "contest";
    presenceData.smallImageText = "Contest";
  } else if (
    document.location.pathname.includes("/contest/") &&
    document.location.pathname.includes("/ranking")
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing rankings of contest:";
    presenceData.state = document.querySelector(".tabs > h2").textContent;
    presenceData.smallImageKey = "contest";
    presenceData.smallImageText = "Contest";
  } else if (
    document.location.pathname.includes("/contest/") &&
    document.location.pathname.includes("/participations")
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing participation of contest:";
    presenceData.state = document.querySelector(".tabs > h2").textContent;
    presenceData.smallImageKey = "contest";
    presenceData.smallImageText = "Contest";
  } else if (
    document.location.pathname.includes("/contest/") &&
    document.location.pathname.includes("/rank/")
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing best submissions to problem:";
    presenceData.state = document.querySelector(
      "body > div > main > div > div > h2 > a"
    ).textContent;
    presenceData.smallImageKey = "submit";
    presenceData.smallImageText = "Submission";
  } else if (document.location.pathname.includes("/contest/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing contest:";
    presenceData.state = document.querySelector(".tabs > h2").textContent;
    presenceData.smallImageKey = "contest";
    presenceData.smallImageText = "Contest";
  }

  // ABOUT
  else if (document.location.pathname.includes("/about")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing about page";
    presenceData.smallImageKey = "about";
    presenceData.smallImageText = "About";
  } else if (document.location.pathname.includes("/status")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing status";
    presenceData.smallImageKey = "about";
    presenceData.smallImageText = "About";
  } else if (document.location.pathname.includes("/runtimes/matrix/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing version matrix";
    presenceData.smallImageKey = "about";
    presenceData.smallImageText = "About";
  } else if (document.location.pathname.includes("/runtimes")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing runtimes";
    presenceData.smallImageKey = "about";
    presenceData.smallImageText = "About";
  } else if (document.location.pathname.includes("/tips")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing tips";
    presenceData.smallImageKey = "about";
    presenceData.smallImageText = "About";
  } else if (document.location.pathname.includes("/api")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing API";
    presenceData.smallImageKey = "about";
    presenceData.smallImageText = "About";
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
