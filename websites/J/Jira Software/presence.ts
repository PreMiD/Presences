var presence = new Presence({
  clientId: "782358522628145153" //Presence Application on Discord Developers ID.
});

var browsingStamp = Math.floor(Date.now() / 1000);

var projectName: any;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "jira_logo"
  };

  const path = document.location.pathname;

  if (document.location.hostname.match(/([a-z0-9]+)[.]atlassian[.]net/)) {
    //Check if user is creating a new issue.
    if (document.title != "Create issue - Jira") {
      //Projects homepage section.
      if (path == "/projects" || path == "/secure/BrowseProjects.jspa") {
        presenceData.details = "Browsing projects.";
        presenceData.startTimestamp = browsingStamp;
      }
      //Project sections.
      else if (path.includes("/jira/software/projects/")) {
        projectName = path
          .replace("/jira/software/projects/", "")
          .split("/")
          .shift();

        //Project Board section.
        if (path.match(/\/[a-zA-Z0-9]+\/boards\/[0-9]$/)) {
          let boardNumber: String = document.querySelector(
            '#jira-frontend > #helpPanelContainer > div:first-child > div > div[data-testid="Content"] > div:first-child > div:first-child > div:first-child > div > div:nth-child(2) > div:first-child > div:first-child > div > h1'
          ).innerHTML;

          presenceData.details = `Viewing ${boardNumber}.`;
          presenceData.state = `Project: ${projectName}`;
          presenceData.startTimestamp = browsingStamp;
        }
        //Project Report section.
        else if (path.includes("/reports")) {
          presenceData.startTimestamp = browsingStamp;
          switch (path.split("/").pop()) {
            case "burnup":
              presenceData.details = "Analyzing Burnup report.";
              presenceData.state = `Project: ${projectName}`;
              break;
            case "burndown":
              presenceData.details = "Analyzing Burndown report.";
              presenceData.state = `Project: ${projectName}`;
              break;
            case "velocity":
              presenceData.details = "Analyzing Velocity report.";
              presenceData.state = `Project: ${projectName}`;
              break;
            case "cumulative":
              presenceData.details = "Analyzing Cumulative report.";
              presenceData.state = `Project: ${projectName}`;
              break;
            default:
              presenceData.details = "Analyzing Reports.";
              presenceData.state = `Project: ${projectName}`;
              break;
          }
        }
        //Project Issues section.
        else if (path.includes("/issues/")) {
          let issueName = path.split("/").pop();

          presenceData.startTimestamp = browsingStamp;
          if (issueName == "") {
            presenceData.details = "Tracking Issues.";
            presenceData.state = `Project: ${projectName}`;
          } else {
            presenceData.details = `Viewing Issue ${issueName}.`;
            presenceData.state = `Project: ${projectName}`;
          }
        }
        //Project Settings section.
        else if (path.includes("/settings/")) {
          //Getting user preference for showSettingsSections.
          let showSettingsSections = await presence.getSetting(
            "showSettingsSections"
          );

          presenceData.startTimestamp = browsingStamp;
          if (showSettingsSections) {
            //Settings sections with no sub-links.
            if (!path.includes("/issuetypes") && !path.includes("/apps")) {
              switch (path.split("/").pop()) {
                case "details":
                  presenceData.details = `Editing Details settings.`;
                  presenceData.state = `Project: ${projectName}`;
                  break;
                case "access":
                  presenceData.details = `Editing Access settings.`;
                  presenceData.state = `Project: ${projectName}`;
                  break;
                case "notifications":
                  presenceData.details = `Editing Notifications settings.`;
                  presenceData.state = `Project: ${projectName}`;
                  break;
                case "features":
                  presenceData.details = `Editing Features settings.`;
                  presenceData.state = `Project: ${projectName}`;
                  break;
              }
            }
            //Settings sections with sub-links.
            else {
              if (path.includes("/apps/")) {
                if (path.includes("/app-fields")) {
                  presenceData.details = `Editing Apps settings - App fields.`;
                  presenceData.state = `Project: ${projectName}`;
                } else {
                  presenceData.details = `Editing Apps settings - Project automation`;
                  presenceData.state = `Project: ${projectName}`;
                }
              } else {
                let issueType = document.querySelector(
                  '#jira-frontend > #helpPanelContainer > div > div > div[data-testid="Content"] > div:first-child > div:first-child > div > div:nth-child(2) > div > div > div:first-child > div:nth-child(3) > div > div > div:first-child > div > form > div > div > div > h1'
                ).innerHTML;

                presenceData.details = `Editing Issue types - ${issueType}.`;
                presenceData.state = `Project: ${projectName}`;
              }
            }
          } else {
            presenceData.details = "Editing Settings.";
            presenceData.state = `Project: ${projectName}`;
          }
        }
        //Project sections with no sub-links.
        else {
          presenceData.startTimestamp = browsingStamp;
          switch (path.split("/").pop()) {
            case "roadmap":
              presenceData.details = "Viewing Roadmap.";
              presenceData.state = `Project: ${projectName}`;
              break;
            case "backlog":
              presenceData.details = "Viewing Backlog.";
              presenceData.state = `Project: ${projectName}`;
              break;
            case "code":
              presenceData.details = "Reviewing Code.";
              presenceData.state = `Project: ${projectName}`;
              break;
            case "pages":
              presenceData.details = "Viewing Pages.";
              presenceData.state = `Project: ${projectName}`;
              break;
          }
        }
      }
      //Project Releases section, the only one with a different path.
      else if (path.includes("/projects/")) {
        projectName = path.replace("/projects/", "").split("/").pop();

        presenceData.details = "Viewing Releases.";
        presenceData.state = `Project: ${projectName}`;
        presenceData.startTimestamp = browsingStamp;
      }
      //Your work section.
      else if (path == "/jira/your-work") {
        presenceData.details = "Viewing personal Issues.";
        presenceData.startTimestamp = browsingStamp;
      }
      //Browsing Issue section.
      else if (path.includes("/browse/")) {
        let issueName = path.split("/").pop();

        presenceData.details = `Viewing Issue ${issueName}`;
        presenceData.startTimestamp = browsingStamp;
      }
      //Advanced Issues section.
      else if (path == "/issues/") {
        const queryID = document.location.search
          .split("=", 2)
          .pop()
          .substr(0, 2);
        console.log(queryID);

        presenceData.details = "Tracking global Issues:";
        presenceData.startTimestamp = browsingStamp;
        switch (queryID) {
          case "-1":
            presenceData.state = "My open issues.";
            break;
          case "-2":
            presenceData.state = "Reported by me.";
            break;
          case "-3":
            presenceData.state = "Viewed recently.";
            break;
          case "-4":
            presenceData.state = "All issues.";
            break;
          case "-5":
            presenceData.state = "Open issues.";
            break;
          case "-6":
            presenceData.state = "Created recently.";
            break;
          case "-7":
            presenceData.state = "Resolved recently.";
            break;
          case "-8":
            presenceData.state = "Updated recently.";
            break;
          case "-9":
            presenceData.state = "Done issues.";
            break;
          default:
            presenceData.state = "Searching for an issue.";
            break;
        }
      }
      //Filters section.
      else if (path == "/secure/ManageFilters.jspa") {
        presenceData.details = "Managing Filters.";
        presenceData.startTimestamp = browsingStamp;
      }
      //Dashboards homepage section.
      else if (path == "/jira/dashboards") {
        presenceData.details = "Browsing dashboards.";
        presenceData.startTimestamp = browsingStamp;
      }
      //Dashboard section.
      else if (path == "/secure/Dashboard.jspa") {
        let dashboardName = document.querySelector(
          "#dashboard-content > div:first-child > div > div:first-child > h1"
        ).innerHTML;

        presenceData.details = "Viewing a Dashboard:";
        presenceData.state = dashboardName;
        presenceData.startTimestamp = browsingStamp;
      }
      //People homepage section. (yeah, path is correct, don't ask me why there is a "search", ~isladot)
      else if (path == "/jira/people/search") {
        presenceData.details = "Browsing users.";
        presenceData.startTimestamp = browsingStamp;
      }
      //User profile page section.
      else if (path.match(/\/jira\/people\/[a-z0-9]+$/)) {
        let userName = document.querySelector(
          '#jira-frontend > #helpPanelContainer > div > div > div[data-testid="Content"] > div:first-child > div > div > div > div > div:nth-child(2) > aside > div:first-child > div > div:nth-child(2) > h2'
        ).innerHTML;

        presenceData.details = "Viewing a User:";
        presenceData.state = userName;
        presenceData.startTimestamp = browsingStamp;
      }
      //Team profile page section.
      else if (path.match(/\/jira\/people\/team\/[a-z0-9-]+$/)) {
        let teamName = document.querySelector(
          '#helpPanelContainer > div > div > div[data-testid="Content"] > div:first-child > div > div > div > div:nth-child(2) > aside > div:first-child > div > div:first-child > form > div > div > div > div'
        ).innerHTML;

        presenceData.details = "Viewing a Team:";
        presenceData.state = teamName;
        presenceData.startTimestamp = browsingStamp;
      }
      //Personal settings section.
      else if (path == "/secure/ViewPersonalSettings.jspa") {
        presenceData.details = "Editing Personal settings.";
        presenceData.startTimestamp = browsingStamp;
      }
    } else {
      presenceData.details = "Creating an Issue.";
      presenceData.startTimestamp = browsingStamp;
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
