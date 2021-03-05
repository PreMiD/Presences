const presence = new Presence({
    clientId: "797497493243560008"
});

presence.on("UpdateData", async () => {
  const title = document.title,
    path = document.location.pathname,

   presenceData: PresenceData = {
      largeImageKey: "logo",
      details: title,
      state: null
  };

  if (path.endsWith("/")) {
    presenceData.details = "Viewing Homepage.";
  } else if (path.endsWith("/dashboard")) {
    presenceData.startTimestamp = Date.now();
    presenceData.details = "Viewing the gallery";
  } else if(path.endsWith("/settings")) {
    const intervalEditor = <HTMLElement>document.getElementsByClassName("ant-modal-wrap ant-modal-centered")[0],
    embedEditor = <HTMLElement>document.getElementsByClassName("embedEditor")[0],
    domainPicker = document.getElementsByClassName("ant-select-open")[0];

   if (embedEditor && embedEditor.parentElement.style.display !== "none") {
       presenceData.state = "Editing their embed";
       presenceData.startTimestamp = Date.now();
   } else if (domainPicker) {
       presenceData.state = "Choosing a domain";
       presenceData.startTimestamp = Date.now();
   } else if (intervalEditor && intervalEditor.style.display !== "none") {
       presenceData.state = "Editing their auto-wipe interval";
       presenceData.startTimestamp = Date.now();
   } else {
       presenceData.startTimestamp = Date.now();
       presenceData.details = "Viewing their settings";
   }
  } else if (path.endsWith("/domains")) {
    presenceData.startTimestamp = Date.now();
    presenceData.details = "Viewing the domain manager";
  } else if (path.endsWith("/upload")) {
    presenceData.state = "Uploading a file";
    presenceData.details = "Viewing the uploader";
    presenceData.startTimestamp = Date.now();
  } else if(path.endsWith("/shorten")) {
    presenceData.state = "Shortening a link";
    presenceData.details = "Viewing the shortener";
    presenceData.startTimestamp = Date.now();
  } else if (path.endsWith("/account")) {
    presenceData.details = "Viewing their account";
    presenceData.startTimestamp = Date.now();
  } else if (!isNaN(parseInt(path.charAt(path.length - 1)))) {
    presenceData.state = `Viewing ${document.getElementsByClassName("title___aqmzM")[0].innerHTML}'s profile`;
    presenceData.startTimestamp = Date.now();
  }

  if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
  } else {
      presence.setActivity(presenceData);
  }
});
