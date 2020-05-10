const presence = new Presence({
  clientId: "622163652207706122"
});

const presenceData: presenceData = {
  largeImageKey: "logo",
  startTimestamp: new Date().getTime()
};

presence.on("UpdateData", () => {
  const path = document.location.pathname;

  if (path === "/") {
    presenceData.details = "Home page";
  } else if (path === "/documentation") {
    presenceData.details = "Documentation page";
  } else if (path === "/about") {
    presenceData.details = "About page";
  } else if (path === "/profile") {
    presenceData.details = "Profile page";
  } else if (path === "/privacy") {
    presenceData.details = "Privacy page";
  } else {
    presenceData.details = "Browsing";
  }

  presence.setActivity(presenceData);
});
