const presence = new Presence({
  clientId: "503557087041683458"
}),
  pages = {
    "/": "Homepage",
    "/home": "Homepage",
    "/store": "Store",
    "/downloads": "Downloads",
    "/contributors": "Contributors",
    "/cookies": "Cookie Policy",
    "/privacy": "Privacy Policy",
    "/tos": "Terms of Services",
    "/wiki": "Wiki",
    "/en/home": "Docs Homepage",
    "/about": "About",
    "/install/requirements": "System Requirements",
    "/install": "Installation",
    "/troubleshooting": "Troubleshooting",
    "/dev": "Getting Started",
    "/dev/api": "API",
    "/dev/presence": "Presence Development"
  };

presence.on("UpdateData", async () => {
  console.log("hhey")

  const page = document.location.pathname,
    page2 = document.location.pathname.slice(3),
    host = document.location.hostname,
    presenceName = document.querySelector("div.header__title > h1.presence-name"),
    profileName = document.querySelector("div.userpage__header > div.user-data > p") as any && document.querySelector("div.userpage__header > div.user-data > p").textContent != "" ? document.querySelector("div.userpage__header > div.user-data > p").textContent : null,
    fixedProfileName = profileName ? profileName.slice(1, (profileName.indexOf("#") - 1)) + profileName.slice(profileName.indexOf("#"), profileName.length) as any : null;

  if (host == "premid.app") {
    if (page.includes("/users/") && fixedProfileName) {
      presence.setActivity({
        largeImageKey: "lg",
        details: "User Profile",
        state: fixedProfileName || "Unknown",
        startTimestamp: Math.floor(Date.now() / 1000)
      })
    } else if (page.includes("/store/presences/") && presenceName && presenceName.textContent != "") {
      presence.setActivity({
        largeImageKey: "lg",
        details: "Presence Page",
        state: presenceName.textContent || "Unknown",
        startTimestamp: Math.floor(Date.now() / 1000)
      })
    } else if (pages[page] || pages[page.slice(0, -1)]) {
      presence.setActivity({
        largeImageKey: "lg",
        details: "Viewing a page:",
        state: pages[page] || pages[page.slice(0, -1)],
        startTimestamp: Math.floor(Date.now() / 1000)
      })
    }
  } else if (host == "docs.premid.app") {
    if (pages[page2] || pages[page2.slice(0, -1)]) {
      presence.setActivity({
        largeImageKey: "lg",
        details: "Viewing a page on docs:",
        state: pages[page2] || pages[page2.slice(0, -1)],
        startTimestamp: Math.floor(Date.now() / 1000)
      })
    }
  }
});
