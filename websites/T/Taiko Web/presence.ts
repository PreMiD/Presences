const presence = new Presence({
    clientId: "858246998561783828"
  }),
  slideshow = presence.createSlideshow(),
  browsingStamp = Math.floor(Date.now() / 1000);

let selectedSong: {
  title: string;
  originalTitle: string;
  difficulty: string;
  category: string;
} = null;

async function getSongInfo() {
  presence
    .getPageletiable('debugObj"]["controller"]["selectedSong')
    .then((res) => {
      if (res) selectedSong = res;
    });
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "taiko_logo",
    startTimestamp: browsingStamp
  },
    canvas = document.querySelector<HTMLCanvasElement>("canvas"),
    initialLoading = document.querySelector<HTMLSpanElement>("span.percentage"),
    loadingDon = document.querySelector<HTMLDivElement>("div#loading-don"),
    invite = document.querySelector<HTMLDivElement>("div#session-invite"),
    view = document.querySelector<HTMLDivElement>("div.view"),
    mulitplayer = !!document.querySelector(".multiplayer");

  if (canvas) {
    presenceData.state = mulitplayer ? "MultiPlayer" : "Singleplayer";
    
    const { id } = canvas;
    
    switch (id) {
      case "logo": {
        presenceData.details = "At Home Screen";
        slideshow.addSlide("slide1", presenceData, 3500);
        break;
      }
      case "song-sel-canvas": {
        selectedSong = null;
        presenceData.details = "Selecting Song";
        if (invite) {
          presenceData.details = "Waiting for other player to join ...";
          presenceData.buttons = [
            {
              label: "Join the game",
              url: document.location.href
            }
          ];
        }
        slideshow.addSlide("slide1", presenceData, 3500);
        break;
      }
      case "canvas": {
        if (!selectedSong) await getSongInfo();
        presenceData.details = `Playing ${selectedSong.title}`;
        presenceData.state = mulitplayer ? "MultiPlayer" : "Singleplayer";
        presenceData.smallImageKey = "taiko_logo";
        presenceData.smallImageText = selectedSong.originalTitle;

        slideshow.addSlide("slide1", presenceData, 3500);
        slideshow.addSlide(
          "slide2",
          <PresenceData>{
            largeImageKey: "taiko_logo",
            startTimestamp: browsingStamp,
            smallImageKey: "taiko_logo",
            smallImageText: selectedSong.originalTitle,
            details: `Category: ${selectedSong.category}`,
            state: `Difficulty: ${selectedSong.difficulty}`
          },
          3500
        );
        break;
      }
    }
  } else if (initialLoading) {
    presenceData.details = "At Loading screen";
    presenceData.state = `${initialLoading.innerText} Loaded`;
  } else if (loadingDon) presenceData.details = "Game Loading ...";
  else if (view) presenceData.details = "Changing Game Settings";

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(slideshow);
});
