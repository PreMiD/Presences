const presence = new Presence({
  clientId: "853244463396552704"
}),
browsingStamp = Date.now();

presence.on("UpdateData", async () => {
const presenceData: PresenceData = {
  largeImageKey: "inch_large_",
  smallImageKey: "inch_small_",
  smallImageText: "Indiachan.com",
  details: "Browsing Indiachan.com ",
  state: "Having a good time",
  startTimestamp: browsingStamp
};

if (document.location.pathname !== "/") {
  const elements: string[] = document.location.pathname.split("/"),
    [, logs = "", catalog = "", threadNum = null] = elements,
    messageLength = document.getElementById("labelMessageLength") ? parseInt(
      document.getElementById("labelMessageLength").innerText
    ) : 4081;
  if (logs === "logs.js") {
    presenceData.details = "Looking in the logs";
    presenceData.state = "Got banned maybe?";
  } else {
    let boardName: string = null;
    if (catalog === "catalog.html")
      boardName = document.getElementById("catalogId").innerText;
    else boardName = document.getElementById("labelName").innerText;
    presenceData.details = `Browsing ${boardName}`;
    if (catalog !== "catalog.html") {
      presenceData.state = `${
        messageLength <= 4080 ? "Shitposting furiously" : "Lurking"
      } ${threadNum !== null ? `in ${threadNum}` : ""}`;
    } else presenceData.state = "Lurking in the catalog";
  }
}

if (presenceData.details === null) {
  presence.setTrayTitle();
  presence.setActivity();
} else presence.setActivity(presenceData);
});
