const presence = new Presence({
  clientId: "923973759428354108"
});
//const browsingTimestamp: number = Math.floor(Date.now() / 1000);
//let from: string, to: string;
//console.log('Start');
presence.on("UpdateData", async () => {
  //const showTime = await presence.getSetting<boolean>("stamp");
  const presenceData: PresenceData = {
    largeImageKey: "basic",
    //smallImageKey: "https://mycrazywebsite.com/coolImage.png",
    smallImageText: "Created by oxmc#7769",
    details: "Uploading a meme"//,
    //startTimestamp: 3133657200000
  };
  if (document.location.href.includes("upload")) presenceData.details = "Uploading a meme";
  else presenceData.details = "Viewing memefileserver.ml";
  console.log(presenceData.details);
  //presenceData.startTimestamp = showTime ? browsingTimestamp : null;
  //if (presenceData.startTimestamp === null) delete presenceData.startTimestamp;
  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
