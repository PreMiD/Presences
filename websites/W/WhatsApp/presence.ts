const presence = new Presence({
    clientId: "628019683718856714"
  }),
  getSettings = async (): Promise<{
    showRecipient: boolean;
    showNumbers: boolean;
  }> => ({
    showRecipient: await presence.getSetting("showRecipient"),
    showNumbers: await presence.getSetting("showNumbers")
  });

presence.on("UpdateData", async () => {
  const settings = await getSettings(),
    typing = document.querySelector(
      "div#main footer div[contenteditable=true].copyable-text"
    );

  let name =
    settings.showRecipient &&
    document.querySelector("div#main header span[title]")?.textContent;

  if (
    settings.showNumbers === false &&
    typeof name === "string" &&
    !isNaN(Number(name.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "")))
  )
    name = null;

  if (!name && typing === null) return presence.setActivity();
  else
    presence.setActivity({
      largeImageKey: "waweb-logo",
      details: `Texting with ${name || "someone"}`,
      state:
        (typing?.textContent && "Typing...") ||
        (typing === null && "No type permission.") ||
        "Just waiting...",
      startTimestamp: Math.floor(Date.now() / 1000)
    });
});
