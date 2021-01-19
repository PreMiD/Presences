const presence = new Presence({
  clientId: "431893326892105758"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {

const presenceData: PresenceData = {
  largeImageKey:
    "resize"
};

if (document.location.hostname == "kyekillerbot.xyz") {
  presenceData.startTimestamp = browsingStamp;
  if (document.location.pathname.includes("/")) {
    presenceData.details = "Viewing  Homepage";
  } else if (document.location.pathname.includes("/plans")) {
    presenceData.details = "Viewing  Plans";
  } else if (document.location.pathname.includes("/team")) {
    presenceData.details = " Viewing  Team";
  } else if (document.location.pathname.includes("/dashboard")) {
    presenceData.details = "Viewing  Dashboard";
  } else if (document.location.pathname.includes("/404")) {
    presenceData.details = "Viewing  Error 404";
  }
}

if (presenceData.details == null) {
  presence.setTrayTitle();
  presence.setActivity();
} else {
  presence.setActivity(presenceData);
}
});