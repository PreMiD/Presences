const presence = new Presence({
  clientId: "779118675491815434"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "bonkleagues"
    },
    addPremadeSkinSelector =
      '#smpskinscat[style*="block"],#smpskins[style*="block"]',
    addBonkIOSkinSelector = '#addskinslot[style*="block"]';

  if (document.location.pathname.startsWith("/skins.html")) {
    presenceData.details = "in Skin Manager";
    if (document.querySelector(addPremadeSkinSelector)) {
      const skinCategory = document.querySelector(
        '#smpskins[style*="block"] #smpcatid'
      );
      presenceData.state = skinCategory
        ? `Adding a ${skinCategory.textContent} skin`
        : "Adding a skin";
    } else if (document.querySelector(addBonkIOSkinSelector))
      presenceData.state = "Adding a bonk2.io skin";
  } else if (document.location.pathname.startsWith("/editor.html"))
    presenceData.details = "in Skin Editor";
  else if (document.location.pathname.startsWith("/xpchecker.html"))
    presenceData.details = "in Player XP Checker";
  else if (document.location.pathname.startsWith("/mapchecker.html"))
    presenceData.details = "in Quick Play Map Checker";
  else if (document.location.pathname.startsWith("/serverstatus.html"))
    presenceData.details = "Viewing Server Status";

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
