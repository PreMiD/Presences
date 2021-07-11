const presence = new Presence({
    clientId: "845716323296083999"
  }),
  timeElapsed: number = ~~(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: timeElapsed
    },
    domain = location.host.split(".");

  switch (domain[0]) {
    case "blog": {
      // ? https://blog.codechef.com
      presenceData.details = "Viewing Blogs";
      presenceData.smallImageKey = "reading";
      if (location.pathname.split("/")[1] === "all-blogs")
        presenceData.details = "Viewing All Blogs";
      else if (location.pathname.split("/")[1] === "author") {
        presenceData.details = "Viewing Profile: ";
        presenceData.state = `Author: ${location.pathname.split("/")[2]}`;
      } else if (location.pathname.split("/")[4]) {
        presenceData.details = `Reading: ${
          document.querySelector(".posttitle").textContent
        }`;
        presenceData.state = `Author: ${
          document.querySelector(".author-username").textContent
        }`;
        presenceData.smallImageKey = "reading";
      }
      break;
    }

    case "discuss": {
      // ? https://discuss.codechef.com
      presenceData.details = "Viewing Discussions";
      if (location.pathname.split("/")[1] === "t") {
        const discussionTopicHeading: string =
          document.querySelector(".fancy-title").textContent;
        presenceData.details = "Reading Discussions:";
        presenceData.state = discussionTopicHeading;
        presenceData.smallImageKey = "reading";
      }
      break;
    }

    default: {
      if (location.pathname.split("/")[1] === "")
        presenceData.details = "Viewing Home Page";
      else if (location.pathname.split("/").includes("tags")) {
        presenceData.details = "Viewing:";
        presenceData.state = "Problems By Tag Name";
      } else if (location.pathname.split("/").includes("problems")) {
        const contestName: string =
            document.querySelector(".breadcrumbs").lastElementChild.textContent,
          [problemName] = document.title.split("|");
        presenceData.details = contestName;
        presenceData.state = `Solving: ${problemName}`;
        presenceData.smallImageKey = "code";
      } else {
        // ? https://codechef.com
        switch (location.pathname.split("/")[1]) {
          case "ide": {
            const compilerName: string =
              document.querySelector(".chosen-single").childNodes[0]
                .textContent;
            presenceData.details = "Using IDE";
            presenceData.state = `Editing ${compilerName} file`;
            presenceData.smallImageKey = "code";
            break;
          }

          case "AIMICPC": {
            presenceData.details = "Viewing:";
            presenceData.state = "AIM ICPC - Weekly Training Series";
            break;
          }

          case "LEARNDSA": {
            presenceData.details = "Viewing:";
            presenceData.state = "DSA Learning Series";
            break;
          }

          case "contests": {
            presenceData.details = "Viewing:";
            presenceData.state = "Contests List";
            break;
          }

          case "certification": {
            const pageHeading: string =
              document.querySelector(".page-title").childNodes[3].textContent;
            presenceData.details = "Viewing Certification: ";
            presenceData.state = pageHeading;
            break;
          }

          case "careers": {
            presenceData.details = "Viewing:";
            presenceData.state = "Careers Page";
            break;
          }

          case "signup": {
            presenceData.details = "Creating an account";
            break;
          }

          case "wiki": {
            const wikiTopicHeading: string =
              document.querySelector(".ns-heading").textContent;
            presenceData.details = "Viewing Wiki:";
            presenceData.state = wikiTopicHeading;
            break;
          }

          case "users": {
            const displayName: string =
                document.querySelector("header > h2").textContent,
              [userName] = document.title.split("|");
            presenceData.details = "Viewing Profile:";
            presenceData.state = `${userName} (${displayName})`;
            break;
          }
        }
      }
    }
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
