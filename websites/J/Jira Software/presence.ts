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
      presenceData.details = "Browsing projects";
      presenceData.startTimestamp = browsingStamp;
    }
    //Project Sections.
    else if (path.includes("/jira/software/projects/")) {
      projectName = path
        .replace("/jira/software/projects/", "")
        .split("/")
        .shift();

      //Project Board section.
      if (path.match(/\/[a-zA-Z0-9]+\/boards\/[0-9]$/)) {
        var boardNumber: String = document.querySelector(
          '#jira-frontend > #helpPanelContainer > div:first-child > div > div[data-testid="Content"] > div:first-child > div:first-child > div:first-child > div > div:nth-child(2) > div:first-child > div:first-child > div > h1'
        ).innerHTML;

        presenceData.details = `Viewing ${boardNumber}.`;
        presenceData.state = `Project: ${projectName}`;
        presenceData.startTimestamp = browsingStamp;
      }
      //Project Report section.
      else if (path.includes("/reports")) {
        var reportType: String = path.split("/").pop();

        presenceData.startTimestamp = browsingStamp;
        switch (reportType) {
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
        var issueName: String = path.split("/").pop();

        presenceData.startTimestamp = browsingStamp;
        if (issueName == "") {
          presenceData.details = "Tracking Issues.";
          presenceData.state = `Project: ${projectName}`;
        } else {
          presenceData.details = `Tracking Issue ${issueName}.`;
          presenceData.state = `Project: ${projectName}`;
        }
      }
      //Project Settings section.
      else if (path.includes("/settings/")) {
        presenceData.startTimestamp = browsingStamp;
        //Settings sections with no sub-links.
        if (!path.includes("/issuetypes") && !path.includes("/apps")) {
          var settingsSection: String = path.split("/").pop();

          switch (settingsSection) {
            case "details":
              presenceData.details = `Modifying Details Settings.`;
              presenceData.state = `Project: ${projectName}`;
              break;
            case "access":
              presenceData.details = `Modifying Access Settings.`;
              presenceData.state = `Project: ${projectName}`;
              break;
            case "notifications":
              presenceData.details = `Modifying Notifications Settings.`;
              presenceData.state = `Project: ${projectName}`;
              break;
            case "features":
              presenceData.details = `Modifying Features Settings.`;
              presenceData.state = `Project: ${projectName}`;
              break;
          }
        }
        //Settings sections with sub-links.
        else {
          presenceData.startTimestamp = browsingStamp;
          if (path.includes("/apps/")) {
            if (path.includes("/app-fields")) {
              presenceData.details = `Modifying Apps Settings - App Fields.`;
              presenceData.state = `Project: ${projectName}`;
            } else {
              presenceData.details = `Modifying Apps Settings - Project Automation`;
              presenceData.state = `Project: ${projectName}`;
            }
          } else {
            var issueType: String = document.querySelector(
              '#jira-frontend > #helpPanelContainer > div > div > div[data-testid="Content"] > div:first-child > div:first-child > div > div:nth-child(2) > div > div > div:first-child > div:nth-child(3) > div > div > div:first-child > div > form > div > div > div > h1'
            ).innerHTML;
            presenceData.details = `Modifying Issue types - ${issueType}.`;
            presenceData.state = `Project: ${projectName}`;
          }
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
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
