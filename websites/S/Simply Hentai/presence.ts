const presence = new Presence({
  clientId: "608043966285348944"
});
let lastPlaybackState = null,
  reading,
  browsingStamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState !== reading) {
  lastPlaybackState = reading;
  browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
  reading =
    document.querySelector(".margin-bottom-12 h1 a") !== null ? true : false;

  let a: HTMLAnchorElement, b: HTMLAnchorElement;

  if (reading) {
    [a, b] = document.querySelectorAll(".margin-bottom-12 h1 a");

    const page = (
        document.querySelector(".page-jump.text-center") as HTMLInputElement
      ).value,
      presenceData: PresenceData = {
        details: a.innerText,
        state: `${b.innerText} [Page: ${page}]`,
        largeImageKey: "lg"
      };

    presenceData.startTimestamp = browsingStamp;
  } else {
    const presenceData: PresenceData = {
      largeImageKey: "lg"
    };

    presenceData.details = "Browsing...";
    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
    delete presenceData.smallImageKey;
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
