const presence = new Presence({
  clientId: "808737268239302697"
});

const elapsed: number = Math.round(new Date().getTime() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
  },

  buttons = await presence.getSetting("buttons");

  const browsingStamp = Math.floor(Date.now() / 1000);
  presenceData.startTimestamp = browsingStamp;

  if (document.location.pathname == "/") {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Homepage";
  }

  if (buttons) {
    presenceData.buttons = [
      {
        label: "View Website",
        url: document.URL
      }
    ];
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
    console.log("Failed!")
  } else {
    presence.setActivity(presenceData);
    console.log("Success!");
  }
});
