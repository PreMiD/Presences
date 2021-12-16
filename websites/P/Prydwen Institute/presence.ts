const presence = new Presence({
    clientId: "918337184929546322"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "ships",
      startTimestamp: browsingTimestamp
    },
    [shortTitle] = document.title.split(/[|/]/, 1);

  if (document.location.pathname === "/employees") {
    presenceData.details = "Viewing employees";
    presenceData.smallImageKey = "employees";
    presenceData.smallImageText = "Viewing employees";
  } else if (document.location.pathname.startsWith("/employees")) {
    presenceData.details = "Looking into an employee's profile";
    presenceData.state = shortTitle;
    presenceData.smallImageKey = "employees";
    presenceData.smallImageText = "Viewing employees";
    presenceData.buttons = [{ label: "View Employee", url: document.URL }];
  } else if (document.location.pathname === "/operators") {
    presenceData.details = "Viewing operators";
    presenceData.smallImageKey = "operators";
    presenceData.smallImageText = "Viewing operators";
  } else if (document.location.pathname.startsWith("/operators")) {
    presenceData.details = "Looking into an operator's profile";
    presenceData.state = shortTitle;
    presenceData.smallImageKey = "operators";
    presenceData.smallImageText = "Viewing operators";
    presenceData.buttons = [{ label: "View Operator", url: document.URL }];
  } else if (document.location.pathname === "/ships") {
    presenceData.details = "Viewing ships";
    presenceData.smallImageKey = "ships";
    presenceData.smallImageText = "Viewing ships";
  } else if (document.location.pathname.startsWith("/ships")) {
    presenceData.details = "Viewing a ship";
    presenceData.state = shortTitle;
    presenceData.smallImageKey = "ships";
    presenceData.smallImageText = "Viewing ships";
    presenceData.buttons = [{ label: "View Ship", url: document.URL }];
  } else if (document.location.pathname === "/skins") {
    presenceData.details = "Viewing skins";
    presenceData.smallImageKey = "skins";
    presenceData.smallImageText = "Viewing skins";
  } else if (document.location.pathname === "/stats") {
    presenceData.details = "Viewing stats";
    presenceData.smallImageKey = "stats";
    presenceData.smallImageText = "Viewing stats";
  } else if (document.location.pathname === "/tier-list") {
    presenceData.details = "Viewing the tier list";
    presenceData.smallImageKey = "tierlist";
    presenceData.smallImageText = "Viewing tier list";
  } else if (document.location.pathname === "/guides") {
    presenceData.details = "Finding guides";
    presenceData.smallImageKey = "guide";
    presenceData.smallImageText = "Viewing guides";
  } else if (document.location.pathname.startsWith("/guides")) {
    presenceData.details = "Reading a guide:";
    presenceData.state = shortTitle;
    presenceData.smallImageKey = "guide";
    presenceData.smallImageText = "Reading a guide";
    presenceData.buttons = [{ label: "Read Guide", url: document.URL }];
  } else if (document.location.pathname === "/blog/") {
    presenceData.details = "Finding blogs";
    presenceData.smallImageKey = "blogs";
    presenceData.smallImageText = "Viewing blogs";
  } else if (document.location.pathname.startsWith("/blog")) {
    presenceData.details = "Reading a blog:";
    presenceData.state = shortTitle;
    presenceData.smallImageKey = "blogs";
    presenceData.smallImageText = "Viewing blogs";
    presenceData.buttons = [{ label: "Read Blog", url: document.URL }];
  } else if (document.location.href.indexOf("gear-builder") > -1) {
    presenceData.details = "Making a Gear Builder template";
    presenceData.smallImageKey = "gearbuilder";
    presenceData.smallImageText = "Gear building";
  } else if (document.location.href === "https://www.prydwen.co/")
    presenceData.details = "Viewing home page";
  else presenceData.details = "Browsing the wiki";

  presence.setActivity(presenceData);
});
