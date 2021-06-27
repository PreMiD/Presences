const presence = new Presence({
    clientId: "858246998561783828"
  }),
  slideShow = presence.createSlideshow(),
  browsingStamp = Math.floor(Date.now() / 1000),
  script = document.createElement("script");

/*
  Overriding XMLHttpRequest.open method
  to know the current request song
  Doesn't work if song is in cache :[
*/
script.innerHTML = `
  !function(open){
    XMLHttpRequest.prototype.open = function (method, url) {
      if (url && url.startsWith("https://taiko.uk/taiko/songs/")) {
        let songId = parseInt(url.substr(29));
        let song = assets.songs.find(song => song.id === songId);
        window.song = {};
        window.song.title_lang = song.title_lang;
        window.song.title = song.title;
        window.song.category = song.category;
      }
      open.call(this, method, url);
    }
  }(XMLHttpRequest.prototype.open);`;

document.body.append(script);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData[] = [
      {
        largeImageKey: "taiko_logo",
        startTimestamp: browsingStamp
      },
      {
        largeImageKey: "taiko_logo",
        smallImageKey: "taiko_logo",
        startTimestamp: browsingStamp
      }
    ],
    canvas: HTMLCanvasElement = document.querySelector("canvas"),
    initialLoading: HTMLSpanElement = document.querySelector("span.percentage"),
    loadingDon: HTMLDivElement = document.querySelector("div#loading-don"),
    invite: HTMLDivElement = document.querySelector("div#session-invite"),
    view: HTMLDivElement = document.querySelector("div.view"),
    { hash } = document.location;

  let isSongPlaying = false;

  if (canvas !== null) {
    const { id } = canvas;
    switch (id) {
      case "logo": {
        presenceData[0].details = "At Home Screen";
        break;
      }
      case "song-sel-canvas": {
        presenceData[0].details = "Selecting Song";
        isSongPlaying = true;
        break;
      }
      case "canvas": {
        presenceData[0].details = "Playing";
        isSongPlaying = true;
        break;
      }
    }
    presenceData[0].state = hash === "" ? "SinglePlayer" : "Multiplayer";
  } else if (initialLoading !== null) {
    presenceData[0].details = "At Loading screen";
    presenceData[0].state = `${initialLoading.innerText} Loaded`;
  } else if (loadingDon !== null) presenceData[0].details = "Game Loading ...";
  else if (view !== null) presenceData[0].details = "Changing Game Settings";

  if (slideShow.currentSlide.smallImageKey !== null && isSongPlaying) {
    presence.getPageletiable("song").then((res) => {
      if (res) {
        presenceData[1].details = res.title_lang.en;
        presenceData[1].smallImageText = res.title;
        presenceData[1].state = `Category: ${res.category}`;
      } else {
        presenceData[1].details = presenceData[0].details;
        presenceData[1].state = presenceData[0].state;
      }
    });
  } else {
    presenceData[1].details = presenceData[0].details;
    presenceData[1].state = presenceData[0].state;
  }

  presenceData[0].buttons = [
    {
      label: "Play game",
      url: `https://${document.location.hostname}`
    }
  ];

  if (invite !== null) {
    presenceData[0].details = "Waiting for other player to join ...";
    presenceData[0].buttons.push({
      label: "Join Invite",
      url: document.location.href
    });
  }

  presenceData[1].buttons = presenceData[0].buttons;

  slideShow.addSlide("slide1", presenceData[0], 10000);
  slideShow.addSlide("slide2", presenceData[1], 5000);

  if (presenceData[0].details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(slideShow);
});
