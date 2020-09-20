const presence = new Presence({ clientId: "757141491708854273" });
let sartist, strack, sdj;
const authHeaders = {
  'Authorization': 'Basic ZTVhNGQ1MTAtZGY4Mi00NDMzLWFjYjEtNjc0N2Y0YTA0MGI1Og==',
  'X-Tenant': 'b8ad4d76-4c8b-4cc7-b93c-eca4d6438e2e',
};

function newStats() {
    fetch('https://api.radiopanel.co/api/v1/song-history/now-playing', {
        headers: authHeaders
    })
    .then((res) => res.json())
    .then((data) => {
      strack = data.song.title;
      sartist = data.song.artist;
    })
};

function slotData() {
    fetch('https://api.radiopanel.co/api/v1/slots/live', {
        headers: authHeaders
    })
    .then((res) => res.json())
    .then((data) => {
      sdj = data.user.firstName;
    })  
}

setInterval(slotData, 5000);
slotData();

setInterval(newStats, 50000);
newStats();

const stamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    smallImageKey: "play",
    details: `🎙️ | ${sdj || 'AutoDJ'}`,
    state: `🎵 | ${strack || "Loading..."} - ${sartist || "Loading..."}`,
    smallImageText: `🎤 freshradio.pw`,
    startTimestamp: stamp
  };

  presence.setActivity(presenceData);
});