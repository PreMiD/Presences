const presence = new Presence({
    clientId: "870075637619118131"
});

presence.on("UpdateData", async () => {
  const {title} = document,
    path = document.location.pathname,

   presenceData: PresenceData = {
      largeImageKey: "large",
      details: title,
      state: null
  };

  switch (path) {
    case "/":
        presenceData.details = "A private file host";
        break;
    case "/dasboard":
        presenceData.startTimestamp = Date.now();
        presenceData.details = "Viewing gallery";
        break;
    case "/settings": {
      const intervalEditor = <HTMLElement>document.getElementsByClassName("ant-modal-wrap ant-modal-centered")[0],
       embedEditor = <HTMLElement>document.getElementsByClassName("embedEditor")[0],
       domainPicker = document.getElementsByClassName("ant-select-open")[0];

      if (embedEditor && embedEditor.parentElement.style.display !== "none") {
          presenceData.details = "";
          presenceData.state = "Editing embed";
          presenceData.startTimestamp = Date.now();
      } else if (domainPicker) {
          presenceData.details = "";
          presenceData.state = "Choosing a domain";
          presenceData.startTimestamp = Date.now();
      } else if (intervalEditor && intervalEditor.style.display !== "none") {
          presenceData.details = "";
          presenceData.state = "Editing auto-wipe interval";
          presenceData.startTimestamp = Date.now();
      } else {
          presenceData.startTimestamp = Date.now();
          presenceData.details = "Viewing settings";
      }

      break;
    }
    case "/domains":
        presenceData.startTimestamp = Date.now();
        presenceData.details = "Viewing the domain manager";
        break;
    case "/tools/upload":
        presenceData.details = "Viewing uploader";
        presenceData.startTimestamp = Date.now();
        break;
    case "/tools/shorten":
        presenceData.details = "Viewing the shortener";
        presenceData.startTimestamp = Date.now();
        break;
    case "/account":
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
  } else 
      presence.setActivity(presenceData);
  
});
