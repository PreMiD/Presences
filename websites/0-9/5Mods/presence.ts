var presence = new Presence({
  clientId: "651412198727352331"
});

const categories: Record<string, any> = {
  tools: "Tools",
  vehicles: "Vehicles",
  paintjobs: "Paint Jobs",
  weapons: "Weapons",
  scripts: "Scripts",
  player: "Player",
  maps: "Maps",
  misc: "Misc"
};

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "lg"
  };
  if (document.location.pathname == "/") {
    presenceData.details = "Viewing the front page...";
  } else if (categories[document.location.pathname.split("/")[1]]) {
    if (document.getElementsByClassName("btn-download")[0]) {
      presenceData.details = "Viewing a Mod...";
      let name =
        document.getElementsByClassName("clearfix")[1].children[0].textContent;
      if (name.length > 60) name = name.slice(0, 57) + "...";
      presenceData.state =
        name +
        " (" +
        categories[document.location.pathname.split("/")[1]] +
        ")";
    } else {
      presenceData.details = "Browsing a category...";
      presenceData.state = categories[document.location.pathname.split("/")[1]];
    }
  } else if (document.location.pathname == "/login") {
    presenceData.details = "Logging in...";
  } else if (document.location.pathname == "/register") {
    presenceData.details = "Registering...";
  }
  presence.setActivity(presenceData);
});
