const presence = new Presence({
  clientId: "870075637619118131"
});

presence.on("UpdateData", async () => {
  const {title} = document,
    path = document.location.pathname,

    presenceData: PresenceData = {
      largeImageKey: "large",
      details: title,
      state: null,
    };

  switch (path) {
    case "/":
      presenceData.details = "Viewing imgs.bar";
      presenceData.state = "A private file host";
      break;
    case "/dashboard": {
      presenceData.startTimestamp = Date.now();
      presenceData.details = "Viewing the gallery";
      break;
    }
    case "/settings": {
      const intervalEditor = document.getElementsByClassName("ant-modal-wrap ant-modal-centered")[0] as HTMLElement,
        embedEditor = document.getElementsByClassName("embedEditor")[0] as HTMLElement,
        domainPicker = document.getElementsByClassName("ant-select-open")[0] as HTMLElement,
        fakeUrlManager = document.getElementsByClassName("fakeUrlManager")[0] as HTMLElement;

      if (embedEditor && embedEditor.parentElement.style.display !== "none") {
        presenceData.state = "Editing embed";
        presenceData.startTimestamp = Date.now();
      } else if (domainPicker) {
        presenceData.startTimestamp = Date.now();
        presenceData.state = "Choosing a domain";
      } else if (intervalEditor && intervalEditor.style.display !== "none") {
        presenceData.startTimestamp = Date.now();
        presenceData.state = "Editing auto-wipe interval";
      } else if (fakeUrlManager && fakeUrlManager.parentElement.style.display !== "none") {
        presenceData.startTimestamp = Date.now();
        presenceData.state = "Editing Fake URL";
      } else 
        presenceData.startTimestamp = Date.now();
        // presenceData.state = "Viewing their settings";
      
      break;
    }
    case "/settings/domains": {
      const randomDomainPicker = document.getElementsByClassName("ant-select-open")[0] as HTMLElement;
      if (randomDomainPicker) {
        presenceData.startTimestamp = Date.now();
        presenceData.state = `Adding a random domain`;
      } else if (!document.body.textContent.includes("Loading")) {
        presenceData.startTimestamp = Date.now();
        presenceData.state = `Viewing ${document.querySelectorAll('strong')[0].innerHTML} domains`;
      }
      break;
    }
    case "/tools/upload":
      presenceData.startTimestamp = Date.now();
      presenceData.details = "Viewing the uploader";
      break;
    case "/tools/shorten":
      presenceData.startTimestamp = Date.now();
      presenceData.details = "Viewing the shortener";
      break;
    case "/account":
      presenceData.startTimestamp = Date.now();
      presenceData.details = "Account";
      break;
    default:
      presenceData.state = "Viewing imgs.bar";
  }
  if (!isNaN(parseInt(path.charAt(path.length - 1), 10))) 
    presenceData.state = `Viewing ${document.getElementsByClassName("title___aqmzM")[0].innerHTML}'s profile`;
  
  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);
  
});
