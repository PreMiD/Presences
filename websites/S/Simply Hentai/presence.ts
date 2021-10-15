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
  const presenceData: PresenceData = {};

  reading =
    document.querySelector(".margin-bottom-12 h1 a") !== null ? true : false;

  if (reading) {
    const [a, b] = document.querySelectorAll<HTMLElement>(
        ".margin-bottom-12 h1 a"
      ),
      page = (
        document.querySelector(".page-jump.text-center") as HTMLInputElement
      ).value;

    presenceData.details = a.innerText;
    presenceData.state = `${b.innerText} [Page: ${page}]`;
    presenceData.largeImageKey = "lg";
    presenceData.startTimestamp = browsingStamp;
  } else {
    const presenceData: PresenceData = {
      largeImageKey: "lg"
    };

    presenceData.details = "Browsing...";
    presenceData.startTimestamp = browsingStamp;
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
