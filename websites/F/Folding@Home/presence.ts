var presence = new Presence({
  clientId: "704385469856612523"
});

let cpuUsage: any, contributingProject: any;

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "logo"
  };
  if (document.location.hostname == "client.foldingathome.org") {
    cpuUsage = document.querySelector(
      "div.ui-progressbar-value.ui-widget-header.ui-corner-left"
    );
    contributingProject = document.querySelector("a.sbSelector");

    presenceData.details = "Contributing to: " + contributingProject.innerText;
    presenceData.state = "Project Progress: " + cpuUsage.innerText;
  } else {
    presenceData.details = "Can't read page";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
