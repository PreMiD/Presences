const presence = new Presence({
  clientId: "858886158045806602"
});

let prevURL = "",
  timestamp = Date.now(),
  details = "",
  state = "";
presence.on("UpdateData", async () => {
  if (prevURL !== window.location.pathname) {
    prevURL = window.location.pathname;
    timestamp = Date.now();
  }
  if (window.location.pathname === "/") details = "Browsing Home Page";
  else if (window.location.pathname === "/portal/learning")
    details = "Netacad Portal";
  else if (window.location.pathname.startsWith("/course/")) {
    details = "Viewing course";
    state = document.getElementsByTagName("h3")[0].innerText;
  } else if (window.location.pathname.startsWith("/grade/report/")) {
    details = "Viewing grades";
    state = document.getElementsByTagName("h3")[0].innerText;
  } else if (window.location.pathname.startsWith("/local/mail/"))
    details = "Viewing messages";
  else if (window.location.pathname.startsWith("/calendar/")) {
    details = "Viewing calendar";
    state = document.getElementsByTagName("h3")[0].innerText;
  } else if (window.location.pathname.startsWith("/mod/")) {
    if (
      document
        .getElementsByTagName("h2")[0]
        .innerText.toUpperCase()
        .includes("EXAM")
    )
      details = "Viewing exam";
    else details = "Viewing course content";

    state = document.getElementsByTagName("h3")[0].innerText;
  } else if (window.location.pathname.startsWith("/srwe-dl/")) {
    details = "Viewing course content";
    state = document.getElementsByTagName("h1")[0].innerText;
  } else if (window.location.pathname.includes("assessment_history"))
    details = "Viewing Assesment History";
  else details = "Browsing";

  const presenceData: PresenceData = {
    largeImageKey: "netacadlogo",
    details,
    state,
    startTimestamp: timestamp
  };
  if (!state) delete presenceData.state;

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
