const presence = new Presence({
  clientId: "682593223948238849"
});

function getRow(row: number) {
  const metas = document.getElementsByTagName("meta");
  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute("property") === "premid:row" + row) {
      const content = metas[i].getAttribute("content");
      return content === "" ? undefined : content;
    }
  }
  return undefined;
}

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "lg",
    startTimestamp: browsingStamp
  };
  if (document.location.hostname == "taigabot.net") {
    presenceData.details = getRow(1);
    presenceData.state = getRow(2);

    if (presenceData.details === undefined) delete presenceData.details;
    if (presenceData.state === undefined) delete presenceData.state;

    presence.setActivity(presenceData);
  }
});
