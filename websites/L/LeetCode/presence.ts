// Application ID on Discord developer page
const presence = new Presence({
  clientId: "719373053028728894"
});

// time spent on current URL
const timeElapsed: number = new Date().getTime();

presence.on("UpdateData", async () => {
  // default settings
  const presenceData: PresenceData = {
    details: document.title,
    largeImageKey: "logo",
    startTimestamp: timeElapsed
  };

  // edit attributes based on path
  if (document.location.pathname == "/") {
    presenceData.details = "Homepage";
  } else if (document.location.pathname.startsWith("/problemset")) {
    presenceData.details = "Viewing Problems";
  } else if (document.location.pathname.startsWith("/problems")) {
    presenceData.details = document.querySelectorAll(
      "div[data-cy=question-title]"
    )[0].textContent;
    presenceData.state = document.querySelectorAll("div[diff]")[0].textContent;
  } else if (document.location.pathname.startsWith("/explore")) {
    presenceData.details = "Explore";

    if (document.getElementsByClassName("question-title")) {
      presenceData.state =
        document.getElementsByClassName("question-title")[0].textContent;
    }
  } else if (document.location.pathname.startsWith("/contest")) {
    presenceData.details = "In a Contest";
  } else if (document.location.pathname.startsWith("/articles")) {
    presenceData.details = "Reading Solutions";
  } else if (document.location.pathname.startsWith("/discuss")) {
    presenceData.details = "Browsing Forums";
  } else if (document.location.pathname.startsWith("/interview")) {
    presenceData.details = "Mock Interviewing";
  }

  presence.setActivity(presenceData);
});
