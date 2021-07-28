const presence = new Presence({
    clientId: "842486883128705024"
  }),
  path = location.pathname,
  timeElapsed = ~~(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: timeElapsed
  };

  switch (path.split("/")[1]) {
    case "top": {
      presenceData.details = "Browsing through";
      presenceData.state = "Top Recent Blog Posts";
      break;
    }

    case "topComments": {
      presenceData.details = "Browsing through";
      presenceData.state = "Top Comments";
      break;
    }

    case "blog": {
      if (path.includes("new")) presenceData.details = "Creating a new blog";
      else if (path.includes("entry")) {
        const blogTitle = document.querySelector(".title > a > p").textContent,
          author = document.querySelector(".info > a").textContent;

        presenceData.details = blogTitle;
        presenceData.state = `By ${author}`;
        presenceData.smallImageKey = "reading";
      } else {
        const author = document
          .querySelector("#pageContent")
          .lastElementChild.querySelector("div > h3").textContent;

        presenceData.details = "Browsing through";
        presenceData.state = author;
      }

      break;
    }

    case "contests": {
      if (path.includes("with")) {
        const [, , , user] = path.split("/");

        presenceData.details = "Viewing";
        presenceData.state = `Participated contest of ${user}`;
      } else if (path.includes("writer")) {
        const [, , , user] = path.split("/");

        presenceData.details = "Viewing Problemsetting";
        presenceData.state = `Contests of ${user}`;
      } else if (!location.pathname.split("/")[2]) {
        presenceData.details = "Browsing through";
        presenceData.state = "Upcoming contests and Past contests";
      } else {
        const [contestTitle] = document.title.split("-");

        presenceData.details = "Waiting for contest";
        presenceData.state = contestTitle.trim();
      }
      break;
    }

    case "contestRegistration": {
      const contestTitle =
        document.querySelector("#pageContent > h2").textContent;

      presenceData.details = "Registering for";
      presenceData.state = contestTitle;
      break;
    }

    case "contestRegistrants": {
      const [, contestTitle] = document.title.split("-");

      presenceData.details = "Viewing Registrants for";
      presenceData.state = contestTitle.trim();
      break;
    }

    case "contest": {
      const contestTitle = document.querySelector(".left").textContent;

      presenceData.details = "Viewing Contest";
      presenceData.state = contestTitle;

      if (path.includes("problem")) {
        const problemTitle = document.querySelector(".title").textContent;

        presenceData.details = contestTitle;
        presenceData.state = problemTitle;
        presenceData.smallImageKey = "reading";
        presenceData.smallImageText = "Solving";
      } else if (path.includes("submit"))
        presenceData.details = "Submitting Solution for";
      else if (path.includes("my"))
        presenceData.details = "Viewing their submissions";
      else if (path.includes("status"))
        presenceData.details = "Viewing Contest Status";
      else if (path.includes("hacks")) presenceData.details = "Viewing Hacks";
      else if (path.includes("room")) {
        const [room, contestTitle] = document.title.split("-");

        presenceData.details = "Viewing Room";
        presenceData.state = `${room.trim()} | ${contestTitle.trim()}`;
      } else if (path.includes("standings")) {
        const [, contestTitle] = document.title.split("-");

        presenceData.details = "Viewing Final Standings";
        presenceData.state = contestTitle.trim();
      } else if (path.includes("ratings")) {
        const contestTitle = document
          .querySelector(".title")
          .textContent.trim();

        presenceData.details = "Viewing Rating Changes";
        presenceData.state = contestTitle;
      } else if (path.includes("participant")) {
        const contestTitle = document.querySelector(".left").textContent,
          [, , , , user] = path.split("/");

        presenceData.details = `Viewing ${user}'s submissions`;
        presenceData.state = contestTitle;
      } else if (path.includes("submission")) {
        presenceData.details = "Viewing Submission";
        delete presenceData.state;
      } else if (path.includes("customtest")) {
        presenceData.details = "Performing Custom Test";
        delete presenceData.state;
      }
      break;
    }

    case "gym": {
      const gymTitle = document.querySelector(".left").textContent;

      presenceData.details = "Viewing Gym";
      presenceData.state = gymTitle;

      if (path.includes("problem")) {
        const problemTitle = document.querySelector(".title").textContent;

        presenceData.details = gymTitle;
        presenceData.state = problemTitle;
        presenceData.smallImageKey = "reading";
        presenceData.smallImageText = "Solving";
      } else if (path.includes("submit"))
        presenceData.details = "Submitting Solution for";
      else if (path.includes("my"))
        presenceData.details = "Viewing their submissions";
      else if (path.includes("status"))
        presenceData.details = "Viewing Contest Status";
      else if (path.includes("standings")) {
        const [, gymTitle] = document.title.split("-");

        presenceData.details = "Viewing Final Standings";
        presenceData.state = gymTitle.trim();
      } else if (path.includes("customtest")) {
        presenceData.details = "Performing Custom Test";
        delete presenceData.state;
      }
      break;
    }

    case "gyms": {
      presenceData.details = "Viewing";
      presenceData.state = "Gyms";
      break;
    }

    case "mashups": {
      presenceData.details = "Viewing";
      presenceData.state = "Mashups";
      break;
    }

    case "problemset": {
      presenceData.details = "Browsing through";
      presenceData.state = "Problem Sets";

      if (path.includes("problem")) {
        const contestTitle = document.querySelector(".left").textContent,
          problemTitle = document.querySelector(".title").textContent;

        presenceData.details = contestTitle;
        presenceData.state = problemTitle;
        presenceData.smallImageKey = "reading";
        presenceData.smallImageText = "Solving";
      } else if (path.includes("submit")) {
        const contestTitle = document
            .querySelector("#pageContent")
            .childNodes[5].textContent.trim(),
          problemName = document
            .querySelector(".table-form > tbody > tr")
            .lastElementChild.textContent.trim();

        presenceData.details = "Submitting Solution for";
        presenceData.state = `${problemName} | ${contestTitle}`;
      } else if (path.includes("status")) {
        presenceData.details = "Viewing";
        presenceData.state = "Contest Status";
      } else if (path.includes("standings")) {
        presenceData.details = "Viewing";
        presenceData.state = "Standings";
      } else if (path.includes("customtest")) {
        presenceData.details = "Performing Custom Test";
        delete presenceData.state;
      }
      break;
    }

    case "group": {
      const groupTitle = document.querySelector(".left").textContent;

      if (path.includes("contests")) {
        presenceData.details = "Viewing Group Contest";
        presenceData.state = groupTitle;
      } else if (path.includes("members")) {
        presenceData.details = "Viewing Group members";
        presenceData.state = `in ${groupTitle}`;
      } else if (path.includes("problem")) {
        const problemTitle = document.querySelector(".title").textContent;

        presenceData.details = groupTitle;
        presenceData.state = problemTitle;
        presenceData.smallImageKey = "reading";
        presenceData.smallImageText = "Solving";
      } else if (path.includes("submit")) {
        presenceData.details = "Submitting Solution for";
        presenceData.state = `Gym: ${groupTitle}`;
      } else if (path.includes("my")) {
        presenceData.details = "Viewing their submissions";
        presenceData.state = `Gym: ${groupTitle}`;
      } else if (path.includes("status")) {
        presenceData.details = "Viewing Contest Status";
        presenceData.state = `Gym: ${groupTitle}`;
      } else if (path.includes("standings")) {
        const [, title] = document.title.split("-");

        presenceData.details = "Viewing Final Standings";
        presenceData.state = title.trim();
      } else if (path.includes("customtest"))
        presenceData.details = "Performing Custom Test";
      else if (path.includes("contest")) {
        const [, title] = document.title.split("-");

        presenceData.details = `Group Contest: ${groupTitle}`;
        presenceData.state = title.trim();
      }
      break;
    }

    case "groups": {
      presenceData.details = "Browsing through";
      presenceData.state = "groups";

      if (path.includes("create")) {
        presenceData.details = "Creating new a group";
        delete presenceData.state;
      }
      break;
    }

    case "ratings": {
      presenceData.details = "Browsing through";
      presenceData.state = "Ratings";

      if (path.includes("all")) presenceData.state = "Ratings (all)";
      else if (path.includes("friends")) {
        presenceData.details = "Browsing through their";
        presenceData.state = "friends rating";
      } else if (path.includes("country"))
        presenceData.state = "country ratings";
      else if (path.includes("organization"))
        presenceData.state = "organization ratings";

      break;
    }

    case "edu": {
      presenceData.details = "Viewing";
      presenceData.state = "Edu (Courses)";

      if (path.includes("problem")) {
        const courseTitle = document
            .querySelector(".eduCoursePath")
            .textContent.trim(),
          problemTitle = document.querySelector(".title").textContent;

        presenceData.details = courseTitle;
        presenceData.state = problemTitle;
        presenceData.smallImageKey = "reading";
        presenceData.smallImageText = "Solving";
      } else if (path.includes("submit")) {
        const courseTitle = document
          .querySelector(".eduCoursePath")
          .textContent.trim();

        presenceData.details = "Submitting Solution for";
        presenceData.state = courseTitle;
      } else if (path.includes("status")) {
        const courseTitle = document
            .querySelector(".eduCoursePath")
            .textContent.trim(),
          topicTitle = document
            .querySelector(".eduLessonPath")
            .textContent.trim();

        presenceData.details = "Viewing Submissions in";
        presenceData.state = `${topicTitle} | ${courseTitle}`;
      } else if (path.includes("hacks")) {
        const courseTitle = document
            .querySelector(".eduCoursePath")
            .textContent.trim(),
          topicTitle = document
            .querySelector(".eduLessonPath")
            .textContent.trim();

        presenceData.details = "Viewing hacks in";
        presenceData.state = `${topicTitle} | ${courseTitle}`;
      } else if (path.includes("standings")) {
        const courseTitle = document
            .querySelector(".eduCoursePath")
            .textContent.trim(),
          topicTitle = document
            .querySelector(".eduLessonPath")
            .textContent.trim();

        presenceData.details = "Viewing Final Standings in";
        presenceData.state = `${topicTitle} | ${courseTitle}`;
      } else if (path.includes("customtest")) {
        presenceData.details = "Performing Custom Test";
        delete presenceData.state;
      } else if (path.includes("practice")) {
        const [, topicTitle] = document.title.split("-");

        presenceData.details = "Viewing Edu practice";
        presenceData.state = topicTitle.trim();
      } else if (path.includes("lesson")) {
        const topicTitle = document
          .querySelector(".eduLessonPath")
          .textContent.trim();

        presenceData.details = "Taking a lesson";
        presenceData.state = topicTitle;
        presenceData.smallImageKey = "reading";
      } else if (path.split("/")[2] === "courses") {
        presenceData.details = "Browsing through";
        presenceData.state = "Edu (Courses)";
      }

      break;
    }

    case "apiHelp": {
      presenceData.details = "Reading";
      presenceData.state = "API Help";
      presenceData.smallImageKey = "reading";
      break;
    }

    case "calendar": {
      presenceData.details = "Viewing";
      presenceData.state = "Calendar";
      break;
    }

    case "help": {
      presenceData.details = "Viewing";
      presenceData.state = "Help";
      break;
    }

    case "profile": {
      const [user] = document.title.split("-");

      presenceData.details = "Viewing profile";
      presenceData.state = user.trim();
      break;
    }

    case "settings": {
      presenceData.details = "Editing their settings";
      break;
    }

    case "lists": {
      presenceData.details = "Viewing their lists";

      if (path.includes("new")) presenceData.details = "Creating a new list";
      break;
    }

    case "submissions": {
      const [, , user] = path.split("/");

      presenceData.details = "Viewing";
      presenceData.state = `${user}'s submissions`;
      break;
    }

    case "favourite": {
      presenceData.details = "Browsing through their";

      if (path.includes("blogEntries")) presenceData.state = "favorite blogs";
      else if (path.includes("comments"))
        presenceData.state = "favorite blog comments";
      else if (path.includes("problems"))
        presenceData.state = "favorite problems";
      else if (path.includes("contest"))
        presenceData.state = "favorite contests";
      else if (path.includes("groups")) presenceData.state = "favorite groups";
      break;
    }

    default: {
      presenceData.details = "Viewing home page";
      break;
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
