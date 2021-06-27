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
  const presenceData: PresenceData = {
      largeImageKey: "taiko_logo",
      startTimestamp: browsingStamp
    },
    presenceData1: PresenceData = {
      largeImageKey: "taiko_logo",
      smallImageKey: "taiko_logo",
      startTimestamp: browsingStamp
    },
    canvas: HTMLCanvasElement = document.querySelector("canvas"),
    initialLoading: HTMLSpanElement = document.querySelector("span.percentage"),
    loadingDon: HTMLDivElement = document.querySelector("div#loading-don"),
    invite: HTMLDivElement = document.querySelector("div#session-invite"),
    view: HTMLDivElement = document.querySelector("div.view"),
    { hash } = document.location;

  let songPlaying = false;

  if (canvas !== null) {
    const { id } = canvas;
    switch (id) {
      case "logo": {
        presenceData.details = "At Home Screen";
        break;
      }
      case "song-sel-canvas": {
        presenceData.details = "Selecting Song";
        songPlaying = true;
        break;
      }
      case "canvas": {
        presenceData.details = "Playing";
        songPlaying = true;
        break;
      }
    }
    presenceData.state = hash === "" ? "SinglePlayer" : "Multiplayer";
  } else if (initialLoading !== null) {
    presenceData.details = "At Loading screen";
    presenceData.state = `${initialLoading.innerText} Loaded`;
  } else if (loadingDon !== null) presenceData.details = "Game Loading ...";
  else if (view !== null) presenceData.details = "Changing Game Settings";

  if (slideShow.currentSlide.smallImageKey !== null && songPlaying) {
    presence.getPageletiable("song").then((res) => {
      if (res) {
        presenceData1.details = res.title_lang.en;
        presenceData1.smallImageText = res.title;
        presenceData1.state = `Category: ${res.category}`;
      } else {
        presenceData1.details = presenceData.details;
        presenceData1.state = presenceData.state;
      }
    });
  } else {
    presenceData1.details = presenceData.details;
    presenceData1.state = presenceData.state;
  }

  presenceData.buttons = [
    {
      label: "Play game",
      url: `https://${document.location.hostname}`
    }
  ];

  if (invite !== null) {
    presenceData.details = "Waiting for other player to join ...";
    presenceData.buttons.push({
      label: "Join the game",
      url: document.location.href
    });
  }

  presenceData1.buttons = presenceData.buttons;

  slideShow.addSlide("slide1", presenceData, 10000);
  slideShow.addSlide("slide2", presenceData1, 5000);

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(slideShow);
});
