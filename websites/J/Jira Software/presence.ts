var presence = new Presence({
  clientId: "782358522628145153" //Presence Application on Discord Developers ID.
});

var browsingStamp = Math.floor(Date.now() / 1000);

var projectName: any;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "jira_bg"
  };

  const path = document.location.pathname;

  if (document.location.hostname.match(/([a-z0-9]+)[.]atlassian[.]net/)) {
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
                presenceData.details = `Modifying Details settings.`;
                presenceData.state = `Project: ${projectName}`;
                break;
              case "access":
                presenceData.details = `Modifying Access settings.`;
                presenceData.state = `Project: ${projectName}`;
                break;
              case "notifications":
                presenceData.details = `Modifying Notifications settings.`;
                presenceData.state = `Project: ${projectName}`;
                break;
              case "features":
                presenceData.details = `Modifying Features settings.`;
                presenceData.state = `Project: ${projectName}`;
                break;
            }
          }
          //Settings sections with sub-links.
          else {
            if (path.includes("/apps/")) {
              if (path.includes("/app-fields")) {
                presenceData.details = `Modifying Apps settings - App fields.`;
                presenceData.state = `Project: ${projectName}`;
              } else {
                presenceData.details = `Modifying Apps settings - Project automation`;
                presenceData.state = `Project: ${projectName}`;
              }
            } else {
              let issueType = document.querySelector(
                '#jira-frontend > #helpPanelContainer > div > div > div[data-testid="Content"] > div:first-child > div:first-child > div > div:nth-child(2) > div > div > div:first-child > div:nth-child(3) > div > div > div:first-child > div > form > div > div > div > h1'
              ).innerHTML;

              presenceData.details = `Modifying Issue types - ${issueType}.`;
              presenceData.state = `Project: ${projectName}`;
            }
          }
        } else {
          presenceData.details = "Modifying Settings.";
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
    //Browsing specific issue section.
    else if (path.includes("/browse/")) {
      let issueName = path.split("/").pop();

      presenceData.details = `Viewing Issue ${issueName}`;
      presenceData.startTimestamp = browsingStamp;
    }
    //Filters section.
    else if (path == "/secure/ManageFilters.jspa") {
      presenceData.details = "Managing Filters.";
      presenceData.startTimestamp = browsingStamp;
    }
    //Advanced Issues section.
    else if (path == "/issues/") {
      const queryID = document.location.search.split("=", 2).pop().substr(0, 2);
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
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
