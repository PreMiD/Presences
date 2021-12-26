/**
 * Language Strings
 */
interface LangStrings {
  search: string;
  browsing: string;
  reading: string;
}

const presence = new Presence({
    clientId: "665519810054062100"
  }),
  strings = getStrings();

presence.on("UpdateData", async () => {
  const host = window.location.hostname.split("."),
    path = window.location.pathname.split("/").slice(1);

  if (host[0] === "ift") {
    // IFTTT URL Shortener (for the Help Center)
    presence.setActivity();
  } else if (host[0] === "help") {
    // IFTTT Help Center
    switch (path[0]) {
      // Startpage
      case "hc":
        await handleHelpCenter(path);
        break;
      // Unknown
      default:
        presence.setActivity();
        break;
    }
  } else if (host[0] === "platform") {
    // IFTTT for Businesses / Developers
    switch (path[0]) {
      // Documentation
      case "docs":
        await handleDocs();
        break;
      // Developer spotlight
      case "blog":
        await handleCustom(
          "Developer spotlight",
          path[1]?.length > 0
            ? document.querySelector<HTMLHeadingElement>("h1").textContent
            : null
        );
        break;
      // Solutions
      case "solutions":
        await handleCustom(
          "Solutions",
          path[1]?.length > 0
            ? document.querySelector<HTMLHeadingElement>("h3").textContent
            : null
        );
        break;
      // Case studies
      case "case_studies":
        await handleCustom(
          "Case studies",
          path[1]?.length > 0
            ? document.querySelector<HTMLHeadingElement>("h1").textContent
            : null
        );
        break;
      // Testimonials
      case "testimonials":
        await handleCustom("Testimonials");
        break;
      // Contact sales
      case "contact_sales":
        await handleCustom("Contact sales");
        break;
      // Startpage
      // Unknown
      default:
        presence.setActivity();
        break;
    }
  } else if (host[0] === "status") {
    // IFTTT Status
    switch (path[0]) {
      case "incidents":
        await handleCustom(
          "IFTTT Status - Incident Report",
          document.querySelector<HTMLDivElement>(".incident-name").textContent
        );
        break;
      default:
        await handleStatusPage();
        break;
    }
  } else {
    // Main page
    switch (path[0]) {
      // Applets
      case "applets":
        await handleApplet();
        break;
      // Account settings
      case "settings":
        await handleCustom("Account settings");
        break;
      // Billing
      case "billing":
        await handleCustom("Billing");
        break;
      // My Applets
      case "home":
      case "my_applets":
        await handleCustom("My Applets");
        break;
      // Creating an Applet
      case "create":
        await handleAppletCreation();
        break;
      // Activity
      case "activity":
        await handleCustom("Activity");
        break;
      // My Services
      case "date_and_time":
      case "email":
      case "email_digest":
      case "ifttt":
      case "feed":
      case "space":
      case "weather":
      case "maker_webhooks":
      case "my_services":
        await handleMyServices(
          document.querySelector<HTMLHeadingElement>("h1")?.textContent
        );
        break;
      // Explore
      // Blog entry
      // Search
      case "explore":
      case "search":
        if (
          document.querySelector<HTMLDivElement>(".story-title")?.textContent
        ) {
          await handleBlog(
            document.querySelector<HTMLHeadingElement>("h1").textContent
          );
          return;
        }

        if (
          document.querySelector<HTMLInputElement>("#search")?.value?.length > 0
        ) {
          await handleSearch(
            document.querySelector<HTMLInputElement>("#search").value
          );
          return;
        }

        await handleCustom("Exploring Applets & Services");
        break;
      // Plans
      case "plans":
        await handleCustom("Plans");
        break;
      // Blog
      case "blog":
        await handleBlog();
        break;
      // Developers
      case "developers":
        await handleCustom("Developers");
        break;
      // Contact
      case "contact":
        await handleCustom("Contact");
        break;
      // Trust & Privacy
      case "terms":
        await handleCustom("Privacy Policy & Terms of Use");
        break;
      // Careers
      case "careers":
        await handleCustom("Careers");
        break;
      // Startpage
      // Services
      // Unknown
      default:
        if (document.querySelector<HTMLDivElement>(".brand-section")) {
          await handleSerivce();
          return;
        }

        presence.setActivity();
        break;
    }
  }
});

/**
 * Get Language Strings
 * @returns Language Strings
 */
async function getStrings(): Promise<LangStrings> {
  return presence.getStrings(
    {
      search: "general.searching",
      browsing: "general.browsing",
      reading: "general.reading"
    },
    (await presence.getSetting("lang").catch(() => "en")) as string
  );
}

/**
 * Handle status page
 */
async function handleStatusPage(): Promise<void> {
  let incidents: HTMLDivElement[];

  try {
    incidents = [
      ...(document.querySelector<HTMLDivElement>(".unresolved-incidents")
        .children as unknown as HTMLDivElement[])
    ].filter(e => e.style.display !== "none");
  } catch (e) {
    incidents = [];
  }

  presence.setActivity({
    details: "IFTTT Status",
    state:
      incidents.length > 0 ? `Unresolved incidents: ${incidents.length}` : null,
    largeImageKey: "logo_big"
  });
}

/**
 * Handle help center pages
 * @param path URL path
 */
async function handleHelpCenter(path: string[]): Promise<void> {
  const presenceData: PresenceData = {
    details: "Help Center",
    largeImageKey: "logo_big"
  };

  if (path.length > 2) {
    switch (path[2]) {
      // Articles
      case "articles":
        presenceData.state = "Article: ";
        break;
      // Categories
      case "categories":
        presenceData.state = "Category: ";
        break;
      // Sections
      case "sections":
        presenceData.state = "Section: ";
        break;
      // Unknown
      default:
        presenceData.state = "";
        break;
    }

    const heading = document.querySelector<HTMLHeadingElement>("h1");
    if (heading) presenceData.state += heading.textContent;
  }

  presence.setActivity(presenceData);
}

/**
 * Handle documentation
 */
async function handleDocs(): Promise<void> {
  const chapter = document.querySelector<HTMLHeadingElement>("h1")?.textContent,
    section =
      document.querySelector<HTMLAnchorElement>("a.active")?.textContent;

  presence.setActivity({
    details: "Documentation",
    state: chapter ? `${chapter}${section ? ` - ${section}` : ""}` : null,
    largeImageKey: "logo_big",
    smallImageText: (await strings).reading,
    smallImageKey: "reading"
  });
}

/**
 * Handle applet page
 */
async function handleApplet(): Promise<void> {
  presence.setActivity({
    details: document.querySelector<HTMLHeadingElement>("h1").textContent,
    state: `by ${
      document.querySelector<HTMLSpanElement>(".author").textContent
    }`,
    largeImageKey: "logo_big",
    smallImageText: (await strings).browsing,
    smallImageKey: "reading"
  });
}

/**
 * Handle applet creation
 */
async function handleAppletCreation(): Promise<void> {
  presence.setActivity({
    details: "Creating an Applet",
    state: document.querySelector<HTMLHeadingElement>("h1").textContent,
    largeImageKey: "logo_big"
  });
}

/**
 * Handle service page
 */
async function handleSerivce(): Promise<void> {
  presence.setActivity({
    details: document.querySelector<HTMLHeadingElement>("h1").textContent,
    state: document.querySelector<HTMLImageElement>(".large-service-logo")
      .title,
    largeImageKey: "logo_big",
    smallImageText: (await strings).browsing,
    smallImageKey: "reading"
  });
}

/**
 * Handle search page
 * @param value Search value
 */
async function handleSearch(value: string): Promise<void> {
  presence.setActivity({
    details: "Searching for Applets & Services",
    state: value,
    largeImageKey: "logo_big",
    smallImageText: (await strings).search,
    smallImageKey: "search"
  });
}

/**
 * Handle blog pages
 * @param entry Blog entry name
 */
async function handleBlog(entry?: string): Promise<void> {
  presence.setActivity({
    details: "Blog",
    state: entry,
    largeImageKey: "logo_big"
  });
}

/**
 * Handle my services pages
 * @param category Service category
 */
async function handleMyServices(category?: string): Promise<void> {
  presence.setActivity({
    details: "My Services",
    state: category,
    largeImageKey: "logo_big",
    smallImageText: (await strings).browsing,
    smallImageKey: "reading"
  });
}

/**
 * Handle custom pages
 * @param details Presence details text
 * @param state Presence state text
 */
async function handleCustom(details: string, state?: string): Promise<void> {
  presence.setActivity({
    details,
    state,
    largeImageKey: "logo_big"
  });
}
