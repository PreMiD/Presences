const presence = new Presence({
  clientId: "692810788196581376"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };

  if (document.location.hostname == "statcord.com") {
    presenceData.details = "Viewing Page:";
    presenceData.state = "Viewing At Home Page";
    if (document.location.pathname.includes("/bot/")) {
      presenceData.details = "Viewing:";
      presenceData.state = document.querySelector("#overview > div:nth-child(1) > div > div > div > div.col.mr-2 > div.h5.mb-0.font-weight-bold").textContent+" Statistics";
    } else if (document.location.pathname.includes("/login/")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Login`;
    } else if (document.location.pathname.includes("/profile")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = "Bots List";
    } else if (document.location.pathname.includes("/add")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Add Bot`;
    }
  }

  if (document.location.hostname == "docs.statcord.com") {
    presenceData.details = "Viewing Docs";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
