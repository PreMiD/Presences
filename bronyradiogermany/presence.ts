var presence = new Presence({
    clientId: "622436057866043434"
  }),
  presenceData: presenceData = {
    largeImageKey: "logo"
  };

presence.on("UpdateData", async () => {
  var audio: HTMLAudioElement = document.querySelector("#jp_audio_0");
  if (audio !== null) {
    var title: HTMLElement = document.querySelector(".brg-player-title");

    presenceData.details =
      title !== null ? (title as HTMLElement).innerText : "Title not found...";
    presenceData.largeImageKey = "logo";

    presence.setTrayTitle(audio.paused ? "" : title.innerText);

    if (title !== null) {
      presence.setActivity(presenceData, !audio.paused);
    }
  } else {
    var pageData: presenceData = {
      details: "Browsing..",
      largeImageKey: "logo"
    };
    presence.setActivity(pageData);
  }
});
