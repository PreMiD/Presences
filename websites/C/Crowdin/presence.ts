const presence = new Presence({
    clientId: "614200757989670934"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let translatePageTitle: HTMLElement | null,
  translatingFile: HTMLElement,
  translateProject: HTMLElement,
  translatingLanguage: HTMLElement,
  profileName: HTMLElement,
  profileNickname: HTMLElement | null,
  projectsTab: HTMLElement;

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    details: "Unknown page",
    largeImageKey: "lg",
    startTimestamp: browsingStamp
  };

  if (document.location.pathname == "/" || !document.location.pathname) {
    presenceData.details = "Website Home";
  } else if (document.location.pathname.includes("/project/")) {
    translateProject =
      document.querySelector(
        ".title-name.project-name-preview.text-overflow"
      ) || document.querySelector(".project-name-text.text-overflow");

    translatePageTitle = document.querySelector(
      ".language-header.no-margin-top.margin-bottom"
    );

    presenceData.details = translateProject.innerText;
    if (document.location.pathname.includes("activity_stream")) {
      presenceData.state = "Viewing activity";
    } else if (document.location.pathname.includes("reports")) {
      presenceData.state = "Viewing reports";
    } else if (document.location.pathname.includes("discussions")) {
      presenceData.state = "Viewing discussions";
    } else if (document.location.pathname.includes("tasks")) {
      presenceData.state = "Viewing tasks";
    } else {
      presenceData.state =
        translatePageTitle?.innerText || "Viewing project home";
    }
  } else if (document.location.pathname.includes("/translate")) {
    translatingFile = document.querySelector(".file-name");
    translatingLanguage = document.querySelector(
      ".language-name-wrapper.text-overflow"
    );
    translateProject = document.querySelector("title");

    presenceData.details = "Translating " + translatingFile.innerHTML;
    presenceData.state = `${translateProject.innerText.split("-")[1].trim()} (${
      translatingLanguage.innerHTML
    })`;
  } else if (document.location.pathname.includes("/profile")) {
    profileName = document.querySelector(".username.s-margin-bottom");
    profileNickname = document.querySelector(".user-login");

    if (document.location.pathname.includes("activity")) {
      presenceData.details = "Viewing activity";
      presenceData.state = `${profileName.innerText}${
        profileNickname ? ` - ${profileNickname.innerText}` : ""
      }`;
    } else if (document.querySelector(".static-icon.static-icon-plus")) {
      presenceData.details = "Viewing own profile";
      presenceData.state = `${profileName.innerText}${
        profileNickname ? ` - ${profileNickname.innerText}` : ""
      }`;
    } else {
      presenceData.details = "Viewing a profile";
      presenceData.state = `${profileName.innerText}${
        profileNickname ? ` - ${profileNickname.innerText}` : ""
      }`;
    }
  } else if (document.location.pathname.includes("/projects")) {
    projectsTab = document.querySelector(".active");

    presenceData.details = "Exploring projects";
    presenceData.state = projectsTab.innerText;
  }

  presence.setActivity(presenceData);
});
