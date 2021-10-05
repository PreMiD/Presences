const presence = new Presence({
    clientId: "683017570072264726"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "tka"
  };

  presenceData.startTimestamp = browsingStamp;
  presenceData.smallImageKey = "reading";

  if (document.location.pathname.includes("/kontakt")) {
    presenceData.details = "Contacting TKA...";
    presenceData.smallImageKey = "writing";
  } else if (document.location.pathname.includes("/headmanagement")) {
    presenceData.details = "Reading about TKA's";
    presenceData.state = "management team";
  } else if (document.location.pathname.includes("/streams"))
    presenceData.details = "Viewing TKA's streams";
  else if (document.location.pathname.includes("/partner"))
    presenceData.details = "Viewing TKA's partners";
  else if (document.location.pathname.includes("/datenschutz")) {
    presenceData.details = "Reading TKA's";
    presenceData.state = "privacy policy";
  } else if (document.location.pathname.includes("/impressum"))
    presenceData.details = "Reading TKA's imprint";
  else if (document.location.pathname.includes("/media"))
    presenceData.details = "Viewing TKA's media kit";
  else if (document.location.pathname.includes("/counter-strike-academy")) {
    presenceData.details = "Viewing TKA's";
    presenceData.state = "CS Academy Roster";
  } else if (document.location.pathname.includes("/counter-strike")) {
    presenceData.details = "Viewing TKA's";
    presenceData.state = "CS:GO Roster";
  } else if (document.location.pathname.includes("/hearthstone")) {
    presenceData.details = "Viewing TKA's";
    presenceData.state = "Hearthstone Roster";
  } else if (document.location.pathname.includes("/league-of-legends")) {
    presenceData.details = "Viewing TKA's";
    presenceData.state = "LoL Roster";
  } else if (document.location.pathname.includes("/super-smash-bros")) {
    presenceData.details = "Viewing TKA's";
    presenceData.state = "SSB Roster";
  } else if (document.location.pathname.includes("/fortnite")) {
    presenceData.details = "Viewing TKA's";
    presenceData.state = "Fortnite Roster";
  } else if (document.location.pathname.includes("/tekken")) {
    presenceData.details = "Viewing TKA's";
    presenceData.state = "Tekken Roster";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
