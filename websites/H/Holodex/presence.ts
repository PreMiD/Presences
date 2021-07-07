const
  presence = new Presence({
    clientId: "860224040060715018"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
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
        channel: document.querySelector(".uploader-data-list>div:nth-child(1)").textContent.split("  ")[0]
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
    startTime: Date.now()
  },

  /** 
 * This object stores functions that get the updated data
*/
  dataUpdater = {
    updateAll: async () => {
      data.smallimage = await dataUpdater.getSmallImage();
      data.details = dataUpdater.getDetails();
      data.state = dataUpdater.getState();
    },
    getDetails: () => {
      const path = window.location.pathname.split("/");
      switch (path[1]) {
        case "home":
          return "Home";
        case "favorites":
          return "Favorites";
        case "channel":
          return path[2] ?
            "Viewing Channel"
            : "Channel List";
        case "library":
          return "Library";
        case "playlists":
          return "Playlists";
        case "multiview":
          return "MultiView";
        case "music":
          return "Music";
        case "infinite":
          return "Mugen Clips";
        case "about":
          return "About";
        case "settings":
          return "Settings";
        case "login":
          return document.querySelector(".v-card.ma-auto.v-sheet .v-list") === null ? "Login Screen" : "Account Settings";
        case "watch":
          return `Watching ${getInfo.watch().title}`;
        default:
          return `Unsupported Page : ${window.location.pathname}`;
      }
    },
    getState: () => {
      const path = window.location.pathname.split("/");
      switch (path[1]) {
        case "watch":
          return `${getInfo.watch().channel}`;
        case "channel":
          return path[2] === undefined ? getChannelsCategory() : getInfo.channel().title;
        case "home":
          return getHomeFavsCategory();
        case "favorites":
          return getHomeFavsCategory();
        case "music":
          return document.querySelector(".music-player-bar") !== null ?
            `Listening to ${document.querySelector(".music-player-bar>div>div:nth-child(2)>div:nth-child(2)>.single-line-clamp>a").textContent} - ${document.querySelector(".music-player-bar>div>div:nth-child(2)>div:nth-child(2)>.text-h6").textContent}` :
            "Not listening to anything";
        case "multiview":
          return `${document.querySelectorAll(".mv-frame").length} ${document.querySelectorAll(".mv-frame").length === 1 ? "Video" : "Videos"} Open`;
        case "infinite":
          return `${getInfo.watch().title} - ${getInfo.watch().channel}`;
        default:
          return "";
      }
    },
    getSmallImage: async () => {
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
            hover: "About"
          };
        case "settings":
          return {
            image: "mdisettings",
            hover: "Settings"
          };
        case "login":
          return {
            image: "mdiloginvariant",
            hover: document.querySelector(".v-card.ma-auto.v-sheet .v-list") === null ? "Login Screen" : "Account Settings"
          };
        case "watch":
          return {
            image: iFrameVideo.isPaused ? "mdipause" : "mdiplay",
            hover: iFrameVideo.isPaused ? (await strings).pause : (await strings).play
          };

        default:
          return {
            image: "largeimage",
            hover: undefined
          };
      }
    }
  };

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

/**
 * Get the Category on the Channels Page
 */
function getChannelsCategory() {
  switch ([].indexOf.call(document.querySelector("[role='tablist'] div.v-slide-group__content").children, document.querySelector("[role='tablist'] div.v-slide-group__content [aria-selected=true]"))) {
    case 1:
      return "VTuber";
    case 2:
      return "Subber";
    case 3:
      return "Favorites";
    case 4:
      return "Blocked";
    default:
      return "Unsupported Category"; // This should never occur, if it occurs it's a holodex.net bug
  }
}


presence.on("UpdateData", async () => {
  dataUpdater.updateAll();

  const presenceData: PresenceData = {
    largeImageKey:
      "largeimage",
    smallImageKey:
      data.smallimage.image,
    smallImageText: data.smallimage.hover,
    details: data.details,
    state: data.state,
    startTimestamp: data.startTime
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

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
