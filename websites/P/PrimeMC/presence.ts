const presence = new Presence({
    clientId: "630023998767497217" // CLIENT ID FOR YOUR PRESENCE
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let user: HTMLElement, search: HTMLElement, title: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "primemc"
  };

  presenceData.startTimestamp = browsingStamp;
  if (document.location.hostname === "primemc.org") {
    if (document.location.pathname.includes("/threads/")) {
      title = document.querySelector(
        "#top > div.p-body > div > div.uix_titlebar > div > div > div.p-title > h1"
      );
      presenceData.details = "Forums, viewing thread:";
      if (title.innerText.length > 128)
        presenceData.state = `${title.innerText.substring(0, 125)}...`;
      else presenceData.state = title.innerText;

      presenceData.smallImageKey = "reading";
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/trending/")) {
      presenceData.details = "Forums, Viewing the list of";
      presenceData.state = "trending threads";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/play")) {
      presenceData.details = "Play, Viewing the servers";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/vote")) {
      presenceData.details = "Vote, Viewing the voting websites";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/bans")) {
      presenceData.details = "Viewing the ban page";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/profile")) {
      user = document.querySelector(
        "body > div.pagewrapper > div.container > div > div.col-md-2 > div > h2"
      );
      presenceData.details = "Viewing the history of:";
      presenceData.state = user.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (
      document.location.pathname.includes("/whats-new/") &&
      document.location.pathname.includes("/profile-posts")
    ) {
      presenceData.details = "Forums, Viewing the list of";
      presenceData.state = "latest profile posts";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (
      document.location.pathname.includes("/whats-new/") &&
      document.location.pathname.includes("/posts")
    ) {
      presenceData.details = "Forums, Viewing the list of";
      presenceData.state = "latest posts";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (
      document.location.pathname.includes("/whats-new/") &&
      document.location.pathname.includes("/news-feed")
    ) {
      presenceData.details = "Forums, Viewing the";
      presenceData.state = "news feed";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/whats-new/")) {
      presenceData.details = "Forums, Viewing whats new";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/conversations/")) {
      if (document.location.pathname.split("/")[4] !== null) {
        title = document.querySelector(
          "#top > div.p-body > div > div.uix_titlebar > div > div > div.p-title > h1"
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
    } else if (document.location.pathname.includes("/search/")) {
      search = document.querySelector(
        "#top > div.p-body > div > div.uix_titlebar > div > div > div > h1 > a > em"
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
    } else if (document.location.pathname.includes("/account/")) {
      presenceData.details = "Forums, account settings";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/members/")) {
      if (document.URL.includes("key=staff_members")) {
        presenceData.details = "Viewing the list";
        presenceData.state = "of staff members";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (document.URL.includes("key=todays_birthdays")) {
        presenceData.details = "Viewing list of members";
        presenceData.state = "with today as their birthday";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (document.location.pathname.includes("/banned")) {
        presenceData.details = "Viewing the list";
        presenceData.state = "of banned users";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (document.location.pathname.includes("/list")) {
        presenceData.details = "Viewing the list";
        presenceData.state = "of all users";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (document.URL.includes("key=most_likes")) {
        presenceData.details = "Viewing list of members";
        presenceData.state = "with the most reactions";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (document.URL.includes("key=most_messages")) {
        presenceData.details = "Viewing list of members";
        presenceData.state = "with the most messages";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (
        document.querySelector(
          "#top > div.p-body > div > div > div > div.p-body-content > div > div.block > div > div > div > div > div > h1 > span > span"
        ) !== null
      ) {
        user = document.querySelector(
          "#top > div.p-body > div > div > div > div.p-body-content > div > div.block > div > div > div > div > div > h1 > span > span"
        );
        presenceData.details = "Viewing user:";
        presenceData.state = user.innerText;

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (
        document.querySelector(
          "#top > div.p-body > div > div > div > div.p-body-content > div > div.block > div > div > div > div > div > h1 > span"
        ) !== null
      ) {
        user = document.querySelector(
          "#top > div.p-body > div > div > div > div.p-body-content > div > div.block > div > div > div > div > div > h1 > span"
        );
        presenceData.details = "Viewing user:";
        presenceData.state = user.innerText;

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Viewing overview of members";
        delete presenceData.state;

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      }
    } else if (document.location.pathname.includes("/forums/")) {
      title = document.querySelector(
        "#top > div.p-body > div > div.uix_titlebar > div > div > div > h1"
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
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else if (document.location.hostname === "buy.primemc.org") {
    title = document.querySelector("head > title");
    presenceData.details = "Store, viewing:";
    presenceData.state = title.innerText.replace(" | Prime Network", "");

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
