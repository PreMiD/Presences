const presence = new Presence({
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

  if (pathname === "/") data.details = "Viewing homepage";
  else if (pathname.includes(`/f/${fundraiserURL}`)) {
    const fundraiserName = document.querySelector(
      "#root > div > main > div.p-campaign > header > h1"
    );

    data.details = "Viewing fundraiser:";
    data.state = fundraiserName.textContent;
    data.buttons = [
      {
        label: "View fundraiser",
        url: href
      }
    ];
  } else if (pathname === "/sign-in" || pathname === "/sign-in/")
    data.details = "Logging In";
  else if (pathname === "/sign-up" || pathname === "/sign-up/")
    data.details = "Signing Up for an account";
  else if (pathname.includes("/forgot-password"))
    data.details = "Resetting a password";
  else if (pathname === "/c/how-it-works" || pathname === "/c/how-it-works/")
    data.details = "Reading How GoFundMe Works";
  else if (pathname === "/c/why-gofundme" || pathname === "/c/why-gofundme/")
    data.details = "Reading Why to choose GoFundMe";
  else if (pathname === "/campaigns" || pathname === "/campaigns/")
    data.details = "Viewing my fundraisers";
  else if (pathname === "/donations" || pathname === "/donations/")
    data.details = "Viewing the donations I've made";
  else if (pathname.includes("/settings")) data.details = "Settings";
  else if (pathname.includes("/create")) data.details = "Creating a fundraiser";
  else if (pathname.includes("/discover")) data.details = "Browsing Fundraiser";
  else if (pathname.includes("/start")) data.details = "Starting a fundraiser";
  else if (pathname === "/c/success" || pathname === "/c/success/")
    data.details = "Viewing Success Stories";
  else if (pathname === "/c/cause" || pathname === "/c/cause/")
    data.details = "GoFundMe Causes ";
  else if (
    pathname === "/c/cause/justice-and-equality" ||
    pathname === "/c/cause/justice-and-equality/"
  ) {
    data.details = "GoFundMe Causes";
    data.state = "Justice & Equality";
  } else if (pathname.startsWith("/s")) {
    data.details = "Searching for a fundraiser:";
    data.state = searchParams;
  }

  if (!data.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(data);
});
