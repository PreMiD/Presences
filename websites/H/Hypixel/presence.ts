const presence = new Presence({
    clientId: "629093766170411014"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let user: HTMLElement, search: HTMLInputElement, title: HTMLElement | string;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "hypixel"
  };

  presenceData.startTimestamp = browsingStamp;
  if (document.location.hostname === "hypixel.net") {
    title = document.querySelector<HTMLElement>(
      "#headerFix > div.hypixel_titleWrapper > div > div > h1 > nav > fieldset > span > span > a > span"
    );
    if (document.location.pathname.includes("/threads/")) {
      title = document.querySelector<HTMLElement>(
        "#headerFix > div.hypixel_titleWrapper > div > div > h1"
      );
      search = document.querySelector(
        "#headerFix > div.hypixel_titleWrapper > div > div > h1 > nav"
      );
      title = title.innerText.replace(search.innerText, "").replace("»", "");
      presenceData.details = "Forums, viewing thread:";
      if (title.length > 128)
        presenceData.state = `${title.substring(0, 125)}...`;
      else presenceData.state = title;

      delete presenceData.smallImageKey;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/forums/")) {
      title = document.querySelector<HTMLElement>(
        "#headerFix > div.hypixel_titleWrapper > div > div > h1"
      );
      if (title !== null) {
        title = document.querySelector<HTMLElement>(
          "#headerFix > div.hypixel_titleWrapper > div > div > h1"
        );
        search = document.querySelector(
          "#headerFix > div.hypixel_titleWrapper > div > div > h1 > nav"
        );
        title = title.innerText.replace(search.innerText, "").replace("»", "");
        presenceData.details = "Forums, viewing category:";
        presenceData.state = title;

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Forums, Browsing...";
        delete presenceData.state;

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      }
    } else if (
      document.location.pathname.includes("/find-new/") &&
      document.location.pathname.includes("/profile-posts")
    ) {
      presenceData.details = "Forums, Viewing the list of";
      presenceData.state = "latest profile posts";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (
      document.location.pathname.includes("/find-new/") &&
      document.location.pathname.includes("/posts")
    ) {
      presenceData.details = "Forums, Viewing the list of";
      presenceData.state = "latest posts";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (
      document.location.pathname.includes("/find-new/") &&
      document.location.pathname.includes("/media")
    ) {
      presenceData.details = "Forums, Viewing the list of";
      presenceData.state = "latest media posts";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/search/")) {
      search = document.querySelector(
        "#headerFix > div.hypixel_titleWrapper > div > div > h1 > a > em"
      );
      if (search !== null) {
        presenceData.details = "Forums, searching for:";
        presenceData.state = search.innerText;

        presenceData.smallImageKey = "search";

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Forums, about to search";
        presenceData.state = "something up";

        presenceData.smallImageKey = "search";

        presence.setActivity(presenceData);
      }
    } else if (document.location.pathname.includes("/members/")) {
      user = document.querySelector(
        "#content > div > div > div.mainContainer_noSidebar > div > div.mainProfileColumn > div > div > h1"
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
    } else if (document.location.pathname.includes("/watched/")) {
      if (document.location.pathname.includes("/threads")) {
        presenceData.details = "Forums, Viewing their";
        presenceData.state = "watched threads";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Forums, Viewing their";
        presenceData.state = "watched forums";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      }
    } else if (document.location.pathname.includes("/media/")) {
      if (
        document.querySelector(
          "#content > div > div > div.uix_contentFix > div > div > div.mediaAttribution > h1"
        ) !== null
      ) {
        title = document.querySelector<HTMLElement>(
          "#content > div > div > div.uix_contentFix > div > div > div.mediaAttribution > h1"
        );
        presenceData.details = "Media, Viewing post:";
        presenceData.state = title.innerText;

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (document.location.pathname.includes("/categories/")) {
        title = document.querySelector<HTMLElement>(
          "#headerFix > div.hypixel_titleWrapper > div > div > h1"
        );
        search = document.querySelector(
          "#headerFix > div.hypixel_titleWrapper > div > div > h1 > nav"
        );
        title = title.innerText.replace(search.innerText, "").replace("»", "");
        presenceData.details = "Media, Viewing category:";
        presenceData.state = title;

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Media, Browsing...";
        delete presenceData.state;

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      }
    } else if (document.location.pathname.includes("/conversations/")) {
      if (
        document.querySelector(
          "#headerFix > div.hypixel_titleWrapper > div > div > h1"
        ) !== null
      ) {
        title = document.querySelector<HTMLElement>(
          "#headerFix > div.hypixel_titleWrapper > div > div > h1"
        );
        search = document.querySelector(
          "#headerFix > div.hypixel_titleWrapper > div > div > h1 > nav"
        );
        title = title.innerText.replace(search.innerText, "").replace("»", "");
        presenceData.details = "Forums, Reading DM:";
        if (title.length > 128)
          presenceData.state = `${title.substring(0, 125)}...`;
        else presenceData.state = title;

        presenceData.smallImageKey = "reading";

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Forums, Browsing";
        presenceData.state = "through their DMs";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      }
    } else if (document.location.pathname.includes("/players/")) {
      presenceData.details = "Leaderboards, Browsing...";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/player/")) {
      user = document.querySelector(
        "#headerFix > div.hypixel_titleWrapper.shiftedTitle > div > div > h1 > nav > fieldset > span > span:nth-child(2) > a > span"
      );
      presenceData.details = "Players, Viewing:";
      presenceData.state = user.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/play/")) {
      presenceData.details = "At: Play on Hypixel";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/rules/")) {
      presenceData.details = "Viewing the rules";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/jobs/")) {
      presenceData.details = "Viewing the jobs";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/help/")) {
      presenceData.details = "Help, viewing:";
      title = document.querySelector<HTMLElement>(
        "#headerFix > div.hypixel_titleWrapper > div > div > h1"
      );
      search = document.querySelector(
        "#headerFix > div.hypixel_titleWrapper > div > div > h1 > nav"
      );
      title = title.innerText.replace(search.innerText, "").replace("»", "");
      presenceData.state = title;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/leaderboard")) {
      title = document.querySelector<HTMLElement>(
        "#headerFix > div.hypixel_titleWrapper > div > div > h1"
      );
      search = document.querySelector(
        "#headerFix > div.hypixel_titleWrapper > div > div > h1 > nav"
      );
      title = title.innerText
        .replace(search.innerText, "")
        .replace("»", "")
        .replace(" - Leaderboard", "");
      presenceData.details = "Leaderboards, Viewing:";
      presenceData.state = title;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (title !== null && title.innerText === "Games") {
      title = document.querySelector<HTMLElement>(
        "#headerFix > div.hypixel_titleWrapper > div > div > h1"
      );
      search = document.querySelector(
        "#headerFix > div.hypixel_titleWrapper > div > div > h1 > nav"
      );
      title = title.innerText.replace(search.innerText, "").replace("»", "");
      presenceData.details = "Viewing game:";
      presenceData.state = title;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else if (document.location.hostname === "support.hypixel.net") {
    presenceData.details = "Support Center";
    delete presenceData.state;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (document.location.hostname === "store.hypixel.net") {
    title = document.querySelector<HTMLElement>("head > title");
    presenceData.details = "Store, viewing:";
    presenceData.state = title.innerText.replace("Hypixel Server Store | ", "");

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
