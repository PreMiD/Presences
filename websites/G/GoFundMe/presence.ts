const presence = new Presence({
    clientId: "865564674326003712"
  }),
  timer = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "gofundme",
      startTimestamp: timer
    },
    
    url = new URL(const presence = new Presence({
    clientId: "865564674326003712"
  }),
  timer = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "gofundme",
      startTimestamp: timer
    },
    { pathname, href } = location,
    url = new URL(href),
    searchParams = url.searchParams.get("q"),
    [, , fundraiserURL] = pathname.split("/");

  if (pathname === "/") presenceData.details = "Viewing homepage";
  else if (pathname.includes(`/f/${fundraiserURL}`)) {
    const fundraiserName = document.querySelector(
      "#root > div > main > div.p-campaign > header > h1"
    );

    presenceData.details = "Viewing fundraiser:";
    data.state = fundraiserName.textContent;
    data.buttons = [
      {
        label: "View fundraiser",
        url: href
      }
    ];
  } else if (pathname === "/sign-in" || pathname === "/sign-in/")
    presenceData.details = "Logging In";
  else if (pathname === "/sign-up" || pathname === "/sign-up/")
    presenceData.details = "Signing Up for an account";
  else if (pathname.includes("/forgot-password"))
    presenceData.details = "Resetting a password";
  else if (pathname === "/c/how-it-works" || pathname === "/c/how-it-works/")
    presenceData.details = "Reading How GoFundMe Works";
  else if (pathname === "/c/why-gofundme" || pathname === "/c/why-gofundme/")
    presenceData.details = "Reading Why to choose GoFundMe";
  else if (pathname === "/campaigns" || pathname === "/campaigns/")
    presenceData.details = "Viewing my fundraisers";
  else if (pathname === "/donations" || pathname === "/donations/")
    presenceData.details = "Viewing the donations I've made";
  else if (pathname.includes("/settings")) presenceData.details = "Settings";
  else if (pathname.includes("/create")) presenceData.details = "Creating a fundraiser";
  else if (pathname.includes("/discover")) presenceData.details = "Browsing Fundraiser";
  else if (pathname.includes("/start")) presenceData.details = "Starting a fundraiser";
  else if (pathname === "/c/success" || pathname === "/c/success/")
    presenceData.details = "Viewing Success Stories";
  else if (pathname === "/c/cause" || pathname === "/c/cause/")
    presenceData.details = "GoFundMe Causes ";
  else if (
    pathname === "/c/cause/justice-and-equality" ||
    pathname === "/c/cause/justice-and-equality/"
  ) {
    presenceData.details = "GoFundMe Causes";
    data.state = "Justice & Equality";
  } else if (pathname.startsWith("/s")) {
    presenceData.details = "Searching for a fundraiser:";
    data.state = searchParams;
  }

  if (!presenceData.details) {
  
    presence.setActivity();
  } else presence.setActivity(data);
});
),
    
    [, , fundraiserURL] = pathname.split("/");

  if (pathname === "/") presenceData.details = "Viewing homepage";
  else if (pathname.includes(`/f/${fundraiserURL}`)) {
    const fundraiserName = document.querySelector(
      "#root > div > main > div.p-campaign > header > h1"
    );

    presenceData.details = "Viewing fundraiser:";
    data.state = fundraiserName.textContent;
    data.buttons = [
      {
        label: "View fundraiser",
        url: href
      }
    ];
  } else if (pathname === "/sign-in" || pathname === "/sign-in/")
    presenceData.details = "Logging In";
  else if (pathname === "/sign-up" || pathname === "/sign-up/")
    presenceData.details = "Signing Up for an account";
  else if (pathname.includes("/forgot-password"))
    presenceData.details = "Resetting a password";
  else if (pathname === "/c/how-it-works" || pathname === "/c/how-it-works/")
    presenceData.details = "Reading How GoFundMe Works";
  else if (pathname === "/c/why-gofundme" || pathname === "/c/why-gofundme/")
    presenceData.details = "Reading Why to choose GoFundMe";
  else if (pathname === "/campaigns" || pathname === "/campaigns/")
    presenceData.details = "Viewing my fundraisers";
  else if (pathname === "/donations" || pathname === "/donations/")
    presenceData.details = "Viewing the donations I've made";
  else if (pathname.includes("/settings")) presenceData.details = "Settings";
  else if (pathname.includes("/create")) presenceData.details = "Creating a fundraiser";
  else if (pathname.includes("/discover")) presenceData.details = "Browsing Fundraiser";
  else if (pathname.includes("/start")) presenceData.details = "Starting a fundraiser";
  else if (pathname === "/c/success" || pathname === "/c/success/")
    presenceData.details = "Viewing Success Stories";
  else if (pathname === "/c/cause" || pathname === "/c/cause/")
    presenceData.details = "GoFundMe Causes ";
  else if (
    pathname === "/c/cause/justice-and-equality" ||
    pathname === "/c/cause/justice-and-equality/"
  ) {
    presenceData.details = "GoFundMe Causes";
    data.state = "Justice & Equality";
  } else if (pathname.startsWith("/s")) {
    presenceData.details = "Searching for a fundraiser:";
    data.state = url.searchParams.get("q");
  }

  if (!presenceData.details) {
  
    presence.setActivity();
  } else presence.setActivity(data);
});
