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
  } else if(document.URL.includes('/meta')) {
    var presenceData: PresenceData = {
      largeImageKey:
        "dramagg",
      smallImageKey:
        "search",
      smallImageText: "Looking for a thread",
      details: "Looking for drama!",
      state: `Looking at meta threads`,
    };
  } else if(document.URL.includes('/resolved')) {
    var presenceData: PresenceData = {
      largeImageKey:
        "dramagg",
      smallImageKey:
        "search",
      smallImageText: "Looking for a thread",
      details: "Looking for drama!",
      state: `Looking at resolved threads`,
    }; 
  } else if(document.URL.includes('/confirmed')) {
    var presenceData: PresenceData = {
      largeImageKey:
        "dramagg",
      smallImageKey:
        "search",
      smallImageText: "Looking for a thread",
      details: "Looking for drama!",
      state: `Looking at confirmed threads`,
    }; 
  } else if(document.URL.includes('/discussion')) {
    var presenceData: PresenceData = {
      largeImageKey:
        "dramagg",
      smallImageKey:
        "search",
      smallImageText: "Looking for a thread",
      details: "Looking for drama!",
      state: `Looking at discussions`,
    }; 
  } else if(document.URL.includes('/users')) {
    var presenceData: PresenceData = {
      largeImageKey:
        "dramagg",
      smallImageKey:
        "search",
      smallImageText: "Looking at all users",
      details: "Looking for drama!",
      state: `Looking at all users`,
    };
  } else if(document.URL.includes('/trinkets')) {
    var presenceData: PresenceData = {
      largeImageKey:
        "dramagg",
      smallImageKey:
        "search",
      smallImageText: "Looking at trinkets",
      details: "Looking for drama!",
      state: `Looking at trinkets`,
    };
  } else {
    var presenceData: PresenceData = {
      largeImageKey:
        "dramagg",
      smallImageKey:
        "search",
      smallImageText: "Looking for a thread",
      details: "Looking for drama!",
      state: `Browsing`,
    };  
  } 


if (presenceData.details == null) {
  presence.setTrayTitle();
  presence.setActivity();
} else {
  presence.setActivity(presenceData);
}
});