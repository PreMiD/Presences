const presence = new Presence({
  clientId: "622163652207706122"
});

const presenceData: PresenceData = {
  largeImageKey: "logo",
  startTimestamp: new Date().getTime()
};

presence.on("UpdateData", () => {
  const path = document.location.pathname;

  if (path === "/") {
    presenceData.details = "Documentation Home page";
  } else if (path === "/about") {
    presenceData.details = "About page";
  } else if (path === "/account") {
    presenceData.details = "Account page";
  } else {
    presenceData.details = "Browsing";
  }

  presence.setActivity(presenceData);
});
