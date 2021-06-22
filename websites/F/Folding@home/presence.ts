const presence = new Presence({
  clientId: "704385469856612523"
});

let cpuUsage: HTMLElement, contributingProject: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };
  if (document.location.hostname === "client.foldingathome.org") {
    cpuUsage = document.querySelector(
      "div.ui-progressbar-value.ui-widget-header.ui-corner-left"
    );
    contributingProject = document.querySelector("a.sbSelector");

    presenceData.details = `Contributing to: ${contributingProject.innerText}`;
    presenceData.state = `Project Progress: ${cpuUsage.innerText}`;
  } else presenceData.details = "Can't read page";

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
