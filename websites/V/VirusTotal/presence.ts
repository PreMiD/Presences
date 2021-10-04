const presence = new Presence({
  clientId: "650103083438702613"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.pathname === "/gui/home") {
    presenceData.state = "Browsing on mainpage...";
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/gui/home/upload") {
    presenceData.details = "Uploading an file...";
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/gui/home/url") {
    presenceData.details = "Search an URL...";
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/gui/home/search") {
    presenceData.details = "Search an anything...";
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/gui/sign-in") {
    presenceData.details = "Sign In to VirusTotal";
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/gui/join-us") {
    presenceData.details = "Sign Up to VirusTotal";
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/gui/settings") {
    const nickname = document
      .querySelector("body > vt-virustotal-app")
      .shadowRoot.querySelector("#toolbar")
      .shadowRoot.querySelector("#omnibarWrapper > vt-ui-account-widget")
      .shadowRoot.querySelector(
        "#userDropdown > div.avatar-section > span"
      ).textContent;
    presenceData.details = "Update their profile...";
    presenceData.state = nickname;
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/gui/user/")) {
    const profilex = document
      .querySelector("body > vt-virustotal-app")
      .shadowRoot.querySelector("#authChecker > user-view")
      .shadowRoot.querySelector(
        "#pageWrapper > div.wrapper > vt-ui-generic-card > div:nth-child(2) > div.avatar-name > div > h3"
      ).textContent;
    presenceData.details = "Reading profile of...";
    presenceData.state = profilex;
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/gui/top-users")) {
    presenceData.details = "Looking for top users...";
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/gui/domain/")) {
    if (document.location.pathname.endsWith("detection")) {
      const detectionURL = document
        .querySelector("body > vt-virustotal-app")
        .shadowRoot.querySelector("#domainView")
        .shadowRoot.querySelector("#report")
        .shadowRoot.querySelector("div > header > vt-ui-domain-card")
        .shadowRoot.querySelector(
          "vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.domain-id > span"
        );
      presenceData.details = "Reading detections of...";
      presenceData.state = detectionURL.textContent;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.endsWith("details")) {
      const detectionURL = document
        .querySelector("body > vt-virustotal-app")
        .shadowRoot.querySelector("#domainView")
        .shadowRoot.querySelector("#report")
        .shadowRoot.querySelector("div > header > vt-ui-domain-card")
        .shadowRoot.querySelector(
          "vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.domain-id > span"
        );
      presenceData.details = "Reading details of...";
      presenceData.state = detectionURL.textContent;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.endsWith("relations")) {
      const detectionURL = document
        .querySelector("body > vt-virustotal-app")
        .shadowRoot.querySelector("#domainView")
        .shadowRoot.querySelector("#report")
        .shadowRoot.querySelector("div > header > vt-ui-domain-card")
        .shadowRoot.querySelector(
          "vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.domain-id > span"
        );
      presenceData.details = "Reading relations of...";
      presenceData.state = detectionURL.textContent;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.endsWith("community")) {
      const detectionURL = document
        .querySelector("body > vt-virustotal-app")
        .shadowRoot.querySelector("#domainView")
        .shadowRoot.querySelector("#report")
        .shadowRoot.querySelector("div > header > vt-ui-domain-card")
        .shadowRoot.querySelector(
          "vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.domain-id > span"
        );
      presenceData.details = "Reading comments of...";
      presenceData.state = detectionURL.textContent;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.endsWith("summary")) {
      const detectionURL = document
        .querySelector("body > vt-virustotal-app")
        .shadowRoot.querySelector("#domainView")
        .shadowRoot.querySelector("#report")
        .shadowRoot.querySelector("div > header > vt-ui-domain-card")
        .shadowRoot.querySelector(
          "vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.domain-id > span"
        );
      presenceData.details = "Reading summary of...";
      presenceData.state = detectionURL.textContent;
      presence.setActivity(presenceData);
    }
  } else if (document.location.pathname.includes("/gui/file/")) {
    if (document.location.pathname.endsWith("detection")) {
      const detectionFILE = document
        .querySelector("body > vt-virustotal-app")
        .shadowRoot.querySelector("#authChecker > file-view")
        .shadowRoot.querySelector("#report")
        .shadowRoot.querySelector("div > header > vt-ui-file-card")
        .shadowRoot.querySelector(
          "vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.file-name > a"
        );
      presenceData.details = "Reading detections of...";
      presenceData.state = detectionFILE.textContent;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.endsWith("details")) {
      const detectionFILE = document
        .querySelector("body > vt-virustotal-app")
        .shadowRoot.querySelector("#authChecker > file-view")
        .shadowRoot.querySelector("#report")
        .shadowRoot.querySelector("div > header > vt-ui-file-card")
        .shadowRoot.querySelector(
          "vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.file-name > a"
        );
      presenceData.details = "Reading details of...";
      presenceData.state = detectionFILE.textContent;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.endsWith("community")) {
      const detectionFILE = document
        .querySelector("body > vt-virustotal-app")
        .shadowRoot.querySelector("#authChecker > file-view")
        .shadowRoot.querySelector("#report")
        .shadowRoot.querySelector("div > header > vt-ui-file-card")
        .shadowRoot.querySelector(
          "vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.file-name > a"
        );
      presenceData.details = "Reading comments of...";
      presenceData.state = detectionFILE.textContent;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.endsWith("summary")) {
      const detectionFILE = document
        .querySelector("body > vt-virustotal-app")
        .shadowRoot.querySelector("#authChecker > file-view")
        .shadowRoot.querySelector("#report")
        .shadowRoot.querySelector("div > header > vt-ui-file-card")
        .shadowRoot.querySelector(
          "vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.file-name > a"
        );
      presenceData.details = "Reading summary of...";
      presenceData.state = detectionFILE.textContent;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("behavior")) {
      const detectionFILE = document
        .querySelector("body > vt-virustotal-app")
        .shadowRoot.querySelector("#authChecker > file-view")
        .shadowRoot.querySelector("#report")
        .shadowRoot.querySelector("div > header > vt-ui-file-card")
        .shadowRoot.querySelector(
          "vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.file-name > a"
        );
      presenceData.details = "Reading behavior of...";
      presenceData.state = detectionFILE.textContent;
      presence.setActivity(presenceData);
    }
  } else if (document.location.pathname.includes("/gui/url/")) {
    if (document.location.pathname.endsWith("detection")) {
      const detectionURL2 = document
        .querySelector("body > vt-virustotal-app")
        .shadowRoot.querySelector("#domainView")
        .shadowRoot.querySelector("#report")
        .shadowRoot.querySelector("div > header > vt-ui-domain-card")
        .shadowRoot.querySelector(
          "vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.parent-domain > a"
        );
      presenceData.details = "Reading detections of ...";
      presenceData.state = detectionURL2.textContent;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.endsWith("details")) {
      //-------------------------- details
      const detectionURL2 = document
        .querySelector("body > vt-virustotal-app")
        .shadowRoot.querySelector("#domainView")
        .shadowRoot.querySelector("#report")
        .shadowRoot.querySelector("div > header > vt-ui-domain-card")
        .shadowRoot.querySelector(
          "vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.parent-domain > a"
        );
      presenceData.details = "Reading details of...";
      presenceData.state = detectionURL2.textContent;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.endsWith("community")) {
      const detectionURL2 = document
        .querySelector("body > vt-virustotal-app")
        .shadowRoot.querySelector("#domainView")
        .shadowRoot.querySelector("#report")
        .shadowRoot.querySelector("div > header > vt-ui-domain-card")
        .shadowRoot.querySelector(
          "vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.parent-domain > a"
        );
      presenceData.details = "Reading comments of...";
      presenceData.state = detectionURL2.textContent;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.endsWith("summary")) {
      const detectionURL2 = document
        .querySelector("body > vt-virustotal-app")
        .shadowRoot.querySelector("#domainView")
        .shadowRoot.querySelector("#report")
        .shadowRoot.querySelector("div > header > vt-ui-domain-card")
        .shadowRoot.querySelector(
          "vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.parent-domain > a"
        );
      presenceData.details = "Reading summary of...";
      presenceData.state = detectionURL2.textContent;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("behavior")) {
      const detectionURL2 = document
        .querySelector("body > vt-virustotal-app")
        .shadowRoot.querySelector("#domainView")
        .shadowRoot.querySelector("#report")
        .shadowRoot.querySelector("div > header > vt-ui-domain-card")
        .shadowRoot.querySelector(
          "vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.parent-domain > a"
        );
      presenceData.details = "Reading behavior of...";
      presenceData.state = detectionURL2.textContent;
      presence.setActivity(presenceData);
    } else presence.setActivity();
  }
});
