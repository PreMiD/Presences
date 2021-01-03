const presence = new Presence({
    clientId: "772106241988231188"
});

presence.on("UpdateData", async () => {
  const title = document.title,
    path = document.location.pathname,

   presenceData: PresenceData = {
      largeImageKey: "a-discord",
      details: title,
      state: null
  };

  switch (true) {
    case path.endsWith("/"):
        presenceData.details = "The superior image host.";
        break;
    case path.endsWith("/dashboard"):
        presenceData.startTimestamp = Date.now();
        presenceData.details = "Viewing the gallery";
        break;
    case path.endsWith("/settings"): {
      const intervalEditor = <HTMLElement>document.getElementsByClassName("ant-modal-wrap ant-modal-centered")[0],
       embedEditor = <HTMLElement>document.getElementsByClassName("embedEditor")[0],
       domainPicker = document.getElementsByClassName("ant-select-open")[0];

      if (embedEditor && embedEditor.parentElement.style.display !== "none") {
          presenceData.details = "";
          presenceData.state = "Editing their embed";
          presenceData.startTimestamp = Date.now();
      } else if (domainPicker) {
          presenceData.details = "";
          presenceData.state = "Choosing a domain";
          presenceData.startTimestamp = Date.now();
      } else if (intervalEditor && intervalEditor.style.display !== "none") {
          presenceData.details = "";
          presenceData.state = "Editing their auto-wipe interval";
          presenceData.startTimestamp = Date.now();
      } else {
          presenceData.startTimestamp = Date.now();
          presenceData.details = "Viewing their settings";
      }

      break;
    }
    case path.endsWith("/domains"):
        presenceData.startTimestamp = Date.now();
        presenceData.details = "Viewing the domain manager";
        break;
    case path.endsWith("/upload"):
        presenceData.state = "Uploading a file";
        presenceData.details = "Viewing the uploader";
        presenceData.startTimestamp = Date.now();
        break;
    case path.endsWith("/shorten"):
        presenceData.state = "Shortening a link";
        presenceData.details = "Viewing the shortener";
        presenceData.startTimestamp = Date.now();
        break;
    case path.endsWith("/account"):
        presenceData.details = "Viewing their account";
        presenceData.startTimestamp = Date.now();
        break;
    case !isNaN(parseInt(path.charAt(path.length - 1))):
        presenceData.details = "";
        presenceData.state = `Viewing ${document.getElementsByClassName("title___aqmzM")[0].innerHTML}"s profile`;
        presenceData.startTimestamp = Date.now();
        break;
  }

  if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
  } else {
      presence.setActivity(presenceData);
  }
});