const presence = new Presence({
  clientId: "900882829154598952"
}), strings = presence.getStrings({
  homepage: "general.viewHome",
  settings: "google classroom.settings"
});

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "khanacademy"
  };

  if (document.location.pathname.includes("/profile")) data.details = (await strings).homepage
  else if (document.location.pathname.includes("/settings")) data.details = (await strings).settings
  else {
    data.details = document.querySelector('._io410w6, span._cmfzobe:nth-child(3) > a:nth-child(2)').textContent
    data.state = document.querySelector('._1eqoe4n8, span._cmfzobe:nth-child(2) > a:nth-child(2)').textContent.replace(/.*?\:\s+/, "")

    if (document.location.pathname.includes("/v/")) data.smallImageKey = "video"
    else if (document.location.pathname.includes("/e/")) data.smallImageKey = "exercise"
    else if (document.location.pathname.includes("/a/")) data.smallImageKey = "article"

    data.smallImageText = document.querySelector('._1l44zfj, #uid-dialog-0-title > span:nth-child(2)').textContent
  }

  if (!data.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(data);
});
