const presence = new Presence({
    clientId: "813781191308083239"
});

let elapsed;

presence.on("UpdateData", async () => {

    let details, state;
    const title = document.title;
    let privacy = await presence.getSetting("privacy");

    const queryString = window.location.search, urlParams = new URLSearchParams(queryString);

    elapsed = Math.floor(Date.now() / 1000);
    if (privacy) {
      details = "Vewing a Page";
      state = "";
    } else {
      if (window.location.href == "https://www.nytimes.com/") {
      details = "Viewing Home Page";
      state = "";
    } else if (document.location.pathname.includes("/interactive/")) {
      details = "Viewing an Interactive: ";
      state = title.replace(" - The New York Times", "");
    } else if (document.location.pathname.includes("/section/") || document.location.pathname.includes("/spotlight/podcasts")) {
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
      state = urlParams.get('query');
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
    }

    let data: PresenceData = {
      details: details,
      state: state,
      largeImageKey: "logo",
      startTimestamp: elapsed
    };

    if (data.details == null) {
      //This will fire if you do not set presence details
      presence.setTrayTitle(); //Clears the tray title for mac users
      presence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
    } else {
      //This will fire if you set presence details
      presence.setTrayTitle(data.state);
      presence.setActivity(data); //Update the presence with all the values from the presenceData object
    }
});
