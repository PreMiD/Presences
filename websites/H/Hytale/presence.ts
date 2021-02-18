const presence = new Presence({
    clientId: "809083630117978123"
  }),
  browsingStamp = Math.round(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "hytale_logo",
    startTimestamp: browsingStamp
  };

  if (document.location.pathname === "/") {
    presenceData.details = "Viewing the main page";
  } else if (document.location.pathname === "/news") {
    presenceData.details = "Browsing Blog Posts";
  } else if (document.location.pathname.includes("/news/archive/")) {
    presenceData.details = "Browsing Blog Archives";
    presenceData.state = `From ${
      document.querySelector(".subHeading").textContent
    }`;
  } else if (document.location.pathname.includes("/news/")) {
    presenceData.details = "Reading Blog Post";
    presenceData.state = document.querySelector(".post__heading").textContent;
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname === "/media") {
    presenceData.details = "Browsing Hytale media";
    if (document.location.hash.includes("#screenshots")) {
      presenceData.state = "Screenshot";
    } else if (document.location.hash.includes("#desktopWallpapers")) {
      presenceData.state = "Desktop Wallpaper";
    } else if (document.location.hash.includes("#mobileWallpapers")) {
      presenceData.state = "Mobile Wallpaper";
    } else if (document.location.hash.includes("#conceptArt")) {
      presenceData.state = "Concept Art";
    } else if (document.location.hash.includes("#videos")) {
      presenceData.state = "Video";
    } else if (document.location.hash.includes("#clips")) {
      presenceData.state = "Clip";
    }
  } else if (document.location.pathname === "/game") {
    presenceData.details = "Learning more about";
    presenceData.state = "the game";
  } else if (document.location.pathname === "/community") {
    presenceData.details = "Viewing the";
    presenceData.state = "Community page";
  } else if (document.location.pathname === "/jobs") {
    presenceData.details = "Viewing Job Openings";
  } else if (document.location.pathname === "/jobs/data-protection-statement") {
    presenceData.details = "Reading the";
    presenceData.state = "Data protection statement";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/jobs/")) {
    presenceData.details = "Viewing Job";
    presenceData.state = document.querySelector(".pageHeading").textContent;
  } else if (document.location.pathname === "/signup") {
    presenceData.details = "Signing up for the beta";
    presenceData.smallImageKey = "writing";
  } else if (document.location.pathname === "/about") {
    presenceData.details = "Learning more about";
    presenceData.state = "Hypixel Studios";
    if (document.location.hash === "#contact") {
      presenceData.details = "Viewing the";
      presenceData.state = "Contact information";
    } else if (document.location.hash === "#press") {
      presenceData.details = "Viewing the";
      presenceData.state = "Press information";
    }
  } else if (document.location.pathname === "/cookie-policy") {
    presenceData.details = "Reading the Cookie Policy";
    presenceData.smallImageKey = "reading";
    if (document.location.hash === "#what-is-cookie") {
      presenceData.state = "What is a Cookie?";
    } else if (document.location.hash === "#why-are-cookies-used") {
      presenceData.state = "Why are Cookies used?";
    } else if (document.location.hash === "#who-places-cookies") {
      presenceData.state = "Who places Cookies";
    } else if (document.location.hash === "#how-manage-cookies") {
      presenceData.state = "How can I manage cookies?";
    } else if (document.location.hash === "#do-not-track-signals") {
      presenceData.state = "Do-not-track signals";
    } else if (document.location.hash === "#policy-updates") {
      presenceData.state = "Policy updates";
    } else if (document.location.hash === "#contact-us") {
      presenceData.state = "Contact us";
    }
  } else if (document.location.pathname === "/privacy") {
    presenceData.details = "Viewing the";
    presenceData.state = "Privacy Policy";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname === "/legal") {
    presenceData.details = "Viewing the";
    presenceData.state = "Legal Information";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname === "/corporate-governance") {
    presenceData.details = "Reading about";
    presenceData.state = "Corporate Governance";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname === "/supersecretpage") {
    presenceData.details = "Viewing a";
    presenceData.state = "Super Secret Page";
  } else {
    presenceData.details = "Viewing an";
    presenceData.state = "Unknown page";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
