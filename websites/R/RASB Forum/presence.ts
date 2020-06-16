const presence = new Presence({
  clientId: "721784733582753813"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "rasb",
    startTimestamp: browsingStamp
  };

  const pathname = document.location.pathname;

  // Custom paths
  const badgeSplitter = pathname.slice(8);
  const splitter = pathname.slice(3); // Used to split into different types of forum elements

  switch (pathname) {
    case "/":
      presenceData.details = "Browsing:";
      presenceData.state = "Main Page";
      break;

    case "/latest":
      presenceData.details = "Browsing:";
      presenceData.state = "Latest Posts";
      break;

    case "/top":
      presenceData.details = "Browsing:";
      presenceData.state = "Top Posts";
      break;

    case "/unread":
      presenceData.details = "Browsing:";
      presenceData.state = "Unread Posts";
      break;

    case "/categories":
      presenceData.details = "Browsing:";
      presenceData.state = "Categories";
      break;

    case "/c/" + splitter: {
      const category = document.title.slice(7, -20);
      presenceData.details = "Browsing category:";
      presenceData.state = category;
      break;
    }

    case "/t/" + splitter: {
      const postName = document.getElementsByClassName("fancy-title")[0];
      if (!postName) return;
      presenceData.details = "Reading:";
      presenceData.state = postName.textContent;
      break;
    }

    case "/u/" + splitter: {
      const userName = document.getElementsByClassName("full-name")[0];
      if (!userName) return;
      presenceData.details = "Browsing profile:";
      presenceData.state = userName.textContent;
      break;
    }

    case "/badges/" + badgeSplitter: {
      const badgeName = document.getElementsByClassName("badge-link")[0];
      if (!badgeName) return;
      presenceData.details = "Browsing badge:";
      presenceData.state = badgeName.textContent;
      break;
    }

    case "/search": {
      const searchedFor = document.title.slice(20, -14);
      presenceData.details = "Searching for:";
      presenceData.state = searchedFor;
      break;
    }

    case "/badges":
      presenceData.details = "Browsing:";
      presenceData.state = "Badges";
      break;

    case "/g":
      presenceData.details = "Browsing:";
      presenceData.state = "Groups";
      break;

    case "/u":
      presenceData.details = "Browsing:";
      presenceData.state = "Users";
      break;

    case "/new":
      presenceData.details = "Browsing:";
      presenceData.state = "New Posts";
      break;

    case "/about":
      presenceData.details = "Browsing:";
      presenceData.state = "About";
      break;

    default:
      presenceData.details = "Browsing:";
      presenceData.state = "Not Found";
      break;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
