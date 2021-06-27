const presence = new Presence({
    clientId: "837833278777065503"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

/**
 * Replaces "-" with " ", optional first letter of every word in uppercase (the first letter will be always uppercase)
 * @param input Input replacing "-" with " "; First letter always uppercase
 * @param everyFirstLetterUppercase If true, first letter of each word is capitalized
 * @returns {string}
 * @example // (false) "terms-of-service" -> "Terms of service"; (true) "rift-s" -> "Rift S"
 */
function splitOnDashes(input: string, everyFirstLetterUppercase = false) {
  return input
    .split("-")
    .map((s, i) =>
      i === 0 || everyFirstLetterUppercase
        ? s.charAt(0).toUpperCase() + s.slice(1)
        : s
    )
    .join(" ");
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "oculus-logo3",
      startTimestamp: browsingStamp
    },
    hostName = document.location.hostname.replace("www.", ""),
    path = window.location.pathname.split("/").slice(1),
    showButtons: boolean = await presence.getSetting("buttons"),
    showTimestamp: boolean = await presence.getSetting("timestamp");

  switch (hostName) {
    // Support pages
    case "support.oculus.com": {
      presenceData.details = "Viewing support page:";
      if (path[0] === "" || !path[0]) presenceData.state = "Home";
      else {
        // Gets the biggest title of page
        const article =
          document.querySelector("h1")?.textContent ||
          document.querySelector("h2")?.textContent ||
          document.querySelector("h4")?.textContent;
        if (article) {
          presenceData.state =
            article.length > 128 ? `${article.slice(0, 125)}...` : article;
          presenceData.buttons = [
            {
              label: "Open article",
              url: `https://${hostName}/${path[0]}`
            }
          ];
        } else presenceData.state = "Unknown article";
      }
      break;
    }

    // Main pages
    case "oculus.com": {
      // Hompage
      if (path[0] === "" || !path[0])
        presenceData.details = "Viewing home page";
      else {
        switch (path[0]) {
          case "legal": {
            presenceData.smallImageKey = "reading";
            presenceData.smallImageText = "Reading";
            presenceData.details = splitOnDashes(path[1]);
            break;
          }

          // Specific headsets
          case "quest":
          case "quest-2":
          case "go":
          case "rift":
          case "rift-s": {
            presenceData.details = "Viewing the page:";
            if (path[1] === "accessories") {
              presenceData.state = `Accessories for ${splitOnDashes(
                path[0],
                true
              )}`;
            } else presenceData.state = splitOnDashes(path[0], true);
            break;
          }
          case "accessories": {
            presenceData.details = "Viewing the accessory:";
            presenceData.state = splitOnDashes(path[1]);
            break;
          }
          case "cart": {
            presenceData.details = "Viewing the page:";
            presenceData.state = "Cart";
            break;
          }
          case "compare": {
            presenceData.details = "Viewing the page:";
            presenceData.state = "Compare headsets";
            break;
          }
          case "vr-for-good": {
            presenceData.details = "Viewing the page:";
            presenceData.state = "VR for good";
            break;
          }
          case "safety-center": {
            presenceData.details = "Viewing safety center";
            if (path[1])
              presenceData.state = `For ${splitOnDashes(path[1], true)}`;
            break;
          }

          // Blogs
          case "blog": {
            // All blogs
            if (!path[1]) presenceData.details = "Viewing all blogs";
            // Viewing a blog
            else {
              presenceData.details = "Reading blog:";
              let blog = document.querySelector("#blog-heading")?.textContent;
              if (blog?.length > 128) blog = `${blog.slice(0, 125)}...`;
              presenceData.state = blog ?? "Unknown blog";
              presenceData.buttons = [
                {
                  label: "Read blog post",
                  url: `https://${hostName}/${path[0]}/${path[1]}`
                }
              ];
            }
            break;
          }

          // Store pages
          case "experiences": {
            presenceData.details = `Store for ${splitOnDashes(path[1], true)}`;
            presenceData.smallImageKey = `${path[1]}`;
            presenceData.smallImageText = splitOnDashes(path[1], true);
            presenceData.buttons = [
              {
                label: "View store",
                url: `https://${hostName}/${path[0]}`
              }
            ];

            // Store home page
            if (path[2] === "" || !path[2]) presenceData.state = "Home";
            // Section aka showcases
            else if (path[2] === "section") {
              const showCase = document.getElementsByClassName(
                "section-header__title"
              )[0]?.textContent;
              presenceData.state = `Showcase: ${showCase ?? "Loading..."}`;
              presenceData.buttons.push({
                label: "View showcase",
                url: `https://${hostName}/${path[0]}/${path[1]}/${path[2]}/${path[3]}`
              });

              // Developer posts
            } else if (path[2] === "developer-post") {
              const title =
                document.querySelector("_9cq4")?.textContent ??
                "Unknown dev-post";
              presenceData.state = `Dev-post: ${
                title.length > 118 ? `${title.slice(0, 115)}...` : title
              }`;
              presenceData.buttons.push({
                label: "Read dev-post",
                url: `https://${hostName}/${path[0]}/${path[1]}/${path[2]}/${path[3]}`
              });

              // Searching
            } else if (path[2] === "search") {
              const searchText = document.querySelector(
                "disco-search__query"
              )?.textContent;
              presenceData.state = `Searching for: ${searchText}`;
              presenceData.smallImageKey = "search";

              // Bundles
            } else if (
              document.querySelector("div.bundle-detail-page__description > h1")
                ?.textContent
            ) {
              const bundle = document.querySelector(
                "div.bundle-detail-page__description > h1"
              )?.textContent;
              presenceData.state = `Bundle: ${bundle ?? "Loading..."}`;
              presenceData.buttons.push({
                label: "View bundle",
                url: `https://${hostName}/${path[0]}/${path[1]}/${path[2]}`
              });

              // Games
            } else {
              const game = document.getElementsByClassName(
                "app-description__title"
              )[0]?.textContent;
              presenceData.state = `Game: ${game ?? "Loading..."}`;
              presenceData.buttons.push({
                label: "View game",
                url: `https://${hostName}/${path[0]}/${path[1]}/${path[2]}`
              });
            }
            break;
          }
          case "research": {
            presenceData.details = "Viewing the page:";
            presenceData.state = "Research";
            break;
          }
          case "careers": {
            presenceData.details = "Viewing the page:";
            presenceData.state = "Career";
            break;
          }
          default: {
            presenceData.details = "Viewing the page:";
            presenceData.state = "Unknown page";
            break;
          }
        }
      }
      break;
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    // Delete button(s) / timestamp relating to the setting
    if (presenceData.buttons && !showButtons) delete presenceData.buttons;
    if (!showTimestamp) delete presenceData.startTimestamp;
    presence.setActivity(presenceData);
  }
});
