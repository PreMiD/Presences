var presence = new Presence({
    clientId: "705454018343862362"
  });

let courseName: any,
  lessonName: any,
  lessonActivity: any;

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "logo"
  };

  if (document.location.pathname == "/") {
    presenceData.details = "Viewing Edgenuity Home";
  }else if (document.location.pathname == "/Login/Login/Student") {
    presenceData.details = "Logging in...";
  }else if (document.location.pathname == "/Player/") {
    courseName = document.querySelector("span.course");
    lessonName = document.querySelector("[data-bind='html: Title']");
    lessonActivity = document.querySelector("[data-bind='html: ActivityName']");
    presenceData.details = courseName.innerText;
    presenceData.state = lessonName.innerText + " - " + lessonActivity.innerText;
  } else {
    presenceData.details = "Can't read page";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
