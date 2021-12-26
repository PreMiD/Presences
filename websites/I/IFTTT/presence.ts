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
  const host = window.location.hostname,
    path = window.location.pathname.split("/").slice(1);

  if (host === "ift.tt") {
    // IFTTT URL Shortener (for the Help Center)
    presence.setActivity();
  } else if (host === "help.ifttt.com") {
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
  } else if (host === "platform.ifttt.com") {
    // IFTTT for Businesses / Developers
    switch (path[0]) {
      // Documentation
      case "docs":
        await handleDocs();
        break;
      // Developer spotlight
      case "blog":
        presence.setActivity({
          details: "Developer spotlight",
          state:
            path[1]?.length > 0
              ? document.querySelector<HTMLHeadingElement>("h1").textContent
              : null,
          largeImageKey: "logo_big"
        });
        break;
      // Solutions
      case "solutions":
        presence.setActivity({
          details: "Solutions",
          state:
            path[1]?.length > 0
              ? document.querySelector<HTMLHeadingElement>("h3").textContent
              : null,
          largeImageKey: "logo_big"
        });
        break;
      // Case studies
      case "case_studies":
        presence.setActivity({
          details: "Case studies",
          state:
            path[1]?.length > 0
              ? document.querySelector<HTMLHeadingElement>("h1").textContent
              : null,
          largeImageKey: "logo_big"
        });
        break;
      // Testimonials
      case "testimonials":
        presence.setActivity({
          details: "Testimonials",
          largeImageKey: "logo_big"
        });
        break;
      // Contact sales
      case "contact_sales":
        presence.setActivity({
          details: "Contact sales",
          largeImageKey: "logo_big"
        });
        break;
      // Startpage
      // Unknown
      default:
        presence.setActivity();
        break;
    }
  } else if (host === "status.ifttt.com") {
    // IFTTT Status
    switch (path[0]) {
      // Incidents
      case "incidents":
        presence.setActivity({
          details: "IFTTT Status - Incident Report",
          state:
            document.querySelector<HTMLDivElement>(".incident-name")
              .textContent,
          largeImageKey: "logo_big"
        });
        break;
      // Startpage
      // Unknown
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
        presence.setActivity({
          details: "Account settings",
          largeImageKey: "logo_big"
        });
        break;
      // Billing
      case "billing":
        presence.setActivity({
          details: "Billing",
          largeImageKey: "logo_big"
        });
        break;
      // My Applets
      case "home":
      case "my_applets":
        presence.setActivity({
          details: "My Applets",
          largeImageKey: "logo_big"
        });
        break;
      // Creating an Applet
      case "create":
        await handleAppletCreation();
        break;
      // Activity
      case "activity":
        presence.setActivity({
          details: "Activity",
          largeImageKey: "logo_big"
        });
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

        presence.setActivity({
          details: "Exploring Applets & Services",
          largeImageKey: "logo_big"
        });
        break;
      // Plans
      case "plans":
        presence.setActivity({
          details: "Plans",
          largeImageKey: "logo_big"
        });
        break;
      // Blog
      case "blog":
        await handleBlog();
        break;
      // Developers
      case "developers":
        presence.setActivity({
          details: "Developers",
          largeImageKey: "logo_big"
        });
        break;
      // Contact
      case "contact":
        presence.setActivity({
          details: "Contact",
          largeImageKey: "logo_big"
        });
        break;
      // Trust & Privacy
      case "terms":
        presence.setActivity({
          details: "Privacy Policy & Terms of Use",
          largeImageKey: "logo_big"
        });
        break;
      // Careers
      case "careers":
        presence.setActivity({
          details: "Careers",
          largeImageKey: "logo_big"
        });
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
