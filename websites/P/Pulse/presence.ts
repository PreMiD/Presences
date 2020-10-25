const presence = new Presence({
  clientId: "735177131352653884"
});
let sartist: string, strack: string, slisteners: string, sdj: string;
function newStats(): void {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (): void {
    if (this.readyState == 4 && this.status == 200) {
      const data = JSON.parse(this.responseText);
      strack = data.song.title;
      sartist = data.song.artist;
      sdj = data.dj.livedj;
      slisteners = " • " + data.listeners.current;
    }
  };
  xhttp.open("GET", "https://api.itspulse.net/stats", true);
  xhttp.send();
}
setInterval(newStats, 6000);
newStats();
presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    state: (strack || "Loading...") + (" - " + sartist),
    details: (sdj || "Loading...") + (slisteners || "Loading...") + " Listeners"
  };
  presence.setActivity(presenceData);
});
