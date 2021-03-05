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

  switch (path) {
    case "/":
      presenceData.details = "Viewing Clippy.gg.";
      presenceData.state = "A private image uploader";
      break;
    case "/dashboard":
      presenceData.details = "Viewing the dasboard";
      const uploads = document.getElementsByClassName("statContent___2xKiA")[0];
      presenceData.state = `${uploads ? uploads.innerHTML.replace(/\D/g, "") : "0"} files uploaded`
      break;
    case "/settings":
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
      break;
    case "/settings/domains":
      const randomDomainPicker = document.getElementsByClassName("ant-select-open")[0] as HTMLElement;
      if (randomDomainPicker) {
        presenceData.state = `Adding a random domain`;
      } else if (!document.body.textContent.includes("Loading")) {
        presenceData.state = `Viewing ${document.body.textContent.match(/\d/g).join("").substring(1, 4)} domains`;
      }
      break;
    case "/tools/upload":
      presenceData.state = "Uploading a file";
      presenceData.details = "Viewing the uploader";
      break;
    case "/tools/shorten":
      presenceData.state = "Shortening a link";
      presenceData.details = "Viewing the shortener";
      break;
    case "/account":
      presenceData.state = "Viewing their account";
      presenceData.details = "Clippy Account";
      break;
  }
  if (!isNaN(parseInt(path.charAt(path.length - 1), 10))) {
    presenceData.state = `Viewing ${document.getElementsByClassName("title___aqmzM")[0].innerHTML}'s profile`;
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
