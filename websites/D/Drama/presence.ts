const presence = new Presence({
  clientId: "852245069984825394" 
}),
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
});

presence.on("UpdateData", async () => {

  let presenceData: PresenceData = {
    largeImageKey:
      "dramagg",
    smallImageKey:
      "search",
    smallImageText: "Looking for a thread",
    details: "Looking for drama!",
    state: "Browsing"
  };

  if(document.URL.includes("/d/")) {
    presenceData.largeImageKey = "dramagg";
    presenceData.smallImageKey = "reading";
    presenceData.smallImageText = "Reading a thread";
    presenceData.details = `Viewing Thread: ${document.querySelector("h2.DiscussionHero-title").textContent}`;
    presenceData.state = `${document.querySelector("span.Scrubber-index").textContent} / ${document.querySelector("span.Scrubber-count").textContent} Posts`;
    presenceData.buttons = [
        {
          label: "Go To Post",
          url: `${document.URL}`
        }
      ];
  } else if(document.URL.includes("/u/")) {
    presenceData.smallImageKey = "reading";
    presenceData.smallImageText = "Viewing a profile";
    presenceData.details = `Viewing Profile: ${document.URL.split("/")[4]}`;
    presenceData.state = `Posts: ${document.querySelector("span.Button-badge").textContent} `;
  } else if(document.URL.includes("/meta")) {
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Looking for a thread";
    presenceData.details = "Looking for drama!";
    presenceData.state = "Looking at meta threads";
  } else if(document.URL.includes("/resolved")) {
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Looking for a thread";
    presenceData.details = "Looking for drama!";
    presenceData.state = "Looking at resolved threads"; 
  } else if(document.URL.includes("/confirmed")) {
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Looking for a thread";
    presenceData.details = "Looking for drama!";
    presenceData.state = "Looking at confirmed threads"; 
  } else if(document.URL.includes("/discussion")) {
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Looking for a thread";
    presenceData.details = "Looking for drama!";
    presenceData.state = "Looking at discussions";
  } else if(document.URL.includes("/users")) {
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Looking at all users";
    presenceData.details = "Looking for drama!";
    presenceData.state = "Looking at all users";
  } else if(document.URL.includes("/trinkets")) {
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Looking at trinkets";
    presenceData.details = "Looking for drama!";
    presenceData.state = "Looking at trinkets";
  } else if(document.querySelector("div.Composer.visible")) {
    presenceData.smallImageKey = "reading";
    presenceData.smallImageText = "Writing a thread";
    presenceData.details = "Starting some drama!";
    presenceData.state = "Writing a post";
  } else {
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Looking for a thread";
    presenceData.details = "Looking for drama!";
    presenceData.state = "Browsing";
  } 


if (presenceData.details == null) {
  presence.setTrayTitle();
  presence.setActivity();
} else {
  presence.setActivity(presenceData);
}
});
