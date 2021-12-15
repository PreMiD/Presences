const presence = new Presence({
    clientId: "858246998561783828"
  }),
  slideshow = presence.createSlideshow(),
  browsingStamp = Math.floor(Date.now() / 1000),
  difficulty: Record<number, string> = {
    2: "Easy",
    3: "Normal",
    4: "Hard",
    5: "Extreme"
  };
interface Song {
  // eslint-disable-next-line camelcase
  category_id: number;
  id: number;
  title: string;
  // eslint-disable-next-line camelcase
  title_lang: Record<string, string>;
  category: string;
}

let selectedSong: Song = null,
  lastId = -1,
  songs: Song[] = [],
  songIndex = -1,
  songIndexToSongId: Record<number, number> = {};

async function getSongIndex(multiplayer: boolean) {
  if (multiplayer) {
    try {
      presence
        .getPageletiable('p2"]["lastMessages"]["songsel"]["value"]["song')
        .then((res: number) => {
          songIndex = res;
        });
    } catch (e) {
      /* Pass */
    }
  } else songIndex = parseInt(localStorage.getItem("selectedSong"));
}

async function getSongs() {
  presence.getPageletiable('assets"]["songs').then((res) => {
    if (res) {
      songs = res;
      songIndexToSongId = songs
        .sort((a, b) => {
          return (
            a.category_id * songs.length +
            a.id -
            (b.category_id * songs.length + b.id)
          );
        })
        .map((song) => song.id);
    }
  });
}

async function getSong(id: number) {
  selectedSong = songs.find((s) => s.id === id);
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
    mulitplayer = !!(
      document.querySelector(".multiplayer") || document.location.hash
    );

  let slideShowSet = false;

  if (canvas) {
    if (songs.length === 0) await getSongs();
    presenceData.state = mulitplayer ? "MultiPlayer" : "Singleplayer";

    const { id } = canvas,
      songId =
        songIndex >= 0 && songIndex <= 200
          ? <number>songIndexToSongId[songIndex]
          : -1;

    switch (id) {
      case "logo": {
        presenceData.details = "At Home Screen";

        break;
      }

      case "song-sel-canvas": {
        await getSongIndex(mulitplayer);

        if (songId !== -1 && songId !== lastId) {
          await getSong(songId);
          lastId = songId;
        }

        if (songId !== -1)
          presenceData.details = `Selecting Song ${selectedSong.title_lang.en}`;
        else if (songIndex === 201 || songIndex === 207)
          presenceData.details = "Back to homescreen";
        else if (songIndex === 202) presenceData.details = "Random Song";
        else if (songIndex === 203) presenceData.details = "How to Play";
        else if (songIndex === 204) presenceData.details = "About Simulator";
        else if (songIndex === 205) presenceData.details = "Game Settings";
        else if (songIndex === 206) presenceData.details = "Custom Songs";

        break;
      }

      case "canvas": {
        if (songId !== -1 && songId !== lastId) {
          await getSong(songId);
          lastId = songId;
        }

        presenceData.details = `Playing ${selectedSong.title_lang.en}`;
        presenceData.smallImageKey = "taiko_logo";
        presenceData.smallImageText = selectedSong.title;

        slideshow.addSlide("slide1", presenceData, 3500);
        slideshow.addSlide(
          "slide2",
          <PresenceData>{
            largeImageKey: "taiko_logo",
            startTimestamp: browsingStamp,
            smallImageKey: "taiko_logo",
            smallImageText: selectedSong.title,
            details: `Category: ${selectedSong.category}`,
            state: `Difficulty: ${
              difficulty[parseInt(localStorage.getItem("selectedDiff"))]
            }`
          },
          3500
        );

        slideShowSet = true;
        break;
      }
    }
  } else if (initialLoading) {
    presenceData.details = "At Loading screen";
    presenceData.state = `${initialLoading.innerText} Loaded`;
  } else if (loadingDon) presenceData.details = "Game Loading ...";
  else if (view) presenceData.details = "Changing Game Settings";

  if (invite) {
    presenceData.details = "Waiting for other player to join ...";
    presenceData.buttons = [
      {
        label: "Join the game",
        url: document.location.href
      }
    ];
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(slideShowSet ? slideshow : presenceData);
});
