const Blockbench = new Presence({
    clientId: "821260466395152415"
  }),
  pages: { [x: string]: string } = {
    "/": "Home",
    "/quickstart/": "Quickstart",
    "/blog/": "Blog",
    "/faq/": "FAQ",
    "/donate/": "Donate",
    "/about/": "About",
    "/hub/": "Other Projects",
    "/downloads/": "Downloads"
  },
  startTimestamp = Math.round(Date.now() / 1000);

Blockbench.on("UpdateData", async () => {
  const page = location.pathname,
    presenceData: PresenceData = {
      largeImageKey: "blockbench-logo",
      startTimestamp
    },
    header = document.querySelector(
      ".type-post .page-header .entry-title"
    )?.textContent,
    sub = location.host.split(".")[0];
  if (sub === "web") {
    const activity =
        document
          .querySelector("#main_toolbar #mode_selector li.selected")
          ?.textContent.toLowerCase() || "Unknown",
      modelType = document.querySelectorAll<HTMLElement>(
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
      case "start":
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
  } else if (header) {
    presenceData.details = "Reading a blog post:";
    presenceData.smallImageKey = "reading";
    presenceData.state = header;
  } else if (pages[page]) {
    presenceData.details = `Looking at the ${pages[page]} page`;
  }
  Blockbench.setActivity(presenceData);
});
