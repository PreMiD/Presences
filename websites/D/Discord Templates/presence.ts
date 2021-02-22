const client = new Presence({
    clientId: "717390843358740622"
  }),
  locations: { [k: string]: string } = {
    "/": "Homepage",
    "/templates/top": "Top Templates",
    "/templates/new": "Add New Template",
    "/partners": "Partners",
    "/legal/terms": "Terms of Service",
    "/legal/guidelines": "Guidelines",
    "/legal/privacy": "Privacy Policy",
    "/about": "About Us"
  },
  startTimestamp = Math.floor(Date.now() / 1000);

client.on("UpdateData", async () => {
  const path: string = document.location.pathname,
    commonValues = {
      largeImageKey: "dcst-logo",
      startTimestamp
    },
    showButtons = await client.getSetting("showButtons"),
    showSensitive = await client.getSetting("privacy");

  if (path.includes("/templates/") && !path.includes("templates/top")) {
    let templateName: string | null = document
        .querySelector(".title-container > h1")
        ?.textContent?.trim(),
      string = "Viewing Template",
      buttons = [
        {
          label: "View Template",
          url: `https://discordtemplates.com${path}`
        }
      ];

    if (path.includes("/edit")) {
      string = "Editing a template:";
      templateName = document
        .querySelector("section > div > div > h2")
        ?.textContent?.trim();

      buttons = [
        {
          label: "View Template",
          url: `https://discordtemplates.com${path.replace("/edit", "")}`
        }
      ];
    } else if (path.includes("/new")) {
      string = "Creating New Template";
      templateName = document.querySelector(
        ".template.card > div.card-content > div.media > div.media-content > p"
      )?.textContent;

      buttons = [];
    }

    const object = {
      ...commonValues,
      details: string,
      state: templateName || "Unknown",
      buttons
    };

    if (showSensitive === false) delete object["state"];
    if (showButtons === false || showSensitive === false)
      delete object["buttons"];

    client.setActivity(object);
  } else if (path.includes("/users/")) {
    const userName: string | null = document
        .querySelector("section > div > div > h1")
        ?.textContent?.trim(),
      object: PresenceData = {
        ...commonValues,
        details: "Viewing User",
        state: userName,
        buttons: [
          {
            label: "View User",
            url: `https://discordtemplates.com${path}`
          }
        ]
      };

    if (showSensitive === false) delete object["state"];
    if (showButtons === false || showSensitive === false)
      delete object["buttons"];

    client.setActivity(object);
  } else if (path.includes("/tag/")) {
    const tag: string = document
        .querySelector(".hero-body > .column.is-two-thirds > .is-active")
        ?.textContent?.trim(),
      object = {
        ...commonValues,
        smallImageKey: "search",
        details: "Searching by Tag",
        state: tag
      };

    if (showSensitive === false) delete object["state"];
    client.setActivity(object);
  } else if (path.includes("/search/")) {
    const query: string = decodeURIComponent(path.replace("/search/", "")),
      object = {
        ...commonValues,
        smallImageKey: "search",
        details: "Searching for",
        state: query
      };

    if (showSensitive === false) delete object["state"];
    client.setActivity(object);
  } else if (locations[path] || locations[path.slice(0, -1)]) {
    const object = {
      ...commonValues,
      details: "Viewing Page",
      state: locations[path] || locations[path.slice(0, -1)] || "Unknown"
    };

    if (showSensitive === false) delete object["state"];
    client.setActivity(object);
  } else return client.setActivity();
});
