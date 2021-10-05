const browsingStamp = Math.floor(Date.now() / 1000),
  presence = new Presence({
    clientId: "759921592926339072"
  });

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "destiny",
    smallImageKey: "really_bad_d_gg_logo_upscale"
  };

  if (
    document.location.pathname === "/" ||
    document.location.pathname === "/home/"
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the homepage.";
  } else if (document.location.pathname.includes("/bigscreen")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Watching Destiny.";
    presenceData.smallImageKey = "play_icon";
  } else if (document.location.pathname.includes("/donate")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Donating to Destiny.";
    presenceData.smallImageKey = "money_icon";
  } else if (document.location.pathname.includes("/subscribe")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Subscribing to Destiny.";
    presenceData.smallImageKey = "money_icon";
  } else if (document.location.pathname.includes("/profile")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Editing D.gg profile.";
    presenceData.smallImageKey = "profile_icon";
  } else if (document.location.pathname.includes("/embed/chat")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Chatting";
    presenceData.smallImageKey = "chat_icon";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
