const presence = new Presence({
  clientId: "712269360206708766"
});

presence.on("UpdateData", () => {
  const presenceData: presenceData = {
    largeImageKey: "logo"
  };

  const browsingStamp = Math.floor(Date.now() / 1000);
  const page = window.location.pathname;

  presenceData.startTimestamp = browsingStamp;

  if(page.endsWith("/lounge") || page.endsWith("/lounge/")) {
    presenceData.details = "Looking for a room";
    presenceData.state = "Username: " + document.querySelector(".name").textContent;;
  } else if(page.endsWith("/room/")) {
    presenceData.details = "In a room: " + document.querySelector(".room-title-name").textContent;;
    presenceData.state = "Members: " + document.querySelector(".room-title-capacity").textContent;;
  } else if (page.endsWith("/create_room") || page.endsWith("/create_room/")) {
    presenceData.details = "Creating a room";
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});