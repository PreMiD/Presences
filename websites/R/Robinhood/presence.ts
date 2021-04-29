var presence = new Presence({
  clientId: "836301630059839506"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
presence.on("UpdateData", async () => {
  const data = {
    largeImageKey: "robinhood",
    startTimestamp: 1577232000,
    details: "Viewing Portfolio",
  };
  if (document.location.pathname == "/") {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Portfolio";
    data.state = document.querySelector('.up').getAttribute('aria-label');
  }
  else if (document.location.pathname.includes("/stocks")) {
    data.startTimestamp = browsingStamp;
    data.state = document.title;
    data.details = "Viewing Stocks";
  }
  else if (document.location.pathname.includes("/crypto")) {
    data.startTimestamp = browsingStamp;
    data.state = document.title;
    data.details = "Viewing Crypto";
  }
  else if (document.location.pathname.includes("/profile")) {
    data.startTimestamp = browsingStamp;
    data.state = document.title;
    data.details = "Viewing Profile";
  }
  else if (document.location.pathname.includes("/messages")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Messages";
  }
  else if (document.location.pathname.includes("/cash/")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Cash";
  }
  else if (document.location.pathname.includes("/news")) {
    data.startTimestamp = browsingStamp;
    data.state = document.querySelector('.css-of9o7b').textContent;
    data.details = "Viewing News";
  }
  else if (document.location.pathname.includes("/lists")) {
    data.startTimestamp = browsingStamp;
    data.state = document.title;
    data.details = "Viewing Lists";
  }
  else if (document.location.pathname.includes("/account")) {
    data.startTimestamp = browsingStamp;
    data.details = "Viewing Account";
  }
  if (data.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(data);
  }
});
