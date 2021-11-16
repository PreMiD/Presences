const presence = new Presence({
    clientId: "639568013590528030"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let user: HTMLElement, title: HTMLElement, search: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "bs"
  };

  if (document.location.hostname === "bs.to") {
    if (document.location.pathname === "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing home page";
    } else if (document.location.pathname.includes("/serie/")) {
      presenceData.startTimestamp = browsingStamp;
      user = document.querySelector("#sp_left > h2");
      presenceData.details = "Viewing serie:";
      presenceData.state = user.innerText;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/andere-serien")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing all series";
    } else if (document.location.pathname.includes("/search")) {
      search = document.querySelector(
        "#root > section > form > fieldset > label:nth-child(1) > input[type=text]"
      );
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Searching for:";
      presenceData.state = (search as HTMLInputElement).value;
      presenceData.smallImageKey = "search";
    }
  } else if (document.location.hostname === "board.bs.to") {
    if (document.URL.includes("/topic/")) {
      title = document.querySelector(
        "#ipsLayout_mainArea > div.ipsPageHeader.ipsClearfix > div.ipsPhotoPanel.ipsPhotoPanel_small.ipsPhotoPanel_notPhone.ipsClearfix > div > h1 > span.ipsType_break.ipsContained > span"
      );
      presenceData.details = "Forums, viewing thread:";
      if (title.innerText.length > 128)
        presenceData.state = `${title.innerText.substring(0, 125)}...`;
      else presenceData.state = title.innerText;

      presenceData.smallImageKey = "reading";
      presence.setActivity(presenceData);
    } else if (document.URL.includes("/trending/")) {
      presenceData.details = "Forums, Viewing the list of";
      presenceData.state = "trending threads";

      presence.setActivity(presenceData);
    } else if (document.URL.includes("/profile")) {
      user = document.querySelector(
        "#elProfileHeader > div.ipsColumns.ipsColumns_collapsePhone > div.ipsColumn.ipsColumn_fluid > div > h1"
      );
      presenceData.details = "Viewing the profile of:";
      presenceData.state = user.innerText;

      presence.setActivity(presenceData);
    } else if (
      document.URL.includes("/whats-new/") &&
      document.URL.includes("/profile-posts")
    ) {
      presenceData.details = "Forums, Viewing the list of";
      presenceData.state = "latest profile posts";

      presence.setActivity(presenceData);
    } else if (
      document.URL.includes("/whats-new/") &&
      document.URL.includes("/posts")
    ) {
      presenceData.details = "Forums, Viewing the list of";
      presenceData.state = "latest posts";

      presence.setActivity(presenceData);
    } else if (
      document.URL.includes("/whats-new/") &&
      document.URL.includes("/news-feed")
    ) {
      presenceData.details = "Forums, Viewing the";
      presenceData.state = "news feed";

      presence.setActivity(presenceData);
    } else if (document.URL.includes("/whats-new/")) {
      presenceData.details = "Forums, Viewing whats new";

      presence.setActivity(presenceData);
    } else if (document.URL.includes("/watched/")) {
      if (document.URL.includes("/threads")) {
        presenceData.details = "Forums, Viewing their";
        presenceData.state = "watched threads";

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Forums, Viewing their";
        presenceData.state = "watched forums";

        presence.setActivity(presenceData);
      }
    } else if (document.URL.includes("/search/")) {
      search = document.querySelector(
        "#ipsLayout_mainArea > div > div.ipsResponsive_hidePhone.ipsResponsive_block.ipsPageHeader > p"
      );
      if (search !== null) {
        presenceData.details = "Forums, searching for:";
        presenceData.state = search.innerText
          .replace("Showing results for '", "")
          .replace("'.", "");

        presenceData.smallImageKey = "search";

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Forums, about to search";
        presenceData.state = "something up";

        presenceData.smallImageKey = "search";

        presence.setActivity(presenceData);
      }
    } else if (document.URL.includes("/account/")) {
      presenceData.details = "Forums, account settings";

      presence.setActivity(presenceData);
    } else if (document.URL.includes("/members/")) {
      if (document.URL.includes("key=staff_members")) {
        presenceData.details = "Viewing the list";
        presenceData.state = "of staff members";

        presence.setActivity(presenceData);
      } else if (document.URL.includes("key=todays_birthdays")) {
        presenceData.details = "Viewing list of members";
        presenceData.state = "with today as their birthday";

        presence.setActivity(presenceData);
      } else if (document.URL.includes("/banned")) {
        presenceData.details = "Viewing the list";
        presenceData.state = "of banned users";

        presence.setActivity(presenceData);
      } else if (document.URL.includes("/list")) {
        presenceData.details = "Viewing the list";
        presenceData.state = "of all users";

        presence.setActivity(presenceData);
      } else if (document.URL.includes("key=most_likes")) {
        presenceData.details = "Viewing list of members";
        presenceData.state = "with the most reactions";

        presence.setActivity(presenceData);
      } else if (document.URL.includes("key=most_messages")) {
        presenceData.details = "Viewing list of members";
        presenceData.state = "with the most messages";

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Viewing overview of members";

        presence.setActivity(presenceData);
      }
    } else if (document.URL.includes("/forum/")) {
      title = document.querySelector(
        "#ipsLayout_mainArea > div.ipsPageHeader.ipsClearfix > header > h1"
      );
      if (title !== null) {
        presenceData.details = "Forums, viewing category:";
        presenceData.state = title.innerText;
      } else presenceData.details = "Forums, Browsing...";
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
