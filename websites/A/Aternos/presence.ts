const presence = new Presence({
  clientId: "631166262881550359"
});
const presenceData: PresenceData = {
  largeImageKey: "logo"
};

const paths = {
  go: "Login Page",
  account: "Account",
  friends: "Friend Access",
  start: "Home",
  console: "Console",
  log: "Log",
  options: "Options",
  software: "Software",
  players: "Players",
  "players/whitelist": "Whitelisted",
  "players/ops": "OPs",
  "players/banned-players": "Banned Players",
  "players/banned-ips": "Banned IPs",
  files: "Files",
  addons: "Plugins",
  worlds: "Worlds",
  backups: "Backups"
};

presence.on("UpdateData", async () => {
  if (document.location.hostname === "aternos.org") {
    presenceData.startTimestamp = Date.now();
    const panel = document.querySelector('base[href="/panel/"]');
    if (panel) {
      let path = document.location.pathname.endsWith("/")
        ? document.location.pathname
            .replace("/", "")
            .slice(0, document.location.pathname.replace("/", "").length - 1)
        : document.location.pathname.replace("/", "");
      if (path.startsWith("software")) path = "software";
      if (path.startsWith("files")) path = "files";
      if (path.startsWith("addons")) path = "addons";
      path = paths[path];
      if (path) {
        presenceData.details = `Panel - ${path}`;
      } else {
        presenceData.details = "404 Not Found";
        presenceData.startTimestamp = null;
      }
    } else {
      if (document.location.pathname === "/server/") {
        presenceData.details = "Panel - Server";
      } else {
        presenceData.details = "Home Page";
      }
    }
  } else {
    const page = document.location.hostname.split(".")[0];
    presenceData.startTimestamp = Date.now();
    switch (page) {
      case "support":
        if (document.location.pathname.includes("categories")) {
          const category = document.querySelector(".page-header h1");
          if (category) {
            presenceData.details = "Help Center - Viewing category:";
            presenceData.state = category.textContent.trim();
          }
        } else if (document.location.pathname.includes("sections")) {
          const section = document.querySelector(".page-header h1");
          if (section) {
            presenceData.details = "Help Center - Viewing section:";
            presenceData.state = section.textContent.trim();
          }
        } else if (document.location.pathname.includes("articles")) {
          const article = document.querySelector(".article-title");
          if (article) {
            presenceData.details = "Help Center - Viewing article:";
            presenceData.state = article.textContent.trim();
          }
        } else if (document.location.pathname.includes("search")) {
          const article: HTMLInputElement = document.querySelector("#query");
          presenceData.details = "Help Center - Searching:";
          presenceData.state = article.value;
        } else {
          presenceData.details = "Help Center";
        }
        break;
      case "board":
        presenceData.startTimestamp = Date.now();
        presenceData.details = "Community Forums";
        break;
    }
  }
  presence.setActivity(presenceData);
});
