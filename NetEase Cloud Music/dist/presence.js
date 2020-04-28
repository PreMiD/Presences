var presence = new Presence({
  clientId: "704509278253350964"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var title;
presence.on("UpdateData", async () => {
  const presenceData = {
    largeImageKey: "logo"
  };
  if (document.location.pathname == "/#") {
    songName = document.querySelector("a.f-thide.name.fc1.f-fl");
    artistName = document.querySelector("span.by.f-thide.f-fl");
    presenceData.details = "Listening to: " + songName.innerText;
    presenceData.state = "by: " + artistName.innerText;
  } else {
    presenceData.details = "Can't read page";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
