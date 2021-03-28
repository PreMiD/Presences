const presence = new Presence({
  clientId: "627875524298932254"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo-dlm"
  };

  presenceData.startTimestamp = Math.floor(Date.now() / 1000);

  if (window.location.pathname.endsWith("/")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Home Page";
  } else if (window.location.pathname.endsWith("/add")) {
    presenceData.details = "Adding a server";
  } else if (window.location.pathname.endsWith("/view")) {
    presenceData.details = "Viewing a server";
    presenceData.state = document.querySelector(
      "#bigytxt > span"
    ).textContent;
  } else if (window.location.pathname.startsWith("/edit")) {
    presenceData.details = "Editing a server";
    presenceData.state = document.querySelector(
      "#bigytxt > span"
    ).textContent;
  } else if (window.location.pathname.startsWith("/tags")) {
    presenceData.details = "Viewing tags list";
  } else if (window.location.pathname.includes("/store")) {
    presenceData.details = "Viewing the Store";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
