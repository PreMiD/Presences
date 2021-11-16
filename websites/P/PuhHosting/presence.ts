const presence1 = new Presence({ clientId: "909528854731841576" });
const browsingStamp1 = Math.floor(Date.now() / 1000);

presence1.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "puhhosting",
    startTimestamp: browsingStamp1
  };

  if (document.location.pathname.includes("/cp/")) {
    presenceData.details = "Control Panel";
    presenceData.state="Editing Profil";
  } else if (document.location.pathname.includes("/team")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Team";
  } else if (document.location.pathname.includes("/partner")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Partner";
  } else if (document.location.pathname.includes("/about")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "About us";
  } else if (document.location.pathname.includes("/legal/parents")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Parentsinformations";
  } else if (document.location.pathname.includes("/p/webspace")) {
    presenceData.details = "Viewing a product:";
    presenceData.state = "Webspace";
  } else if (document.location.pathname.includes("/p/gameserver")) {
    presenceData.details = "Viewing a product:";
    presenceData.state = "Gameserver";
  } else if (document.location.pathname.includes("/p/musicbot")) {
    presenceData.details = "Viewing a product:";
    presenceData.state = "Musicbot";
  } else if (document.location.pathname.includes("/p/database")) {
    presenceData.details = "Viewing a product:";
    presenceData.state = "Database";
  } else if (document.location.pathname.includes("/p/discordbot")) {
    presenceData.details = "Viewing a product:";
    presenceData.state = "Discordbot";
  } else if (document.location.pathname.includes("/p/domain")) {
    presenceData.details = "Viewing a product:";
    presenceData.state = "Domain";
  } else if (document.location.pathname.includes("/p/vps")) {
    presenceData.details = "Viewing a product:";
    presenceData.state = "VPS";
  } else if (document.location.pathname.includes("/p/plesk-license")) {
    presenceData.details = "Viewing a product:";
    presenceData.state = "Plesk-License";
  } else if (document.location.pathname.includes("/p/giftcode")) {
    presenceData.details = "Viewing a product:";
    presenceData.state = "Giftcode";
  } else if (document.location.pathname.includes("/" || "")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Home";
  } else {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Unknown"
  }

  presence1.setActivity(presenceData);
});
