const presence = new Presence({
    clientId: "813781191308083239"
  }),
  time = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  let details, state;
  const title = document.title;

  if (window.location.href === "https://www.nytimes.com/") {
    details = "Viewing Home Page";
  } else if (document.location.pathname.includes("/interactive/")) {
    details = "Viewing an Interactive: ";
    state = title.replace(" - The New York Times", "");
  } else if (
    document.location.pathname.includes("/section/") ||
    document.location.pathname.includes("/spotlight/podcasts")
  ) {
    details = "Viewing a Section Page: ";
    state = title.replace(" - The New York Times", "");
  } else if (document.location.pathname.includes("/destination/")) {
    details = "Viewing a Destination Page: ";
    state = title.replace(" - The New York Times", "");
  } else if (document.location.pathname.includes("/reviews/")) {
    details = "Viewing a Review Page: ";
    state = title.replace(" - The New York Times", "");
  } else if (document.location.pathname.includes("/column/")) {
    details = "Viewing a Column Page: ";
    state = title.replace(" - The New York Times", "");
  } else if (document.location.pathname.includes("/search")) {
    details = "Searching for:";
    state = new URLSearchParams(window.location.search).get("query");
  } else if (document.location.pathname.includes("/video/")) {
    details = "Viewing a Video Section: ";
    state = title.replace(" - The New York Times", "");
  } else if (document.location.pathname.includes("/podcasts/the-daily/")) {
    details = "Viewing a Podcast: ";
    state = "The Daily: " + title.replace(" - The New York Times", "");
  } else {
    details = "Viewing an Article: ";
    state = title.replace(" - The New York Times", "");
  }

  const data: PresenceData = {
    details,
    largeImageKey: "logo",
    startTimestamp: time,
    state,
    buttons: [{ label: "View Page", url: document.URL }]
  };

  if (data.state == null) {
    delete data.state;
  }

  if (
    !(await presence.getSetting("buttons")) ||
    window.location.href === "https://www.nytimes.com/"
  ) {
    delete data.buttons;
  }

  if (data.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setTrayTitle(data.state);
    presence.setActivity(data);
  }
});
