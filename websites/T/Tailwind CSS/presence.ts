const Tailwind = new Presence({ clientId: "818756651279450144" });

Tailwind.on("UpdateData", async () => {
  const path = location.pathname,
    subdomain = location.host.split(".")[0],
    presenceData: PresenceData = {
      largeImageKey: "tailwind-logo",
      startTimestamp: Math.round(Date.now() / 1000)
    };

  if (location.host === "tailwindui.com") {
    presenceData.details = "Viewing page:";
    if (path.includes("/components")) {
      if (path.includes("/components/")) {
        const pathnames = location.pathname.split("/"),
          category = pathnames[pathnames.length - 2]
            .replace(/-/g, " ")
            .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());

        presenceData.details = "Viewing component:";
        presenceData.state = `${category} - ${
          document.querySelector("main .max-w-8xl h2")?.textContent ||
          "Unknown component"
        }`;
      } else {
        presenceData.details = "Browsing components";
        presenceData.smallImageKey = "search";
      }
    } else if (path === "/pricing") {
      presenceData.state = "Tailwind UI - Pricing";
    } else if (path === "/login") {
      presenceData.state = "Tailwind UI - Login";
    } else if (path === "/") {
      presenceData.state = "Tailwind UI - Home";
    }
  } else if (subdomain === "blog") {
    if (path !== "/") {
      presenceData.details = "Reading an article:";
      presenceData.state =
        document.querySelector("article header div div h1")?.textContent ||
        "Unknown article";
      presenceData.smallImageKey = "reading";
    } else {
      presenceData.details = "Browsing articles";
      presenceData.smallImageKey = "search";
    }
  } else if (subdomain === "play") {
    presenceData.details = "In Tailwind Play";
  } else if (path.includes("/docs")) {
    presenceData.details = "Viewing documentation";
    presenceData.state =
      document.querySelector("#content-wrapper div h1")?.textContent ||
      "Unknown page";
  } else if (path === "/") {
    presenceData.details = "Viewing homepage";
  } else if (path === "/resources") {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Resources";
  } else {
    presenceData.details = "Viewing an unknown page";
  }
  Tailwind.setActivity(presenceData);
});
