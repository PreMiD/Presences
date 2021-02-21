const presence = new Presence({
  clientId: "806477655188832277"
});

function getSubdomain(): string {
  return window.location.host.replace(".statifybot.net", "")

}

/**
 * Set cookie function
 * @see {@link https://www.w3schools.com/js/js_cookies.asp}
 */
function setCookie(cname: string, cvalue: string, exdays = 1): void {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * Get cookie function
 * @see {@link https://www.w3schools.com/js/js_cookies.asp}
 */
function getCookie(cname: string): string {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}



presence.on("UpdateData", async () => {


  // Create presence data
  const presenceData: PresenceData = {
    largeImageKey: "statify"
  };

  const subdomain = getSubdomain();
  const path = window.location.pathname;

  presenceData.startTimestamp = new Date().getTime();


  if (subdomain == "dev") {
    presenceData.largeImageKey = "statify_dev";
    presenceData.state += " | On Dev Page"
    presenceData.smallImageKey = "statify"
  } else {
    presenceData.smallImageKey = "statify"
  }

  if (path.startsWith("/dash")) {
    presenceData.details = `Getting Rickrolled lmao`;
    presenceData.state = `*Never Gonna give you up. Never Gonna let you down...*`
    presenceData.smallImageKey = 'rickastley'
  } else if (path.startsWith("/getting-started")) {
    presenceData.details = "Reading through...";
    presenceData.state = "Get Started page";
    presenceData.smallImageKey = "file";
  } else if (path.startsWith("/team")) {
    presenceData.details = "Looking at...";
    presenceData.state = "Team behind Statify";
    presenceData.smallImageKey = "member";
  } else if (path.startsWith("/brand")) {
    presenceData.details = "Viewing...";
    presenceData.state = "Statify Designs";
    presenceData.smallImageKey = "file";
  } else if (path.startsWith("/premium")) {
    presenceData.details = "Viewing...";
    presenceData.state = "Features of Statify Premium";
    presenceData.smallImageKey = "giveaway";
  } else if (path.startsWith("/commands")) {
    var url_string = window.location.toString()
    var url = new URL(url_string);
    if(url.searchParams.get("search")){
      presenceData.details = "Searching...";
    presenceData.state = "for the "+ url.searchParams.get("search") + " Command";
    } else
    if(url.searchParams.get("cat")){
      presenceData.details = "Viewing...";
     presenceData.state = "the Commands of the " + url.searchParams.get("cat") + " Category";
    } else {
    presenceData.details = "Viewing...";
    presenceData.state = "the Commands of Statify";
    presenceData.smallImageKey = "file";
    }
  } else if (path.startsWith("/imprint")) {
    presenceData.details = "Reading through...";
    presenceData.state = "Imprint";
    presenceData.smallImageKey = "file";
  } else if (path.startsWith("/privacy")) {
    presenceData.details = "Reading through...";
    presenceData.state = "Privacy Policy"
    presenceData.smallImageKey = "file";
  } else if (path.startsWith("/about")) {
    presenceData.details = "Reading through...";
    presenceData.state = "About page";
    presenceData.smallImageKey = "file";
  } else if (path.startsWith("/types")) {
    presenceData.details = "Reading through...";
    presenceData.state = "Stat types";
    presenceData.smallImageKey = "file";
  } else if (path == "/") {
    presenceData.details = "Browsing through...";
    presenceData.state = "Home page";
    presenceData.smallImageKey = "statify";
  } else {
    presenceData.details = "Viewing";
    presenceData.state = "An unknown Page";
    presenceData.smallImageKey = "error";
  }

  if (subdomain == "dev") {
    presenceData.largeImageKey = "statifyclock";
    presenceData.state += " | On Dev Page"
  }
  presenceData.smallImageText = presenceData.details.replace("...", " the") + " " + presenceData.state;
  presenceData.buttons = [
    {
      label: "Visit Website",
      url: "https://statifybot.net" + path 
    },
    {
      label: "Invite Statify",
      url: "https://statifybot.net/invite"
    }
  ]  

  
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});