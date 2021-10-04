const presence = new Presence({
    clientId: "656826806061498368" //The client ID of the Application created at https://discordapp.com/developers/applications
    //Enable use and detection of media key presses
  }),
  presenceData: PresenceData = {
    largeImageKey: "icon"
  },
  browsingStamp = Math.floor(Date.now() / 1000);
let customData = false;

presence.on("UpdateData", async () => {
  customData = false;
  presenceData.startTimestamp = browsingStamp;

  if (document.location.pathname === "/dashboard")
    presenceData.details = "Viewing the Dashboard!";
  else if (document.location.pathname === "/profile")
    presenceData.details = "Viewing their profile!";
  else if (document.location.pathname.startsWith("/room")) {
    const title = document.querySelector("#title");

    if (title !== null) {
      customData = true;

      const roomData: PresenceData = {
        details: "Completing room:",
        state: (title as HTMLElement).innerText,
        largeImageKey: "icon",
        startTimestamp: browsingStamp
      };
      presence.setActivity(roomData);
    } else presenceData.details = "Looking at rooms!";
  } else if (
    document.location.pathname === "/upload" ||
    document.location.pathname === "/manage-rooms" ||
    document.location.pathname.startsWith("/room/manage") ||
    document.location.pathname === "/assign-tasks" ||
    document.location.pathname === "/your-material"
  ) {
    presenceData.details = "Managing a room!";
    presenceData.state = `Page: ${document.location.pathname}`;
    //presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname === "/leaderboards")
    presenceData.details = "Checking the leaderboards!";
  else presenceData.details = "Breaking stuff!";

  if (!customData) presence.setActivity(presenceData);
});
