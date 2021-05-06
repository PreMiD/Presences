const presence = new Presence({
    clientId: "839749739683381248"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async function () {
  const setting = {
          timeElapsed: await presence.getSetting("timeElapsed"),
          showSName: await presence.getSetting("showSName")
        },
        urlpath = window.location.pathname.split("/"),
        presenceData: PresenceData = {
              largeImageKey: "logo"
            };

  if(setting.timeElapsed) presenceData.startTimestamp = browsingStamp;
  presenceData.details = (setting.showSName) ? document.querySelector("div.ant-row.subtitle-row")?.textContent : "School";

  if(urlpath[1] === 'today')
    presenceData.state = "Today";
  else if(urlpath[1] === 'messenger')
      presenceData.state = "Messenger";
  else if(urlpath[1] === 'timetable-students-my') {
    presenceData.details = "Timetable";
    presenceData.state = urlpath[2] || "Unknown date";
  } else if(urlpath[1] === 'timetable-contact-hours')
    presenceData.state = "Consultation hours";
  else if(urlpath[1] === 'messages') {
    presenceData.details = "Messages";

    if(urlpath[2] === 'inbox')
      presenceData.state = "Inbox";
    else if(urlpath[2] === 'sent')
      presenceData.state = "Sent";
    else if(urlpath[2] === 'drafts')
      presenceData.state = "Drafts";
    else if(urlpath[2] === 'legacy-distribution-list')
      presenceData.state = "Distribution lists";
  } else if(urlpath[1] === 'profile')
    presenceData.state = "Profile";
  else if(urlpath[1] === 'WebUntis')
    presenceData.state = "Login";

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
