var presence = new Presence({
  clientId: "620444226324529177"
});

var elapsed = Math.floor(Date.now() / 1000);
var channel;

presence.on("UpdateData", async () => {
  const data: presenceData = {
    largeImageKey: "sparklin-logo"
  };

  var path = window.location.href;

  if (path.includes("masterofthegrid")) {
    data.details = "Playing Master of the Grid";
    data.startTimestamp = elapsed;
  } else if (path.includes("bombparty")) {
    if (path.includes("play")) {
      channel = document.querySelector(".ChannelName").textContent;
      data.details = "Playing BombParty";
      data.state = channel;
      data.startTimestamp = elapsed;
    } else {
      data.details = "BombParty Home";
      data.startTimestamp = elapsed;
    }
  } else if (path.includes("deathroulette")) {
    if (path.includes("play")) {
      channel = document.querySelector(".ChannelName").textContent;
      data.details = "Playing Death Roulette";
      data.state = channel;
      data.startTimestamp = elapsed;
    } else {
      data.details = "Death Roulette Home";
      data.startTimestamp = elapsed;
    }
  } else if (path.includes("popsauce")) {
    if (path.includes("play")) {
      channel = document.querySelector(".ChannelName").textContent;
      data.details = "Playing PopSauce";
      data.state = channel;
      data.startTimestamp = elapsed;
    } else {
      data.details = "PopSauce Home";
      data.startTimestamp = elapsed;
    }
  } else if (path.includes("guesswhat")) {
    var playCheck = document.querySelector(".rooms h1") ? false : true;
    if (playCheck) {
      var chan = document.querySelector(".room-name").textContent;
      channel = chan.charAt(0).toUpperCase() + chan.slice(1);
      data.details = "Playing Guess What";
      data.state = channel;
      data.startTimestamp = elapsed;
    } else {
      data.details = "Guess What Home";
      delete data.state;
      data.startTimestamp = elapsed;
    }
  } else if (path.includes("frenzy")) {
    data.details = "Playing Daily Frenzy";
    data.startTimestamp = elapsed;
  } else {
    data.details = "Somewhere on-site";
    data.startTimestamp = elapsed;
  }
  presence.setActivity(data);
});
