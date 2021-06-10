const presence = new Presence({
  clientId: "852245069984825394" 
}),
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
});

presence.on("UpdateData", async () => {



  if(document.URL.includes('/d/')) {
    var presenceData: PresenceData = {
      largeImageKey:
        "dramagg",
      smallImageKey:
        "reading",
      smallImageText: "Reading a thread",
      details: `Viewing Thread: ${document.querySelector("h2.DiscussionHero-title").textContent}`,
      state: `${document.querySelector("span.Scrubber-index").textContent} / ${document.querySelector("span.Scrubber-count").textContent} Posts`,
      buttons: [
        {
          label: "Go To Post",
          url: `${document.URL}`
        }
      ]
    }; 
  } else if(document.URL.includes('/u/')) {
      var presenceData: PresenceData = {
        largeImageKey:
          "dramagg",
        smallImageKey:
          "reading",
        smallImageText: "Viewing a profile",
        details: `Viewing Profile: ${document.URL.split("/")[4]}`,
        state: `Posts: ${document.querySelector("span.Button-badge").textContent} `,
      };
  } else {
    var presenceData: PresenceData = {
      largeImageKey:
        "dramagg",
      smallImageKey:
        "search",
      smallImageText: "Looking for a thread",
      details: "Looking for drama!",
      state: `Browsing.`,
    };  
  } 


if (presenceData.details == null) {
  presence.setTrayTitle();
  presence.setActivity();
} else {
  presence.setActivity(presenceData);
}
});