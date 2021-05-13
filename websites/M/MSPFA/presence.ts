const presence = new Presence({
    clientId: "717795432251654200"
  }),
  browsingStamp = Math.floor(Date.now() / 1000),
  // This is better than having a lot of (almost) empty switch cases
  // Assigning details to type any made ESLint scream, and setting it to type string made the compiler scream
  details: { [k: string]: string } = {
    "/stories/": "Searching for an adventure",
    // This is just error handling because /random/ redirects you
    "/random/": "Finding a random adventure",
    "/stats/": "Looking at site stats",
    "/my/": "Looking at their profile",
    "/user/": "Looking at a profile",
    "/my/profile/": "Editing their profile",
    "/my/settings/": "Editing their profile",
    "/my/stories/": "Editing an adventure",
    "/my/stories/info/": "Editing an adventure",
    "/my/stories/pages/": "Editing an adventure",
    "/favs/": "Browsing favorite adventures",
    "/my/messages/": "Reading private messages",
    "/achivements/": "Looking at someone's achievements",
    "/donate/": "Considering donating",
    "/privacy/": "Reading the privacy policy",
    "/terms/": "Reading the ToS",
    "/log/": "Reading an adventure log",
    "/search/": "Searching an adventure"
  };

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };

  // Please note: Whenever I use innerHTML opposed to innerText it's because TypeScript shouts at me
  // There's probably some easy fix to it, I just don't know what it is >_<

  switch (document.location.pathname) {
    case "/stories/":
      // Explore
      presenceData.smallImageKey = "search";
      break;
    case "/user/":
      // (A) user Profile
      presenceData.state =
        "User: " + document.querySelector("h2#username").innerHTML;
      break;
    // I'm no Typescript god, there's probably some way you could join all of these together
    case "/my/profile/":
      // Editing Profile
      presenceData.smallImageKey = "writing";
      break;
    case "/my/settings/":
      // Editing Profile, still
      presenceData.smallImageKey = "writing";
      break;
    case "/my/stories/":
      // Editing Adventure
      presenceData.smallImageKey = "writing";
      break;
    case "/my/stories/info/":
      // See above
      presenceData.smallImageKey = "writing";
      break;
    case "/my/stories/pages/":
      // See above
      presenceData.smallImageKey = "writing";
      presenceData.state =
        document.querySelector("a#storyname.major").innerHTML;
      break;
    case "/achievements/":
      // Typescript yelled at me when I tried to use innerText
      presenceData.state =
        "User: " + document.querySelector("a#username").innerHTML;
      break;
    case "/log/":
      // See above
      presenceData.state =
        document.querySelector("a#storyname.major").innerHTML;
      break;
    case "/search/":
      // See above
      presenceData.state =
        document.querySelector("a#storyname.major").innerHTML;
      break;
    default:
      break;
  }

  // Handle values that don't just rely on the path
  if (document.location.pathname === "/" && document.location.search === "") {
    // Homepage
    presenceData.details = "Viewing home page";
  } else if (
    document.location.pathname === "/" &&
    document.location.search !== ""
  ) {
    // Adventures
    presenceData.details = "Reading an adventure";
    presenceData.state = document.querySelector("title").innerText;
    presenceData.smallImageKey = "reading";
    // Parse the page number so we can see what page they're on
    let search = document.location.search;
    // It's a really crude way to do it, but it gets the job done
    // For example: https://mspfa.com/?s=2302&p=1
    //                                00 111111 2
    // We want 2, and we don't know how long it is
    search = search.split("=")[2];
    presenceData.smallImageText = "On page " + search;
  }

  if (document.location.pathname in details) {
    presenceData.details = details[document.location.pathname];
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
