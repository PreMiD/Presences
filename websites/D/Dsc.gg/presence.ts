const presence = new Presence({
  clientId: "843711390539841577"
}), browsingStamp = Math.floor(Date.now() / 1000); 

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "dscgg",
    startTimestamp: browsingStamp
  }; 

    if (document.location.pathname === "/") {
      presenceData.details = "Viewing home page";
    } else if (document.location.pathname.includes("/search")) {
      const search = document.getElementById("searchBar")?.getAttribute("value");
      presenceData.details = `🔍 Searching for: ${search || "Nothing"}`;
      presenceData.buttons = [
        {
          label: "View Results",
          url: document.location.href
        }
      ];
    } else if (document.location.pathname === "/about") {
      presenceData.details = "Viewing ✨ about page";
      presenceData.buttons = [
        {
          label: "View Page",
          url: document.location.href
        }
      ];
    } else if (document.location.pathname.includes("/premium")) {
      presenceData.details = "Viewing 💎 premium page";
      presenceData.buttons = [
        {
          label: "View Page",
          url: document.location.href
        }
      ];
    } else if (document.location.pathname === "/developers/about") {
      presenceData.details = "Viewing 💻 developer page";
      presenceData.buttons = [
        {
          label: "View Page",
          url: document.location.href
        }
      ];
    } else if (document.location.pathname === "/developers/dashboard") {
      presenceData.details = "Viewing 🖥️ developer dashboard";
    } else if (document.location.pathname === "/dashboard") {
      presenceData.details = "Viewing 👤 dashboard";
    } else if (document.location.pathname.includes("/dashboard/l/")) {
      const link = document.location.pathname.split("/dashboard/l/");
      presenceData.details = `Editing 🔗 ${link[1]} link`;
      presenceData.state = `🏓 Tab: ${location.href.replace(`https://dsc.gg/dashboard/l/${link[1]}#tab=`, " ")}`;
      presenceData.buttons = [
        {
          label: "Visit Link",
          url: `https://dsc.gg/${link[1]}`
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
