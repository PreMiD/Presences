const presence = new Presence({
    clientId: "843731213893107713"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async function () {
  const setting = {
      timeElapsed: await presence.getSetting("timeElapsed"),
      showButtons: await presence.getSetting("showButtons")
    },
    urlpath = window.location.pathname.split("/"),
    presenceData: PresenceData = {
      largeImageKey: "logo"
    };

  if (setting.timeElapsed) presenceData.startTimestamp = browsingStamp;

  if (document.location.host === "www.wizardingworld.com") {
    if (!urlpath[1]) presenceData.details = "Home";
    else if (urlpath[1] === "news" || urlpath[1] === "features") {
      presenceData.details = urlpath[1] === "news" ? "News" : "Features";

      if (urlpath[2]) {
        presenceData.state =
          document.querySelector("h1.ArticleHero_title__cOam6")?.textContent ||
          "Unknown";

        if (setting.showButtons) {
          presenceData.buttons = [
            {
              label: "View Article",
              url: window.location.href
            }
          ];
        }
      }
    } else if (urlpath[1] === "quiz") {
      presenceData.details = "Quiz";

      if (urlpath[2]) {
        presenceData.state =
          document.querySelector("h1.ArticleHero_title__cOam6")?.textContent ||
          "Unknown";

        if (setting.showButtons) {
          presenceData.buttons = [
            {
              label: "View Quiz",
              url: window.location.href
            }
          ];
        }
      }
    } else if (urlpath[1] === "writing-by-jk-rowling") {
      presenceData.details = "J.K. Rowling Originals";

      if (urlpath[2]) {
        const post = document.querySelector("h1.ArticleHero_title__cOam6"),
          label =
            post?.textContent.length >= 15
              ? post?.textContent.substring(0, 15) + "..."
              : post?.textContent;

        presenceData.state = post?.textContent || "Unknown";

        if (setting.showButtons && post) {
          presenceData.buttons = [
            {
              label: `View: ${label}`,
              url: window.location.href
            }
          ];
        }
      }
    } else if (urlpath[1] === "discover") {
      presenceData.details = "Discover";

      if (
        urlpath[2] === "books" ||
        urlpath[2] === "films" ||
        urlpath[2] === "portkey-games" ||
        urlpath[2] === "on-stage" ||
        urlpath[2] === "experiences"
      ) {
        if (urlpath[3]) {
          let ctopic = "Loading...";

          presenceData.state =
            document.querySelector("h1.Header_productName__8oV2G")
              ?.textContent || "Unknown";

          if (urlpath[2] === "books") ctopic = "Book";
          else if (urlpath[2] === "films") ctopic = "Film";
          else if (urlpath[2] === "portkey-games") ctopic = "Game";
          else if (urlpath[2] === "experiences") ctopic = "Experience";

          if (setting.showButtons && urlpath[2] !== "on-stage") {
            presenceData.buttons = [
              {
                label: `View ${ctopic}`,
                url: window.location.href
              }
            ];
          }
        } else
          presenceData.state =
            document.querySelector("h1.DiscoverListHeader_header__3ivqr")
              ?.textContent || "Unknown";
      }
    } else if (urlpath[1] === "collections") {
      presenceData.details = "Collections";

      if (urlpath[2]) {
        presenceData.state =
          document.querySelector("h1.CollectionHero_header__3rDGu")
            ?.textContent || "Unknown";

        if (setting.showButtons) {
          presenceData.buttons = [
            {
              label: "View Collection",
              url: window.location.href
            }
          ];
        }
      }
    } else if (urlpath[1] === "harry-potter-fan-club")
      presenceData.details = "Fan Club";
    else presenceData.details = "Other";
  } else if (document.location.host === "my.wizardingworld.com") {
    if (urlpath[1] === "passport") presenceData.details = "Passport";

    if (document.querySelector("span.HogwartsHouse_houseName__CykI1")) {
      presenceData.smallImageKey = document
        .querySelector("span.HogwartsHouse_houseName__CykI1")
        ?.textContent.toLocaleLowerCase();
      presenceData.smallImageText = document.querySelector(
        "span.HogwartsHouse_houseName__CykI1"
      )?.textContent;
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
