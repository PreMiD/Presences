const presence = new Presence({
  clientId: "797497493243560008"
});

presence.on("UpdateData", async () => {
  const title = document.title,
    path = document.location.pathname,

    presenceData: PresenceData = {
      largeImageKey: "logo",
      details: title,
      state: null,
      buttons: [
        {label: "Website", url: "https://clippy.gg"},
        {label: "Discord", url: "https://discord.gg/image"}]
    };
  
  if (path.endsWith("/")) {
    presenceData.details = "Viewing Clippy.gg.";
    presenceData.state = "A private image uploader";
  } else if (path.endsWith("/dashboard")) {
    presenceData.state = "Viewing the dasboard";
  } else if (path.endsWith("/settings")) {
    const intervalEditor = document.getElementsByClassName("ant-modal-wrap ant-modal-centered")[0] as HTMLElement,
      embedEditor = document.getElementsByClassName("embedEditor")[0] as HTMLElement,
      domainPicker = document.getElementsByClassName("ant-select-open")[0] as HTMLElement,
      fakeUrlManager = document.getElementsByClassName("fakeUrlManager")[0] as HTMLElement;

    if (embedEditor && embedEditor.parentElement.style.display !== "none") {
      presenceData.state = "Editing their embed";
    } else if (domainPicker) {
      presenceData.state = "Choosing a domain";
    } else if (intervalEditor && intervalEditor.style.display !== "none") {
      presenceData.state = "Editing their auto-wipe interval";
    } else if (fakeUrlManager && fakeUrlManager.parentElement.style.display !== "none") {
      presenceData.state = "Editing their fake url";
    } else {
      presenceData.state = "Viewing their settings";
    }
  } else if (path.endsWith("/domains")) {
    const randomDomainPicker = document.getElementsByClassName("ant-select-open")[0] as HTMLElement;
    if(randomDomainPicker){
      presenceData.state = `Adding a random domain`;
    }else if(!document.body.textContent.includes("Loading")){
      presenceData.state = `Viewing ${document.body.textContent.match(/\d/g).join("").substring(1, 4)} domains`;
    }
  } else if (path.endsWith("/upload")) {
    presenceData.state = "Uploading a file";
    presenceData.details = "Viewing the uploader";
  } else if (path.endsWith("/shorten")) {
    presenceData.state = "Shortening a link";
    presenceData.details = "Viewing the shortener";
  } else if (path.endsWith("/account")) {
    presenceData.details = "Viewing their account";
  } else if (!isNaN(parseInt(path.charAt(path.length - 1), 10))) {
    presenceData.state = `Viewing ${document.getElementsByClassName("title___aqmzM")[0].innerHTML}'s profile`;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
