var presence = new Presence({
  clientId: "503557087041683458"
});

var oldState = null;
presence.on("UpdateData", async () => {
  let presenceData: presenceData = {
    largeImageKey: "lg"
  };

  if (document.location.pathname.startsWith("/store"))
    presenceData.state = "Store";
  else if (document.location.pathname.startsWith("/downloads"))
    presenceData.state = "Downloads";
  else if (document.location.pathname.startsWith("/contributors"))
    presenceData.state = "Contributors";
  else if (document.location.pathname.startsWith("/cookies"))
    presenceData.state = "Cookie Policy";
  else if (document.location.pathname.startsWith("/privacy"))
    presenceData.state = "Privacy Policy";
  else if (document.location.pathname.startsWith("/tos"))
    presenceData.state = "Terms of Service";
  else if (document.location.hostname.startsWith("wiki"))
    presenceData.state = "Wiki";
  else if (document.location.hostname.startsWith("docs"))
    presenceData.state = "Docs";
  else presenceData = null;

  if (oldState !== presenceData && presenceData !== null) {
    oldState = presenceData;
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  }

  presenceData === null
    ? presence.setActivity()
    : presence.setActivity(presenceData);
});
