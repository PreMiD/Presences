var presence = new Presence({
  clientId: "782358522628145153" //Presence Application on Discord Developers ID.
});

var browsingStamp = Math.floor(Date.now() / 1000);

var projectName: any;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "jira_bg"
  };

  if (document.location.hostname.match(/([a-z0-9]+)[.]atlassian[.]net/)) {
    if (document.location.pathname == "/projects") {
      //Projects homepage section.
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing projects";
    } else if (
      document.location.pathname.includes("/jira/software/projects/")
    ) {
      projectName = document.location.pathname
        .replace("/jira/software/projects/", "")
        .split("/")
        .shift();
      //Project Board page.
      if (document.location.pathname.match(/\/[a-zA-Z0-9]+\/boards\/[0-9]$/)) {
        var boardNumber: String = document.querySelector(
          '#jira-frontend > #helpPanelContainer > div:first-child > div > div[data-testid="Content"] > div:first-child > div:first-child > div:first-child > div > div:nth-child(2) > div:first-child > div:first-child > div > h1'
        ).innerHTML;
        presenceData.details = `Viewing ${boardNumber}.`;
        presenceData.state = `Project: ${projectName}`;
      }
      //Project Report page.
      else if (document.location.pathname.includes("/reports")) {
        var reportType: String = document.location.pathname.split("/").pop();
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
      //Project Issues page.
      else if (document.location.pathname.includes("/issues/")) {
        var issueName: String = document.location.pathname.split("/").pop();
        if (issueName == "") {
          presenceData.details = "Tracking Issues.";
          presenceData.state = `Project: ${projectName}`;
        } else {
          presenceData.details = `Tracking Issue ${issueName}.`;
          presenceData.state = `Project: ${projectName}`;
        }
      }
      //Project related pages with no sub-links.
      else {
        switch (document.location.pathname.split("/").pop()) {
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
    } else if (document.location.pathname.includes("/projects/")) {
      //Project Releases page, the only one with a different link-path.
      projectName = document.location.pathname
        .replace("/projects/", "")
        .split("/")
        .pop();
      presenceData.details = "Viewing Releases.";
      presenceData.state = `Project: ${projectName}`;
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
