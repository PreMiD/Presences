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
      boardName = document.getElementById("labelName").innerText,
      [, , , threadNum = null] = elements,
      messageLength = parseInt(
        document.getElementById("labelMessageLength").innerText
      );
    presenceData.details = `Browsing ${boardName}`;
    presenceData.state = `${
      messageLength <= 4080 ? "Shitposting furiously" : "Lurking"
    } ${threadNum !== null ? `in ${threadNum}` : ""}`;
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
