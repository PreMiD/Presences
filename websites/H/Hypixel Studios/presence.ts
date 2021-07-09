const presence = new Presence({
    clientId: "812069625067077662"
  }),
  browsingStamp = Math.round(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "hypixel_studios_logo",
    startTimestamp: browsingStamp
  };

  if (document.location.pathname === "/") {
    presenceData.details = "Viewing the main page";
  } else if (document.location.pathname === "/who-we-are") {
    presenceData.details = "Learning more about";
    presenceData.state = "Who they are";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname === "/hytale") {
    presenceData.details = "Learning more about";
    presenceData.state = "Hytale";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname === "/our-team") {
    presenceData.details = "Getting to know";
    presenceData.smallImageKey = "reading";
    if (document.querySelector(".selected-member__container")) {
      presenceData.state = document.querySelector(
        ".hy-heading-4.selected-member__name"
      ).textContent;
    } else presenceData.state = "the team";
  } else if (document.location.pathname === "/jobs/") {
    presenceData.details = "Viewing Job Openings";
    presenceData.smallImageKey = "reading";
    if (document.location.hash === "#our-process") {
      presenceData.state = "Our process";
    } else if (document.location.hash === "#current-openings") {
      presenceData.state = "Current job openings";
    } else if (document.location.hash === "#from-the-team") {
      presenceData.state = "Messages from the team";
    }
  } else if (document.location.pathname === "/jobs/data-protection-statement") {
    presenceData.details = "Reading the";
    presenceData.state = "Data protection statement";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/jobs/")) {
    presenceData.details = "Viewing Job";
    presenceData.state = document
      .querySelector(".hy-title.job__title.hy-pad-t-2.hy-mar-t-6")
      .textContent.trim();
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname === "/contact") {
    presenceData.details = "Viewing the";
    presenceData.state = "Contact information";
  } else if (document.location.pathname === "/press") {
    presenceData.details = "Viewing the";
    presenceData.state = "Press information";
  } else if (document.location.pathname.includes("/docs/")) {
    const docName = document.location.pathname
      .split("/")
      .pop()
      .replace(".pdf", "")
      .replace("press-release-", "")
      .split("-");
    for (let i = 0; i < docName.length; i++)
      docName[i] = docName[i].charAt(0).toUpperCase() + docName[i].slice(1);
    presenceData.details = "Reading the document";
    presenceData.state = docName.join(" ");
    presenceData.smallImageKey = "reading";
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
  } else if (document.location.pathname === "/corporate-governance") {
    presenceData.details = "Reading about";
    presenceData.state = "Corporate Governance";
    presenceData.smallImageKey = "reading";
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
