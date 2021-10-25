const Blockbench = new Presence({
    clientId: "901821070263336971"
  }),
  pages: Record<string, string> = {
    "/": "Home",
    "/downloads": "Downloads",
    "/quickstart": "Quickstart",
    "/plugins": "Plugins",
    "/wiki": "Wiki",
    "/about": "About",
    "/imprint": "Imprint",
    "/privacy-policy": "Privacy Policy"
  },
  startTimestamp = Math.round(Date.now() / 1000);

Blockbench.on("UpdateData", async () => {
  const page = location.pathname,
    presenceData: PresenceData = {
      largeImageKey: "blockbench-logo",
      startTimestamp
    },
    [sub] = location.host.split("."),
    pluginHeader = document.querySelector(
      "#content_wrapper > div > div > h2"
    )?.textContent;

  if (sub === "web") {
    const activity =
        document
          .querySelector("#main_toolbar #mode_selector li.selected")
          ?.textContent.toLowerCase() || "Unknown",
      modelType = document.querySelectorAll<HTMLDivElement>(
        "#page_wrapper #status_bar div[title]:not(.f_left)"
      )[1]?.title;

    switch (modelType?.toLowerCase()) {
      case "generic model":
        presenceData.smallImageKey = "generic";
        break;
      case "java block/item":
        presenceData.smallImageKey = "block-item";
        break;
      case "bedrock model":
        presenceData.smallImageKey = "bedrock";
        break;
      case "modded entity":
        presenceData.smallImageKey = "modded";
        break;
      case "optifine entity":
        presenceData.smallImageKey = "optifine";
        break;
      case "minecraft skin":
        presenceData.smallImageKey = "skin";
        break;
      default:
        break;
    }

    presenceData.details = "Web App";
    switch (activity) {
      case "Unknown":
        presenceData.state = "Just started";
        break;
      case "edit":
        presenceData.state = `Editing a ${modelType}`;
        break;
      case "paint":
        presenceData.state = `Painting a ${modelType}`;
        break;
      case "animate":
        presenceData.state = `Animating a ${modelType}`;
        break;
      default:
        presenceData.state = "Unknown activity";
    }
  } else if (page.includes("/plugins") && pluginHeader) {
    presenceData.details = "Looking at a plugin:";
    presenceData.state = pluginHeader;
    presenceData.buttons = [{ label: "View Plugin", url: location.href }];
  } else if (page.includes("/wiki")) {
    const wikiHeader =
      document.querySelector(
        "#wiki_wrapper div.content > div.nuxt-content > h1"
      )?.textContent ||
      document.querySelector("#wiki_wrapper div.content > h1")?.textContent;

    presenceData.details = "Blockbench Wiki";
    presenceData.smallImageKey = "reading";
    presenceData.smallImageText = "Reading";
    presenceData.state = wikiHeader || "Unknown Wiki Page";
    presenceData.buttons = [{ label: "Read Wiki", url: location.href }];
  } else if (pages[page])
    presenceData.details = `Looking at the ${pages[page]} page`;

  Blockbench.setActivity(presenceData);
});
