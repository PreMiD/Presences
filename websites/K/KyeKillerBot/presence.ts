var presence = new Presence({
  clientId: "431893326892105758"
});

var browsingStamp = Math.floor(Date.now() / 1000);
var title: any;

presence.on("UpdateData", async () => {

const presenceData: PresenceData = {
  largeImageKey:
    "resize"
};

if (document.location.hostname == "kyekillerbot.xyz") {
  presenceData.startTimestamp = browsingStamp;
  if (document.location.pathname.includes("/")) {
    presenceData.details = "Veiwing Homepage";
  } else if (document.location.pathname.includes("/plans")) {
    presenceData.details = "Veiwing Plans";
  } else if (document.location.pathname.includes("/team")) {
    presenceData.details = " Veiwing Team";
  } else if (document.location.pathname.includes("/dashboard")) {
    presenceData.details = "Veiwing Dashboard";
  } else if (document.location.pathname.includes("/404")) {
    presenceData.details = "Veiwing Error 404";
  }
}

if (presenceData.details == null) {
  presence.setTrayTitle();
  presence.setActivity();
} else {
  presence.setActivity(presenceData);
}
});