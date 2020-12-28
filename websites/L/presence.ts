const presence = new Presence({
  clientId: "393887855274885121"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "lexx"
  };

  if (document.location.hostname == "lexx.app") {
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname == "/") {
    presenceData.details = "Viewing the homepage";
    } else if (document.location.pathname.includes("/legal")) {
    presenceData.details = "Viewing the legal notice";
    presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/privacy")) {
    presenceData.details = "Viewing the privacy policy";
    presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/premium")) {
    presenceData.details = "Reading about premium";
    presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/login")) {
    presenceData.details = "Logging in...";
    presenceData.smallImageKey = "writing";
    } else if (document.location.pathname.includes("/events")) {
    presenceData.details = "Editing some events...";
    presenceData.smallImageKey = "writing";
    } else if (document.location.pathname !== "/") {
      presenceData.details = "Viewing the homepage";
    }
  } else if (document.location.hostname == "beta.lexx.app") {
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname == "/") {
    presenceData.details = "Viewing the beta page";
    } else if (document.location.pathname !== "/") {
      presenceData.details = "Viewing the beta page";
    }
  } else if (document.location.hostname == "alpha.lexx.app") {
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname == "/") {
    presenceData.details = "Viewing the alpha page";
    } else if (document.location.pathname == "/") {
      presenceData.details = "Viewing the alpha page";
    }
  } else if (document.location.hostname == "dev.lexx.app") {
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname == "/") {
    presenceData.details = "Viewing the development page";
    } else if (document.location.pathname == "/") {
      presenceData.details = "Viewing the alpha page";
    }
  } else if (document.location.hostname == "status.lexx.app") {
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname == "/") {
    presenceData.details = "Viewing the status page"; 
    } else if (document.location.pathname == "/") {
      presenceData.details = "Viewing the status page"; 
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});