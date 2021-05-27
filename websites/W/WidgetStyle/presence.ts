const presence = new Presence({
    clientId: "828789217793409054"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };

  if (document.location.pathname === "/") {
    presenceData.details = "Viewing 🏠 home page";
  } else if (document.location.pathname.includes("/widgets")) {
    const search = document.getElementById("search")?.getAttribute("value"),
      total = document.getElementById("widgettotal")?.getAttribute("total");
    presenceData.details = `Viewing ⚙️ ${total} widgets`;
    presenceData.state = `🔍 Searching for: ${search || "Nothing"}`;
    presenceData.buttons = [
      {
        label: "View Widgets",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/partners")) {
    presenceData.details = "Viewing 🤝 partners page";
    presenceData.buttons = [
      {
        label: "View Page",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/team")) {
    presenceData.details = "Viewing 😎 team page";
    presenceData.buttons = [
      {
        label: "View Page",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/privacy")) {
    presenceData.details = "Viewing 🎭 privacy policy page";
    presenceData.buttons = [
      {
        label: "View Page",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/terms")) {
    presenceData.details = "Viewing 📖 tos page";
    presenceData.buttons = [
      {
        label: "View Page",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/user/")) {
    const user = document.getElementById("username"),
      usertotal = document
        .getElementById("usertotal")
        ?.getAttribute("usertotal");
    presenceData.details = `Viewing 👤 user: ${user.innerText}`;
    presenceData.state = `They have ${usertotal || "0"} widget(s)`;
    presenceData.buttons = [
      {
        label: `View ${user.innerText}'s Page`,
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
