const presence = new Presence({
  clientId: "851129988282712104"
}),
elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
const presenceData: PresenceData = {
    largeImageKey: "logo",
    buttons: [
      {
              label: "Skrime Hosting besuchen",
              url: "https://hosting.skrime.eu/a/thorbino"
          }
      ]
  },
  path = window.location.href;
if (path) {
  if (path.endsWith("dashboard")) {
    presenceData.details = "Im Dashboard";
    presenceData.startTimestamp = elapsed;
  } else if (path.endsWith("services")) {
    presenceData.details = "Schaut Dienste";
    presenceData.startTimestamp = elapsed;
} else if (path.endsWith("profile")) {
  presenceData.details = "Im Profil";
  presenceData.startTimestamp = elapsed;
} else if (path.endsWith("faq")) {
  presenceData.details = "Schaut im FAQ";
  presenceData.startTimestamp = elapsed;
}else if (path.endsWith("payments")) {
  presenceData.details = "Schaut Zahlungsmethoden";
  presenceData.startTimestamp = elapsed;
} else if (path.endsWith("datacenter")) {
  presenceData.details = "Schaut Rechenzentrum";
  presenceData.startTimestamp = elapsed;
} else if (path.endsWith("partner")) {
  presenceData.details = "Schaut sich Partner an";
  presenceData.startTimestamp = elapsed;
} else if (path.endsWith("status")) {
  presenceData.details = "Kuckt nach Status";
  presenceData.startTimestamp = elapsed;
} else if (path.endsWith("vserver/order")) {
  presenceData.details = "Bestellt vServer";
  presenceData.startTimestamp = elapsed;
} else if (path.endsWith("teamspeak/order")) {
  presenceData.details = "Bestellt Teamspeak Server";
  presenceData.startTimestamp = elapsed;
} else if (path.endsWith("instance/order")) {
  presenceData.details = "Betrachtet Teamspeak Reselling";
  presenceData.startTimestamp = elapsed;
} else if (path.endsWith("webspace/order")) {
  presenceData.details = "Bestellt Webspace";
  presenceData.startTimestamp = elapsed;
} else if (path.endsWith("domain/order")) {
  presenceData.details = "Bestellt Domain";
  presenceData.startTimestamp = elapsed;
} else if (path.endsWith("plesk/order")) {
  presenceData.details = "Betrachtet Plesk Lizenzen";
  presenceData.startTimestamp = elapsed;
} else if (path.endsWith("accounting/charge")) {
  presenceData.details = "Lädt Guthaben auf";
  presenceData.startTimestamp = elapsed;
} else if (path.endsWith("accounting/transactions")) {
  presenceData.details = "Schaut sich Transaktionen an";
  presenceData.startTimestamp = elapsed;
} else if (path.endsWith("support")) {
  presenceData.details = "Ist im Support";
  presenceData.startTimestamp = elapsed;
} else if (path.endsWith("login")) {
  presenceData.details = "Loggt sich ein";
  presenceData.startTimestamp = elapsed;
} else if (path.includes("vserver/manage/")) {
  presenceData.details = "Verwaltet vServer";
  presenceData.startTimestamp = elapsed;
}

if (presenceData.details == null) {
  presence.setTrayTitle();
  presence.setActivity();
} else {
  presence.setActivity(presenceData);
}
}})
