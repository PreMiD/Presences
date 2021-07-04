const
  presence = new Presence({
    clientId: "860224040060715018" //The client ID of the Application created at https://discordapp.com/developers/applications
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
    //You can use this to get translated strings in their browser language
  });

let iFrameVideo: { isPaused: boolean };

presence.on("iFrameData", (data: { video: { isPaused: boolean } }) => {
  iFrameVideo = data.video;
});

/**
 * Functions to get some common info
 */
const getInfo = {
  watch: () => {
    return {
      title: document.querySelectorAll(".v-card__title")[0].children[0].textContent,
      channel: document.querySelector(".uploader-data-list>div:nth-child(1)").textContent.split("  ")[0],
    };
  },
  channel: () => {
    return {
      title: document.querySelector(".channel-container .v-list-item__title").textContent
    };
  }
},

/**
 * The object that stores the data
 */
 data = {
  details: "Default",
  state: "Default",
  smallimage: {
    image: "largeimage",
    hover: ""
  },
  startTime: Date.now(),
},

/** 
 * This object stores functions that get the updated data
*/
 updateData = {
  getDetails: () => {
    const path = window.location.pathname.split("/");
    switch (path[1]) {
      case "home":
        return "Home";
      case "favorites":
        return "Favorites";
      case "channel":
        return path[2] ?
          `${getInfo.channel().title}Channel`
          : "Channels";
      case "library":
        return "Library";
      case "playlists":
        return "Playlists";
      case "multiview":
        const videoAmount = document.querySelectorAll(".mv-frame").length;
        return `MultiView - ${videoAmount} ${videoAmount == 1 ? "Video" : "Videos"} Open`;
      case "music":
        return "Music";
      case "infinite":
        return "Mugen Clips";
      case "about":
        return "About";
      case "settings":
        return "Settings";
      case "login":
        return document.querySelector(".v-card.ma-auto.v-sheet .v-list") == null ? "Login Screen" : "Account Settings";
      case "watch":
        return `Watching ${getInfo.watch().title}`;
      default:
        return "Default value";
    }
  },
  getState: () => {
    const path = window.location.pathname.split("/");
    switch (path[1]) {
      case "watch":
        return `${getInfo.watch().channel}`;
      case "channel":
        return ``;
      case "home":
        return getHomeFavsCategory();
      case "favorites":
        return getHomeFavsCategory();
      case "music":
        return document.querySelector(".music-player-bar") != null ?
          `Listening to ${document.querySelector(".music-player-bar>div>div:nth-child(2)>div:nth-child(2)>.single-line-clamp>a").textContent} - ${document.querySelector(".music-player-bar>div>div:nth-child(2)>div:nth-child(2)>.text-h6").textContent}` :
          "Not listening to anything";
      case "infinite":
        return `${getInfo.watch().title} - ${getInfo.watch().channel}`;
      default:
        return "";
    }
  },
  getSmallImage: () => {
    const path = window.location.pathname.split("/");
    switch (path[1]) {
      case "home":
        return {
          image: "mdihome",
          hover: "Home Page"
        };
      case "favorites":
        return {
          image: "mdiheart",
          hover: "Favorites"
        };
      case "channel":
        return {
          image: (path.length < 3) ? "mdiaccountboxmultiple" : "mdiaccountbox",
          hover: (path.length < 3) ? "Channels" : `${getInfo.channel().title}`
        };
      case "library":
        return {
          image: "mdianimationplay",
          hover: "Library"
        };
      case "playlists":
        return {
          image: "mdiplaylistplay",
          hover: "Playlists"
        };
      case "multiview":
        return {
          image: "multiview",
          hover: "MultiView"
        };
      case "music":
        return {
          image: "mdimusic",
          hover: "Music"
        };
      case "infinite":
        return {
          image: "mdiinfinity",
          hover: "Mugen Clips"
        };
      case "about":
        return {
          image: "mdihelpcircle",
          hover: ""
        };
      case "settings":
        return {
          image: "mdisettings",
          hover: ""
        };
      case "login":
        return {
          image: "mdiloginvariant",
          hover: ""
        };
      case "watch":
        return {
          image: iFrameVideo.isPaused ? "mdipause" : "mdiplay",
          hover: iFrameVideo.isPaused ? "Paused" : "Playing"
        };

      default:
        return {
          image: "largeimage",
          hover: ""
        };
    }
  },
};

// Update the data the first time
data.smallimage = updateData.getSmallImage();
data.details = updateData.getDetails();
data.state = updateData.getState();

// Update the data every few seconds so Discord doesn't rate limit
setInterval(() => {
  data.smallimage = updateData.getSmallImage();
  data.details = updateData.getDetails();
  data.state = updateData.getState();
}, 5000);

/**
 * Get the Category on the Home and Favorites Pages
 */
function getHomeFavsCategory() {
  switch (window.location.hash) {
    case "":
      return "Live/Upcoming";
    case "#archive":
      return "Archive";
    case "#clips":
      return "Clips";
    default:
      return "Live/Upcoming";
  }
}


presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey:
      "largeimage" /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/,
    smallImageKey:
      data.smallimage.image /*The key (file name) of the Small Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/,
    smallImageText: data.smallimage.hover, //The text which is displayed when hovering over the small image
    details: data.details, //The upper section of the presence text
    state: data.state, //The lower section of the presence text
    startTimestamp: data.startTime, //The unix epoch timestamp for when to start counting from
    // endTimestamp: null, //If you want to show Time Left instead of Elapsed, this is the unix epoch timestamp at which the timer ends
  };

  // Add video and channel buttons when on the watch page
  if (/watch\/.{11}/.test(window.location.pathname)) {
    presenceData.buttons = [
      {
        label: "Open Video",
        url: window.location.href
      },
      {
        label: "Open Channel",
        url: `${window.location.origin}${document.querySelector(".uploader-data-list>div:nth-child(1)>a").getAttribute("href")}`
      }
    ];
  }

  if (presenceData.details == null) {
    //This will fire if you do not set presence details
    presence.setTrayTitle(); //Clears the tray title for mac users
    presence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
  } else {
    //This will fire if you set presence details
    presence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
  }
});
