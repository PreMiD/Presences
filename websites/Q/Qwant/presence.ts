const presence = new Presence({
  clientId: "719331723560878091"
});

interface ItemMap {
  [key: string]: string;
}

const browsingTimestamp = Math.floor(Date.now() / 1000),
  searchTypeMap: ItemMap = {
    web: "Searching on the web",
    news: "Searching the news",
    images: "Searching images",
    videos: "Searching videos",
    social: "Searching social media",
    shopping: "Searching for products"
  },
  searchMusicTypeMap: ItemMap = {
    overview: "Searching music",
    albums: "Searching music albums",
    artists: "Searching music artists",
    songs: "Searching songs"
  },
  searchJuniorTypeMap: ItemMap = {
    web: "Searching on the web",
    images: "Searching images",
    videos: "Searching videos",
    education: "Searching educational content"
  };

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "qwant",
    startTimestamp: browsingTimestamp
  };

  let query: URLSearchParams = null;

  if (location.hostname === "www.qwant.com") {
    const [, firstPath] = location.pathname.split("/");
    switch (firstPath) {
      case "":
        query = new URLSearchParams(location.search);
        if (query.has("q")) {
          data.details = searchTypeMap[query.get("t")];
          data.state = query.get("q");
        } else data.details = "Home";
        break;
      case "music":
        data.smallImageKey = "music";
        data.smallImageText = "Qwant Music";
        if (location.pathname === "/music/search") {
          query = new URLSearchParams(location.search);
          if (query.has("q")) {
            data.details = searchMusicTypeMap[query.get("t")];
            data.state = query.get("q");
          }
        } else data.details = "Music Home";
        break;
      case "maps":
        data.smallImageKey = "maps";
        data.smallImageText = "Qwant Maps";
        data.details = "Looking at maps";
        break;
    }
  } else if (location.hostname === "www.qwantjunior.com") {
    data.largeImageKey = "qwantjunior";
    query = new URLSearchParams(location.search);
    switch (location.pathname) {
      case "/":
        if (query.has("q")) {
          data.details = `${
            searchJuniorTypeMap[query.get("type")]
          } in Qwant Junior`;
          data.state = query.get("q");
        } else data.details = "Junior Home";
        break;
      case "/news":
        data.smallImageKey = "news";
        data.smallImageText = "Qwant Junior News";
        if (query.has("q")) {
          data.details = "Searching the news on Qwant Junior";
          data.state = query.get("q");
        } else data.details = "Junior News Home";
        break;
    }
  }

  // If data doesn't exist clear else set activity to the presence data
  if (!data.details) {
    presence.setTrayTitle(); // Clear tray
    presence.setActivity(); // Clear activity
  } else presence.setActivity(data);
});
