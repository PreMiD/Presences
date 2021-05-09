const presence = new Presence({
  clientId: "828789217793409054"
}), browsingStamp = Math.floor(Date.now() / 1000); 

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  }; 
presenceData.startTimestamp = browsingStamp;  

    if (document.location.pathname == "/") {
      presenceData.details = "Viewing 🏠 home page";
      presenceData.buttons = [
        {
          label: "🌐 View Page",
          url: document.location.href
        }
      ];
    } else if (document.location.pathname.includes("/widgets")) {
      presenceData.details = "Viewing ⚙️ widgets page";
      presenceData.buttons = [
        {
          label: "🌐 View Page",
          url: document.location.href
        }
      ];
    } else if (document.location.pathname.includes("/partners")) {
      presenceData.details = "Viewing 🤝 partners page";
      presenceData.buttons = [
        {
          label: "🌐 View Page",
          url: document.location.href
        }
      ];
    } else if (document.location.pathname.includes("/team")) {
      presenceData.details = "Viewing 😎 team page";
      presenceData.buttons = [
        {
          label: "🌐 View Page",
          url: document.location.href
        }
      ];
    } else if (document.location.pathname.includes("/privacy")) {
      presenceData.details = "Viewing 🎭 privacy policy page";
      presenceData.buttons = [
        {
          label: "🌐 View Page",
          url: document.location.href
        }
      ];
    } else if (document.location.pathname.includes("/terms")) {
      presenceData.details = "Viewing 📖 tos page";
      presenceData.buttons = [
        {
          label: "🌐 View Page",
          url: document.location.href
        }
      ];
    } else if (document.location.pathname.includes("/user/")) {
      const user = document.getElementById("username");
      presenceData.details = `Viewing 👤 user: ${user.innerText}`;
      presenceData.buttons = [
        {
          label: "🌐 View Page",
          url: document.location.href
        }
      ];
    }
  
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
