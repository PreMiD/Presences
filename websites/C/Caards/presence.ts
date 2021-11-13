const presence = new Presence({
    clientId: "887975742812590120"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const showTimestamp: boolean = await presence.getSetting("timestamp"),
    showButtons: boolean = await presence.getSetting("buttons"),
    presenceData: PresenceData = {
      largeImageKey: "caards_logo",
      details: "Viewing unsupported page"
    };

  if (document.location.hostname === "www.caards.me") {
    if (document.location.pathname === "/")
      presenceData.details = "Viewing home page";
    else if (document.location.pathname.includes("partners")) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Partners";
      presenceData.buttons = [
        {
          label: "View Partners",
          url: document.location.href
        }
      ];
    } else if (document.location.pathname === "/popular") {
      presenceData.details = "Viewing:";
      presenceData.state = "Popular caards";
      presenceData.buttons = [
        {
          label: "View Popular Caards",
          url: document.location.href
        }
      ];
    } else if (document.location.pathname.includes("feed"))
      presenceData.details = "Viewing feed";
    else if (document.location.pathname.includes("/u/")) {
      const username =
        document.querySelector("span.Name.text-3xl")?.textContent;
      presenceData.smallImageKey = "reading";
      presenceData.details = "Viewing profile:";
      presenceData.state = `${username || "Unknown"}`;
      presenceData.buttons = [
        {
          label: "View Profile",
          url: document.location.href
        }
      ];
    } else if (document.location.pathname === "/me/settings") {
      const tab = document.querySelector("button.B01")?.textContent;
      presenceData.details = "Editing Profile";
      presenceData.state = `${"Tab:" + ` ${tab ? tab : "User"}`}`;
    } else if (document.location.pathname === "/themes") {
      presenceData.details = "Viewing page:";
      presenceData.state = "Themes";
      presenceData.buttons = [
        {
          label: "View Themes",
          url: document.location.href
        }
      ];
    } else if (document.location.pathname.includes("/t/")) {
      const [, theme] = document.location.href.split("/t/");
      presenceData.details = "Viewing theme:";
      presenceData.state = `${theme}`;
      presenceData.buttons = [
        {
          label: `View ${theme}`,
          url: document.location.href
        }
      ];
    } else if (document.location.pathname === "/signup")
      presenceData.details = "Signing Up";
    else if (document.location.pathname === "/signin") {
      const username = document.querySelector("input")?.value;
      presenceData.details = "Signing In:";
      username
        ? (presenceData.state = `To ${username}`)
        : (presenceData.state = "To Unknown");
    } else if (document.location.pathname === "/privacy") {
      presenceData.details = "Viewing:";
      presenceData.state = "Privacy Policy";
    } else if (document.location.pathname === "/tos") {
      presenceData.details = "Viewing:";
      presenceData.state = "Terms of Service";
    }
  } else if (document.location.hostname === "help.caards.me") {
    if (document.location.pathname === "/")
      presenceData.details = "Viewing help page";
    else if (document.location.pathname.includes("/widgets/")) {
      const [, helpWidget] = document.location.href.split("/widgets/");
      presenceData.details = "Viewing help info...";
      presenceData.state = `Widget: ${helpWidget}`;
    }
  } else if (document.location.hostname === "status.caards.me") {
    if (document.location.pathname === "/")
      presenceData.details = "Viewing status page";
  }

  if (!showButtons) delete presenceData.buttons;
  if (showTimestamp) presenceData.startTimestamp = browsingStamp;

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
