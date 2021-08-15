const presence = new Presence({ clientId: "858292108195921920" }),
  supportedLanguages: Array<string> = [
    "js",
    "md",
    "json",
    "gitignore",
    "txt",
    "html",
    "css"
  ];

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "autocode"
    },
    { pathname } = window.location,
    path = pathname.split("/").slice(1);

  if (pathname.includes("/snippet")) {
    if (path.length >= 3) {
      presenceData.details = document
        .querySelector("h1.snippet-title.h3")
        .textContent.trim();
    } else presenceData.details = "Looking for Snippets";
    presenceData.state = `${window.location.hostname}/${path[0]}`;
    presenceData.smallImageKey = "snippet";
  } else if (pathname.includes("/app")) {
    if (path.length >= 3) {
      presenceData.details = document
        .querySelector("h1.jumbo")
        .textContent.trim();
    } else presenceData.details = "Looking for Apps";
    presenceData.state = `${window.location.hostname}/${path[0]}`;
    presenceData.smallImageKey = "apps";
  } else if (pathname.includes("/lib")) {
    if (path.length >= 3) presenceData.details = `Reading ${path[1]} docs`;
    else presenceData.details = "Looking for Docs";
    presenceData.state = `${window.location.hostname}/${path[0]}`;
    presenceData.smallImageKey = "lib";
  } else if (pathname.includes("/p/")) {
    const filename = document.querySelector("div.filename")
      ? document.querySelector("div.filename").textContent.split("/").pop()
      : null;
    if (!filename) return;
    const extension = filename.match(/\.\w+/g)
      ? filename.match(/\.\w+/g)[0].replace(".", "")
      : false;
    presenceData.details = `Project: ${path[2]}`;
    presenceData.state = `Editing: ${filename}`;
    presenceData.smallImageKey = "autocode";
    if (extension && supportedLanguages.includes(extension))
      presenceData.largeImageKey = `lang-${extension}`;
    else presenceData.largeImageKey = "autocode";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
