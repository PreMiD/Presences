const presence = new Presence({
  clientId: "676411728925294605"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: presenceData = {
    largeImageKey: "orbazzo"
  };

  data.details = "Guarda";
  data.state = "ORBAZZO FIERO";
  data.startTimestamp = browsingStamp;

});
