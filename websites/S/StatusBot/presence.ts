// Register presence with our client id
const presence = new Presence({
  clientId: "697994764800360468"
});

// Filter hostname to get subdomain
function getSubdomain(): string {
  return window.location.hostname
    .split(".")
    .splice(window.location.hostname.split(".").length - 2, 2)
    .join(".");
}

/**
 * Set cookie function
 * @see {@link https://www.w3schools.com/js/js_cookies.asp}
 */
function setCookie(cname: string, cvalue: string, exdays = 1): void {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

/**
 * Get cookie function
 * @see {@link https://www.w3schools.com/js/js_cookies.asp}
 */
function getCookie(cname: string): string {
  const name = `${cname}=`,
    decodedCookie = decodeURIComponent(document.cookie),
    ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1);

    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return "";
}

// Idle checker function - Checks and updates cookies accordinglu
function idleChecker(
  lastActivity: string,
  activity: string,
  idleStart: Date | null
): void {
  /* If the last activity is the current activity and idleStart isnt set
   *  Set the idle start cookie else reset idle start cookie and set last activity to current activity*/
  if (lastActivity === activity && !idleStart)
    setCookie("PMD_IDLE_START", `${new Date().getTime()}`);
  else if (lastActivity !== activity) {
    setCookie("PMD_IDLE_START", "null");
    setCookie("PMD_LAST_ACTIVITY", activity);
  }
}

// Prefix all cookies with PMD according to requirements
// Reset cookies in case they exist on script initialization
setCookie("PMD_IDLE_START", "null"); // "Idle Start" cookie
setCookie("PMD_LAST_ACTIVITY", "null"); // "Last activity" cookie

// UpdateData event
presence.on("UpdateData", async () => {
  // Get cookies for processing
  const lastActivity: string = getCookie("PMD_LAST_ACTIVITY"),
    idleStartVal: string = getCookie("PMD_IDLE_START"),
    // Get date, if the date cookie is null set date to null
    idleStart: Date | null =
      idleStartVal !== "" && idleStartVal !== "null"
        ? new Date(parseInt(idleStartVal))
        : null,
    // Create presence data
    presenceData: PresenceData = {
      largeImageKey: "logo_main" // Default Logo
    },
    // Get subdomain and path from window.location
    subdomain = getSubdomain(),
    path = window.location.pathname;

  // Set presence data up depending on site/paths
  if (subdomain === "beta") {
    presenceData.smallImageKey = "logo_beta"; // Beta logo as small image
    presenceData.smallImageText = "Beta Website"; // Text for when hovering over small logo
  } else presenceData.smallImageKey = "logo_main"; // Main logo as small image

  // Presence for all /dashboard routes
  if (path.startsWith("/dashboard")) {
    presenceData.details = "Managing Guild"; // Default details

    if (path.includes("monitors")) {
      // Monitors pages
      presenceData.state = "Editing Monitors"; // Monitors state

      // Idle checker
      idleChecker(lastActivity, "monitors", idleStart);
    } else if (path.includes("general")) {
      // General pages
      presenceData.state = "Editing General Settings"; // General state

      // Idle checker
      idleChecker(lastActivity, "google", idleStart);
    } else if (path.includes("modules")) {
      // Modules pages
      presenceData.state = "Managing Modules"; // Modules state

      // Idle checker
      idleChecker(lastActivity, "modules", idleStart);
    } else if (path.includes("profile")) {
      // Profile pages
      presenceData.details = "Managing Profile"; // Profile details
      presenceData.state = "Viewing"; // Profiles state

      // Idle checker
      idleChecker(lastActivity, "profile", idleStart);
    } else {
      // root (/) pages
      presenceData.state = "Viewing Stats"; // root state

      // Idle checker
      idleChecker(lastActivity, "/", idleStart);
    }

    // Wait for 1 minute then update RP to idle
    if (idleStart && new Date().getTime() - idleStart.getTime() > 60000) {
      presenceData.state = "Idle"; // Update state to idle
      presenceData.startTimestamp = new Date().getTime(); // Set timestamp to now
    }
  } else if (path.startsWith("/admin")) {
    // Admin routes
    presenceData.details = "Administrating"; // Admin details
    presenceData.state = "Managing Website Settings"; // Admin state
  } else {
    presenceData.details = "Browsing"; // Landing and premium pages

    // Premium pages get different state to the landing page
    if (path.startsWith("/premium")) presenceData.state = "Premium plans";
    else presenceData.state = "Landing";
  }

  // If data doesn't exist clear else set activity to the presence data
  if (!presenceData.details) {
    presence.setTrayTitle(); // Clear tray
    presence.setActivity(); // Clear activity
  } else presence.setActivity(presenceData);
});
