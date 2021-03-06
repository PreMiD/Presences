const presence = new Presence({
  clientId: "628019683718856714"
});

presence.on("UpdateData", () => {
  const name: HTMLSpanElement = document.querySelector(
      "#main > header > div._33QME > div._2FCjS > div > span"
    ),
    typing: any = document.querySelector(
      "#main > footer > div > div._3uMse > div > div._3FRCZ"
    ),
    textPermission: any = document.querySelector(
      "#main > footer > .copyable-area"
    );

  let contactName = null;

  if (!name || name.innerText == "") return presence.setActivity();
  if (
    isNaN(
      Number(name.innerText.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, ""))
    )
  )
    contactName = name.innerText;

  const data: PresenceData = {
    largeImageKey: "waweb-logo",
    details: `Texting with ${contactName ? contactName : "someone"}`,
    state: `${
      typing && typing.textContent
        ? "Typing..."
        : `${
            !typing && !textPermission
              ? "Can't really type..."
              : "Just waiting..."
          }`
    }`,
    startTimestamp: Math.floor(Date.now() / 1000)
  };

  presence.setActivity(data);
});
