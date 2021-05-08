const presence = new Presence({
  clientId: "828789217793409054"
}), browsingStamp = Math.floor(Date.now() / 1000); 

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.hostname == "widgetstyle.xyz") {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing 🏠 home page";
      presenceData.buttons = [
        {
          label: "🌐 View Page",
          url: document.location.href
        }
      ];
    } else if (document.location.pathname.includes("/widgets")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing ⚙️ widgets page";
      presenceData.buttons = [
        {
          label: "🌐 View Page",
          url: document.location.href
        }
      ];
    } else if (document.location.pathname.includes("/partners")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing 🤝 partners page";
      presenceData.buttons = [
        {
          label: "🌐 View Page",
          url: document.location.href
        }
      ];
    } else if (document.location.pathname.includes("/team")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing 😎 team page";
      presenceData.buttons = [
        {
          label: "🌐 View Page",
          url: document.location.href
        }
      ];
    } else if (document.location.pathname.includes("/privacy")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing 🎭 privacy policy page";
      presenceData.buttons = [
        {
          label: "🌐 View Page",
          url: document.location.href
        }
      ];
    } else if (document.location.pathname.includes("/terms")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing 📖 tos page";
      presenceData.buttons = [
        {
          label: "🌐 View Page",
          url: document.location.href
        }
      ];
    } else if (document.location.pathname.includes("/user/")) {
      presenceData.startTimestamp = browsingStamp;
      const user = document.getElementById("username");
      presenceData.details = `Viewing 👤 user: ${user.innerText}`;
      presenceData.buttons = [
        {
          label: "🌐 View Page",
          url: document.location.href
        }
      ];
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
