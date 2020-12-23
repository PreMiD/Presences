const presence = new Presence({
    clientId: "790535819009064970"
  }),
  time = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "monkeytype"
    },
    path = document.location.pathname.toLowerCase();
  if (path === "/") {
    presenceData.details = "Initial page";
    presenceData.state = "Playing";
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  } else if (path === "/about") {
    presenceData.details = "About page";
    presenceData.state = "Reading";
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  } else if (path === "/settings") {
    presenceData.details = "Settings page";
    presenceData.state = "Changing settings";
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  } else if (path === "/login") {
    presenceData.details = "Login page";
    presenceData.state = "Logging in";
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  } else if (path === "/account") {
    presenceData.details = "Account page";
    presenceData.state = "Checking stats";
    presenceData.startTimestamp = time;
    presence.setActivity(presenceData);
  }
});
