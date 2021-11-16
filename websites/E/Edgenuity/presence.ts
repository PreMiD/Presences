const presence = new Presence({
  clientId: "705454018343862362"
});

let courseName: HTMLElement,
  lessonName: HTMLElement,
  lessonActivity: HTMLElement;

presence.on("UpdateData", async () => {
  const info = await presence.getSetting("eSI"),
    classInfo = await presence.getSetting("eCI"),
    presenceData: PresenceData = {
      largeImageKey: "logo"
    };
  if (info) {
    if (document.location.pathname === "/")
      presenceData.details = "Viewing Edgenuity Home";
    else if (document.location.pathname === "/Login/Login/Student")
      presenceData.details = "Logging in...";

    if (classInfo) {
      if (document.location.pathname === "/Player/") {
        courseName = document.querySelector("span.course");
        lessonName = document.querySelector("[data-bind='html: Title']");
        lessonActivity = document.querySelector(
          "[data-bind='html: ActivityName']"
        );
        presenceData.details = courseName.innerText;
        presenceData.state = `${lessonName.innerText} - ${lessonActivity.innerText}`;
      }
    } else if (document.location.pathname === "/Player/")
      presenceData.details = "Working on Classwork";
    else presenceData.details = "Can't read page";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
