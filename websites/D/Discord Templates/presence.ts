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
    "/about": "About Us"
  };

client.on("UpdateData", () => {
  const path: string = document.location.pathname;

  if (path.includes("/templates/") && !path.includes("templates/top")) {
    let templateName: string | null = document.querySelector(
        "section > div > div > h1"
      )?.textContent,
      string = "Viewing a template:";

    if (path.includes("/edit")) {
      string = "Editing a template:";
      templateName = document.querySelector("section > div > div > h2")
        ?.textContent;
    } else if (path.includes("/new")) {
      string = "Creating new template:";
      templateName = document.querySelector(
        "div.preview-card.template.card > div.card-content > div.media > div.media-content > p"
      )?.textContent;
    }

    client.setActivity({
      largeImageKey: "dcst-logo",
      startTimestamp: Date.now(),
      details: string,
      state: templateName || "Unknown"
    });
  } else if (path.includes("/user/")) {
    const userName: string | null = document.querySelector(
      "section > div > div > h1"
    )?.textContent;

    client.setActivity({
      largeImageKey: "dcst-logo",
      startTimestamp: Date.now(),
      details: "Viewing a user:",
      state: userName
    });
  } else if (path.includes("/tag/")) {
    let tag: string = document.location.href.replace(
      "https://discordtemplates.com/tag/",
      ""
    );
    tag = tag[0].toUpperCase() + tag.slice(1, tag.length).toLowerCase();

    client.setActivity({
      largeImageKey: "dcst-logo",
      smallImageKey: "search",
      startTimestamp: Date.now(),
      details: "Searching by tag:",
      state: tag
    });
  } else if (path.includes("/search/")) {
    const query: string = decodeURIComponent(
      document.location.href.replace("https://discordtemplates.com/search/", "")
    );

    client.setActivity({
      largeImageKey: "dcst-logo",
      smallImageKey: "search",
      startTimestamp: Date.now(),
      details: "Searching for:",
      state: query
    });
  } else if (locations[path] || locations[path.slice(0, -1)])
    client.setActivity({
      largeImageKey: "dcst-logo",
      startTimestamp: Date.now(),
      details: "Viewing page:",
      state: locations[path] || locations[path.slice(0, -1)] || "Unknown"
    });
  else return client.setActivity();
});
