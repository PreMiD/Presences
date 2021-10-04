const presence = new Presence({
    clientId: "625795936286932993"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let user: HTMLElement, search: HTMLElement, title: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "spigot"
  };

  presenceData.startTimestamp = browsingStamp;
  if (document.location.hostname === "www.spigotmc.org") {
    if (document.location.pathname.includes("/threads/")) {
      title = document.querySelector(
        "#content > div > div > div.mainContainer_noSidebar > div > div.titleBar > h1"
      );
      if (title === null) {
        title = document.querySelector(
          "#content > div > div > div.mainContainer_noSidebar > div > div.resourceInfo > h1"
        );
        presenceData.details = "Forums, viewing thread:";
        if (title.innerText.length > 128)
          presenceData.state = `${title.innerText.substring(0, 125)}...`;
        else presenceData.state = title.innerText;

        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Forums, viewing thread:";
        if (title.innerText.length > 128)
          presenceData.state = `${title.innerText.substring(0, 125)}...`;
        else presenceData.state = title.innerText;

        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
      }
    } else if (document.location.pathname.includes("/forums/")) {
      title = document.querySelector(
        "#content > div > div > div.mainContainer_noSidebar > div > div.titleBar > h1"
      );
      if (title !== null) {
        presenceData.details = "Forums, viewing category:";
        presenceData.state = title.innerText;

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Forums, Browsing...";
        delete presenceData.state;

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      }
    } else if (document.location.pathname.includes("/search/")) {
      search = document.querySelector(
        "#content > div > div > div.uix_contentFix > div > div > div.titleBar > h1 > a > em"
      );
      presenceData.details = "Forums, searching for:";
      presenceData.state = search.innerText;

      presenceData.smallImageKey = "search";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/members/")) {
      user = document.querySelector(
        "#content > div > div > div.mainContainer_noSidebar > div > div > div.mainProfileColumn > div > div > h1"
      );
      presenceData.details = "Forums, viewing user:";
      presenceData.state = user.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/XenStaff/")) {
      presenceData.details = "Forums, viewing staff list";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/account/")) {
      presenceData.details = "Forums, account settings";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/wiki/")) {
      title = document.querySelector(
        "#content > div > div > div.uix_contentFix > div > div > div.titleBar > h1"
      );
      presenceData.details = "Wiki, viewing:";
      presenceData.state = title.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/irc/")) {
      presenceData.details = "Spigot IRC";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/resources/")) {
      if (document.querySelector("#divResourcesFround") !== null) {
        search = document.querySelector("#divResourcesFround");
        if (search.innerText !== "Resources Found: 0") {
          presenceData.details = "Using SpigotSearchEngine:";
          presenceData.state = search.innerText;

          presenceData.smallImageKey = "search";

          presence.setActivity(presenceData);
        } else {
          presenceData.details = "Resources, Browsing...";
          delete presenceData.state;

          delete presenceData.smallImageKey;

          presence.setActivity(presenceData);
        }
      } else if (document.location.pathname.includes("/authors/")) {
        title = document.querySelector(
          "#authorStats > div > dl.authorName > dd > a"
        );
        presenceData.details = "Resources, Viewing author:";
        presenceData.state = title.innerText;

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (document.location.pathname.includes("/categories/")) {
        title = document.querySelector(
          "#content > div > div > div.mainContainer_noSidebar > div > div.titleBar > h1"
        );
        presenceData.details = "Resources, Viewing category:";
        presenceData.state = title.innerText;

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (
        document.querySelector(
          "#content > div > div > div.uix_contentFix > div > div > div.resourceInfo > h1"
        ) !== null
      ) {
        title = document.querySelector(
          "#content > div > div > div.uix_contentFix > div > div > div.resourceInfo > h1"
        );
        presenceData.details = "Resources, Viewing:";
        if (title.innerText.length > 128)
          presenceData.state = `${title.innerText.substring(0, 125)}...`;
        else presenceData.state = title.innerText;

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (document.location.pathname.includes("/edit")) {
        presenceData.details = "Resources, Doing an edit...";
        delete presenceData.state;

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Resources, Browsing...";
        delete presenceData.state;

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      }
    } else if (document.location.pathname.includes("/conversations/")) {
      if (
        document.querySelector(
          "#content > div > div > div.uix_contentFix > div > div > div.titleBar > h1"
        ) !== null
      ) {
        title = document.querySelector(
          "#content > div > div > div.uix_contentFix > div > div > div.titleBar > h1"
        );
        presenceData.details = "Forums, Reading DM:";
        if (title.innerText.length > 128)
          presenceData.state = `${title.innerText.substring(0, 125)}...`;
        else presenceData.state = title.innerText;

        presenceData.smallImageKey = "reading";

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Forums, Browsing";
        presenceData.state = "through their DMs";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      }
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else if (document.location.hostname === "irc.spi.gt") {
    presenceData.details = "Spigot IRC";
    delete presenceData.state;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (document.location.hostname === "hub.spigotmc.org") {
    if (document.location.pathname === "/") {
      title = document.querySelector("head > title");
      presenceData.details = "Spigot Developer Hub";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else {
      title = document.querySelector("head > title");
      presenceData.details = "Spigot Developer Hub";
      presenceData.state = title.innerText.replace(" · hub.spigotmc.org", "");

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    }
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
