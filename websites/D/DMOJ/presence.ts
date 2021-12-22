const presence = new Presence({
    clientId: "754070047193956492"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      smallImageKey: "icon",
      smallImageText: "DMOJ: Modern Online Judge"
    },
    url = document.location.pathname.split("/");

  presenceData.startTimestamp = browsingStamp;

  if (url.includes("post")) {
    const postName = document.querySelector("#content > h2").textContent.trim(),
      [, , postCode] = url,
      postURL = `https://dmoj.ca/post/${postCode}`;

    presenceData.details = "Viewing post:";
    presenceData.state = postName;
    presenceData.largeImageKey = "post";
    presenceData.buttons = [{ label: "View Post", url: postURL }];
  } else if (url.includes("problems")) {
    presenceData.details = "Browsing problems";
    presenceData.largeImageKey = "problem_list";
  } else if (url.includes("problem")) {
    const [, , problemCode] = url,
      problemURL = `https://dmoj.ca/problem/${problemCode}`;

    presenceData.buttons = [{ label: "View Problem", url: problemURL }];

    if (url.includes("submit")) {
      const problemName = document
        .querySelector("#content > h2 > a")
        .textContent.trim();

      presenceData.details = "Submitting to problem:";
      presenceData.state = problemName;
      presenceData.largeImageKey = "submit";
    } else if (url.includes("submissions")) {
      const problemName = document.querySelectorAll(".tabs > h2 > a")[
          // eslint messed up the next line
          document.querySelectorAll(".tabs > h2 > a").length - 1
        ].textContent.trim(),
        problemSubmissionsURL = `${problemURL}/submissions/`;

      presenceData.details = "Viewing submissions to problem:";
      presenceData.state = problemName;
      presenceData.largeImageKey = "submission_list";
      presenceData.buttons.push({
        label: "View Submissions",
        url: problemSubmissionsURL
      });
    } else if (url.includes("rank")) {
      const problemName = document
          .querySelector(".tabs > h2 > a")
          .textContent.trim(),
        problemBestSubmissionsURL = `${problemURL}/rank/`;

      presenceData.details = "Viewing best submissions to problem:";
      presenceData.state = problemName;
      presenceData.largeImageKey = "submission_list";
      presenceData.buttons.push({
        label: "View Best Submissions",
        url: problemBestSubmissionsURL
      });
    } else if (url.includes("editorial")) {
      const problemName = document
          .querySelector("#content > h2 > a")
          .textContent.trim(),
        problemEditorialURL = `${problemURL}/editorial/`;

      presenceData.details = "Viewing editorial for problem:";
      presenceData.state = problemName;
      presenceData.largeImageKey = "editorial";
      presenceData.buttons.push({
        label: "View Editorial",
        url: problemEditorialURL
      });
    } else if (url.includes("tickets") && url.includes("new")) {
      const problemName = document
        .querySelector("#content > h2 > a")
        .textContent.trim();

      presenceData.details = "Creating a ticket for problem:";
      presenceData.state = problemName;
      presenceData.largeImageKey = "ticket";
    } else {
      const problemName = document
          .querySelector(".problem-title > h2")
          .textContent.trim(),
        problemPoints = document.querySelector(".pi-value").textContent.trim();

      presenceData.details = "Viewing problem:";
      presenceData.largeImageKey = "problem";

      if (problemPoints === "1")
        presenceData.state = `${problemName} (${problemPoints} point)`;
      else presenceData.state = `${problemName} (${problemPoints} points)`;
    }
  } else if (url.includes("submissions")) {
    if (url.includes("user")) {
      const submissionHeader = document
        .querySelector(".tabs > h2")
        .textContent.trim();

      presenceData.details = "Viewing submissions by user:";

      if (submissionHeader === "All my submissions") {
        const user = document
            .querySelector("#user-links > ul > li > a > span > span > b")
            .textContent.trim(),
          userSubmissionsURL = `https://dmoj.ca/submissions/user/${user}`,
          userURL = `https://dmoj.ca/user/${user}`;

        presenceData.state = user;
        presenceData.largeImageKey = "submission_list";
        presenceData.buttons = [
          { label: "View Submissions", url: userSubmissionsURL },
          { label: "View User", url: userURL }
        ];
      } else {
        const user = document
            .querySelector(".tabs > h2 > a")
            .textContent.trim(),
          userSubmissionsURL = `https://dmoj.ca/submissions/user/${user}`,
          userURL = `https://dmoj.ca/user/${user}`;

        presenceData.state = user;
        presenceData.largeImageKey = "submission_list";
        presenceData.buttons = [
          { label: "View Submissions", url: userSubmissionsURL },
          { label: "View User", url: userURL }
        ];
      }
    } else {
      presenceData.details = "Browsing submissions";
      presenceData.largeImageKey = "submission_list";
    }
  } else if (url.includes("submission")) {
    const problemName = document
        .querySelector("#content > h2 > a")
        .textContent.trim(),
      [, , submissionCode] = url,
      submissionURL = `https://dmoj.ca/submission/${submissionCode}`;

    presenceData.details = "Viewing submission to problem:";
    presenceData.state = problemName;
    presenceData.largeImageKey = "submission";
    presenceData.buttons = [{ label: "View Submission", url: submissionURL }];
  } else if (url.includes("src")) {
    const problemName = document
      .querySelector("#content > h2 > a")
      .textContent.trim();

    presenceData.details = "Viewing submission source to problem:";
    presenceData.state = problemName;
    presenceData.largeImageKey = "source";
  } else if (url.includes("organizations")) {
    presenceData.details = "Browsing organizations";
    presenceData.largeImageKey = "organization";
  } else if (url.includes("organization")) {
    const [, , organizationCode] = url,
      organizationURL = `https://dmoj.ca/organization/${organizationCode}`,
      organizationMembersURL = `${organizationURL}/users`,
      organizationName = document
        .querySelector("#content > h2")
        .textContent.trim()
        .replace(" Members", "");

    presenceData.state = organizationName;
    presenceData.buttons = [
      { label: "View Organization", url: organizationURL },
      { label: "View Members", url: organizationMembersURL }
    ];

    if (url.includes("users")) {
      presenceData.details = "Viewing members of organization:";
      presenceData.largeImageKey = "users";
    } else {
      presenceData.details = "Viewing organization:";
      presenceData.largeImageKey = "organization";
    }
  } else if (url.includes("users")) {
    presenceData.details = "Viewing leaderboard";
    presenceData.largeImageKey = "leaderboard";
  } else if (url.includes("user")) {
    const userHeader = document.querySelector(".tabs > h2").textContent.trim();

    if (url.includes("solved")) {
      const [, userRank] = document
        .querySelectorAll(".user-sidebar > div")[2]
        .textContent.trim()
        .split("#");

      presenceData.details = "Viewing problems solved by:";

      if (userHeader === "My account") {
        const user = document
            .querySelector("#user-links > ul > li > a > span > span > b")
            .textContent.trim(),
          userURL = `https://dmoj.ca/user/${user}`,
          userSolvedProblemsURL = `${userURL}/solved`;

        presenceData.state = `${user} (Rank: #${userRank})`;
        presenceData.largeImageKey = "submission_list";
        presenceData.buttons = [
          { label: "View User", url: userURL },
          { label: "View Solved Problems", url: userSolvedProblemsURL }
        ];
      } else {
        const [, user] = document
            .querySelector(".tabs > h2")
            .textContent.trim()
            .split(" "),
          userURL = `https://dmoj.ca/user/${user}`,
          userSolvedProblemsURL = `${userURL}/solved`;

        presenceData.state = `${user} (Rank: #${userRank})`;
        presenceData.largeImageKey = "submission_list";
        presenceData.buttons = [
          { label: "View User", url: userURL },
          { label: "View Solved Problems", url: userSolvedProblemsURL }
        ];
      }
    } else {
      const [, userRank] = document
        .querySelectorAll(".user-sidebar > div")[2]
        .textContent.trim()
        .split("#");

      presenceData.details = "Viewing user:";

      if (userHeader === "My account") {
        const user = document
            .querySelector("#user-links > ul > li > a > span > span > b")
            .textContent.trim(),
          userURL = `https://dmoj.ca/user/${user}`;

        presenceData.state = `${user} (Rank: #${userRank})`;
        presenceData.largeImageKey = "user";
        presenceData.buttons = [{ label: "View User", url: userURL }];
      } else {
        const [, user] = document
            .querySelector(".tabs > h2")
            .textContent.trim()
            .split(" "),
          userURL = `https://dmoj.ca/user/${user}`;

        presenceData.state = `${user} (Rank: #${userRank})`;
        presenceData.largeImageKey = "user";
        presenceData.buttons = [{ label: "View User", url: userURL }];
      }
    }
  } else if (url.includes("edit") && url.includes("profile")) {
    const user = document
      .querySelector("#user-links > ul > li > a > span > span > b")
      .textContent.trim();

    presenceData.details = "Editing profile:";
    presenceData.state = user;
    presenceData.largeImageKey = "edit_profile";
  } else if (url.includes("contests")) {
    presenceData.details = "Browsing contests";
    presenceData.largeImageKey = "contest";
  } else if (url.includes("contest")) {
    const [, , contestCode] = url,
      contestURL = `https://dmoj.ca/contests/${contestCode}`,
      contestName = document.querySelector(".tabs > h2").textContent.trim();

    presenceData.state = contestName;
    presenceData.buttons = [{ label: "View Contest", url: contestURL }];

    if (url.includes("stats")) {
      const statisticsURL = `${contestURL}/stats`;

      presenceData.details = "Viewing statistics of contest:";
      presenceData.largeImageKey = "statistics";
      presenceData.buttons.push({
        label: "View Statistics",
        url: statisticsURL
      });
    } else if (url.includes("ranking")) {
      const rankingsURL = `${contestURL}/ranking`;

      presenceData.details = "Viewing rankings of contest:";
      presenceData.largeImageKey = "leaderboard";
      presenceData.buttons.push({ label: "View Rankings", url: rankingsURL });
    } else if (url.includes("participations")) {
      const participationURL = `${contestURL}/participations`;

      presenceData.details = "Viewing participation of contest:";
      presenceData.largeImageKey = "users";
      presenceData.buttons.push({
        label: "View Participation",
        url: participationURL
      });
    } else {
      presenceData.details = "Viewing contest:";
      presenceData.largeImageKey = "contest";
    }
  } else if (url.includes("about")) {
    presenceData.details = "Viewing about page";
    presenceData.largeImageKey = "about";
  } else if (url.includes("status")) {
    presenceData.details = "Viewing status";
    presenceData.largeImageKey = "status";
  } else if (url.includes("runtimes")) {
    if (url.includes("matrix")) {
      presenceData.details = "Viewing version matrix";
      presenceData.largeImageKey = "source";
    } else {
      presenceData.details = "Viewing runtimes";
      presenceData.largeImageKey = "source";
    }
  } else if (url.includes("tips")) {
    presenceData.details = "Viewing tips";
    presenceData.largeImageKey = "about";
  } else if (url.includes("api")) {
    presenceData.details = "Viewing API";
    presenceData.largeImageKey = "source";
  } else {
    presenceData.details = "Viewing home page";
    presenceData.largeImageKey = "home";
  }

  presence.setActivity(presenceData);
});
