const presence = new Presence({
    clientId: "908758869470216203"
  }),
  path = document.location.pathname,
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      state: "All shots",
      largeImageKey: "dribbble",
      startTimestamp: browsingStamp
    },
    shotsTypes = (type: string) => {
      if (document.location.pathname.includes("/animation"))
        presenceData.state = `${type} Shots - Animation`;
      else if (document.location.pathname.includes("/branding"))
        presenceData.state = `${type} Shots - Branding`;
      else if (document.location.pathname.includes("/illustration"))
        presenceData.state = `${type} Shots - Illustration`;
      else if (document.location.pathname.includes("/mobile"))
        presenceData.state = `${type} Shots - Mobile`;
      else if (document.location.pathname.includes("/print"))
        presenceData.state = `${type} Shots - Print`;
      else if (document.location.pathname.includes("/product-design"))
        presenceData.state = `${type} Shots - Product Design`;
      else if (document.location.pathname.includes("/typography"))
        presenceData.state = `${type} Shots - Typography`;
      else if (document.location.pathname.includes("/web-design"))
        presenceData.state = `${type} Shots - Web Design`;
      else presenceData.state = `All ${type} Shots`;
    },
    search = (type: string) => {
      const searchTitle = document.querySelector(
        "body > div#wrap > div.search-header > div.search-results-details > h1"
      )?.textContent;

      presenceData.details = `Search : "${searchTitle}"`;
      shotsTypes(type);
    };

  if (document.location.pathname.includes("/following")) {
    if (document.location.pathname.includes("/search")) search("following");
    else {
      presenceData.details = "Viewing page :";
      shotsTypes("following");
    }
  } else if (document.location.pathname.includes("/popular")) {
    if (document.location.pathname.includes("/search")) search("popular");
    else {
      presenceData.details = "Viewing page :";
      shotsTypes("popular");
    }
  } else if (document.location.pathname.includes("/recent")) {
    if (document.location.pathname.includes("/search")) search("recent");
    else {
      presenceData.details = "Viewing page :";
      shotsTypes("recent");
    }
  } else if (document.location.pathname.includes("/search")) search("");
  else if (document.body.id === "profile") {
    // view a profile
    const profilePath = path,
      pathArray = profilePath.split("/"),
      [, profileName] = pathArray;
    presenceData.details = "Viewing profile :";
    presenceData.state = `- ${profileName} -`;
  } else presenceData.details = "Homepage";

  if (document.body.id === "user-profile") {
    // view personal profile
    const profilePath = path,
      pathArray = profilePath.split("/"),
      [, profileName] = pathArray;
    presenceData.details = "Viewing personal profile :";
    presenceData.state = `- ${profileName} -`;
  }

  if (!presenceData.details) presence.setActivity();
  else presence.setActivity(presenceData);
});
