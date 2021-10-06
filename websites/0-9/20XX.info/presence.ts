const presence = new Presence({
  clientId: "722294649661685870"
});

interface DataInfoXX {
  page: string;
  serverID?: string;
  username?: string;
  query?: string;
  server?: string;
}

let infoXX: DataInfoXX = null;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "20xxinfo"
  };

  if (infoXX) {
    switch (infoXX.page) {
      case "index":
        data.details = "Homepage";
        break;
      case "faq":
        data.details = "Looking at the FAQ";
        break;
      case "serverpage":
        data.details = "Looking at a server";
        data.state = infoXX.server;
        break;
      case "userpage":
        data.details = "Looking at user's page";
        data.state = infoXX.username;
        break;
      case "search":
        data.details = "Searching for users";
        data.state = infoXX.query;
        break;
    }
  }

  // If data doesn't exist clear else set activity to the presence data
  if (!data.details) {
    presence.setTrayTitle(); // Clear tray
    presence.setActivity(); // Clear activity
  } else presence.setActivity(data);
});

presence.on("iFrameData", (data: DataInfoXX) => (infoXX = data));
