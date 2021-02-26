const presence = new Presence({
    clientId: "799583813582848041"
  }),
  browsingStamp: number = Math.floor(Date.now() / 1000);

let from: string, to: string, typet: string;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "yt"
  };

  if (document.location.pathname == "/") {
    typet = "Text";
    from = document.querySelector("#srcLangButton").innerHTML;
    to = document.querySelector("#dstLangButton").innerHTML;
  } else if (
    document.location.pathname == "/translate" ||
    document.location.pathname == "/doc"
  ) {
    typet = document.location.pathname == "/translate" ? "Website" : "Document";
    from = document.querySelector("#srcLangButton > #sourceLangText").innerHTML;
    to = document.querySelector("#dstLangButton > #targetLangText").innerHTML;
  } else if (document.location.pathname == "/ocr") {
    typet = "Image";
    from = document.querySelector("#sourceLangButton").innerHTML;
    to = document.querySelector("#targetLangButton").innerHTML;
  } else {
    typet = "Text";
    from = "Choosing...";
    to = "Choosing...";
  }

  const showTime: boolean = await presence.getSetting("stamp"),
    showType: boolean = await presence.getSetting("type");

  presenceData.startTimestamp = showTime ? browsingStamp : null;
  if (presenceData.startTimestamp == null) delete presenceData.startTimestamp;

  if (showType) {
    presenceData.details = `Translating: ${typet}`;
    presenceData.state = `From: ${from} - To: ${to}`;
  } else {
    presenceData.details = `Translating from: ${from}`;
    presenceData.state = `To: ${to}`;
  }

  presence.setActivity(presenceData);
});
