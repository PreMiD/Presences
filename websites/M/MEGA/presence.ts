const presence = new Presence({
  clientId: "762522704128901131"
});

let fileName: HTMLElement,
  fileExtension: HTMLElement,
  helpCategory: HTMLElement,
  details: string,
  state: string;

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    page = window.location.pathname;

  presenceData.startTimestamp = Math.floor(Date.now() / 1000);

  if (page === "/" || page.includes("startpage") || page.includes("start"))
    presenceData.details = "Homepage";
  else if (page.includes("fm")) {
    presenceData.details = "Viewing:";
    presenceData.state = "File Manager";
  } else if (page.includes("chat")) {
    presenceData.details = "Viewing:";
    presenceData.state = "Chat";
  } else if (page.includes("file")) {
    fileName = document.querySelector("span.filename");
    fileExtension = document.querySelector("span.extension");

    if (
      (fileName === null && fileExtension === null) ||
      (fileName.innerText === "" && fileExtension.innerText === "")
    ) {
      details = "Entering Decryption Key...";
      state = "Holding...";
    } else {
      details = "Viewing File:";
      state = fileName.innerText + fileExtension.innerText;
    }
    presenceData.details = details;
    presenceData.state = state;
  } else if (page.includes("sync")) {
    presenceData.details = "Viewing:";
    presenceData.state = "MEGA Desktop App";
  } else if (page.includes("mobile")) {
    presenceData.details = "Viewing:";
    presenceData.state = "MEGA Mobile Apps";
  } else if (page.includes("uwp")) {
    presenceData.details = "Viewing:";
    presenceData.state = "MEGA App for Windows 10";
  } else if (page.includes("cmd")) {
    presenceData.details = "Viewing:";
    presenceData.state = "MEGAcmd";
  } else if (page.includes("extensions")) {
    presenceData.details = "Viewing:";
    presenceData.state = "Browser Extensions";
  } else if (page.includes("bird")) {
    presenceData.details = "Viewing:";
    presenceData.state = "MEGAbird";
  } else if (page.includes("nas")) {
    presenceData.details = "Viewing:";
    presenceData.state = "MEGA on NAS";
  } else if (page.includes("business")) {
    presenceData.details = "Viewing:";
    presenceData.state = "MEGA for Business";
  } else if (page.includes("pro")) {
    presenceData.details = "Viewing:";
    presenceData.state = "MEGA Pricing";
  } else if (page.includes("help")) {
    helpCategory = document.querySelector("div.section-title");
    presenceData.details = "MEGA Support";
    presenceData.state = helpCategory.innerText;
  } else if (page.includes("register")) {
    presenceData.details = "Registering";
    presenceData.state = "mega.nz";
  } else if (page.includes("login")) {
    presenceData.details = "Logging In";
    presenceData.state = "mega.nz";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
