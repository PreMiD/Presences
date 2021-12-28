const presence = new Presence({
    clientId: "682593223948238849"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

function getRow(row: number) {
  const metas = document.getElementsByTagName("meta");
  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute("property") === `premid:row${row}`)
      return metas[i].getAttribute("content");
  }
  return;
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "lg",
    startTimestamp: browsingTimestamp
  };
  presenceData.details = getRow(1);
  presenceData.state = getRow(2);

  if (!presenceData.details) delete presenceData.details;
  if (!presenceData.state) delete presenceData.state;

  presence.setActivity(presenceData);
});
