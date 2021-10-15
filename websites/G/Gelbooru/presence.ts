const presence = new Presence({
  clientId: "620294187878711313"
});

presence.on("UpdateData", () => {
  let presenceData: PresenceData = {
    details: "Viewing the homepage...",
    largeImageKey: "lg-gb"
  };
  const urlParams = new URLSearchParams(window.location.search);
  if (document.location.pathname === "/") {
    presenceData = {
      details: "Viewing the homepage...",
      largeImageKey: "lg-gb"
    };
    presence.setActivity(presenceData);
  } else if (
    urlParams.get("page") &&
    urlParams.get("s") &&
    urlParams.get("page") === "post"
  ) {
    if (urlParams.get("s") === "list") {
      if (urlParams.get("tags")) {
        presenceData = {
          details: "Searching...",
          state: urlParams.get("tags").replace(" ", ", "),
          largeImageKey: "lg-gb"
        };
        presence.setActivity(presenceData);
      } else {
        presenceData = {
          details: "Viewing Posts List...",
          largeImageKey: "lg-gb"
        };
        presence.setActivity(presenceData);
      }
    } else if (urlParams.get("s") === "view" && urlParams.get("id")) {
      presenceData = {
        details: "Viewing a Post...",
        state: `Post ${urlParams.get("id")}`,
        largeImageKey: "lg-gb"
      };
      presence.setActivity(presenceData);
    } else presence.setActivity(presenceData);
  } else presence.setActivity(presenceData);
});
