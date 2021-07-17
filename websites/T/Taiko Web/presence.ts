const presence = new Presence({
    clientId: "858246998561783828"
  }),
  slideshow = presence.createSlideshow(),
  browsingStamp = Math.floor(Date.now() / 1000),
  songIndexToSongId: Record<number, number> = {
    0: 4,
    1: 14,
    2: 22,
    3: 31,
    4: 44,
    5: 81,
    6: 114,
    7: 116,
    8: 121,
    9: 180,
    10: 195,
    11: 198,
    12: 202,
    13: 15,
    14: 16,
    15: 19,
    16: 48,
    17: 51,
    18: 56,
    19: 87,
    20: 100,
    21: 103,
    22: 111,
    23: 117,
    24: 159,
    25: 161,
    26: 165,
    27: 179,
    28: 181,
    29: 183,
    30: 185,
    31: 186,
    32: 187,
    33: 191,
    34: 193,
    35: 201,
    36: 25,
    37: 26,
    38: 30,
    39: 46,
    40: 53,
    41: 54,
    42: 55,
    43: 146,
    44: 158,
    45: 178,
    46: 206,
    47: 17,
    48: 23,
    49: 39,
    50: 42,
    51: 43,
    52: 52,
    53: 77,
    54: 82,
    55: 85,
    56: 122,
    57: 135,
    58: 140,
    59: 110,
    60: 148,
    61: 149,
    62: 162,
    63: 164,
    64: 168,
    65: 184,
    66: 194,
    67: 197,
    68: 7,
    69: 93,
    70: 106,
    71: 2,
    72: 13,
    73: 28,
    74: 35,
    75: 36,
    76: 50,
    77: 57,
    78: 58,
    79: 65,
    80: 71,
    81: 72,
    82: 74,
    83: 83,
    84: 88,
    85: 89,
    86: 96,
    87: 97,
    88: 120,
    89: 27,
    90: 47,
    91: 55,
    92: 63,
    93: 72,
    94: 73,
    95: 75,
    96: 90,
    97: 92,
    98: 204,
    99: 207,
    100: 1,
    101: 3,
    102: 5,
    103: 6,
    104: 8,
    105: 9,
    106: 10,
    107: 11,
    108: 12,
    109: 18,
    110: 20,
    111: 21,
    112: 27,
    113: 29,
    114: 32,
    115: 33,
    116: 34,
    117: 37,
    118: 38,
    119: 40,
    120: 41,
    121: 45,
    122: 47,
    123: 49,
    124: 59,
    125: 60,
    126: 61,
    127: 62,
    128: 64,
    129: 66,
    130: 67,
    131: 68,
    132: 69,
    133: 70,
    134: 73,
    135: 76,
    136: 78,
    137: 79,
    138: 80,
    139: 84,
    140: 86,
    141: 90,
    142: 91,
    143: 92,
    144: 94,
    145: 95,
    146: 98,
    147: 99,
    148: 101,
    149: 102,
    150: 104,
    151: 107,
    152: 108,
    153: 109,
    154: 110,
    155: 112,
    156: 113,
    157: 115,
    158: 118,
    159: 119,
    160: 123,
    161: 124,
    162: 125,
    163: 126,
    164: 128,
    165: 129,
    166: 130,
    167: 131,
    168: 132,
    169: 133,
    170: 136,
    171: 137,
    172: 138,
    173: 139,
    174: 141,
    175: 142,
    176: 144,
    177: 145,
    178: 150,
    179: 151,
    180: 152,
    181: 153,
    182: 154,
    183: 156,
    184: 157,
    185: 160,
    186: 166,
    187: 167,
    188: 169,
    189: 170,
    190: 171,
    191: 174,
    192: 176,
    193: 177,
    194: 182,
    195: 188,
    196: 196,
    197: 199,
    198: 200,
    199: 203,
    200: 205
  },
  difficulty: Record<number, string> = {
    2: "Easy",
    3: "Normal",
    4: "Hard",
    5: "Extreme"
  };
interface Song {
  id: number;
  title: string;
  title_lang: Record<string, string>;
  category: string;
}

let selectedSong: Song = null,
  lastId = -1,
  songs: Song[] = [],
  songIndex = -1;

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
    if (res) songs = res;
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
